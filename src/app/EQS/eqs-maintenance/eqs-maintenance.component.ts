import { Component, OnInit, ViewChild } from "@angular/core";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ItemModel } from "@syncfusion/ej2-splitbuttons";
import { ToastrService } from "ngx-toastr";
import {
  Edit,
  GridLine,
  FilterSettingsModel,
  EditSettingsModel,
  ToolbarService,
  CommandClickEventArgs,
  GridComponent,
  ToolbarItems,
  CommandModel,
  TextWrapSettingsModel,
  GroupSettingsModel,
  ExcelExportProperties,
  Column,
  IFilter,
  ExcelQueryCellInfoEventArgs,
  PdfExportProperties,
} from "@syncfusion/ej2-angular-grids";
import { EmitType } from "@syncfusion/ej2-base";
import { FilteringEventArgs } from "@syncfusion/ej2-dropdowns";
import { Query } from "@syncfusion/ej2-data";
import { FilterService } from "@syncfusion/ej2-angular-grids";
import { EqsMaintenanceService } from "./Service/eqs-maintenance.service";
import { EqsCommonService } from "src/app/Shared Services etc/Services/EqsCommonService/EqsCommon.service";
import { Router } from "@angular/router";
import { EqsMaintenance } from "./Service/eqs-maintenance.model";
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { isUndefined, isNullOrUndefined } from "util";
import { ClickEventArgs } from "@syncfusion/ej2-angular-navigations";
import { FormErrorDisplayService } from "src/app/Shared Services etc/FormValidation/form-error-display-service";
import { CommonService } from "src/app/Shared Services etc/Services/Common.service";
import {
  AjaxSettingsModel,
  SearchSettingsModel,
} from "@syncfusion/ej2-filemanager";
import { environment } from "src/environments/environment";
import { DataUtil } from "@syncfusion/ej2-data";
import { Internationalization } from "@syncfusion/ej2-base";
import { ConfirmationDialogService } from "src/app/shared HTML/confirmation-dialog/confirmation-dialog.component.service";
import { even } from "@rxweb/reactive-form-validators";
@Component({
  selector: "app-eqs-maintenance",
  templateUrl: "./eqs-maintenance.component.html",
  providers: [FilterService, ToolbarService],
  styleUrls: ["./eqs-maintenance.component.css"],
})
export class EqsMaintenanceComponent implements OnInit {
  public toolbarOptions: ToolbarItems[];
  @ViewChild("grid", { static: false }) public grid: GridComponent;
  @ViewChild("content3", { static: false }) MaintenanceModal;
  constructor(
    private routes: Router,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private _eqsMaintenanceService: EqsMaintenanceService,
    private _eqsCommonService: EqsCommonService,
    private formBuilder: FormBuilder,
    private formErrorDisplay: FormErrorDisplayService,
    private _common: CommonService,
    private confirmationDialogService: ConfirmationDialogService
  ) {}
  public ajaxSettings: AjaxSettingsModel;
  public searchSettings: SearchSettingsModel;
  public navigationPaneSettings: object;
  public contextMenuSettings: object;
  public toolbarSettings: object;
  closeResult: string;
  public dateValue: Date = new Date();
  public initialPage: Object;
  public filterOptions: FilterSettingsModel;
  public objEquipmentType: Object = {};
  public objMaintenanceType: Object[];
  public ObjEquipmentList: object[];
  public ObjMaintenanceList: object[];
  MaintenanceForm: FormGroup;
  public IsMaintenanceEdit = false;
  public editSettings: EditSettingsModel;
  // public toolbar: ToolbarItems[];
  public commands: CommandModel[];
  public toolbar: String[];
  public wrapSettings: TextWrapSettingsModel;
  public groupOptions: GroupSettingsModel;
  public PageAccessRight: object = {};
  public filter: IFilter;
  public Dateformat: any;
  public pageSettings: Object;
  public objEquipmentMaintenanceType: Object[];

  public ObjEquipmentListNew: object[];
  public ObjMaintenanceListNew: object[];
  public flag = false;
  public id;
  show: boolean = true;
  public ObjEquipmentTypeList: object[];
  public ObjEquipmentTypeName: string;
  public ObjMaintenanceListNewRec: object[];
 

