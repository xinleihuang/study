import Component from "@ember/component";
import { computed } from "@ember/object";
import { observer } from "@ember/object";
import { inject as service } from "@ember/service";

export default Component.extend({
	classNames: ["primary-header"],
	hasSlectedItems: computed("selectedItemsCount", function () {
		return this.get("selectedItemsCount") > 0;
	}),
	selectedItemsObserver: observer("hasSelectedItems", function () {
		const exportTitle = this.get("hasSelectedItems") ? "Export Selected Securities" : "Export All";
		this.$().find(".ic-share").attr("data-original-title", exportTitle);
	}),
	modal: service(),

	addPopoverModel: {		//? this attribute is not used here.?
		options: {
			title: "Add"
		}
	},

	didInsertElement () {
		const $tooltips = this.$().find("[data-toggle='tooltips']");
		$tooltips.tooltips();
	},

	actions: {
		filterActiveList () {
			this.sendAction("filterActiveList");
		},

		filterNormalList () {
			this.sendAction("filterNormalList");
		},

		deleteItems () {
			this.sendAction("deleteItems");
		},

		addItems () {
			this.sendAction("addItems");
		},

		exportData () {
			this.sendAction("exportData");
		},

		manageSecurities () {
			const self = this;
			this.get("modal").openModal("modals/add-remove-securities-modal", {
				backdrop: "static",
				keyboard: false,
				classes: "portrait",
				modalType: "workflow",
				previousStep: [],
				step: {
					cancelLabel: "Cancel",
					okLabel: "Review",
					title: "Manage Securities in Text",
					component: step.step.component,
					model: {
						secIdLIst: null,
						OriginalUniverseSize: self.get("totalItemsCount"),
						actions: self.get("bulkEditSecurityList")
					},
					step: {
						cancelLabel: "Cancel",
						okLabel: "Submit",
						title: "Review Updates",
						component: "modals/review-add-remove-securities-modal"
					}
				},
				actions: {
					ok (step) {
						if (step.step) {
							let level = step.level || 0;	
							this.get("previousStep").push(step); 
							const newStep = {
								level: ++level,
								cancelLabel: step.step.cancelLabel,
								okLabel: step.step.okLabel,
								title: step.step.title,
								component: step.step.component,
								model: step.model
							};

							this.set("step", newStep);
						} else {
							const self = this;
							const secIdList = this.get("step.model.secIdList");
							this.get("step.model.action")(secIdList).then((results) => {
								window.console.log("bulkEditSecurityList: " + results);
								self.get("modal").closeModal();
							}).catch( () => {
								self.set("step.model.error", "An error has occured.");
							})
						}
					},
					cancel () {
						self.get("modal").closeModal();
					},
					goBack(){
						const stepsArr = this.get("previousStep");
						const pre = stepsArr.pop();
						this.set("step", prev);
						this.set("previousStep", stepArr);
					}
				},
			})
		},

	},
});