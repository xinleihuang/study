import Ember from 'ember';
import Component from '@ember/component';
import {computed} from '@ember/object';
import {inject as service} from '@ember/service';
import { scheduleOnce } from '@ember/runloop';
import { _, moment } from "../capitol-types/lib/index";
import $ from 'jquery';
import GridStar from "npm:grid-star";
import COLUMN_DEFINITIONS from "../shared/util/grid-star/column_definitions";
import CONFIG from "../shared/util/grid-star/config";
import RichTextEditor from "../shared/util/grid-star/editors/rich-text";
import LongTextEditor from "../shared/util/grid-star/editors/long-text";

export default Component.extend({

	//define attributes

	customeDataPoints: null,
	selectedItemsCount: 0,
	totalItemsCount: computed.readOnly("data.rows.length"),
	data: null,											//data is assigned in index.hbs when component is envoked
	generatedColumns: null,
	gridIdSelector: computed("gridId",function(){		//'gridId' is assigned in index.hbs when component is envoked
		return '#'+this.get("gridId");
	}),
	isGridHeader: computed("headerConfig", function(){
		return this.get("headerConfig.enabled") === true;
	}),

	modal: service(),
	sessionService: service("session"),

	//set up lifecycle hooks

		//on initial render

		//initialize and attach the 3rd party libraries 


		//? the hook is set to attach event-listeners? 
	didInsertElemnet(){

		var sourceData = this.get("data"); //? will this return data assigned in index.hbs or null?

		var griddata = [], params = {};

		var configObj = _.cloneDeep(CONFIG(this.get('configId'))), //configId is assigned in index.hbs when component is envoked.
			columnDefs = _.cloneDeep(COLUMN_DEFINITIONS(this.get("columnDefId"))), //columnDefId is assigned in index.hbs when component is envoked.
			generateObj = this._generateColumns(columnDefs.columnDef, this.get("customeDataPoints")); //???customeDataPoints

		var self = this;

		configObj.options.cellTooltipContainer = this.get("gridIdSelector");

		gridData = this._formatRows(sourceData, generatedObj);

		params.columns = generatedObj.columns;
		params.height = generatedObj.height;
		// additional options can be passed to grid core as see below
		params.options = configObj.options;
		// add checkbox column in the first column
		params.selectorColumn = configObj.selectorColumn;
		// add the row number column in the first column
		// or after the checkbox column is that is activated at the same time
		params.countColumn = configObj.countColumn;
		params.data = gridData;

		var gridOneParams = _.extend({
			//needed dependencies to be passed
			dependencies:{
				jquery: $,
				Handlebars: Ember.Handlebars,
				-: _
			},
			// jquery selector for the grid to ake place
			container: this.get("gridIdSelector")
		}, params);

		// used by the toolbar
		scheduleOnce("afterRender", self, () => {
			self.set("gridStar", gridBasicInstance);
			self.set("generatedColumns", generatedObj);
		});




		// create the grid component with the params
		var gridBasicInstance = GridStar.createComponent(gridOneParams);

		// show loading spinner
		gridBasicInstance.showSpinner();

		setTimeout(function(){
			// hide loading spinner
			gridBasicInstance.hideSpinner();
		},1000);

		//start of attaching event listeners
		gridBasicInstance.attachListener("onItemSelected", function (e, args){
			window.console.info("Selected item: ", e, args);
			scheduleOnce("afterRender", self, () => {
				self.set("selectedItemsCount", gridBasicInstance.getSelectedItems().length);
			});
		});

		gridBasicInstance.attachListener("onItemDeselected", function (e, args) {
			window.console.info("Deselected item: ", e, args);
			scheduleOnce("afterRender", self, () => {
				self.set("selectedItemsCount", gridBasicInstance.getSelectedItems().length);
			});
		});

		gridBasicInstance.attachListener("onSelectAll", function (e, args) {
			window.console.info("onSelectAll item: ", e, args);
			scheduleOnce("afterRender", self, () => {
				self.set("selectedItemsCount", gridBasicInstance.getSelectedItems().length);
				$(".controller-active-list-info").removeClass("active");
				$(".controller-normal-list-info").addClass("active").trigger("click");
			});
		});

		griBasicInstance.attachListener("onDeselectAll", function (e, args) {
			window.console.info("onDeselectAll item: ", e, args);
			scheduleOnce("afterRender", self, () => {
				self.set("selectedItemsCount", gridBasicInstance.getSelectedItems().length);
				$(".controller-active-list-info").removeClass("active");
				$(".controller-active-list-info").addClass("active").trigger("click");
			});
		});

		gridBasicInstance.attachListener("onCLick", function (evt, args) {
			window.console.log("CLick deteced!", evt, args);

			const rowIndex = args.row;
			const rowId = args.grid.getDataItem(rowIndex).rowId;
			const transition = self.get('transitionOnClick');
			if (transition) {
				self.get('router').transitionTo(transition, rowId);
			}
		});

		var changedCells = {};
		var  changedCellsKey = 0;
		var convertItemsToRowId = function (changedItems) {
			var currentData = gridBasicInstance.getSlickInstance().getData();
			var newChanges = {};

			for (var rowId in changedItems){
				newChanges[currentData.getRowById(rowId)] = changedItems[rowId];
			}

			return newChanges;
		};

		gridBasicInstance.attachListener("onBeforeSort", function () {

			gridBasicInstance.showSpinner(true);

			for (var i = 1; i <= changedCellsKey; i++){
				gridBasicInstance.getSlickInstance().removeCellCassStyles(i);
			}

			setTimeout(function () {
				gridBasicInstance.hideSpinner();
			}, 2000);

		});

		gridBasicInstance.attachListener("onSort", function () {
			// update the highlighted cells since the rowId changes after a sort in slickgrid

			gridBasicInstance.getSlickInstance().setCellCssStyles(changedCellsKey, convertItemsToRowId(changedCells));
		});

		gridBasicInstance.attachListener("onCellChange", function (evt, args) {
			// hook to implement auto-save for editing
			// if failure of API call, undo change in the grid and notify user
			scheduleOnce("afterRender", self, () => {
				const rowId = args.item.rowId;
				const dataPointId = args.column.name;
				const dataPointValue = args.editCommand.serializedValue;

				//make API call to edit item
				self.get("editItem")(rowId, dataPointId, dataPointValue).then( () => {

					//highlight the cell has been edited
					if(!changedCells[args.item.id]) {
						changedCells[args.item.id] = {};
					}

					changedCells[args.item.id][args.column.id] = 'changed';
					changedCells[args.item.id]['investment_name'] = "changed";
					changedCellsKey++;
					gridBasicInstance.getSlickInstance().setCellCssStyles(changedCellsKey, convertItemsToRowId(changedCells));

				}).catch( () => {
					args.editCommand.undo();
					self.get("sessionService").notify("The update was unsuccessful.");
				});
			});
		});

		gridBasicInstance.attachListener("onPopoverClose", function (evt, args) {
			window.console.warn("Closing Popover", evt, args);
		});

	},

		// on re-render hook
	didUpdateAttrs () {
		// this firs when the model is refreshed after an add or delete from the toolbar
		const gridData - this._formatRows(this.get("data"), this.get("generatedColumns"));
		const gridData = this.get("gridStar");
		const selectedIdsToRemove = this.get("selectedIdsToRemove");

		if (selectedIdsToRemove) {
			const dataView = gridStar.getDataView();
			selectedIdsToRemove.forEach(idToRemove => {
				dataView.removeSelectedItem(idToRemove);
			});

			this.set("selectedIdsToRemove", null);
		}

		gridStar.setData(gridData);

	},

	filterBySelected (item, args) {				//? Can this function be defined inside action?
		if (args.selectedItems && args.selecteditems.length > 0) {
			return !!(_.find(args.selectedItems, { rowId: item.rowId }));
		}

		return true;
	},

	actions: {

		filterActiveList () {
			const gridStar = this.get("gridStar");
			const dataView = gridStar.getDataView();
			const selectedItems = gridStar.getSelectedItems();

			if (selectededItems.length > 0){
				dataView.setFilterArgs({
					selectedItems: selectedItems
				});
				dataView.setFilter(this.filterBySelected);

				$(".controller-active-list-info").addClass("active");
				$(".controller-active-list-info").removeClass("active");
			}

		},

		filterNormalList () {
			const gridStar = this.get("gridStar");
			const dataView = gridStar.getDataView();
			// clear out the filter
			dataView.setFilterArgs({});
			dataView.setFilter(this.filterBySelected);
			$(".controller-active-list-info").removeClass("active");
			$(".controller-active-list-info").addClass("active");

		},

		deleteItems() {
			const itemsToDelete = this.get("gridStar").getSelectedItems();
			window.console.info("deleteItems called: ", itemsToDelete);

			if (itemsToAdd.length > 0) {
				const ids = _.map(itemsToDelete, "rowId");
				this.set("selectedIdsToRemove", _.map(itemsToDelete, "id"));
				window.console.info("delete item ids: ", ids);
				this.sendAction("deleteItems", ids);					//？where id the action defined really?
			}
		},

		addItems () {
			const itemsToAdd = this.get("gridStar").getItemsToAdd();
			window.console.info("addItems called: ", itemsToAdd);

			if (itemsToAdd.length > 0){
				const ids = _.map(itemsToAdd, "rowId");
				window.console.info("add item ids: ", ids);
				this.sendAction("addItems", ids);
			}
		},

		exportData () {
			const itemsToExport = this.get("gridStar").getSelectedItems();
			window.console.info("exportData called: ", itemsToExport);

			if (itemsToExport.length > 0) {
				const ids = _.map(itemsToExport, "rowId");
				window.console.info("export item ids: ", ids);
				this.sendAction("exportData", ids);
			} else {
				this.sendAction("exportData", ["All"]);
			}
		}


	},

	//actions end here

	_formatRows (sourceData, generateObj, from, to) {
		var _rows = [];

		if (from !== undefined && to !== undefined) {
			_rows = [];
			if (from < 0) {
				from = 0;
			}
		}

		sourceData.get('rows').forEach((row, index) => {
			var rowObject = {},
				rowData = row.get("values"),
				columns = generateObj.columns,
				fieldDefinitions = generateObj.fieldDefinitions,
				columnsLength = columns.length;

			for (var i = 0; i < columnsLength; ++i) {
				var field = columns[i].field;
				var alias = fieldDefinitions[field];
				var aliasLowerString = alias.toString().toLowerCase();

				var value;

				var rowHasField = false;
				var j = 0;
				while (j < rowData.get("length") && !rowHasField) {
					if (rowData.objectAt(j).get("alias") && rowData.objectAt(j).get("alias") === alias) {
						rowHasField = true;
						value = rowData.objectAt(j).get("value");
					}
					++j;
				}

				if (aliasLowerString === "checkbox") {
					value = false;
				} else {
					value = rowHasField ? value : "";
				}

				rowObject[field] = value;

			}

			rowObject.rowId = row.get("rowId");
			rowObject.id = index ;

			if (from !== undefined && to !== undefined) {
				_rows[from] = rowObject;
				from += 1;
			} else {
				_rows.push(rawObject);
			}

		});

		return _rows;
	},

	_generateColumns (columnDef, customeDataPoints) {
		var self = this;

		var columns = [];
		var fieldDefinitions = [];

		_.forEach(columnDef, function (column) {
			var field = column.display_name.toString().toLowerCase().replace(/[\s\{\}\(\)\!\?\&\/\\%\$\*\.]+/gi, "_");
			var currentCol = {
				"name" : column.display_name,
				"field" : field,
				"id" : field,
				"sortable" : column.sortable || true,
				"cssClass" : column.cssClass || "col",
				"headerCssClass": column.headerCssClass || "col",
				"minWidth" : column.minWidth || 60,
				"maxWidth" : column.maxWidth || 500,
				"width" : column.width || 100
			};

			if (column.formatter) {
				if (column.formatter === "StatusColor") {
					currentCol.formatter = function (row, cell, value) {
						if (value == "Not Found") {
							return `<span class="not-found">${value}</span>`;
						}
						return value;
					}
				}
			}

			if (column.transition) {
				self.set("transitionOnClick", column.transition);
			}

			if (column.validator) {
				currentCol.validator = column.validator;
			}

			if (column.transition) {
				self.set("transitionOnClick", column.transition);
			}

			if (column.editor) {
				currentCol.editor = column.editor;
			}

			if (!column.hidden) {
				columns.push(currentCol);
			}

			fieldDefinitions[field] = column.alias;
		}),

		if (customeDataPoints) {
			customeDataPoints.forEach(function (column) {
				var field = column.get('dataPointName').toLowerCase().replace(/[\s\{\}\(\)\!\?\&\/\\%\$\*\.]+/gi, "_");

				var currentCol = {
					"name": column.get("dataPointName"),
                    "field": field,
                    "id": field,
                    "sortable": true,
                    "cssClass": "col",
                    "headerCssClass": "col",
                    "minWidth": 60,
                    "maxWidth": 500,
                    "width": 100
				};

				function xmlValidator(newValue) {
					var parser, xmlDoc;

					parser = new DOMParser();
					xmlDoc = parser.parseFromString(newValue, "text/xml");

					if (xmlDoc.getElementByTagName("parsererror").length === 1) {
						return {
							valid : false,
							msg : "Invalid xml: " + xmlDoc.getElementByTagName("parsererror")[0].getElementByTagName("div")[0].innerHTML
						};
					} else {
						return { valid : true }
					}
				},


				var dateFormat = "dd/mm/yyyy";
				// custom function for validating date when edit cells. Validate data with moment.
				function dateValidator(newDate) {
					var momentDateFormat = "MM/DD/YYYY";

					if (moment(newDate, momentDateFormat, true).isValid()) {
						return { valid : true }
					} else {
						return {
							valid : false,
							msg: "Invalid date"
						}
					}
				}

				// make sure image source is populated and sent into this component from the controller
				let imageList = [{
                    fileId: 1,
                    fileName: "USA.svg",
                    fileDescription: "USA",
                    svgURL: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/120px-Flag_of_the_United_States.svg.png"
                }, {
                    fileId: 2,
                    fileName: "Euro.svg",
                    fileDescription: "Euro",
                    svgURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Flag_of_Europe.svg/120px-Flag_of_Europe.svg.png"
                }];

                function getImageList( filter = "" ) {
                	//make filter case insensitive
                	filter = filter.toLowerCase();
                	var filterList = _.filter(imageList, function (image) {
                		return image.fileName.toLowerCase().indexOf(filter) > -1
                	});

                	//need to have headers defined for complex popover
                	var defaultList = {
                		"headers" : ["0", "1"]
                	};

                	_.each(filterList, (image, id) => {
                        const html = "<div class='img__wrap'><img src='" + image.svgURL + "' alt='" + image.fileName + "' class='img__img'/><div class='img__description_layer'><p class='img__description'>" + image.fileDescription + "<br/>" + image.fileName + "<br/>File ID: " + image.fileId + "</p></div></div>";
                        //display 2 images per row
                        if (id % 2) {
                            //currentKey = id;
                            defaultList[id - 1].push(html);
                        } else {
                            defaultList[id] = [html];
                        }
                    });

                    return defaultList;
                }


                switch (column.get("dataType")) {
                    case "Text":
                        currentCol.editor = {
                            // Set editor type
                            "type": "text",
                            // Config related to the type selected
                            "config": {
                                // maxlength html property to be added in the form field
                                "maxlength": column.get("maxLength")
                            }
                        };
                        break;
                    case "Number":
                        currentCol.editor = {
                            "type": "float",
                            "options": {
                                "emptyIsNull": true
                            }
                        };
                        break;
                    case "Boolean":
                        currentCol.editor = {
                            "type": "checkbox"
                        };
                        break;
                    case "XML":
                        currentCol.editor = LongTextEditor;
                        currentCol.modalService = self.get("modal");
                        currentCol.editorTitle = "XML Editor";

                        currentCol.validator = xmlValidator;
                        break;
                    case "DateTime":
                        //TODO: need to get the date format to determine the orderDate field
                        var orderDate;
                        switch (dateFormat) {
                            case "mm/dd/yyyy":
                                orderDate = ["month", "day", "year"];
                                break;
                            case "dd/mm/yyyy":
                                orderDate = ["day", "month", "year"];
                                break;
                            case "yyyy/mm/dd":
                                orderDate = ["year", "month", "day"];
                                break;
                            default:
                                orderDate = ["year", "month", "day"];
                                window.console.log("date format not supported: " + dateFormat);
                                break;
                        }
                        currentCol.editor = {
                            // Set the type pof editor
                            "type": "date",
                            // Options related to the date editor
                            options: {
                                // Order of the field to be displayed
                                orderDate: orderDate,
                                savedOrderDate: orderDate,
                                // Separator between the fields shown
                                separator: "/",
                                // Separator which the value is saved
                                saveSeparator: "/"
                            }
                        };

                        currentCol.validator = dateValidator;
                        break;
                    case "Image":
                        

                        currentCol.popoverConfig = {
                            "header": "Image Selector",
                            "popoverType": "complex",
                            "searchEvent": "onKeyup",// onEnterKey
                            "searchDelay": 300,
                            "noResultsMsg": "No results found that match with search term.",
                            "defaultList": getImageList(),
                            "onSearch": function (query) {
                                window.console.info("Searching for ", query);

                                const resultList = getImageList(query);

                                if (resultList.length < 2) {
                                    this.showNoResultsMsg();
                                } else {
                                    this.setResults(resultList);
                                    $(".gs-popover-complex .table-container .table-results td").css("width", "50%");
                                }
                            },
                            "onSelectItem": function (optionSelected, item) {
                                window.console.info("Item Selected: ", optionSelected, item);

                                var _self = this;

                                _self.showSpinner();

                                setTimeout(function () {
                                    _self.updateValue("morningstar_category primary benchmark", optionSelected);
                                    _self.hideSpinner();
                                    _self.dismiss();
                                }, 3000);

                            },
                            "onDestroy": function () {
                                window.console.warn("Component will be destroyed!");
                            },
                            "onInit": function () {
                                window.console.info("Initializing component...");
                                //set all td width's to 50% in the result table
                                setTimeout(function () {
                                    $(".gs-popover-complex .table-container .table-results td").css("width", "50%");
                                }, 100);
                            }
                        };
                        break;
                    case "Dropdown":
                        var referenceValues = column.get("reference");
                        var defaultList;
                        //split by | first to get items, then by ~ to separate id from value
                        defaultList = _.map(referenceValues.split("|"), (referenceValue) =>  {
                            if (referenceValue.indexOf("~") > -1) {
                                var item = referenceValue.split("~");
                                return {
                                    id: item[0],
                                    label: item[1]
                                };
                            } else {
                                return {
                                    id: referenceValue,
                                    label: referenceValue
                                };
                            }
                        });

                        // Activate the editor for this column
                        currentCol.editor = {
                            // Set the type of the editor to be a dropdown
                            "type": "dropdown",
                            // Options related to the dropdown editor
                            "options": {
                                // Array of options to start with
                                "optionsList": function () {
                                    return defaultList;
                                },
                                // callback that adjust the results positions
                                "adjustListPosition": function (positionConfig) {
                                    positionConfig.top = positionConfig.top + 25;
                                    return positionConfig;
                                },
                                // callback when selecting a listed option
                                "onSelectedOption": function (valueSelected, rowId, colId) {

                                    //updatedStorage[rowId] = parseInt(valueSelected);

                                    window.console.info("valueSelected", valueSelected);
                                    window.console.info("rowId", rowId);
                                    window.console.info("colId", colId);
                                }
                            }
                        };
                        break;
                    case "RichText":
                        currentCol.editor = RichTextEditor;
                        currentCol.modalService = self.get("modal");
                        break;
                    case "Table":
                        //TODO custom editor
                        window.console.log("Column editor not implemented for Table: " + field);
                        break;
                    default:
                        //don't set the editor
                        window.console.log("Column editor not implemented for field: " + field);
                        break;
                }

                columns.push(currentCol);

                fieldDefinitions[field] = column.get("dataPointName");

			}),
		}

		return {"columns": columns, "fieldDefinitions" : fieldDefinitions};
	},

});