  public data3: { [key: string]: Object }[] = [{ Name: "Select", Code: "S" }];
  // maps the appropriate column to fields property
  public fields: Object = { text: "Name", value: "Id" };
  // set the height of the popup element
  public height: string = "220px";
  // set the placeholder to ComboBox input element
  public watermark: string = "Select";
  public watermark1: string = "Select Type";
  // filtering event handler to filter a Country
  public onFiltering: EmitType<FilteringEventArgs> = (
    e: FilteringEventArgs
  ) => {
    let query: Query = new Query();
    //frame the query based on search string with filter type.
    query =
      e.text !== "" ? query.where("Name", "startswith", e.text, true) : query;
    //pass the filter data source, filter query to updateData method.
    e.updateData(this.data3, query);
  };
  public items2: ItemModel[] = [
    {
      text: "Preventive Maintenance",
    },
    {
      text: "Breakdown",
    },
  ];
  public AttachmentList: object[];
  public _restApi = environment.apiUrl + "/FileManager/";
  public EqsEquipmentId: Number;
  public EqsMaintenanceRecordId: Number;
  public data: object[];
  public lines: GridLine;
  public formatOptions: any;
  // uploader
  public path: Object = {
    saveUrl: "https://ej2.syncfusion.com/services/api/uploadbox/Save",
    removeUrl: "https://ej2.syncfusion.com/services/api/uploadbox/Remove",
    // saveUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Save',
    // removeUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Remove'
  };
  public onUploadSuccess: EmitType<Object> = (args: any) => {
    let liElements: any = document.body.querySelectorAll(".e-upload-file-list");
    for (let i = 0; i < liElements.length; i++) {
      if (liElements[i].getAttribute("data-file-name") == args.file.name) {
        liElements[i].addEventListener("click", () => {
          this.openFile(args, event);
        });
        // File path have to update from server end in response status description.
        liElements[i].setAttribute("file-path", args.e.target.statusText);
      }
    }
  };
  openFile(args: any, e: any) {
    if (
      !e.target.classList.contains("e-file-delete-btn") &&
      !e.target.classList.contains("e-file-remove-btn")
    ) {
      let ajax = new XMLHttpRequest();
      // create new request for open the selected file
      ajax.open("POST", "/Home/openFile");
      let liElements = document
        .getElementsByClassName("e-upload")[0]
        .querySelectorAll(".e-upload-file-list");
      for (let i = 0; i < liElements.length; i++) {
        if (liElements[i].getAttribute("data-file-name") == args.file.name) {
          // Added the file path in header to get it in server side.
          ajax.setRequestHeader(
            "filePath",
            liElements[i].getAttribute("file-path").toString()
          );
        }
      }
      ajax.send();
    }
  }
  ngOnInit(): void {
    this.show = false;

    this._eqsMaintenanceService.getAccessRight().subscribe((data) => {
      this.PageAccessRight = data["Object"];
      if (this.PageAccessRight["HasWriteAccess"] == false) {
        this.grid.hideColumns(["Action"]);
      }
    });

    this.load();
    this.setForm();
    this.initFileManager();

    this.editSettings = {
      allowEditing: true,
      allowAdding: true,
      allowDeleting: true,
      mode: "Dialog",
    };
    // this.commands = [{ buttonOption: { content: 'Edit', cssClass: 'edit_link' } }];
    this.commands = [
      {
        type: "Edit",
        buttonOption: { iconCss: "fa fa-edit", cssClass: "e-flat" },
      },
     /*   {
        type: "Delete",
        buttonOption: { cssClass: "e-flat", iconCss: "fa fa-plus" },
      },  */
      {
        buttonOption: {
          content: "Add",
          iconCss: "e-icons e-add",
          cssClass: "e-flat"
        }
      }
    ];
    //this.commands = [{ type: 'Edit', buttonOption: { iconCss: ' fa fa-edit', cssClass: 'e-flat' } }];
    this.lines = "Both";
    this.filterOptions = {
      type: "Menu",
    };
    this.filter = {
      params: {
        format: "dd-MMM-yyyy",
      },
    };
    this.Dateformat = { type: "date", format: "dd-MMM-yyyy" };
    this.formatOptions = {
      type: "date",
      format: "dd-MMM-yyyy",
      skeleton: "dd-MMM-yyyy",
    };

    this.toolbarOptions = ["ExcelExport", "Search", "PdfExport"];
    this.toolbar = ["Search"];
    // this.initialPage = { pageSizes: true, pageCount: 4 };
    this.pageSettings = { pageSize: 10 };
    this.wrapSettings = { wrapMode: "Content" };
    //this.groupOptions = { showGroupedColumn: true };

    this.groupOptions = {
      showDropArea: true,
      showUngroupButton: true,
      columns: ["MaintenanceMasterType"],
    };
  }

