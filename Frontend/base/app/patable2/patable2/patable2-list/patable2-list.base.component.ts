import { Patable2Service } from '../patable2.service';
import { Patable2Base} from '../patable2.base.model';
import { Directive, EventEmitter, Input, Output, SecurityContext, inject } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AppUtilBaseService } from '@baseapp/app-util.base.service';
import { TranslateService } from '@ngx-translate/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ChangeLogsComponent } from '@libsrc/change-logs/change-logs.component'

import { Patable2ApiConstants } from '@baseapp/patable2/patable2/patable2.api-constants';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationPopupComponent } from '@libsrc/confirmation/confirmation-popup.component';
import { FormControl, FormGroup, Validators, AbstractControl, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ElementRef, Renderer2, ViewChild } from '@angular/core';
import { debounceTime, fromEvent, catchError, combineLatest, distinctUntilChanged, of, Observer, forkJoin, Subscription, map, Observable, Subject } from 'rxjs';
import { environment } from '@env/environment';
import { Filter } from '@baseapp/vs-models/filter.model';
import { AppConstants } from '@app/app-constants';
import { AppGlobalService } from '@baseapp/app-global.service';
import { GridComponent } from '@libsrc/grid/grid.component';
import { Location } from '@angular/common';
import { BaseService } from '@baseapp/base.service';

@Directive(
{
	providers:[MessageService, ConfirmationService, DialogService, DynamicDialogConfig]
}
)
export class Patable2ListBaseComponent{
	
	
	quickFilter: any;
hiddenFields:any = {};
quickFilterFieldConfig:any={}
	
showAdvancedSearch: boolean = false;

tableSearchFieldConfig:any = {};
@ViewChild('toggleButton')
  toggleButton!: ElementRef;
  @ViewChild('menu')
  menu!: ElementRef;
 filtersApplied:boolean = false;

	  selectedValues: any[] = [];
  filter: Filter = {
    globalSearch: '',
    advancedSearch: {},
    sortField: null,
    sortOrder: null,
    quickFilter: {}
  };
params: any;
isMobile: boolean = AppConstants.isMobile;

  gridData: Patable2Base[] = [];
  totalRecords: number = 0;
  subscriptions: Subscription[] = [];
 multiSortMeta:any =[];
 selectedColumns:any =[];
subHeader: any;
  autoSuggest: any;
  query: any;

rightFreezeColums:any;
total:number =0;
inValidFields:any = {};
selectedItems:any ={};
scrollTop:number =0;
isRowSelected: boolean = false;
isPrototype = environment.prototype;
  workFlowEnabled = false;
isList = true;
isPageLoading:boolean = false;
autoSuggestPageNo:number = 0;
complexAutoSuggestPageNo:number = 0
localStorageStateKey = "patable2-list";
showMenu: boolean = false;
conditionalActions:any ={
  disableActions:[],
  hideActions:[]
}
actionBarConfig:any =[];
first: number =0;
rows: number = 0;
updatedRecords:Patable2Base[] = [];
showPaginationOnTop = AppConstants.showPaginationonTop;
 showPaginationOnBottom = AppConstants.showPaginationonBottom;
 tableFieldConfig:any ={};
dateFormat: string = AppConstants.calDateFormat;
selectedRowId: any = '';
 showWorkflowSimulator:boolean = false;
 gridConfig: any = {};
  @ViewChild(GridComponent)
  public gridComponent: any = GridComponent;
separator = "__";
timeFormatPrimeNG: string = AppConstants.timeFormatPrimeNG;
dateFormatPrimeNG: string = AppConstants.dateFormatPrimeNG ;
minFraction = AppConstants.minFraction;
maxFraction = AppConstants.maxFraction;
currency = AppConstants.currency;
currencyDisplay = AppConstants.currencyDisplay;
 responseData:any =[];
defaultActions= ['save','cancel','delete','refresh','back','changelog','workflowhistory','import','export','new'];
queryViewList:boolean = false; // dynamic Variable has to be updated here
showonFilter:boolean = false;
selectedRows:any =[];
@Input() filters:any ={};
@Input() componentId:string ='';
@Input() mapData:any ={};
@Input() dynamicDialogConfigFromDetailPage: any = {};
priorGridParams:any ={};
queryViewFiltersApplied: boolean = false;
 gridEmptyMsg: string = '';
holdFilters:string[] =[];
defaultFilters:string[]=[];
defaultFilterSettings:any={};
@Input() mapConfig:any = {};
filtersFromParent:any ={};
hasMappedParameters:boolean = false;
@Input() existingFormDataFromParent:any = {};
@Input() existingFormId:string ='';
@Input() fromDetailPage:boolean = false;
@Output() onBeforeValidationEmitter: EventEmitter<any> = new EventEmitter();
@Input() standardGrid:boolean = false;
	isSearchFocused:boolean = false;
showBreadcrumb = AppConstants.showBreadcrumb;
mappedFiltersDisplay:any ={};
tooltipText:string =''

