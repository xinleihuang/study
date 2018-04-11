import { inject as service } from "@ember/service";
import GenericService from "./base/generic";
import RSVP from "rsvp";
import fileSaver from "npm:file=saver";
import $ from "jquery";

export default GenericService.extend({
	store: service(),

	getUniverseDetails (institutionId, solutionId, universeId, languageId, currencyId, 
		invalidate, transform) {
		return this.servePromiseWithCache(
			`mps_institution_${institutionId}_solution_${solutionId}_universe_${universeId}`,
			invalidate,
			() => {
				return this.get('store').queryRecord("universe", 
					{institutionId: institutionId,
						solutionId: solutionId,
						universeId: universeId,
						languageId: languageId,
						currencyId: currencyId,
						invalidate: invalidate}, 
						transform);
			},
			);
	},

	searchSecurities (queryParams) {
		return new RSVP.Promise((resolve, reject) => {
			if (queryParams.filter === ""){
				resolve(null);
			}

			const cachedResult = this.get("store").peekRecord("universe", queryParams.filter);
			if (cachedResult) {
				resolve(cachedResult);
			} else {
				$.ajax({
					url: "/universeSecurities?" + $.param(queryParams),
					type: "GET"
				}).done((result) => {
					result.universe.id = queryParams.filter;
					const objectResult = this.get("store").createRecord("universe", result.universe);
					resolve(objectResult);
				}).fail((error) => {
					reject(error);
				});
			}
		})
	},

	exportData (ids, languageId, currencyId, queryParams) {
		return new RSVP.Promise((resolve, reject) => {
			const searchString = ids.join("");

			let xhr = new XMLHttpRequest();
			xhr.open("POST", "/universeSecurities/export?" + $.param(queryParams));
			xhr.responseType = "blob";
			xhr.setRequestHeader("Content-Type", "application.json");
			xhr.send(JSON.stringify({
				Categories: ["Standard"],
				Language: [languageId],
				currency: [currencyId],
				Search: searchString
			}));

			xhr.onload = () => {
				const filename = `export_customdata_universe_${queryParams.universe_id}`;
				this._saveFile(xhr.response, filename);
				resolve("success!");
			};

			xhr.onerror = function (error) {
				reject(error);
			};
		});
	},

	_saveFile (response, filename) {
		let blob - new Blob([response], {
			type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
		});

		let fileName = filename || "export";
		fileSaver.saveAs(blob, (fileName||"data")+".xlsx");
	},

	addSecurities (items, queryParams) {	//? why doesn't this method work in my machine?
		return new RSVP.Promise((resolve, reject) => {
			$.ajax({
				url: "/universeSecurities?" + $.param(queryParams),
                type: "POST",
                contentType: "application/json",
                data: JSON.stringify(items)
			}).done((result) => {
				if (result && result.universe) {
					const objectResult = this.get("store").createRecord("universe", result.universe);
					resolve(objectResult);
				} else {
					resolve(result);
				}
			}).fail((error) => {
				reject(error);
			})
		});
	},

	editSecurities (payload, queryParams) {
		const id = payload.Securities;
		return new RSVP.Promise((resolve, reject) => {
			$.ajax({
				url: `/universeSecurities/${id}?` + $.param(queryParams),
                type: "PUT",
                contentType: "application/json",
                data: JSON.stringify(payload)
			}).done((result) => {
				resolve(result);
			}).fail((error) => {
				reject(error);
			})
		});
	},

	deleteSecurities (items, queryParams) {
		return new RSVP.Promise((resolve, reject) => {
			const ids = items.join();
			$.ajax({
				url: `/universeSecurities/${ids}?` + $.param(queryParams),
                type: "DELETE"
			}).done(result => {
				resolve(result);
			}).fail(error => {
				reject(error);
			});
		});
	}

});