  initFileManager() {
    this.ajaxSettings = {
      url: this._restApi + "FileOperations",
      getImageUrl: this._restApi + "GetImage",
      uploadUrl: this._restApi + "Upload",
      downloadUrl: this._restApi + "Download",
    };
    this.searchSettings = {
      allowSearchOnTyping: false,
    };
    // this.navigationPaneSettings = { maxWidth: '850px', minWidth: '140px', visible: true };
    // this.contextMenuSettings = { file: ['Open', '|', 'Details','Download'], folder: ['Open', '|', 'Details'], layout: ['SortBy', 'View', 'Refresh', '|', 'Details', '|'], visible: true };
    // this.toolbarSettings = { items: ['Refresh', 'View', 'Details'], visible: true };
    this.navigationPaneSettings = environment.navigationPaneSettings;
    this.contextMenuSettings = environment.contextMenuSettings;
    this.toolbarSettings = environment.toolbarSettings;
  }
  toolbarClick(args: ClickEventArgs): void {
    switch (args.item.id) {
      case "Grid_excelexport":
        (this.grid.columns[7] as Column).visible = false;
        const excelExportProperties: ExcelExportProperties = {
          fileName: "Equipment_Maintenance.xlsx",
        };
        var ObjAudit = {
          FeatureName: "Maintenance",
          Description: "Excel Report Is Downloaded.",
        };
        this._eqsMaintenanceService
          .SaveReportDownloadLogInAudit(ObjAudit)
          .subscribe((res) => {
            if (res["Result"]) {
              this.grid.excelExport(excelExportProperties);
            } else {
            }
          });

        break;
      case "Grid_pdfexport":
        const pdfExportProperties: PdfExportProperties = {
          fileName: "Equipment_Maintenance.pdf",
          pageOrientation: "Landscape",
        };
        var ObjAudit = {
          FeatureName: "Maintenance",
          Description: "Pdf Report Is Downloaded.",
        };
        this._eqsMaintenanceService
          .SaveReportDownloadLogInAudit(ObjAudit)
          .subscribe((res) => {
            if (res["Result"]) {
              this.grid.pdfExport(pdfExportProperties);
            } else {
            }
          });

        break;
    }
  }
  public created(args) {
    var gridElement = this.grid.element;
    var span = document.createElement("span");
    span.className = "e-clear-icon";
    span.id = gridElement.id + "clear";
    span.onclick = this.cancelBtnClick.bind(this);
    gridElement
      .querySelector(".e-toolbar-item .e-input-group")
      .appendChild(span);
  }
  public cancelBtnClick(args) {
    this.grid.searchSettings.key = "";
    (this.grid.element.querySelector(
      ".e-input-group.e-search .e-input"
    ) as any).value = "";
  }
  openAddModal(content3) {
    this.IsMaintenanceEdit = false;
    this.objEquipmentType = {};
    this.ObjEquipmentTypeName = null;
    this.resetForm();
    this.modalService
      .open(content3, {
        centered: true,
        size: "lg",
        backdrop: "static",
        keyboard: false,
      })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }
  load() {
    this.GetEquipmentList();
    this.GetMaintenanceList();
    this.EqsMaintenanceTypeList();
    this.GetEquipmentTypeList();
  }
  setForm() {
    this.MaintenanceForm = this.formBuilder.group({
      EqsMaintenanceRecordId: [""],
      EqsEquipmentId: ["", Validators.required],
      EquipmentTypeId: [""],
      MaintenanceTypeMasterId: ["", Validators.required],
      EqsMaintenancePerformDate: ["", Validators.required],
      EqsMaintenanceDescription: [""],
      AttachmentList: new FormArray([]),
    });
  }
  resetForm() {
    this.MaintenanceForm.reset();
    this.AttachmentList = [];
  }
  GetEquipmentTypeAndMaintenanceTypeById(EqsEquipmentId) {
    this._eqsCommonService
      .GetEquipmentTypeById(EqsEquipmentId.value)
      .subscribe((data) => {
        this.objEquipmentType = data["Object"];
        this.ObjEquipmentTypeName = this.objEquipmentType["Name"];
      });
    this._eqsMaintenanceService
      .GetMaintenanceTypeByEquipmentId(EqsEquipmentId.value)
      .subscribe((data) => {
        this.objEquipmentMaintenanceType = data["Object"];
       /*  console.log(
          "Equipment MaintenanceType :",
          this.objEquipmentMaintenanceType
        ); */
      });
  }
  GetEquipmentList() {
    this._eqsMaintenanceService.GetEquipmentList().subscribe((data) => {
      this.ObjEquipmentList = data["Object"];
      this.ObjEquipmentListNew = this.ObjEquipmentList;
    });
  }
  GetMaintenanceList() {
    this._eqsMaintenanceService.GetMaintenanceList().subscribe((data) => {
      this.ObjMaintenanceList = data["Object"];
      //console.log("Maintenance List :",this.ObjMaintenanceList)

      for (var i = 0; i < this.ObjMaintenanceList.length; i++) {
        if (this.ObjMaintenanceList[i]["EqsMaintenanceDueDate"] != null) {
          this.ObjMaintenanceList[i]["EqsMaintenanceDueDate"] = new Date(
            this.ObjMaintenanceList[i]["EqsMaintenanceDueDate"]
          );
        }
        if (this.ObjMaintenanceList[i]["EqsMaintenancePerformDate"] != null) {
          this.ObjMaintenanceList[i]["EqsMaintenancePerformDate"] = new Date(
            this.ObjMaintenanceList[i]["EqsMaintenancePerformDate"]
          );
          this.ObjMaintenanceList[i]["ShowMaintenanceAddButton"] = false;
          this.ObjMaintenanceList[i]["ShowMaintenanceEditButton"] = true;
        }
        if (this.ObjMaintenanceList[i]["EqsMaintenanceNextDueDate"] != null) {
          this.ObjMaintenanceList[i]["EqsMaintenanceNextDueDate"] = new Date(
            this.ObjMaintenanceList[i]["EqsMaintenanceNextDueDate"]
          );
        }

       /*  if( this.ObjMaintenanceList[i]["MaintenanceMasterType"] =="BreakDown")
        {
          this.ObjMaintenanceList[i]["EqsMaintenanceNextDueDate"] ="NA";
          this.ObjMaintenanceList[i]["EqsMaintenanceDueDate"]="NA";
        }
 */
      }
      this.ObjMaintenanceList = DataUtil.parse.parseJson(
        this.ObjMaintenanceList
      );
    //  console.log("Maintenance List after :",this.ObjMaintenanceList)

      if (this.flag == true) {
       // console.log("Equipment Id GetCalibrationList :", this.id);
        this.GetEquipmentListById(this.id);
      }
    });
  }
  EqsMaintenanceTypeList() {
    this._eqsCommonService.EqsMaintenanceTypeList().subscribe((data) => {
      this.objMaintenanceType = data["Object"];
    });
  }
  SaveMaintenance() {
    if (this.MaintenanceForm.valid) {
      this.MaintenanceForm.patchValue({
        EquipmentTypeId: this.objEquipmentType["Id"],
      });
      let fileList = this.MaintenanceForm.get("AttachmentList").value;
      this._eqsMaintenanceService
        .SaveEqsMaintenance(this.MaintenanceForm.value, fileList)
        .subscribe((res) => {
          if (res["Result"]) {
            this.toastr.success(res["ResultMessage"]);

            this.flag = true;
            let result = res["Id"];
            this.id = result;
            //console.log("Equipment Id Save :", result);

            this.GetMaintenanceList();
            this.resetForm();
            this.closeQualificationModal();
          } else {
            this.toastr.error(res["ResultMessage"]);
          }
        });
    } else {
      this.formErrorDisplay.showErrors(this.MaintenanceForm);
    }
  }
  closeQualificationModal() {
    this.modalService.dismissAll();
  }
  editMaintenance(EqsMaintenanceRecordId, flag): void {
    this._eqsMaintenanceService
      .GetMaintenanceDetail(EqsMaintenanceRecordId)
      .subscribe((data) => {
        const ObjectData = data["Object"] as EqsMaintenance;
        this.AttachmentList = ObjectData.AttachmentList;
        if (ObjectData != null) {
          this.MaintenanceForm.patchValue({
            EqsMaintenanceRecordId: ObjectData.EqsMaintenanceRecordId,
            EqsEquipmentId: ObjectData.EqsEquipmentId,
            MaintenanceTypeMasterId: ObjectData.MaintenanceTypeMasterId,
            EqsMaintenancePerformDate: ObjectData.EqsMaintenancePerformDate,
            EqsMaintenanceDescription: ObjectData.EqsMaintenanceDescription,
          });
          if (flag == false) {
            this.ObjEquipmentTypeName = ObjectData.EquipmentTypeName;
            this.IsMaintenanceEdit = true;
          }
        } else {
          this.MaintenanceForm.patchValue({
            EqsMaintenanceRecordId: null,
            EqsEquipmentId: null,
            MaintenanceTypeMasterId: null,
            EqsMaintenancePerformDate: null,
            EqsMaintenanceDescription: null,
          });
        }
      });
  }
  UpdateMaintenance() {
    if (this.MaintenanceForm.valid) {
      this.MaintenanceForm.patchValue({
        EquipmentTypeId: this.objEquipmentType["Id"],
      });
      let fileList = this.MaintenanceForm.get("AttachmentList").value;
      this._eqsMaintenanceService
        .UpdateEqsMaintenance(this.MaintenanceForm.value, fileList)
        .subscribe((res) => {
          if (res["Result"]) {
            this.toastr.success(res["ResultMessage"]);

            this.flag = true;
            let result = res["Id"];
            this.id = result;
           // console.log("Equipment Id update :", result);

            this.GetMaintenanceList();
            this.resetForm();
            this.closeQualificationModal();
          } else {
            this.toastr.error(res["ResultMessage"]);
          }
        });
    } else {
      this.formErrorDisplay.showErrors(this.MaintenanceForm);
    }
  }
  public onFileSelect: EmitType<Object> = (args: any) => {
    args.filesData.forEach((file) => {
      (this.MaintenanceForm.controls.AttachmentList as FormArray).push(
        this.formBuilder.group({
          Attachment: file.rawFile,
        })
      );
    });
  };

