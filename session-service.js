import Service from "@ember/service";
import { getOwner } from "@ember/application";
import { inject as service } from "@ember/service";
import Ember from "ember";
import { computed } from "@ember/object";
import { run } from "@ember/runloop";
import i18n from "npm:i18next";
import RSVP from "rsvp";
import {i18n as i18nSettings, Currency, moment, _} from "../capitol-types/lib/index";
import {CommonErrorMessages} from "../shared/messages/common_errors";
import Base64 from "npm:js-base64";

/*
the session service provides access to the current session. It is the main interface for client side
session in the application. It synchronizes session state across all browser tabs/windows.
*/

export default Service.extend({
	_storageKey: "mps-session",
	_syncTimeout: null,
	_authenticated: null,
	_routing: service("-routing"),
	_return_route: null,
	_suspended: null,
	_uid: null,
	_name: null,
	_myInstitutions: null,
	_institutionAuthorisationCollection: null,
	unserDetailService: service("userDetail"), //? userDetails => user-detail.js?
	configService: service("config"),

	//return whether this window we are in is visible
	_isActice: computed(() => {
		const visibilityState = document.visibilityState || 'visible';
		return visibilityState === "visible";
	}).volatile(), //set this property into a non-cached mode

	currentLocale: window.ENV.lang,

	isAuthenticated: computed.oneWay("_authenticated"),
	uid: computed.oneWay("_uid"),
	name: computed.oneWay("_name"),
	myInstitutions: computed.oneWay("_myInstitutions"),
	institutionAuthorisationCollection: computed.oneWay("_institutionAuthorisationCollection"),


	//define public methods
	//format the date to the current locale
	dateFormat (date, namedArgs) {
		namedArgs = namedArgs || {};
		if (date === null || date === undefined) {
			return "";
		} else {
			date.locale(i18nSettings.settings.language);
		}
	},

	//format the number to the current locale
	numberFormat ([value, precision]) {
		if (value === null || value === undefined) return "";

		if (!(value instanceof Currency)) {
			value = new Currency(value);
		}

		precision = Number(precision) || undefined;

		var locale = i18nSettings.settings.locale;
		return locale && i18nSettings.intl ? i18nSettings.intl.numberFormat(locale).format(value) : value.toString(precision);
	},

	//translate text into the current locale
	translate (params, hash) {
		const options = hash || {};
		const prefix = options.prefix || "";
		const value = i18n.t(prefix + params[0], options);
		return `${value}`;
	},

	//display a notification to the user
	notify (message, namedArgs = {}) {
		this.get("nav").navbarView.notification.show({
			message: message,
			feedback: namedArgs.feedback || undefined,
			error: namedArgs.error || undefined,
			xhr: namedArgs.xhr || undefined
		});
	},

	//fetch the new locale strings and the update the locale setting
	setLocale (locale) {
		var self = this;
		i18n.setLng(locale, function () {
			run( () => {
				i18nSettings.setLocaleSettings(locale);
				moment.locale(i18nSettings.settings.language);
				self.set("currentLocale",locale);
			});
		});
	},

	//store authentication state

	signIn() {
		return this.get("userDetailService").getUserDetails(true) 
			.then((userDetails) => {
				const enabled = userDetails.get("enabled");

				const signInResult = {
					enabled: enabled,
					message: null
				};

				if (enabled) {
					const uid = userDetails.get("uid");
					const institutionAuthorisationCollection = userDetails.get("institutionAuthorisationCollection").serialize();
					const name = userDetails.get("name");
					const myInstitutions = userDetails.get("myInstitutions");

					this._persist(true, uid, name, myInstitutions, institutionAuthorisationCollection);

					const returnRoute = this.get("_return_route");

					if (returnRoute && returnRoute.params.length > 0) {
						this._transitionTo(returnRoute.route, returnRoute.params);
					} else {
						this._transitionTo("index");
					}
				} else {
					if (userDetails.get("siteMessages.length")) {
						signInResult.message = userDetails
							.get("siteMessages")
							.filter( sm => sm.get("isActive") === true)
							.map(sm => {return sm.get("message")})
							.join(" ");
					} else {
						signInResult.message = CommonErrorMessages.CRITICAL_ERROR;
					}
				}

				return signInResult;
			})
			.catch(() => {
				return {enabled: false, message: CommonErrorMessages.CRITICAL_ERROR};
			});
	},


	//remove authentication state
	signOut () {
		this._invalidate();
		this._transitionTo("login");
	}


	//save last transtion state
	transit (transition) {
		if (transition) {
			const routeName = transition.targetName;
			const routeChainInfo = transition.params;
			const routeParams = [];

			for (let routeInfo in routeChainInfo) {
				if (routeChainInfo.hasOwnProperty(routeInfo)) {
					for (let key in routeChainInfo[routeInfo]) {
						if (routeChainInfo[routeInfo].hasOwnProperty(key)){
							routeParams.push(routeChainInfo[routeInfo][key]);
						}
					}
				}
			}

			this.set("_return_route", {
				route: routeName,
				params: routeParams
			});
		} else {
			this.set("_return_route");
		}
	},


	//define private methods

	//invoke transition and suspend synchronization
	_transitionTo (route, params) {
		const self = this;
		const applicationInstance = getOwner(this);
		const router = applicationInstance.lookup("router:main");

		self.set("_suspended", true);

		var transitionParams = [route];
		if (params) {
			transitionParams.push(params);
		}
		//finally(): execute function() after the Promise is settled
		//run.later(): execute the function() after 1000 ms.
		router.transitionTo.apply(router, transitionParams).finally(function () { //? what does the transitionParams look like? rerender to a nested route?
			run.later(this, function () {
				this.set("_suspended", false);
			}, 1000);
		}.bind(this));
	},


	//store session data
	_storeSession (authenticated, uid, name, myInstitutions, institutionAuthorisationCollection) {
		this.set("_authenticated", authenticated);
		this.set("_uid", uid);
		this.set("_name", name);
		this.set("_myInstitutions", myInstitutions);
		this.set("_institutionAuthorisationCollection", institutionAuthorisationCollection);
	},

	//invalidate client side session
	_invalidate () {
		this.set("_authenticated", false);
		this.set("_uid", null);
		this.set("_name", null);
		this.set("_myInstitutions", null);
		this.set("_institutionAuthorisationCollection", null);
	},


	//internal method for reading session state from storage
	_readFromStorage () {
		if (!_.get(window, "localStorage", null)) {
			return "";
		}

		const _storageKey = this.get("_storageKey");
		const value = window.localStorage.getItem(_storageKey);
		const decodedValue = _.isString(value) ? this._fromBase64(value) : "",
		return decodedValue;
	}


	//restore session state
	_restore () {
		const _sessionState = this._readFromStorage();
		if (_.isEmpty(_sessionState)) {
			return RSVP.resolve({});
		}

		let data = {};
		try {
			data = JSON.parse(_sessionState);
		} catch (e) {
			this._invalidate();
		}

		if (!_.isEmpty(data)) {
			const uidIsSet = _.isString(data.uid) && data.uid.length > 0;
			const isAuthenticated = data.authenticated === true && uidIsSet;

			this._storeSession(isAuthenticated,
				data.uid,
				data.name,
				data.myInstitutions,
				data.institutionAuthorisationCollection,
				data.currentLocale);
		} else {
			this._invalidate();
		}

		return RSVP.resolve(data);
	},


	//persist session state
	_persist (authenticated, uid, name, myInstitutions, institutionAuthorisationCollection) {
		this._storeSession(authenticated, uid, name, myInstitutions, institutionAuthorisationCollection);

		const data = {
			authenticated: authenticated || false,
			uid: uid || "",
			name: name || "",
			myInstitutions: myInstitutions || "",
			institutionAuthorisationCollection : institutionAuthorisationCollection || [],
			currentLocale: this.currentLocale
		};

		const value = JSON.stringify(data);
		this._writeToStorage(value);
	},


	//internal method for writing session state to storage
	_writeToStorage(value) {
		if (!_.get(window, "localStorage", null)) {
			return;
		}

		const _storageKey = this.get("_storageKey");
		const _value = encodeURLComponent(value);
		const _encodedValue = this._toBase64(_value);

		window.localStorage.setItem(_storageKey, _encodedValue);

	},

	//check is stored session is authenticated and the same as current one
	_isSameSession (data) {
		const existingAuthenticated = this.get("_authenticated");
		const existingUid = this.get("_uid");

		const newAuthenticated = _.get(data, "authenticated", false);
		const newUid = _.get(data, "uid", null);

		return newAuthenticated && 
			existingAuthenticated === newAuthenticated &&
			existingUid === newUid;
	},


	//internal method used for synchronizing session state across all browser tabs/windows
	_sync () {
		const self = this;
		return self._restore()
			.then((data) => {
				if (!self.get("_suspended")) {
					if (self.get("_isActice") === true) {
						const currentRouteName = self.get("_routing.currentRouteName");
						if (_.isString(currentRouteName)) {
							if (!self._isSameSession(data) && currentRouteName !== "login") {
								self._storeSession(data.authenticated, data.uid);
								self._transitionTo("login");
							} else if (self._isSameSession(data) && currentRouteName === "login") {
								const returnRoute = self.get("_return_route");
								if (returnRoute) {
									self._transitionTo(returnRoute.route, returnRoute.params);
								} else {
									self._transitionTo("index");
								}
							}
						}
					}
				}

				if (!Ember.testing) {
					run.cancel(self._syncTimeout);
					self._syncTimeout = run.later(self, self._sync, 500);
				}
			});
	},


	//internal method to remove session from storage
	_removeFromStorage () {
		if (_.get(window, "localStorage", null)) {
			const _storageKey = this.get("_storageKey");
			window.localStorage.removeItem(_storageKey);
		}
 	},

 	//encode text to Base64 string
 	_toBase64 (text) {
 		return Base64.Base64.encode(text);
 	},

 	//decodes Base64 encoded string
 	_fromBase64 (encodedText) {
 		return Base64.Base64.decode(encodedText);
 	}

	


	//setup init hook
	init() {
		this._super(...arguments);

		this._restore().then(data => {	
			if (window.jumpPageEnabled && !data.authenticated) {this.signIn();}
		});
	},


});