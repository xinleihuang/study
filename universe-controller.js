"use strict";

import Controller from "@ember/controller";
import { alias } from "@ember/object/computed";
import { computed } from "@ember/object";
import { inject } from "@ember/controller";
import { inject as service } from "@ember/service";
import { run } from "@ember/runloop";
import ControllerWithSignOutMixin from "../mixins/controller-with-signout";
import LocallesMixin from "../controller-with-locales";
import ShowDevFeaturesMixin from "../mixins/show-dev-features";

export default Controller.extend(LocallesMixin, ShowDevFeaturesMixin, ControllerWithSignOutMixin, {
	solutionCtrl: inject("institutions.institution.solutions.solution"),
	name: alias("model.universe.name"),
	universeService: service("universe"),
	sessionService: service("session"),
	headerConfig: { enabled: true},
	customDataPoints: alias("model.universe.customDataPoints"),
	securityData: alias("model.universe.securityData"),
	countryId: alias("solutionCtrl.institutionCtrl.model.institution.countryId"),
	univserColumnDefId: computed("countryId", function () {
		let columnDefId;
		const countryId = this.get("countryId");

		switch (countryId) {
			case "USA":
			case "CHE":
			case "DEU":
				columnDefId = `universe_${countryId}`;
				break;
			default:
				columnDefId = "universe_default";
				break;
		}
		return columnDefId;
	}),

	editItem: computed(function () {
		return run.bind(this, this._editItem);	//? what does 'this' point to? editItem?
	}),

	_editItem (securityId, dataPointId, dataPointValue) {
		const queryParams = {
			institutionId: this.get("mode.institutionId"),
			solutionId: this.get("model.solutionId"),
			unvierseId: this.get("model.unvierseId"),
			languageId: this.get("model.languageId"),
			currencyId: this.get("model.currencyId")
		};

		const payload = { "Securities": securityId};

		payload[dataPointId] = dataPointValue;

		return this.get("universeService").editSecurities(payload, queryParams);
	},

	bulkEditSecurityList: computed( function () {
		return run.bind(this, this._bulkEditSecurityList);
	}),

	_bulkEditSecurityList (secIds, validate) {
		const queryParams = {
			institutionId: this.get("model.institutionId"),
			solutionId: this.get("model.solutionId"),
			unvierseId: this.get("model.unvierseId"),
			validate: validate
		};

		const list = { secIds: secIds};

		return this.get("universeService").addSecurities(list, queryParams);
	},

	search: computed( function () {
		return run.bind(this, this._search);
	}),

	_search (filter) {
		const queryParams = {
			institutionId: this.get("mode.institutionId"),
			solutionId: this.get("model.solutionId"),
			unvierseId: this.get("model.unvierseId"),
			filter: filter		
		};

		return this.get("universeService").searchSecurities(queryParams);

	},

	actions: {
		deleteItems (ids) {
			const queryParams = {
				institutionId: this.get("mode.institutionId"),
				solutionId: this.get("model.solutionId"),
				unvierseId: this.get("model.unvierseId"),
					
			};

			this.get("universeService").deleteSecurities(ids, queryParams).then(() => {
				this.send("gridItemsChanged");
				this.get("sessionService").notify(`${ids.length} items have been removed from the list`);

			}).catch(error => {
				this.get("sessionService").notify("An error has occured trying to delete items.", {
					error: error.responseText,
					xhr: error
				});
			});
		},

		addItems (ids) {
			const queryParams = {
				institutionId: this.get("mode.institutionId"),
				solutionId: this.get("model.solutionId"),
				unvierseId: this.get("model.unvierseId"),
					
			};

			this.get("universeService").addSecurities(ids, queryParams).then(() => {
				this.send("gridItemsChanged");
				this.get("sessionService").notify(`${ids.length} items have been removed from the list`);

			}).catch(error => {
				this.get("sessionService").notify("An error has occured trying to delete items.", {
					error: error.responseText,
					xhr: error
				});
			});	
		},

		exportData (ids) {
			const queryParams = {
				institutionId: this.get("mode.institutionId"),
				solutionId: this.get("model.solutionId"),
				unvierseId: this.get("model.unvierseId"),			
			};
			const languageId = this.get("model.solutionId");
			const currencyId = this.get("model.currencyId");
			this.get("universeService").exportData(ids, languageId, currencyId, queryParams).then(() => {
				window.console.log("export successful.");
			}).catch(error => {
				this.get("sessionService").notify("An error has occured trying to export.", {
					error: error.responseText,
					xhr: error
				})
			});
		}
	},

});