	isChildPage:boolean = false;
	showGrid:boolean = true;

	
	leftActionBarConfig : any = {
  "children" : [ {
    "visibility" : "show",
    "buttonStyle" : "curved",
    "icon" : {
      "type" : "icon",
      "icon" : {
        "label" : "fas fa-arrow-left",
        "value" : "fas fa-arrow-left"
      }
    },
    "confirmationText" : "confirm",
    "label" : "BACK",
    "type" : "button",
    "beforeAction" : "none",
    "outline" : false,
    "buttonType" : "icon_on_left",
    "showOn" : "both",
    "enableOnlyIfRecordSelected" : false,
    "buttonId" : "BackbuttonId0",
    "buttonEnabled" : "yes",
    "action" : "back",
    "confirmationTitle" : "confirmation",
    "fields" : [ ],
    "confirmationButtonText" : "yes",
    "cancelButtonText" : "no"
  }, {
    "visibility" : "show",
    "buttonStyle" : "curved",
    "confirmationText" : "confirm",
    "label" : "NEW",
    "type" : "button",
    "beforeAction" : "none",
    "outline" : false,
    "buttonType" : "icon_on_left",
    "showOn" : "both",
    "enableOnlyIfRecordSelected" : false,
    "buttonId" : "NewbuttonId1",
    "buttonEnabled" : "yes",
    "action" : "new",
    "confirmationTitle" : "confirmation",
    "fields" : [ ],
    "confirmationButtonText" : "yes",
    "cancelButtonText" : "no"
  }, {
    "visibility" : "show",
    "buttonStyle" : "curved",
    "icon" : {
      "type" : "icon",
      "icon" : {
        "label" : "fas fa-trash-alt",
        "value" : "fas fa-trash-alt"
      },
      "iconColor" : "#000000",
      "iconSize" : "13px"
    },
    "confirmationText" : "confirm",
    "label" : "DELETE",
    "type" : "button",
    "beforeAction" : "none",
    "outline" : false,
    "buttonType" : "icon_only",
    "showOn" : "both",
    "enableOnlyIfRecordSelected" : false,
    "buttonId" : "DeletebuttonId2",
    "buttonEnabled" : "yes",
    "action" : "delete",
    "confirmationTitle" : "confirmation",
    "fields" : [ ],
    "confirmationButtonText" : "yes",
    "cancelButtonText" : "no"
  }, {
    "visibility" : "show",
    "buttonStyle" : "curved",
    "icon" : {
      "type" : "icon",
      "icon" : {
        "label" : "fas fa-sync",
        "value" : "fas fa-sync"
      },
      "iconColor" : "#000000",
      "iconSize" : "13px"
    },
    "confirmationText" : "confirm",
    "label" : "REFRESH",
    "type" : "button",
    "beforeAction" : "none",
    "outline" : false,
    "buttonType" : "icon_only",
    "showOn" : "both",
    "enableOnlyIfRecordSelected" : false,
    "buttonId" : "RefreshbuttonId3",
    "buttonEnabled" : "yes",
    "action" : "refresh",
    "confirmationTitle" : "confirmation",
    "fields" : [ ],
    "confirmationButtonText" : "yes",
    "cancelButtonText" : "no"
  } ],
  "type" : "actionBar"
}
	rightActionBarConfig : any = {
  "type" : "actionBar"
}
	tableSearchConfig : any = {
  "outline" : false,
  "disabledFieldsByLookup" : [ ],
  "children" : [ {
    "fieldName" : "field1",
    "data" : "",
    "field" : "field1",
    "name" : "field1",
    "uiType" : "text",
    "isPrimaryKey" : true,
    "label" : "FIELD1",
    "type" : "searchField",
    "fieldType" : "string",
    "fieldId" : "field1"
  } ],
  "columns" : "1",
  "type" : "tableSearch",
  "showAdvancedSearch" : true,
  "queryViewMapping" : { }
}
	quickFilterConfig : any = {
  "outline" : false,
  "disabledFieldsByLookup" : [ ],
  "children" : [ ],
  "type" : "quickFilter",
  "queryViewMapping" : { }
}
	defaultFilterConfig : any = {
  "children" : [ ]
}
	customRenderConfig : any = {
  "children" : [
     ]
}
	tableConfig : any = {
  "rightFreezeFromColumn" : "0",
  "currentNode" : "TABLE",
  "columnReorder" : false,
  "type" : "grid",
  "showDetailPageAs" : "navigate_to_new_page",
  "rowGroup" : "yes",
  "outline" : false,
  "children" : [ {
    "fieldName" : "field1",
    "data" : "",
    "formatDisplay" : false,
    "showOnMobile" : false,
    "isPrimaryKey" : true,
    "label" : "FIELD1",
    "type" : "gridColumn",
    "showLabel" : false,
    "field" : "field1",
    "labelPosition" : "top",
    "name" : "field1",
    "uiType" : "text",
    "fieldType" : "string",
    "fieldId" : "field1"
  }, {
    "fieldName" : "field2",
    "data" : "",
    "formatDisplay" : false,
    "showOnMobile" : false,
    "isPrimaryKey" : false,
    "label" : "FIELD2",
    "type" : "gridColumn",
    "showLabel" : false,
    "field" : "field2",
    "labelPosition" : "top",
    "name" : "field2",
    "uiType" : "text",
    "fieldType" : "string",
    "fieldId" : "field2"
  }, {
    "fieldName" : "field3",
    "data" : "",
    "formatDisplay" : false,
    "showOnMobile" : false,
    "isPrimaryKey" : false,
    "label" : "FIELD3",
    "type" : "gridColumn",
    "showLabel" : false,
    "field" : "field3",
    "labelPosition" : "top",
    "name" : "field3",
    "uiType" : "text",
    "fieldType" : "string",
    "fieldId" : "field3"
  } ],
  "valueChange" : true,
  "toggleColumns" : false,
  "sorting" : "single_column",
  "rowSpacing" : "medium",
  "rowHeight" : "medium",
  "striped" : true,
  "recordSelection" : "multiple_records",
  "infiniteScroll" : false,
  "inlineEditing" : false,
  "viewAs" : "list",
  "hoverStyle" : "box",
  "tableStyle" : "style_2",
  "detailPagePopupWidth" : 70,
  "pageLimit" : "50",
  "leftFreezeUptoColumn" : "0",
  "detailPageMapping" : [ ],
  "rememberLastTableSettings" : false,
  "columnResize" : false,
  "showGridlines" : false,
  "sortOrder" : "asc",
  "detailPage" : {
    "sid" : "8d2cb9ad-9a3d-4870-a849-65dc15223b24",
    "name" : "paTable2 Detail",
    "url" : "/patable2/patable2detail"
  },
  "detailPageNavigation" : "click_of_the_row"
}
	pageViewTitle: string = 'PATABLE2_LIST';
	
	public patable2Service = inject(Patable2Service);
public appUtilBaseService = inject(AppUtilBaseService);
public translateService = inject(TranslateService);
public messageService = inject(MessageService);
public confirmationService = inject(ConfirmationService);
public dialogService = inject(DialogService);
public domSanitizer = inject(DomSanitizer);
public activatedRoute = inject(ActivatedRoute);
public renderer2 = inject(Renderer2);
public router = inject(Router);
public appGlobalService = inject(AppGlobalService);
public baseService = inject(BaseService);
public location = inject(Location);
		tableSearchControls : UntypedFormGroup = new UntypedFormGroup({
	field1: new UntypedFormControl('',[]),
});

