"use strict";

import Controller from "@ember/controller";
import { computed } from "@ember/object";
import ControllerWithSignOutMixin from "../mixins/controller-with-signout";
import LocaleMixin from "../mixins/controller-with-locales";
import ShowDevFeaturesMixin from "../mixins/show-dev-features";

export default Controller.extend(ControllerWithSignOutMixin, ShowDevFeaturesMixin, LocaleMixin, {
	isNavVisible: true,
	solutionsModel: computed("model.institution", function () {
		const solutionOpts = this.get("model.institution.solutionAuthorisationCollection").map(solution => {
			const solutionName = solution.solutionName;
			const solutionId = solution.solutionId;
			const instId = this.get("model.institution.institutionId");

			return {
				institutionId: instId,
				solutionId: solutionId,
				solutionName: solutionName
			};
		});

		return {label: "Which solutionwould you like to access first?", options: solutiondOpt};
	}),

	init () {
		this._super(...arguments);
	},

	actions: {
		goToSolution (institutionId, solutionId) {
			this.send("goToWithTransition", "institutions.institution.soltions.solution", institutionId, solutionId);
		}
	}
});