  /* DownlLoadFile(filePath) {  
    this._common.DownlLoadFile(filePath);
  } */

  DownLoadFile(filePath) {
    this._common.DownLoadFile(filePath).subscribe((file) => {
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL, '_blank');
    });
  }


  setRowId(data) {
    this.EqsMaintenanceRecordId = data.EqsMaintenanceRecordId;
    this.EqsEquipmentId = data.EqsEquipmentId;
  }
  beforeSend(args) {
    // Get the value of Dropdownlist.
    let restrictedPath =
      "EQSMaintenance/Equip_" +
      this.EqsEquipmentId +
      "/" +
      this.EqsMaintenanceRecordId;
    if (
      args["name"] == "beforeImageLoad" &&
      args["imageUrl"].indexOf(restrictedPath) == -1
    ) {
      let indexOfPath = args["imageUrl"].indexOf("path=") + 5;
      args["imageUrl"] =
        args["imageUrl"].substring(0, indexOfPath) +
        restrictedPath +
        args["imageUrl"].substring(indexOfPath);
    } else if (args.name == "beforeDownload") {
      if (args.data["path"].indexOf(restrictedPath) == -1) {
        args.data["path"] = restrictedPath + args.data["path"];
      }
    } else {
      var data = JSON.parse(args.ajaxSettings.data);
      if (args["action"] == "Upload") {
        if (data[0]["path"].indexOf(restrictedPath) == -1) {
          data[0]["path"] = restrictedPath + data[0]["path"];
        }
      } else if (data["path"].indexOf(restrictedPath) == -1) {
        data["path"] = restrictedPath + data["path"];
        if (args["action"] == "move") {
          data["targetPath"] = restrictedPath + data["targetPath"];
        }
      }
      args.ajaxSettings.data = JSON.stringify(data);
    }
  }

  excelQueryCellInfo(args: ExcelQueryCellInfoEventArgs) {
    if (args.column.field === "EqsMaintenanceDueDate") {
      var intl = new Internationalization();
      var dFormatter = intl.getDateFormat({ format: "dd-MMM-yyyy" });
      var formattedDate = dFormatter(args.value);
      args.value = formattedDate;
    }
    if (args.column.field === "EqsMaintenancePerformDate") {
      var intl = new Internationalization();
      var dFormatter = intl.getDateFormat({ format: "dd-MMM-yyyy" });
      var formattedDate = dFormatter(args.value);
      args.value = formattedDate;
    }
    if (args.column.field === "EqsMaintenanceNextDueDate") {
      var intl = new Internationalization();
      var dFormatter = intl.getDateFormat({ format: "dd-MMM-yyyy" });
      var formattedDate = dFormatter(args.value);
      args.value = formattedDate;
    }
  }
  excelExportComplete(): void {
    (this.grid.columns[7] as Column).visible = true;
  }

  pdfHeaderQueryCellInfo(args: any): void {
    args.cell.row.pdfGrid.repeatHeader = true;
  }

  actionMaintennace(args: CommandClickEventArgs): void {

    //console.log("Args :", args)
    switch (args["commandColumn"]["type"]) {
      case "Delete":
        /*  this.confirmationDialogService.confirm('Please confirm..', 'Are you sure you want to delete... ?', 'Yes', 'No').then((result) => {
          if (result) {
            //  this.DeleteMaintenance(args['rowData']['EqsMaintenanceRecordId']);
          }
          }); */

        this.openAddModal(this.MaintenanceModal);
        if (args["rowData"]["EqsMaintenanceRecordId"] > 0) {
          this.editMaintenance(args["rowData"]["EqsMaintenanceRecordId"], true);
          this.ObjEquipmentTypeName = this.ObjMaintenanceListNew[0][
            "EquipmentTypeName"
          ];
        } else {
          this.ShowRecordOnAddMaintenance(args, true);
        }

        break;
      case "Edit":
        this.openAddModal(this.MaintenanceModal);
        this.editMaintenance(args["rowData"]["EqsMaintenanceRecordId"], false);
        break;
      default:
        break;
    }

    if(args["commandColumn"]["buttonOption"]["content"] == "Add")
    {
     // console.log("In add CAll")
      this.openAddModal(this.MaintenanceModal);
      if (args["rowData"]["EqsMaintenanceRecordId"] > 0) {
        this.editMaintenance(args["rowData"]["EqsMaintenanceRecordId"], true);
        this.ObjEquipmentTypeName = this.ObjMaintenanceListNew[0][
          "EquipmentTypeName"
        ];
      } else {
        this.ShowRecordOnAddMaintenance(args, true);
      }
    }


  }

  DeleteMaintenance(EqsMaintenanceRecordId) {
    this._eqsMaintenanceService
      .DeleteMaintenance(EqsMaintenanceRecordId)
      .subscribe((res) => {
        if (res["Result"]) {
          this.toastr.success(res["ResultMessage"]);
          this.GetMaintenanceList();
        } else {
          this.toastr.error(res["ResultMessage"]);
        }
      });
  }

  ValidateEquipmentMaintenance(MaintenanceType) {
    let moduleNameList = this.objEquipmentMaintenanceType.filter(
      (f) => f["Name"] == MaintenanceType.itemData["Name"]
    );
    var s =
      MaintenanceType.itemData.Name +
      " Maintenance Is Not Added For This Equipment.Please Go To Equipment Master And Edit The Equipment And Add Maintenance.";
    if (moduleNameList.length == 0) {
      this.toastr.error(s);
    }
  }

  GetEquipmentTypeList() {
    this._eqsMaintenanceService.GetEquipmentTypeList().subscribe((data) => {
      this.ObjEquipmentTypeList = data["Object"];
    });
  }

  GetEquipmentIdByName(EquipmenttypeId) {
    let Result = this.ObjEquipmentList.filter(
      (f) => f["EquipmentTypeId"] == EquipmenttypeId.value
    );
    this.ObjEquipmentListNew = Result;
  }

  GetEquipmentMaintenanceList(
    EqsEquipmentId //after saving method
  ) {



    this.ObjMaintenanceListNewRec = null;
    this._eqsMaintenanceService
      .GetEquipmentAndMaintenanceType(EqsEquipmentId)
      .subscribe((data) => {
        this.ObjMaintenanceListNewRec = data["Object"];
        for (var i = 0; i < this.ObjMaintenanceListNewRec.length; i++) {
          if (
            this.ObjMaintenanceListNewRec[i]["EqsMaintenanceDueDate"] != null
          ) {
            this.ObjMaintenanceListNewRec[i][
              "EqsMaintenanceDueDate"
            ] = new Date(
              this.ObjMaintenanceListNewRec[i]["EqsMaintenanceDueDate"]
            );
          }
        }
        this.ObjMaintenanceListNewRec = DataUtil.parse.parseJson(
          this.ObjMaintenanceListNewRec
        );
      });
  }

  //to bind grid data on change of equipment id
  async GetEquipmentListById(EqsEquipmentId) {
    let Result = [];
    let EqsId ;
    let Result2 = [];
    let saveMaintenanceFlag = false;
    this.flag = false;
    this.show = true;
    this.ObjMaintenanceListNew = null;
    let newarray = [];
    if (isNullOrUndefined(EqsEquipmentId.value)) {
      //save and update
      Result = this.ObjMaintenanceList.filter(
        (f) => f["EqsEquipmentId"] == EqsEquipmentId
      );
       EqsId = EqsEquipmentId
       saveMaintenanceFlag = true;
     
    } else {
      Result = this.ObjMaintenanceList.filter(
        (f) => f["EqsEquipmentId"] == EqsEquipmentId.value
      );
      EqsId = EqsEquipmentId.value
      saveMaintenanceFlag = false;
     
    }
   // console.log("Result :",Result)


    await this._eqsMaintenanceService
      .GetEquipmentAndMaintenanceType(EqsId)
      .subscribe((data) => {
        Result2 = data["Object"];
       // console.log("Result2 :",Result2)
        for (var i = 0; i < Result2.length; i++) {
          if (Result2[i]["EqsMaintenanceDueDate"] != null) {
            Result2[i]["EqsMaintenanceDueDate"] = new Date(
              Result2[i]["EqsMaintenanceDueDate"]
            );
          }
        }
        Result2 = DataUtil.parse.parseJson(Result2); 

        Result = [ ...Result, ...Result2];
    //  });

     

      if (  saveMaintenanceFlag == false)
      {
        if(Result.length > 0)
        {
          let AnnualMaintenanceFlag = false;
          let BreakDownMaintenanceFlag = false;
          let PreventiveMaintenanceFlag = false;

          let AnnualMaintenanceId = null;
          let BreakDownMaintenanceId = null;
          let PreventiveMaintenanceId = null;
          let EqsEquipmentIdSave = null;

          var ObjMaintenance = {
            AnnualId: null,
            BreakDownnId: null,
            PreventiveId: null,
            EqsEquipmentId : null,
          };

          for(var i=0 ; i< Result.length ;i++)
          {
            EqsEquipmentIdSave =  Result[i].EqsEquipmentId;
            if(Result[i].MaintenanceTypeMasterId == 1 &&  Result[i].EqsMaintenancePerformDate == null)
            {
              AnnualMaintenanceFlag = true   
            }   
           else if(Result[i].MaintenanceTypeMasterId == 2 &&  Result[i].EqsMaintenancePerformDate == null)
            {
              BreakDownMaintenanceFlag = true             
            }   
           else if(Result[i].MaintenanceTypeMasterId == 3 &&  Result[i].EqsMaintenancePerformDate == null)
            {
              PreventiveMaintenanceFlag = true           
            } 

            if(Result[i].MaintenanceTypeMasterId == 1)
            {             
              AnnualMaintenanceId = Result[i].MaintenanceTypeMasterId              
            }   
           else if(Result[i].MaintenanceTypeMasterId == 2 )
            {             
              BreakDownMaintenanceId = Result[i].MaintenanceTypeMasterId
            }   
           else if(Result[i].MaintenanceTypeMasterId == 3 )
            {             
              PreventiveMaintenanceId = Result[i].MaintenanceTypeMasterId
            }  
          }

          if(AnnualMaintenanceFlag == false &&  BreakDownMaintenanceFlag == false && PreventiveMaintenanceFlag == false)
          {
            ObjMaintenance.AnnualId = AnnualMaintenanceId
            ObjMaintenance.BreakDownnId = BreakDownMaintenanceId
            ObjMaintenance.PreventiveId = PreventiveMaintenanceId
            ObjMaintenance.EqsEquipmentId = EqsEquipmentIdSave

            this._eqsMaintenanceService
            .SaveMaintenanceRecord(ObjMaintenance)
            .subscribe((res) => {
              if (res["Result"]) {
                this.flag = true;               
                this.id = ObjMaintenance.EqsEquipmentId;
               // console.log("Equipment Id update :", ObjMaintenance.EqsEquipmentId);

            this.GetMaintenanceList();
              } else {
              }
            });
          }
          else
          {
            let flag2 = false;
            if(AnnualMaintenanceFlag == false )
            {
              ObjMaintenance.AnnualId = AnnualMaintenanceId
              flag2 = true
            }
            if(BreakDownMaintenanceFlag == false)
            {
              ObjMaintenance.BreakDownnId = BreakDownMaintenanceId
              flag2 = true
            }
            if(PreventiveMaintenanceFlag == false)
            {
              ObjMaintenance.PreventiveId = PreventiveMaintenanceId
              flag2 = true
            }
            ObjMaintenance.EqsEquipmentId = EqsEquipmentIdSave

            if( flag2 == true)
            {
              this._eqsMaintenanceService
              .SaveMaintenanceRecord(ObjMaintenance)
              .subscribe((res) => {
                if (res["Result"]) {
                  this.flag = true;               
                  this.id = ObjMaintenance.EqsEquipmentId;
                 // console.log("Equipment Id update :", ObjMaintenance.EqsEquipmentId);

              this.GetMaintenanceList();
                } else {
                }
              });
          }
          }

        }
      }
      this.ObjMaintenanceListNew = Result;
      if(this.ObjMaintenanceListNew.length ==0)
      {
        this.toastr.warning("Maintenance is not added for this Equipment. Please Add Maintenance for this Equipment.");
     
      }
    });
     // this.ObjMaintenanceListNew = Result;
    
  }

  ShowRecordOnAddMaintenance(args, flag): void {
  
    if (this.ObjMaintenanceListNew != null) {
     /*  this.MaintenanceForm.patchValue({
        EqsEquipmentId: args["rowData"]["EqsEquipmentId"],
        EquipmentId: args["rowData"]["EquipmentId"],
        EquipmentTypeId: args["rowData"]["EquipmentTypeId"],
        MaintenanceTypeMasterId: args["rowData"]["MaintenanceTypeMasterId"],
      });
      this.ObjEquipmentTypeName = args["rowData"]["EquipmentTypeName"]; */
      this.MaintenanceForm.patchValue({
        EqsEquipmentId: args["EqsEquipmentId"],
        EquipmentId: args["EquipmentId"],
        EquipmentTypeId: args["EquipmentTypeId"],
        MaintenanceTypeMasterId: args["MaintenanceTypeMasterId"],
      });
      this.ObjEquipmentTypeName = args["EquipmentTypeName"];
    }
  }

  rowDataBound(args) {
    /* console.log("args in rowDatabound :", args)
    args.row.querySelector(
      ".e-unboundcell .e-add"
    ).parentElement.ej2_instances[0].content = "";

    this.HideIcon(args); */
   
   
  }


  HideIcon(args)
  {
    if( args["data"]["EqsMaintenancePerformDate"] != null)
    {
      let element =args.row
      .getElementsByClassName("e-add")[0];

      element.classList.add("e-hide");
      element.classList.remove("e-add");
      
    }
   
  }

  addMaintennace(event, data)
  {
    this.openAddModal(this.MaintenanceModal);
    if (data["EqsMaintenanceRecordId"] > 0) {
      this.editMaintenance(data["EqsMaintenanceRecordId"], true);
      this.ObjEquipmentTypeName = this.ObjMaintenanceListNew[0][
        "EquipmentTypeName"
      ];
    } else {
      this.ShowRecordOnAddMaintenance(data, true);
    }
  }


  EditMaintennace(event, data)
  {   
    this.openAddModal(this.MaintenanceModal);
    this.editMaintenance(data["EqsMaintenanceRecordId"], false);
  }

 GetEquipmentTypeByEquipmentId(event)
 { 
   /* let result =  this.ObjEquipmentTypeList.filter( 
    (f) => f["Id"] == event['itemData']['EquipmentTypeId']
  );  
  this.ObjEquipmentTypeList = result */
 }

 queryCellInfo(args) {
   
  if( args["data"]["MaintenanceMasterType"] == "BreakDown")
  {
      if (args.column.field === "EqsMaintenanceNextDueDate" && args.cell.innerText == "") {
        args.cell.innerText = "NA";
      }
      if (args.column.field === "EqsMaintenanceDueDate" && args.cell.innerText == "") {
        args.cell.innerText = "NA";
      }
  }
}

}