		quickFilterControls : UntypedFormGroup = new UntypedFormGroup({
});


	
	filterSearch() {
    this.quickFilterControls.valueChanges.pipe(debounceTime(300), distinctUntilChanged()).subscribe((value) => {
      if (!this.appUtilBaseService.isEqualIgnoreCase(this.quickFilterControls.getRawValue(), this.filter.quickFilter, [], true)) {
        let filterVals = { ...this.quickFilterControls.getRawValue() };

        const hasDates = this.quickFilterConfig.children.filter((e: any) =>
          e.fieldType.toLowerCase() === "date" || e.fieldType.toLowerCase() === "datetime"
        );

        if (hasDates.length > 0) {
          this.handleDateFields(hasDates, filterVals, this.quickFilterControls.getRawValue());
        }

        const hasNumbers = this.quickFilterConfig.children.filter((e: any) =>
          e.fieldType.toLowerCase() === "number" || e.fieldType.toLowerCase() === "double"
        );

        if (hasNumbers.length > 0) {
          this.handleNumberFields(hasNumbers, filterVals, this.quickFilterControls.getRawValue());
        }

        this.filter.quickFilter = filterVals;
        //if(this.quickFilterControls.dirty)
        this.onRefresh(false,true);
      }
    });
  }
	updateActions() {
        this.actionBarConfig = this.appUtilBaseService.getActionsConfig(this.leftActionBarConfig.children) ||[];
        this.actionBarConfig?.forEach((actionConfig: any) => {
            if (actionConfig && actionConfig.visibility === 'conditional' && actionConfig.conditionForButtonVisiblity) {
                const conResult = this.appUtilBaseService.evaluvateCondition(actionConfig.conditionForButtonVisiblity?.query?.rules, actionConfig.conditionForButtonVisiblity?.query?.condition);
                this.validateActions(actionConfig.buttonId, conResult, 'view');
            }
            if (actionConfig && actionConfig.buttonEnabled === 'conditional' && actionConfig.conditionForButtonEnable) {
                const conResult = this.appUtilBaseService.evaluvateCondition(actionConfig.conditionForButtonEnable?.query?.rules, actionConfig.conditionForButtonEnable?.query?.condition);
                this.validateActions(actionConfig.buttonId, conResult, 'edit');
            }
        })
    }
    validateActions(label: string, result: boolean, action: string) {
        if (action === 'view') {
            if (result && this.conditionalActions.hideActions.includes(label))
                this.conditionalActions.hideActions?.splice(this.conditionalActions.hideActions?.indexOf(label), 1)
            else if (!result && !this.conditionalActions.hideActions.includes(label))
                this.conditionalActions.hideActions.push(label);
        }
        else if (action === 'edit') {
            if (result && this.conditionalActions.disableActions.includes(label))
                this.conditionalActions.disableActions.splice(this.conditionalActions.disableActions?.indexOf(label), 1);
            else if (!result && !this.conditionalActions.disableActions.includes(label))
                this.conditionalActions.disableActions.push(label);
        }
    }
  disablechildAction(pid?:any) {
      const value: any = "parentId";
      let property: Exclude<keyof Patable2ListBaseComponent, ' '> = value;
      if (!this.mapConfig[this.componentId]) {
      const parentId = this[property] || pid;
      this.leftActionBarConfig?.children?.map((ele: any) => {
        if (ele?.action === 'new' && !parentId && this.isChildPage && ele.buttonEnabled != 'conditional') {
          ele.buttonEnabled = 'no';
        }
        else if (ele.action === 'new' && parentId && this.isChildPage && ele.buttonEnabled != 'conditional') {
          ele.buttonEnabled = 'yes';
        }
      })
    }
      }
	clearFilters(){
  this.filter.globalSearch = '';
  this.isSearchFocused = false;
}

focus(){
  this.isSearchFocused = !this.isSearchFocused;
}
	resolvecustomFilters(fieldconfig:any,key:string,defaultFilterSetting:any){

  }
	patchControlValue(control: AbstractControl | null, defaultValue: any, field: any) {
    if (control instanceof FormGroup && typeof defaultValue !== 'string') {
      if (field.uiType == 'date' || field.uiType == 'datetime') {
        control.patchValue({
          min: defaultValue[0] ? new Date(defaultValue[0]): null,
          max: defaultValue[1] ? new Date(defaultValue[1]) : null,
        }, { emitEvent: false });
      } else {
        control.patchValue({
          min: defaultValue[0],
          max: defaultValue[1],
        }, { emitEvent: false });
      }
    } else if (typeof defaultValue === 'string') {
      defaultValue = this.getSpecialDateValue(defaultValue.toLowerCase(),field) || defaultValue;
      control?.patchValue(defaultValue, { emitEvent: false });
    } else {
      control?.patchValue(defaultValue, { emitEvent: false });
    }
  }
	applyQueryViewFilters(params: any, searchDataValues: string[]) {
    const mandatoryFilters = this.checkMandatoryFilters();
    const missingFilters = mandatoryFilters.filter(filter => !searchDataValues.includes(filter));
  
    if (this.queryViewList) {
      if (mandatoryFilters.length > 0) {
        if (searchDataValues.length === 0) {
          this.queryViewFiltersApplied = false; // No search data provided, so hide records
        } else if (missingFilters.length === 0) {
          this.queryViewFiltersApplied = true; // All mandatory filters are present in searchData
        } else {
          this.queryViewFiltersApplied = false; // Some mandatory filters are missing in searchData
          console.log("Mandatory filters missing in searchData:", missingFilters);
        }
      } else {
        this.queryViewFiltersApplied = true;
      }
    }
 
  }
	resetQuickFilterValues() {
    for (const key in this.quickFilterFieldConfig) {
      if (this.quickFilterFieldConfig.hasOwnProperty(key)) {
        if (!this.defaultFilters.includes(key)) {
          this.quickFilterControls.get(key)?.reset();
        }
      }
    }
    this.initFilterForm(true);
  }
	onUpdate(id: any, event?: any, data?: any) {
    if (!this.tableConfig.detailPage?.url) return;
    const value: any = "parentId";
    let property: Exclude<keyof Patable2ListBaseComponent, '' > = value;
    const methodName: any = "onUpdateChild";
    let action: Exclude<keyof Patable2ListBaseComponent, '' > = methodName;
    if (this.isChildPage && this[property]) {
      if (typeof this[action] === "function") {
        this[action](id);
      }
    } else {
      if(this.fromDetailPage) {
        this.onBeforeValidationEmitter.emit({
          data: this.tableConfig.showDetailPageAs,
          parentCallbackFunction: ((parentObj: any) => {
            if (parentObj == 'true') {
               this.router.navigateByUrl(this.tableConfig.detailPage.url + '?id=' + id)
            }
          })
        });
      } else {
         this.router.navigateByUrl(this.tableConfig.detailPage.url + '?id=' + id)
      }
    }
  }
	handleNumberFields(hasNumbers: any[], filterVals: any, value: any) {
  hasNumbers.forEach((f: any) => {
     const field = f.name || f?.detailField;
      const numberValue = value[field];

      if (numberValue && typeof numberValue === 'object' && !Array.isArray(numberValue)) {
          filterVals[field] = {
              lLimit: numberValue.min,
              uLimit: numberValue.max,
              type: "Number"
          };

          if (numberValue.min == null && numberValue.max == null) {
              delete filterVals[field];
          }
      }
  });
}
	addCustomFilters(){}
	convertDateToString(date: Date): string {
  return date.getFullYear() + '-' + this.leftPad((date.getMonth() + 1), 2) + '-' + this.leftPad(date.getDate(), 2);
}
	manipulateOutputData(res: any): void {
    
  }
	onNew() {
    if (!this.tableConfig.detailPage?.url) return;
      let queryParams: any = {}
if (this.holdFilters.length > 0) {
  this.holdFilters.forEach((filter: string) => {
    const control = this.quickFilterControls.get(filter);
   if (!(control instanceof FormGroup)) {
          if (this.quickFilterControls.get(filter)?.value || this.filtersFromParent[filter]) {
            const fieldConfig = this.quickFilterFieldConfig?.[filter];
            const parentField = fieldConfig?.parentField;
            const controlValue = this.quickFilterControls?.get(filter)?.value;
            if (
              fieldConfig?.uiType === 'autosuggest' &&
              parentField &&
              controlValue?.[parentField] != null
            ) {
              queryParams[filter] = controlValue[parentField];
            }
            else {
              queryParams[filter] = this.quickFilterControls.get(filter)?.value || this.filtersFromParent[filter];
            }
          }
        }
  })
}
    const value: any = "parentId";
    let property: Exclude<keyof Patable2ListBaseComponent, '' > = value;
    if (this.isChildPage && this[property]) {
      const methodName: any = "onNewChild";
      let action: Exclude<keyof Patable2ListBaseComponent, '' > = methodName;
      if (typeof this[action] == "function") {
        this[action](queryParams);
      }
    }
    else {
      if(this.fromDetailPage) {
        this.onBeforeValidationEmitter.emit({
          data: this.tableConfig.showDetailPageAs,
          parentCallbackFunction: ((parentObj: any) => {
            if (parentObj == 'true') {
                  this.appUtilBaseService.navigateWithQueryParams(queryParams, this.tableConfig.detailPage?.url);
            }
          })
        });
      } else {
            this.appUtilBaseService.navigateWithQueryParams(queryParams, this.tableConfig.detailPage?.url);
      }
    }
  }
	actionBarAction(btn: any) {
    const methodName: any = (`on` + btn.action.charAt(0).toUpperCase() + btn.action.slice(1));
    let action: Exclude<keyof Patable2ListBaseComponent, ' '> = methodName;
   const config = this.getButtonConfig(btn);
    if (btn.action === 'navigate_to_page' && btn.pageName?.url) {
      this.router.navigateByUrl(btn.pageName.url);
    }
else if(this.defaultActions.includes(btn.action) && typeof this[action] === "function"){
      this[action]();
    }
    else if (typeof this[action] === "function" && (btn.beforeAction ==='show_confirmation' || btn.beforeAction === 'get_additional_info')) {
      this.showConfirmationPopup(config,btn);
    }
    else if (typeof this[action] === "function"){
      this[action]();
    }
  }

