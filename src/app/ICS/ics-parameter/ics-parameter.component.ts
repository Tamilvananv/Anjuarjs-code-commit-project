import { Component, AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import {
  GridLine, FilterSettingsModel, EditSettingsModel, CommandClickEventArgs
  , CommandModel, ToolbarItems, GridComponent, GroupSettingsModel, ExcelExportProperties,PdfExportProperties
} from '@syncfusion/ej2-angular-grids';
import { IcsParameterService } from './service/ics-parameter.service';
import { ParameterEnt } from './service/ics-parameter.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClickEventArgs } from '@syncfusion/ej2-angular-navigations';
import { FormErrorDisplayService } from 'src/app/Shared Services etc/FormValidation/form-error-display-service';
import { isUndefined, isNullOrUndefined } from 'util';
import { IcsCommonService } from 'src/app/Shared Services etc/Services/IcsCommonService/IcsCommon.service';
import { customFont } from 'src/app/EQS/eqs-parameter/font';
import { PdfTrueTypeFont } from '@syncfusion/ej2-pdf-export';
@Component({
  selector: 'app-ics-parameter',
  templateUrl: './ics-parameter.component.html',
  styleUrls: ['./ics-parameter.component.css']
})
export class IcsParameterComponent implements AfterViewInit {
  @ViewChild("grid", { static: false }) public grid: GridComponent;
  closeResult: string;
  public filterOptions: FilterSettingsModel;
  ParameterForm: FormGroup;
  public lines: GridLine;
  public ObjInstrumentList: object;
  public ObjParameterList: object;
  public fields: Object = { text: 'Name', value: 'Id' };
  public objInstrumentType: Object;
  // public editSettings: EditSettingsModel;
  public toolbar: ToolbarItems[];
  public IsParameterEdit = false;
  public commands: CommandModel[];
  public toolbarOptions: ToolbarItems[];
  public pageSettings: Object;
  public groupOptions: GroupSettingsModel;
  public PageAccessRight: object = {};
  public Dateformat:any;
  public ObjInstrumentTypeName:string
  constructor(private modalService: NgbModal
    , private _toastr: ToastrService
    , private _parameterService: IcsParameterService
    , private formBuilder: FormBuilder
    , private formErrorDisplay: FormErrorDisplayService
    , private _icsCommonService: IcsCommonService) { }
  ngOnInit(): void {

    this._parameterService.getAccessRight().subscribe((data) => {
      this.PageAccessRight = data["Object"];
      if (this.PageAccessRight["HasWriteAccess"] == false) {
        this.grid.hideColumns(["Action"]);
      }
    });

    this.GetParameterList();
    this.GetInstrumentList();
    this.SetForm();
    // this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog' };
    this.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel', 'Search'];
    // this.editSettings = { allowEditing: true, allowDeleting: true };
    // this.commands = [{ buttonOption: { content: 'Edit', cssClass: 'edit_link' } }];
    this.commands = [{ type: 'Edit', buttonOption: { iconCss: ' fa fa-edit', cssClass: 'e-flat' } }];
    this.lines = 'Both';
    this.filterOptions = {
      type: 'Menu'
    };

    this.Dateformat={type:'date',format:'dd-MMM-yyyy'}
    this.toolbarOptions = [ 'ExcelExport', 'Search','PdfExport'];//"PdfExport"
    this.pageSettings = { pageSizes: 10 };
    
    this.groupOptions = { showGroupedColumn: true };
     this.objInstrumentType['Name']=null;
  }
  toolbarClick(args: ClickEventArgs): void {
    switch (args.item.id) {
      case 'Grid_excelexport':
        const excelExportProperties: ExcelExportProperties = {
          fileName: 'Instrument_Parameter.xlsx'
      };
      var ObjAudit = { 
        FeatureName:"Parameter", 
        Description:"Excel Report Is Downloaded." 
     };
      this._parameterService.SaveReportDownloadLogInAudit(ObjAudit).subscribe((res) => {
        if (res["Result"]) {
          this.grid.excelExport(excelExportProperties);
        } else {    
        }
      });    
        break;
        case "Grid_pdfexport":
          const pdfExportProperties: PdfExportProperties = {
            fileName: "Instrument_Parameter.pdf",
            pageOrientation: 'Landscape',
            theme: {
              header: { font: new PdfTrueTypeFont(customFont, 12) },
              caption: { font: new PdfTrueTypeFont(customFont, 10) },
              record: { font: new PdfTrueTypeFont(customFont, 9) }
          }
          }; 
          var ObjAudit = { 
            FeatureName:"Parameter", 
            Description:"Pdf Report Is Downloaded." 
         };
          this._parameterService.SaveReportDownloadLogInAudit(ObjAudit).subscribe((res) => {
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
    gridElement.querySelector(".e-toolbar-item .e-input-group").appendChild(span);
  }
  public cancelBtnClick(args) {
    this.grid.searchSettings.key = "";
    (this.grid.element.querySelector(".e-input-group.e-search .e-input") as any).value = "";
  }
  ngAfterViewInit() { }
  SetForm() {
    this.ParameterForm = this.formBuilder.group({
      ParameterId: [''],
      IcsInstrumentID: ['', Validators.required],
      ParameterName: ['', Validators.required],
      TargetValue: [''],
      UpperValue: [''],
      LowerValue: [''],
      Unit:['',Validators.required]
    });
  }
  resetForm() {
    this.ParameterForm.reset();
  }

  OpenaddparameterModal(content) {
    this.IsParameterEdit = false;
     this.objInstrumentType=[];
     this.ObjInstrumentTypeName = null;
    this.resetForm();
    this.modalService.open(content, {
      centered: true, size: 'lg', backdrop: 'static',
      keyboard: false
    }).result.then(
      result => {
        this.closeResult = `Closed with: ${result}`;
      },
      reason => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }
  EditParameter(args: CommandClickEventArgs): void {
    this._parameterService.GetQualificationDetail(args['rowData']['ParameterId']).subscribe((data) => {
      const ParameterDetail = data['Object'] as ParameterEnt;
      this.ParameterForm.patchValue({
        IcsInstrumentID: ParameterDetail.IcsInstrumentID,
        ParameterId: ParameterDetail.ParameterId,
        ParameterName: ParameterDetail.ParameterName,
        TargetValue: ParameterDetail.TargetValue,
        UpperValue: ParameterDetail.UpperValue,
        LowerValue: ParameterDetail.LowerValue,
        Unit: ParameterDetail.Unit
      });
      this.IsParameterEdit = true;
      this.ObjInstrumentTypeName = ParameterDetail.InstrumentType;
    });
  }
  closeAddParameterModal() {
    this.modalService.dismissAll();
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  GetInstrumentList() {
    this._icsCommonService.GetInstrumentList().subscribe((data) => {
      this.ObjInstrumentList = data['Object'];
    });
  }
  GetParameterList() {
    this._parameterService.GetParameterList().subscribe((data) => {
      this.ObjParameterList = data['Object'];
    });
  }
  GetInstrumentTypeById(InstrumentId) {
    this._icsCommonService.GetInstrumentTypeById(InstrumentId.value).subscribe((data) => {
      this.objInstrumentType = data['Object'];
      this.ObjInstrumentTypeName = this.objInstrumentType['Name'];
    });
  }
  SaveParameter() {
    if (this.ParameterForm.valid) {
      const ValidateRes = this._parameterService.ValidateRange(this.ParameterForm.value);
      if (ValidateRes) {
        this._parameterService.SaveParameter(this.ParameterForm.value).subscribe(res => {
          if (res['Result']) {
            this._toastr.success(res['ResultMessage']);
            this.GetParameterList();
            this.resetForm();
            this.closeAddParameterModal();
          } else {
            this._toastr.error(res['ResultMessage']);
          }
        });
      } else {
        return false;
      }
    }
    else {
      this.formErrorDisplay.showErrors(this.ParameterForm);
    }


  }
  UpdateParameter() {
    if (this.ParameterForm.valid) {
      const ValidateRes = this._parameterService.ValidateRange(this.ParameterForm.value);
      if (ValidateRes) {
        this._parameterService.UpdateParameter(this.ParameterForm.value).subscribe(res => {
          if (res['Result']) {
            this.GetParameterList();
            this.resetForm();
            this.closeAddParameterModal();
            this._toastr.success(res['ResultMessage']);
          } else {
            this._toastr.error(res['ResultMessage']);
          }
        });
      } else {
        return false;
      }
    }
    else {
      this.formErrorDisplay.showErrors(this.ParameterForm);
    }
  }
  Concatenate(event){
    console.log(event);
  }
  pdfHeaderQueryCellInfo(args: any): void {   
    args.cell.row.pdfGrid.repeatHeader = true;
  }
}
