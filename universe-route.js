import Route from "@ember/routing/route";
import { inject as service } from "@ember/service";
import RSVP from "rsvp";
import ProtectedRouteMixin from "../mixins/protected-route";

export default Route.extend(ProtectedRouteMixin, {
	pageClass: "page-institution",
	universeService: service("universe"),

	model (params) {
		const institutionModel = this.modelFor("institutions.institution");
		const institutionId = institutionModel.institution.institutionId;
		const solutionModel = this.modelFor("institutions.institution.solutions.solution");
		const solutionId = solutionModel.solution.id;
		const languageId = null;
		const currencyId = null;

		return RSVP.hash({
			universe: this.get("universeService").getUniverseDetails(institutionId, solutionId, universeId,
				languageId, currencyId, true)}.then((response) => {
					const result = {
						universe: response.universe,
						institutionId: institutionId,
						solutionId: solutionId,
						universeId: universeId,
						languageId: languageId || response.universe.get("defaultLanguage"),
						currencyId: currencyId || response.universe.get("defaultCurrency"),
						languages: response.universe.get("language"),
						currencies: response.universe.get("currencies")
					};

					return result;
				}),

	},

	actions: {
		gridItemsChanged () {
			this.refresh();
		}
	}
});