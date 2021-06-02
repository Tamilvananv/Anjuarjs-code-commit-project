import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { GridLine, FilterSettingsModel, EditSettingsModel, CommandClickEventArgs, CommandModel, ToolbarItems, TextWrapSettingsModel, GroupSettingsModel, ExcelExportProperties,PdfExportProperties } from '@syncfusion/ej2-grids';
import { EqsParameterService } from './service/eqs-parameter.service';
import { EqsParameter } from './service/eqs-parameter.model';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { isUndefined, isNullOrUndefined } from 'util';
import { ClickEventArgs } from '@syncfusion/ej2-angular-navigations';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormErrorDisplayService } from 'src/app/Shared Services etc/FormValidation/form-error-display-service';
import { EqsCommonService } from 'src/app/Shared Services etc/Services/EqsCommonService/EqsCommon.service';
import { PdfTrueTypeFont } from '@syncfusion/ej2-pdf-export';
import { customFont } from './font';

@Component({
  selector: 'app-eqs-parameter',
  templateUrl: './eqs-parameter.component.html',
  styleUrls: ['./eqs-parameter.component.css']
})
export class EqsParameterComponent implements AfterViewInit {
  public toolbarOptions: ToolbarItems[];
  @ViewChild('grid', { static: false }) public grid: GridComponent;
  closeResult: string;
  public filterOptions: FilterSettingsModel;
  public data: object[];
  public lines: GridLine;
  public initialPage: Object;
  public toolbar: String[];
  EqsParameterForm: FormGroup;
  public view: string;
  public hostUrl = 'https://ej2-aspcore-service.azurewebsites.net/'; // replace with or api to read and upload files
  public ajaxSettings: object;
  // public editSettings: EditSettingsModel;
  public commands: CommandModel[];
  public ObjEquipmentList: object;
  public ObjParameterList: object;
  public fields: Object = { text: 'Name', value: 'Id' };
  public objEquipmentType:Object={};
  constructor(private modalService: NgbModal
    , private _toastr: ToastrService
    , private _eqsParameterService: EqsParameterService
    , private formBuilder: FormBuilder
    ,private _eqsCommon: EqsCommonService
    , private formErrorDisplay: FormErrorDisplayService) { }
  public IsParameterEdit = false;
  public wrapSettings: TextWrapSettingsModel;
  public groupOptions: GroupSettingsModel;
  public PageAccessRight: object = {};
  public pageSettings: Object;
  public ObjEquipmentTypeName:string
  ngOnInit(): void {

    this._eqsParameterService.getAccessRight().subscribe((data) => {
      this.PageAccessRight = data["Object"];
      if (this.PageAccessRight["HasWriteAccess"] == false) {
        this.grid.hideColumns(["Action"]);
      }
    });


    this.load();
    this.setForm();
    this.commands = [{ type: 'Edit', buttonOption: { iconCss: ' fa fa-edit', cssClass: 'e-flat' } }];
    this.lines = 'Both';
    this.filterOptions = {
      type: 'Menu'
    };
    this.wrapSettings = { wrapMode: 'Content' };
    this.ajaxSettings = {
      url: this.hostUrl + 'api/FileManager/FileOperations',
      getImageUrl: this.hostUrl + 'api/FileManager/GetImage',
      uploadUrl: this.hostUrl + 'api/FileManager/Upload',
      downloadUrl: this.hostUrl + 'api/FileManager/Download'
    };
    this.view = 'Details';
    this.toolbarOptions = ['ExcelExport','Search','PdfExport'];//"PdfExport"
    this.toolbar=['Search'];
    // this.initialPage = { pageSizes: true, pageCount: 4 };
    this.pageSettings = { pageSize: 10 };
    this.groupOptions = { showGroupedColumn: true };
  }
  toolbarClick(args: ClickEventArgs): void {
    switch (args.item.id) {
      case 'Grid_excelexport':
        const excelExportProperties: ExcelExportProperties = {
          fileName: 'Equipment_Parameter.xlsx'
      };
      var ObjAudit = { 
        FeatureName:"Parameter", 
        Description:"Excel Report Is Downloaded." 
     };
      this._eqsParameterService.SaveReportDownloadLogInAudit(ObjAudit).subscribe((res) => {
        if (res["Result"]) {
          this.grid.excelExport(excelExportProperties);
        } else {    
        }
      });    
   
        break;
        case "Grid_pdfexport":
          const pdfExportProperties: PdfExportProperties = {
            fileName: "Equipment_Parameter.pdf",
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
          this._eqsParameterService.SaveReportDownloadLogInAudit(ObjAudit).subscribe((res) => {
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
  load() {
    this.GetParameterList();
    this.GetEquipmentList();
  }
  setForm() {
    this.EqsParameterForm = this.formBuilder.group({
      EqsParameterId: [''],
      EqsEquipmentId: ['', Validators.required],
      EqsParameterName: ['', Validators.required],
      EqsParameterTargetValue:  [''],
      EqsParameterUpperValue:  [''],
      EqsParameterLowerValue:  [''],
      Unit:  ['' ,Validators.required]
    });
  }
  resetForm() {
    this.EqsParameterForm.reset();
  }
  addparameter(content) {
    this.resetForm();
      this.objEquipmentType={};
      this.ObjEquipmentTypeName = null;
    this.IsParameterEdit = false;
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
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  GetEquipmentList() {
    this._eqsParameterService.GetEquipmentist().subscribe((data) => {
      this.ObjEquipmentList = data['Object'];
    });
  }
  GetParameterList() {
    this._eqsParameterService.GetParameterList().subscribe((data) => {
      this.ObjParameterList = data['Object'];
    });
  }
  GetEquipmentType(EqsEquipmentId) {
    this._eqsCommon.GetEquipmentTypeById(EqsEquipmentId.value).subscribe((data) => {
      this.objEquipmentType = data['Object'];
      this.ObjEquipmentTypeName = this.objEquipmentType['Name'];
    });

  }
  SaveParameter() {
  if (this.EqsParameterForm.valid) {
    const ValidateRes = this._eqsParameterService.ValidateRange(this.EqsParameterForm.get('EqsParameterUpperValue').value,this.EqsParameterForm.get('EqsParameterLowerValue').value ,this.EqsParameterForm.get('EqsParameterTargetValue').value );
    if (ValidateRes) {
      this._eqsParameterService.SaveParameter(this.EqsParameterForm.value).subscribe(res => {
        if (res['Result']) {
          this._toastr.success(res['ResultMessage']);
          this.GetParameterList();
          this.resetForm();
          this.closeParameterModal();
        } else {
          this._toastr.error(res['ResultMessage']);
        }
      });
    } else {
      return false;
    }
  }
  else{
    this.formErrorDisplay.showErrors(this.EqsParameterForm);
  }
  }
  closeParameterModal() {
    this.modalService.dismissAll();
  }
  EditParameter(args: CommandClickEventArgs): void {
    this._eqsParameterService.GetParameterDetail(args['rowData']['EqsParameterId']).subscribe((data) => {
      const ObjectData = data['Object'] as EqsParameter;
    if(ObjectData!=null){
        this.EqsParameterForm.patchValue({
          EqsParameterId: ObjectData.EqsParameterId,
          EqsEquipmentId:  ObjectData.EqsEquipmentId,
          EqsParameterName:  ObjectData.EqsParameterName,
          EqsParameterTargetValue:   ObjectData.EqsParameterTargetValue,
          EqsParameterUpperValue:   ObjectData.EqsParameterUpperValue,
          EqsParameterLowerValue:   ObjectData.EqsParameterLowerValue,
          Unit:   ObjectData.Unit
        });
      this.IsParameterEdit = true;
      this.ObjEquipmentTypeName = ObjectData.EquipmentTypeName;
      }
      else{
        this.EqsParameterForm.patchValue({
          EqsParameterId: null,
          EqsEquipmentId:  null,
          EqsParameterName:  null,
          EqsParameterTargetValue:   null,
          EqsParameterUpperValue:   null,
          EqsParameterLowerValue:  null,
          Unit:  null
        });
      }
    });
  }
  UpdateParameter() {
    if (this.EqsParameterForm.valid) {
      // const ValidateRes = this._eqsParameterService.ValidateRange(EqsParameterForm.EqsParameterUpperValue.toString(), EqsParameterForm.EqsParameterLowerValue.toString(), EqsParameterForm.EqsParameterTargetValue.toString());
      const ValidateRes = this._eqsParameterService.ValidateRange(this.EqsParameterForm.get('EqsParameterUpperValue').value,this.EqsParameterForm.get('EqsParameterLowerValue').value ,this.EqsParameterForm.get('EqsParameterTargetValue').value );
      if (ValidateRes) {
        this._eqsParameterService.UpdateEqsParameter(this.EqsParameterForm.value).subscribe(res => {
          if (res['Result']) {
            this._toastr.success(res['ResultMessage']);
            this.GetParameterList();
            this.resetForm();
            this.closeParameterModal();
          }
          else {
            this._toastr.warning(res['ResultMessage']);
          }
        });
      }
      else {
        return false;
      }
}
else{
  this.formErrorDisplay.showErrors(this.EqsParameterForm);
}
  }
}
