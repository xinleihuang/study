import Route from "@ember.routing.route";
import { inject as service } from "@ember/service";
import { _ } from "../capitol-types/lib/index";
import RSVP from "rsvp";
import ProtecedRouteMixin from "../mixins/protected-route";
import HOMEPAGE_LAYOUTS from "../shared/util/user_features/homepage"; 	//? cannot find this under the directory?
import factory from "../shared/util/user_features/homepage/tile_factory";	//? the same question? 

export default Route.extend(ProtecedRouteMixin, {
	pageClass: "page-home",
	configService: service("config"),
	sessionService: service("session"),

	listToMatrix (list, elementsPerSubArray) {
		var matrix = [], i, k;

		for (i = 0, k = -1; i < list.length; i++){
			if (i % elementsPerSubArray === 0) {
				k++;
				matrix[k] = [];
			}

			matrix[k].push(list[i]);
		}

		return matrix;
	},

	addTiles (authorizedInstitutions) {
		let tiles = null;

		titles = _.map(authorizedInstitutions, authorizedInstitution => {
			const institutionId = authorizedInstitution.institutionId;
			const institutionName = authorizedInstitution.institutionName;
			const solutionAuthorisationCollection = authorizedInstitution.solutionAuthorisationCollection;

			let links = _.map(solutionAuthorisationCollection, authorizedSolution => {
				const solutionId = authorizedSolution.solutionId;
				return factory.createLink(
					{linkId: `inst-${institutionId}-solution-${solutionId}`,
					 text: authorizedSolution.solutionName,
					 target: `/#/institutions/${institutionId}/solutions/${solutionId}`
					},{
						transition: "institutions.institution.solutions.solution",
						institutionId: institutionId,
						solutionId: solutionId
					});
				});

			let tile = factory.createTile(institutionName, institutionId, "white", links);

			return tile;
			});
		
		return tiles;
	},


	model() {
		const authorizedInstitutions = this.get("sessionService.institutionAuthorisationCollection");
		const tiles = this.addTiles(authorizedInstitutions);
		const homepageLayout = "default";

		let gridLayout = _.cloneDeep(HOMEPAGE_LAYOUTS(homepageLayout));
		gridLayout.rows = Math.ceil(tiles.length / gridLayout.cols);
		gridLayout.content = this.listToMatrix(tiles, gridLayout.cols);

		return RSVP.hash({
			config: this.get("configService").getConfig(false),
			grid: gridLayout,
			institution: null
		});
	},


	actions: {
		goToWithTransition (transition, institutionId, solutionId) {
			if (institutionId && solutionId) {
				this.transitionTo("institutions.institution.solutions.solution", institutionId, solutionId);
			} else {
				this.transitionTo(transition);
			}
		}
	},





});