  showConfirmationPopup(config: any, btn: any) {
     const methodName: any = (`on` + btn.action.charAt(0).toUpperCase() + btn.action.slice(1));
    let action: Exclude<keyof Patable2ListBaseComponent, ' '> = methodName;
    const confirmationReference = this.dialogService.open(ConfirmationPopupComponent, {
      header: config.confirmationTitle,
      width: '30%',
      contentStyle: { "max-height": "500px", "overflow": "auto" },
      styleClass: "confirm-popup-modal",
      showHeader: true,
      closable: true,
      data: {
        config: config,
      }
    });
    confirmationReference.onClose.subscribe((result: any) => {
      if (result) {
        if (typeof this[action] === "function") {
          this[action](result);
        }
      }
    })
  }
	disableNewAction() {
    this.leftActionBarConfig?.children?.map((ele: any) => {
      if (ele?.action === 'new' && this.mapConfig[this.componentId]?.length > 0 && !this.existingFormId && ele.buttonEnabled != 'conditional') {
        ele.buttonEnabled = 'no';
      }
      else if (ele.action === 'new' && this.mapConfig[this.componentId]?.length > 0 && this.existingFormId &&  ele.buttonEnabled != 'conditional') {
        ele.buttonEnabled = 'yes';
      }
    })
  }
	checkIfScrollbarVisible() {
    const element: any = document.getElementById(this.localStorageStateKey);
    if (element) {
      const isScrollable = element.scrollWidth > element.clientWidth;
      if (!isScrollable) { return false }
    }; 
    return true;
  }
	getDefaultFilterValues(fromSearch: boolean): any {
    // Process filters
    let searchData: any = {};
    let mapper: any = {};
    if (fromSearch) {
      if (this.filters[this.componentId]) {
        this.mapFields(searchData, this.filters[this.componentId], this.mapData, 'tableField', 'lookupField');
      }
    }
    else {
      // Process mapConfig
      if (this.mapConfig[this.componentId]) {
        this.mapFields(mapper, this.mapConfig[this.componentId], this.mapData, 'detailField', 'listField',true);
      }
    }
    return { searchData: searchData, mapper: mapper } || {};
  }
	updateTooltipText(): void {
    const keyValuePairs = Object.entries(this.mappedFiltersDisplay)
      .map(([key, value]) => `${key} : ${value}`)
      .join(', ');
    this.tooltipText = `(${keyValuePairs})`;
  }
	getDefaultSearchParams(){
    const searchData:any ={};
    if(this.filters[this.componentId]?.length > 0){
      this.filters[this.componentId].forEach((keys:any)=>{
        if(this.mapData[keys.tableField])
          searchData[keys.field] = this.mapData[keys.tableField]
      })
    }
    return searchData;
  }
	clearGlobalSearch(){
  this.filter.globalSearch = '';
  this.onRefresh();
}
	handleDateFields(hasDates: any[], filterVals: any, value: any, fromDefault?:boolean) {
    hasDates.forEach((f: any) => {
      const field = fromDefault ? f?.listField : f.name;
      const dateVal = fromDefault ? value[f?.detailField] : value[field];
      let val: any = {};

      if (!dateVal) {
        delete filterVals[field];
        return;
      }

      const findUiType = (field: any) => {
        const found = hasDates.find(item => item.listField === field && item.uiType =='date');
        return found ? found.uiType : null;
      };

      if (Array.isArray(dateVal)) {
        val = this.getDateRangeVal(field, dateVal);
        filterVals[field] = val;

        if (dateVal[0] == null && dateVal[1] == null) {
          delete filterVals[field];
        }
      } else if (typeof dateVal === 'object') {
        if (this.quickFilterFieldConfig[field]?.uiType === 'date' || findUiType(field)) {
          let tempDate1 = null;
          let tempDate2 = null;
          const createDate = (dateValue: any, isEndOfDay: boolean) => {
            if (dateValue !== undefined && dateValue !== null) {
              const tempDate = new Date(dateValue);
              if (isEndOfDay) {
                tempDate.setHours(23, 59, 59, 999); // Set to end of day
              } else {
                tempDate.setHours(0, 0, 0, 0); // Set to midnight
              }
              return tempDate;
            }
            return null;
          };
          tempDate1 = createDate(dateVal.hasOwnProperty('min') ? dateVal.min : dateVal, false);
          tempDate2 = createDate(dateVal.hasOwnProperty('max') ? dateVal.max : dateVal, true);
          val = {
            lLimit: tempDate1 ? tempDate1.getTime() : null,
            uLimit: tempDate2 ? tempDate2.getTime() : null,
            type: "Date"
          };
        } else {
          if(fromDefault)
          val = { lLimit: null, uLimit: dateVal ? new Date(dateVal).getTime() : null, type: "Date" };
          else
          val = { lLimit: new Date(dateVal.min).getTime(), uLimit: dateVal.max ? new Date(dateVal.max).getTime() : null, type: "Date" };
        }
        if (val.lLimit || val.uLimit) {
          filterVals[field] = val;
        }
        if (!val.lLimit && !val.uLimit) {
          delete filterVals[field];
        }
      }
    });
  }
	onDelete() {
    if (this.selectedValues.length > 0) {
      let requestedParams: any = { ids: this.selectedValues.toString() }
      this.confirmationService.confirm({
        message: this.translateService.instant('ARE_YOU_SURE_THAT_YOU_WANT_TO_DELETE_THE_SELECTED_RECORDS_QUESTION'),
        header: this.translateService.instant('CONFIRMATION'),
        icon: 'pi pi-info-circle',
        accept: () => {
          const deleteSubscription = this.patable2Service.delete(requestedParams).subscribe((res: any) => {
            this.showToastMessage({ severity: 'success', summary: '', detail: this.translateService.instant('RECORDS_DELETED_SUCCESSFULLY') });
            requestedParams = {};
            this.selectedValues = [];
            this.isRowSelected = false;
            this.actionButtonEnableDisable();
            this.onRefresh(true);

          });
          this.subscriptions.push(deleteSubscription);
        },
        reject: () => {
          
        },
      });
    }

  }
	getDisabled(formControl: FormGroup, ele: string) {
  const parent = ele.split('?.')[0];
  if (formControl.controls[parent] instanceof FormGroup){
    return formControl.get(ele)?.disabled
  }
  else
    return formControl.controls[parent].disabled;
}
	getListofServicesTobeFired(): Observable<any[]> {
    return new Observable(observer => {
      const config = { ...this.quickFilterFieldConfig };
      let autosuggestConfig: any = {}
      const data = this.quickFilterControls.getRawValue();
      const tempUrl: any = [];
      const observables: Observable<any>[] = [];

      for (const property in config) {
        if (config[property].uiType !== 'autosuggest' || !config[property].isCustom || !data[property]) continue;
        tempUrl.push({
          serviceName: config[property].autoSuggestServiceName,
          url: config[property].lookupUrl,
          field: config[property].name
        });
      }
      tempUrl.filter((obj: { id: any; }, index: any, self: any[]) =>
        index === self.findIndex((o: { id: any; }) => o.id === obj.id)
      );

      tempUrl?.map((o: any) => {
        const urlObj = {
          url: o.url,
          searchText: '',
          colConfig: config[o.field],
          value: data,
          pageNo: 0
        };
        autosuggestConfig[o.field] = config[o.field];
        urlObj.url = this.appUtilBaseService.generateDynamicQueryParams(urlObj);

        const observable = this.baseService.get(urlObj).pipe(
          catchError((error: any) => {
            console.error('An error occurred:', error);
            return of(null);
          })
        );
        observables.push(observable);
      });
      if (observables.length > 0) {
        const sub = forkJoin(observables).subscribe((responses: any[]) => {
          responses.forEach((res: any, index: number) => {
            const property = Object.keys(autosuggestConfig)[index];
            const con = autosuggestConfig[property];
            if (!res || res.length <= 0) return; // Skip processing if there was an error
            const tempDisplay: any[] = [];
            const filteredResponse = res[0] || {};
            con.displayFields?.forEach((obj: any) => tempDisplay.push(filteredResponse[obj.name]));
            filteredResponse['displayField'] = tempDisplay.join('_');
            this.quickFilterControls.get(property)?.patchValue(filteredResponse);
            // this.data[property] = filteredResponse;
          });
          observer.next(responses); // Emit the responses
          observer.complete(); // Complete the observable
        });
        this.subscriptions.push(sub);
      } else {
        observer.next([]);
        observer.complete();
      }
    });
  }
	setGridEmptyMessage(searchDataValues: string[], missingMapConfigFields: string[]) {
    const mandatoryFilters = this.checkMandatoryFilters();
    const missingFilters = mandatoryFilters.filter(filter => !searchDataValues.includes(filter));

    // Check for missing map config fields first
    if (this.mapConfig[this.componentId]?.length > 0) {
      if (missingMapConfigFields.length > 0)
        this.gridEmptyMsg = `To view the records, please fill in the field(s) : ${missingMapConfigFields.join(', ').replace(/,(?=[^,]*$)/, ', and')}.`;
      else
        this.gridEmptyMsg = 'No Data Available';
    }
    // Then check for missing mandatory filters
    else if (!this.queryViewFiltersApplied && this.showonFilter && this.queryViewList) {
      let missingParams = missingFilters.join(', ').replace(/,(?=[^,]*$)/, ', and');
      this.gridEmptyMsg = `Unable to display any records. The query is missing mandatory parameters: ${missingParams}. Please ensure these parameters are provided for the view to display records.`;
      console.log("Mandatory fields without user interaction:", missingFilters);
    }
    // Default message if no data is available
    else {
      this.gridEmptyMsg = 'No Data Available';
    }
  }
	onOperatorSelect(fieldConfig: any) {
    let operator = fieldConfig?.operator || 'has';
    if (fieldConfig?.operator == 'is equal to' || fieldConfig?.operator == 'is empty' || fieldConfig?.uiType == 'select') {
      operator = '=';
    }
    return operator;
  }
	clearAllFilters() {
  this.filter.globalSearch = '';
  this.clearFilterValues();
}
	toShowRecords(params?: any) {
    let searchDataValues = Object.keys(params?.search || {});
    let mapFields = Object.keys(params?.mapper || {});
  
    const mapConfigFields = this.mapConfig[this.componentId]?.map((config: { listField: any }) => config.listField) || [];
    const missingMapConfigFields = mapConfigFields.filter((field: string) => !mapFields.includes(field));
  
    this.showonFilter = this.queryViewList ||  (this.standardGrid && mapConfigFields.length >0 && this.fromDetailPage);
  
    this.applyQueryViewFilters(params, searchDataValues);
    this.applyMapConfigFilters(params, mapFields, missingMapConfigFields);
  
    // Set the grid empty message based on the filter checks
    this.setGridEmptyMessage(searchDataValues,missingMapConfigFields);
  
    // Update gridConfig with the appropriate empty table message
    this.gridConfig['emptyTableMsg'] = this.gridEmptyMsg;
    this.gridConfig['parentId'] = this.getParentId();
  }
	getInputParams() {
    return {}
  }
	getSpecialDateValue(value: string, config: any): { min: Date, max: Date } | Date | null {
    const now = new Date();
    if (value === 'today') {
      if (config.uiType === 'datetime') {
        const min = new Date(now.setHours(0, 0, 0, 0));
        const max = new Date(now.setHours(23, 59, 59, 999));
        return { min, max };
      }
      return new Date(now.setHours(0, 0, 0, 0));
    } else if (value === 'tomorrow') {
      if (config.uiType === 'datetime') {
        const min = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0, 0);
        const max = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 23, 59, 59, 999);
        return { min, max };
      }
      return new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0, 0);
    }
    return null;
  }
	getMappedFilters(): void {
    const componentConfig = this.mapConfig[this.componentId];
    const value: any = "parentId";
   let property: Exclude<keyof Patable2ListBaseComponent, ' '> = value;
       this.showGrid = (
      (componentConfig?.length >= 0 && !!this.existingFormId) ||
      !!this.queryViewList ||
      !this.fromDetailPage ||
      !!this.isChildPage
    );
    if (!componentConfig) {
      return;
    }
    componentConfig.forEach((filter: any) => {
      const label = filter?.label
        ? this.translateService.instant(filter.label)
        : filter.listField;
      if (label && filter.viewInPages) {
        const formattedText = this.mapData[filter.detailField] ? this.appUtilBaseService.formatRawDatatoRedableFormat(filter, this.mapData[filter.detailField], '', true) : this.mapData[filter.detailField];
        this.mappedFiltersDisplay[label] = formattedText;
      }
      if (filter.holdFilterValue) {
        if (!this.holdFilters.includes(filter.listField)) {
          this.holdFilters.push(filter.listField);
        }
        this.filtersFromParent[filter.listField] = this.mapData[filter.detailField];
      }
    });
   Object.keys(this.mappedFiltersDisplay).forEach(key => {
      const value = this.mappedFiltersDisplay[key];
      if (value === "" || value === undefined || value === null) {
        delete this.mappedFiltersDisplay[key];
      }
    });
   this.updateTooltipText();
  }
	getDateRangeVal(field: any, dateVal: any[]): any {
  const tempDate1 = new Date(dateVal[0]);
  const tempDate2 = new Date(dateVal[1]);
  const convertedDate1 = this.convertDateToString(tempDate1);
  const convertedDate2 = this.convertDateToString(tempDate2);

  return this.quickFilterFieldConfig[field].uiType === 'date'
      ? { lLimit: convertedDate1 ? new Date(convertedDate1).getTime() : null, uLimit: dateVal[1] ? new Date(convertedDate2).getTime() : null, type: "Date" }
      : { lLimit: new Date(dateVal[0]).getTime(), uLimit: dateVal[1] ? new Date(dateVal[1]).getTime() : dateVal[1], type: "Date" };
}
	getGridConfig() {
    const self = this;
    this.tableConfig.tableStyle = this.appUtilBaseService.getTableView(this.tableConfig.tableStyle,this.tableConfig.rowSpacing,this.tableConfig.rowHeight)?.tableStyle;
    return {
      data: this.gridData,
      columns: this.getColumns(),
      ajaxUrl: Patable2ApiConstants.getDatatableData,
      select: true,
      colReorder: (String(this.tableConfig?.columnReorder)?.toLowerCase() === 'true'),
     detailPageNavigation: (this.tableConfig?.detailPageNavigation?.toLowerCase() == 'click_of_the_row' ? 'row_click' : (this.tableConfig?.detailPageNavigation?.toLowerCase() == 'click_on_navigate_icon' ? 'row_edit' : '')),
      toggleColumns: (String(this.tableConfig?.toggleColumns)?.toLowerCase() === 'true'),
      paging: !(String(this.tableConfig?.infiniteScroll)?.toLowerCase() === 'true'),
      scrollX: true,
      scrollCollapse: true,
      pageLength: parseInt(String(this.tableConfig?.pageLimit)),
      deferRender: true,
      ordering: true,
      sortField: this.tableConfig.sortField,
      sortOrder: this.tableConfig.sortOrder,
      colResize: (String(this.tableConfig?.columnResize)?.toLowerCase() === 'true'),
      disableSelection: ((this.tableConfig?.recordSelection?.toLowerCase() == 'multiple_records' || this.tableConfig?.recordSelection?.toLowerCase() == 'single_record_only') ? false : true),
      recordSelection: (this.tableConfig?.recordSelection?.toLowerCase() == 'multiple_records' ? 'multi' : (this.tableConfig?.recordSelection?.toLowerCase() == 'single_record_only' ? 'single' : '')),
      bFilter: false,
      enterKeytoSearch: false,
      showGridlines:this.tableConfig.showGridlines,
      striped:this.tableConfig.striped,
      rowSpacing:this.appUtilBaseService.getTableView(this.tableConfig.tableStyle,this.tableConfig.rowSpacing,this.tableConfig.rowHeight)?.rowSpacing,
      rowHeight:this.appUtilBaseService.getTableView(this.tableConfig.tableStyle,this.tableConfig.rowSpacing,this.tableConfig.rowHeight)?.rowHeight,
      sortSeparator:this.separator,
      rowGrouping: jQuery.isEmptyObject(this.tableConfig?.groupOnColumn) ? '' : this.tableConfig?.groupOnColumn?.name,
      rowGroupColumns: this.tableConfig?.rowGroupColumns,
      rowGroup: (String(this.tableConfig?.rowGroup)?.toLowerCase() === 'yes'),
      currentPageName:this.pageViewTitle,
      fixedColumns: {
        left: parseInt(String(this.tableConfig?.leftFreezeUptoColumn || '0') ),
        right: parseInt(String(this.tableConfig?.rightFreezeFromColumn || '0') )
      },
     isChildPage: this.isChildPage,
      parentId: this.getParentId(),
      uniqueIdentifier:this.tableConfig?.uniqueIdentifier|| null,
     defaultSearch: this.filters[this.componentId]?.length > 0 ||this.mapConfig[this.componentId]?.length > 0 || this.queryViewList || this.defaultFilters.length > 0 ? true : false,
      searchParams: { ...this.getSearchData(this.filter.advancedSearch, this.tableSearchFieldConfig), ...this.getSearchData(this.filter.quickFilter, this.quickFilterFieldConfig)},
      mapper:this.getMapperData(this.filter.quickFilter, this.quickFilterFieldConfig),
       emptyTableMsg: this.gridEmptyMsg,
      fromDetailPage: this.fromDetailPage,
      onRowMenuClick: (option: any, row: any, data: any) => {
      },

      onRowSelect: (selectedRows: any, id: any) => {
        this.getSelectedvalues(selectedRows, id);
      },
      onRowDeselect: (selectedRows: any) => {
        this.getSelectedvalues(selectedRows, '');
      },
       onRowClick: (event: any, id: string,data:any) => {
        this.onUpdate(id, event,data);
      },
      drawCallback: (settings: any, apiScope: any) => {
        this.onDrawCallback(settings, apiScope);
      },
      onAfterServiceRequest: (data: any) => {
        this.onAfterServiceRequest(data)
      }
    };

  }

  onAfterServiceRequest(data: any) {
     this.clearSelectedValues();
    // Callback function for getting Datatable data 
    // console.log(data)
  }

  onDrawCallback(settings: any, apiScope: any) {
    // Callback function, which is called every time DataTables performs a draw
  }

  clearSelectedValues() {
    this.selectedValues = [];
    this.actionButtonEnableDisable();
  }

  getSelectedvalues(selectedRows: any, id: string) {
    let rawData: any = selectedRows?.data();
    // Filter out properties that are not functions
    this.selectedRows = []
    // Iterate through the properties of the response object
    for (const key in rawData) {
        // Check if the property is a numeric index (data objects)
        if (!isNaN(parseInt(key))) {
            // Add the data object to the array
            this.selectedRows.push(rawData[key]);
        }
    }

    this.selectedValues = [];
    rawData?.map((obj: any) => {
        this.selectedValues.push(obj.sid)
    })
    if (this.selectedValues.length > 0) {
        this.isRowSelected = true;
    } else if (this.selectedValues.length <= 0) {
        this.isRowSelected = false;
    }
    this.actionButtonEnableDisable();
}
	applyMapConfigFilters(params: any, searchDataValues: string[], missingMapConfigFields: string[]) {
    if ((this.mapConfig[this.componentId]?.length > 0 && missingMapConfigFields.length > 0) || !this.existingFormId) {
      this.hasMappedParameters = false;
    }
   else if((missingMapConfigFields.length  == 0 || this.mapConfig[this.componentId]?.length <= 0)  && this.existingFormId){
      this.hasMappedParameters = true;
    }
   
  }
	getValue(formControl: FormGroup, ele: string) {
    const parent = ele.split('?.')[0];
    if (formControl.controls[parent] instanceof FormGroup){
      const child = ele.split('?.')[1];
      return formControl.controls[parent].value[child];
    }
    else
      return formControl.controls[parent].value;
  }
	enableChildOptions(){
	}
	initSearchForm(){
  this.tableSearchFieldConfig= this.appUtilBaseService.getControlsFromFormConfig(this.tableSearchConfig)
}
	actionButtonHideShow() {
    if (this.dynamicDialogConfigFromDetailPage?.popup) {
      let actionBarConfig = [...this.leftActionBarConfig?.children || [], ...this.rightActionBarConfig?.children || []];
      actionBarConfig?.map((obj: any) => {
        if (obj?.action === 'back') {
          obj.visibility = 'hide'
        }
      })
    }
  }
	initFilterForm(fromResetQuickFilter: Boolean = false) {
    this.manipulateDefaultFilters();
    this.quickFilterFieldConfig = this.appUtilBaseService.getControlsFromFormConfig(this.quickFilterConfig);
    this.addCustomFilters();
    if(!fromResetQuickFilter) {
      this.filterSearch();
    }
    for (const key in this.quickFilterFieldConfig) {
      if (this.quickFilterFieldConfig.hasOwnProperty(key)) {
        const field = this.quickFilterFieldConfig[key];

        if (field.mandatory === 'yes') {
          this.quickFilterControls.get(key)?.disable();
        }
        if (this.defaultFilters.includes(key)) {
          this.setDefaultFilters(field, key);
          this.setFiltervisibility(field, key);
        }
      }
    }
    
   if (this.defaultFilters.length > 0) {
      this.quickFilterControls.updateValueAndValidity({ emitEvent: true });
    }
  }
	setDefaultFilters(field: any, key: string) {
  const control = this.quickFilterControls.get(key);
  const defaultFilterField = this.defaultFilterSettings[key];
  let defaultValue = defaultFilterField.value;

  if (defaultFilterField.operator?.toLowerCase()?.trim() === 'is empty') {
    control?.patchValue(field.multiple ? ['IS_EMPTY'] : 'IS_EMPTY');
  } else if (defaultValue) {
    this.patchControlValue(control, defaultValue,field);
  } else if (defaultFilterField.isCustom) {
    this.resolvecustomFilters(field, key, this.defaultFilterSettings);
  }
  
}
	onBeforeRefresh(params:any){
    return params;
  }
	onKeydown(event: any) {
  if (event.which === 13 || event.keyCode === 13) {
    // this.filter.globalSearch = this.globalSearch
   this.onRefresh();
  }
}
	comparePriorAndCurrentSearch = (prior: any, current: any) => {
    if (prior && current) {
      const priorString = JSON.stringify(prior);
      const currentString = JSON.stringify(current);
      return priorString === currentString;
    }
    return false;
  }
	checkMandatoryFilters() {
    const mandatoryFields: string[] = [];
    Object.keys(this.quickFilterControls.controls).forEach(key => {
      const control = this.quickFilterControls.get(key);
      if (control && control.validator && control.validator(control)) {
        const errors = control.validator(control);
        if (errors && errors.required) {
          mandatoryFields.push(key);
        }
      }
    });

    this.filters[this.componentId]?.forEach((obj: any) => {
      if (!mandatoryFields.includes(obj.lookupField)) {
        mandatoryFields.push(obj.lookupField);
      }
    });
    this.tableConfig.queryViewMandatoryFilters?.forEach((field: any) => {
      if (!mandatoryFields.includes(field)) {
        mandatoryFields.push(field);
      }
    });
    return mandatoryFields;
  }
	shouldRefresh(previousValue: any, currentValue: any): boolean {
    // Check if any of the changed fields match the filter fields
    const filterFields =  this.filters[this.componentId]?.map((filter: any) => filter.tableField)|| [];
    const mappingFields = this.mapConfig[this.componentId]?.map((filter: any) => filter.detailField) || [];

    return [...filterFields, ...mappingFields].some((field: any) => {
      const previousFieldValue = previousValue[field];
      const currentFieldValue = currentValue[field];
      // Check if the field has changed
      return JSON.stringify(previousFieldValue) !== JSON.stringify(currentFieldValue);
    });
  }
	actionButtonEnableDisable() {
    this.leftActionBarConfig?.children?.map((ele: any) => {
      if (ele?.action === 'delete' && ele.buttonEnabled != 'conditional') {
        if (this.selectedValues?.length > 0) {
          ele.buttonEnabled = 'yes';
        } else {
          ele.buttonEnabled = 'no';
        }
      }
    })
  }
  getColumns() {
   const json1 = this.tableConfig.children ||[];
    const json2 = this.customRenderConfig.children ||[];
    let merged = [];
    for (let i = 0; i < json1.length; i++) {
 if(json1[i].mapping?.length > 0){
        json1[i].orderable = false;
      }
      merged.push({
        ...json1[i],
        ...(json2.find((itmInner: any) => itmInner.fieldName === json1[i].fieldName))
      });
    }
    return merged;
  }
showToastMessage(config: object) {
    this.messageService.add(config);
  }
getParentId() {
  const value: any = "parentId";
  let property: Exclude<keyof Patable2ListBaseComponent, ' '> = value;
  if (this.isChildPage) {
    if (this[property]) {
      return this[property];
    } else {
      return false;
    }
  }
}
leftPad(num:number, length:number) {
    var result = '' + num;
    while (result.length < length) {
      result = '0' + result;
    }
    return result;
  }
	mapFields(mapper: any, keys: any, mapData: any, sourceField: string, targetField: string, hasMapper ?:boolean): void {
    let value = '';
    keys?.forEach((key: { [x: string]: string | number; }) => {
      if (key.uiType == 'autosuggest') {
        mapper[key[targetField]] = mapData[key['parentField']];
      }
      else if (key.fieldType == 'Boolean') {
        mapper[key[targetField]] = mapData[key[sourceField]] ? mapData[key[sourceField]] : false;
      }
      else {
        if (mapData[key[sourceField]])
          mapper[key[targetField]] = mapData[key[sourceField]];
      }
    });
  
    const hasDates = keys?.filter((e: any) =>
      e.fieldType?.toLowerCase() === "date" || e.fieldType?.toLowerCase() === "datetime"
    );
  
    if (hasDates?.length > 0) {
      this.handleDateFields(hasDates, mapper, mapData, hasMapper);
    }
  
    const hasNumbers = keys?.filter((e: any) =>
      e.fieldType?.toLowerCase() === "number" || e.fieldType?.toLowerCase() === "double"
    );
  
    if (hasNumbers?.length > 0) {
      this.handleNumberFields(hasNumbers, mapper, mapData);
    }
  
  }
	clearFilterValues() {
  this.tableSearchControls.reset();
  this.filter.advancedSearch = {};
  this.onRefresh();
  this.filtersApplied = false;
}
	setFiltervisibility(field: any, key: string) {
    const defaltFilterField = this.defaultFilterSettings[key];
    this.hiddenFields[key] = !defaltFilterField.viewInPages;
    if (defaltFilterField.viewInPages && defaltFilterField.editInPages) {
      this.quickFilterControls.get(key)?.enable({emitEvent:false});
    } else {
      this.quickFilterControls.get(key)?.disable({emitEvent:false});
    }
  }
	populateDataFields(data: any, searchFields: any, config: any, filterKeys: boolean): void {
    for (const key in searchFields) {
      if (searchFields.hasOwnProperty(key) && searchFields[key]?.toString().length) {
        const isDefaultFilter = this.defaultFilters.includes(key);
        if (filterKeys && !isDefaultFilter) continue;
        if (!filterKeys && isDefaultFilter) continue;
  
        if (config[key].uiType === 'autosuggest') {
          let lookupObj: any = [];
          if (config[key].multiple) {
            searchFields[key]?.map((o: any) => lookupObj.push(o.sid));
          }
          const rField = this.tableSearchFieldConfig[key]?.parentField || this.quickFilterFieldConfig[key]?.parentField || "";
          data[key] = searchFields[key][rField];
        } else if (searchFields[key] === 'IS_EMPTY') {
          data[key] = '$__isEmpty';
        } else if (Array.isArray(searchFields[key])) {
          data[key] = searchFields[key].map((item: string) => item === 'IS_EMPTY' ? '$__isEmpty' : item);
        } else {
          data[key] = searchFields[key];
        }
      }
    }
  }

  getSearchData(searchFields?: any, config?: any): any {
    let searchData: any = {};
    const enrichedData = this.getDefaultFilterValues(true);
    searchData = enrichedData?.searchData;
  
    if (searchFields) {
      this.populateDataFields(searchData, searchFields, config, false);
    }
  
    return searchData;
  }
  
  getMapperData(searchFields?: any, config?: any): any {
    let mapperData: any = {};
    const enrichedData = this.getDefaultFilterValues(false);
    mapperData = enrichedData?.mapper;
  
    if (searchFields) {
      this.populateDataFields(mapperData, searchFields, config, true);
    }
  
    return mapperData;
  }

 assignTableParams() {
    const params: any = {};
    this.filter.sortField = this.tableConfig.groupOnColumn ? this.tableConfig.groupOnColumn?.name : this.filter.sortField;
    const searchData = { ...this.getSearchData(this.filter.advancedSearch, this.tableSearchFieldConfig), ...this.getSearchData(this.filter.quickFilter, this.quickFilterFieldConfig) }
    const mapper = this.getMapperData(this.filter.quickFilter, this.quickFilterFieldConfig);
    if (this.filter.globalSearch)
      searchData['_global'] = this.filter.globalSearch;

    if (this.filter.sortField && this.filter.sortOrder) {
    let columnName:any = null;
    this.tableConfig.children.map((ele: any) => {
      if (ele.uiType === "autosuggest" && this.filter.sortField === ele.name) {
        columnName = (ele.name + "__value__" + ele.displayField);
      }
      else if(this.filter.sortField === ele.name){
        columnName = this.filter.sortField 
      }
      if(columnName){
        params.order = [{
          column: columnName,
          dir: this.filter.sortOrder
        }]
      }
      else{
        params.order = null;
      }
    })
  }
    else {
      params.order = null;
    }
    params.search = searchData;
    params.mapper = mapper;

    return params;
  }
	loadGridData() {
    let gridSubscription: any;
    if (environment.prototype && this.tableConfig.children?.length > 0) {
      gridSubscription = this.patable2Service.getProtoTypingData().subscribe((data: any) => {
        this.gridData = [...this.gridData, ...data];
        this.isPageLoading = false;
      });
    }
    else {
      this.gridData = []
    }
}
	toggleAdvancedSearch() {
  this.showAdvancedSearch = !this.showAdvancedSearch;
}
	showFilter(): boolean {
    const configValues = Object.values(this.quickFilterFieldConfig);
  
    // Check if quickFilterFieldConfig is empty
    if (configValues.length === 0) {
      return false;
    }
    // Check if at least one field's allowview property is true
    const result = configValues.some((field) => {
      const allowview = (field as { viewInPages?: boolean }).viewInPages;
      return allowview !== false;
    });
   
    return result;
  }
	showInfoMessage(message: string) {
    // Display an info message
    this.messageService.add({severity:'info', summary:'Info', detail: message});
  }
	scrollFilterFieldsList(position: any, event: any) {
    if (position == 'right') {
      event.target.offsetParent?.children[1]?.scrollBy(200, 0)
    } else {
      event.target.offsetParent?.children[1]?.scrollBy(-200, 0)
    }
  }
	onRefresh(fromDelete?:boolean,fromFilters?:boolean): void {
    const fromDel = fromDelete || false;
    const params = this.assignTableParams();
    this.toShowRecords(params);
    if(this.mapConfig[this.componentId]?.length > 0){
      const NeedRefresh = this.hasMappedParameters || fromFilters;
       if (this.gridComponent && 'refreshGrid' in this.gridComponent) {
        this.gridComponent.refreshGrid(params, fromDel,NeedRefresh);
      }
    }
    else{
       if (this.gridComponent && 'refreshGrid' in this.gridComponent) {
        this.gridComponent.refreshGrid(params, fromDel);
      }
    }
    this.selectedValues =[];
    this.priorGridParams.search = params.search;
    this.priorGridParams.mapper = params.mapper;
  }
	onBack(){
this.location.back();
}
	manipulateDefaultFilters(){
    this.defaultFilterConfig.children.forEach((ele:any)=>{
      this.defaultFilters.push(ele.field);
      ele.holdFilterValue ? this.holdFilters.push(ele.field):'';
    })
    this.defaultFilterSettings = this.appUtilBaseService.getControlsFromFormConfig(this.defaultFilterConfig);
    this.quickFilterConfig = this.appUtilBaseService.mergeConfigs(this.quickFilterConfig,this.defaultFilterConfig);
  }
	getButtonConfig(btn:any){
    return {
      action:btn.action,
      confirmationTitle:btn.confirmationTitle|| this.translateService.instant('CONFIRMATION'),
      confirmationText:btn.confirmationText || 'Do you want to perform the action?',
      fields: btn.fields || {"children":[]},
        confirmButton:btn.confirmationButtonText,
      rejectButton:btn.cancelButtonText,
      values:(this.responseData?.filter((o:any)=>o.sid == this.selectedValues[0]))[0]
    }
  }
	calculateFormula(){
	
}
	advancedSearch() {
    this.filter.advancedSearch = this.tableSearchControls.value;
    let hasDates = this.tableSearchConfig.children.filter((e: any) => e.fieldType.toLowerCase() == "date" || e.fieldType.toLowerCase() == "datetime");
    if (hasDates.length > 0) {
      hasDates.forEach((f: any) => {
        let val:any ={};
        let field = f.name;
        let value = this.filter.advancedSearch[field];
        if (value && Array.isArray(value)) {
            if(this.tableSearchFieldConfig[field].uiType ==='date'){
              const tempDate1 = new Date(value[0]);
              const tempDate2 = new Date(value[1]);
              const convertedDate1 = tempDate1.getFullYear() + '-' + this.leftPad((tempDate1.getMonth() + 1), 2) + '-' + this.leftPad(tempDate1.getDate(), 2);
              const convertedDate2 = tempDate2.getFullYear() + '-' + this.leftPad((tempDate2.getMonth() + 1), 2) + '-' + this.leftPad(tempDate2.getDate(), 2);
              val = { lLimit: convertedDate1 ? new Date(convertedDate1).getTime() : null, uLimit: value[1] ? new Date(convertedDate2).getTime() : null, type: "Date" };
            }
            else{
              val = { lLimit: new Date(value[0]).getTime(), uLimit: value[1] ? new Date(value[1]).getTime(): value[1], type: "Date" }          
            }
          
          this.filter.advancedSearch[field] = val;
          if (value[0] == null && value[1] == null) {
            delete this.filter.advancedSearch[field];
          }
        }

        if (value && typeof value == 'object' && !Array.isArray(value)) {
          if (this.tableSearchFieldConfig[field].uiType === 'date') {
            const tempDate1 = typeof value?.min == 'undefined' ? value : value?.min ? new Date(value?.min) : null;
            const tempDate2 = typeof value?.max == 'undefined' ? value : value?.max ? new Date(value?.max) : null;
            const convertedDate1 = tempDate1 ? tempDate1.getFullYear() + '-' + this.leftPad((tempDate1.getMonth() + 1), 2) + '-' + this.leftPad(tempDate1.getDate(), 2) : null;
            const convertedDate2 = tempDate2 ? tempDate2.getFullYear() + '-' + this.leftPad((tempDate2.getMonth() + 1), 2) + '-' + this.leftPad(tempDate2.getDate(), 2) : null;
            val = { lLimit: convertedDate1 ? new Date(convertedDate1).getTime() : null, uLimit: convertedDate2 ? new Date(convertedDate2).getTime() : null, type: "Date" };
          } else {
            val = { lLimit: new Date(value?.min).getTime(), uLimit: value?.max ? new Date(value?.max).getTime() : null, type: "Date" }
          }
          if (val?.lLimit || val?.uLimit) {
            this.filter.advancedSearch[field] = val;
          }
          if (!val?.lLimit && !val?.uLimit) {
            delete this.filter.advancedSearch[field];
          }
        }
      });
    }
    let hasNumbers = this.tableSearchConfig.children.filter((e: any) => e.fieldType.toLowerCase() == "number" || e.fieldType.toLowerCase() == "double");
    if (hasNumbers.length > 0) {
      hasNumbers.forEach((f: any) => {
        let field = f.name;
        let value = this.filter.advancedSearch[field];
        if (value && !Array.isArray(value) && typeof value == 'object') {
          this.filter.advancedSearch[field] = {
            lLimit: value.min, uLimit: value.max, type: "Number"
          }
          if (value.min == null && value.max == null) {
            delete this.filter.advancedSearch[field];
          }
        }
      });
    }
    this.onRefresh(false,true);
    this.toggleAdvancedSearch();
    this.filtersApplied = true;
  }

    onInit() {
		
		this.initSearchForm();

		this.initFilterForm();
		this.getListofServicesTobeFired().subscribe((responses: any[]) => {   
this.tableConfig.children = this.appUtilBaseService.formatTableConfig(this.tableConfig.children);
    this.tableFieldConfig = this.appUtilBaseService.formatTableFieldConfig(this.tableConfig.children);
    this.getMappedFilters();    
     this.loadGridData();
    this.disablechildAction();
 this.disableNewAction();
    this.updateActions();
    const params =  this.assignTableParams();
    this.toShowRecords(params);
    this.gridConfig = this.getGridConfig();
    this.selectedColumns = this.gridConfig.columns;
    this.actionButtonEnableDisable();
    this.actionButtonHideShow();
 });
    }
	
     onDestroy() {
		
		
        this.subscriptions.forEach((subs: { unsubscribe: () => void; }) => subs.unsubscribe());
    }
     onAfterViewInit() {
		
    }
    
    onChanges(changes:any) {
		
		const mapDataChanged = changes.mapData && changes.mapData.previousValue &&
        JSON.stringify(changes.mapData.previousValue) !== JSON.stringify(changes.mapData.currentValue) &&
        this.shouldRefresh(changes.mapData.previousValue, changes.mapData.currentValue);
    
      const existingFormIdChanged = !this.queryViewList && changes.existingFormId &&
        changes.existingFormId.previousValue === undefined &&
        changes.existingFormId.currentValue;
    
      const parentIdChanged = this.fromDetailPage && changes.parentId && 
      changes.parentId.previousValue === undefined &&
      changes.parentId.currentValue;
    
      if (mapDataChanged || existingFormIdChanged || parentIdChanged) {
        // Parent form value has changed, update the grid
        this.getMappedFilters();
        const params = this.assignTableParams();
     if(this.gridComponent && this.gridComponent.params && this.gridComponent.params.search){
          this.gridComponent.params.search = params.search;
         }
        this.toShowRecords(params);
    

            setTimeout(() => {
            this.onRefresh();
          }, 100);
        
      }
 if (existingFormIdChanged) {
      this.disableNewAction();
    }
	}
}
