import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ElnNewExperimentsRoutingModule } from './eln-new-experiments-routing.module';
import { ElnNewExperimentsComponent } from './eln-new-experiments.component';
import { ElnExperimentsAttachmentComponent } from './eln-experiments-attachment/eln-experiments-attachment.component';
import { ElnProcessSummaryComponent } from './eln-experiments-process-result/eln-experiments-process-result.component';
import { ElnSignSubmitsComponent } from './eln-sign-submits/eln-sign-submits.component';
import { ElnPrecautionsComponent } from './eln-precautions/eln-precautions.component';
import { ElnSopComponent } from './eln-sop/eln-sop.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { ComboBoxModule } from '@syncfusion/ej2-angular-dropdowns';
import { DateRangePickerModule, DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { FreezeService, GridModule, SelectionService } from '@syncfusion/ej2-angular-grids';
import { LinkService, ImageService, HtmlEditorService, RichTextEditorAllModule, TableService } from '@syncfusion/ej2-angular-richtexteditor';
import { TextBoxModule, UploaderModule } from '@syncfusion/ej2-angular-inputs';
import { HttpModule, JsonpModule } from '@angular/http';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { FileManagerModule, FileManagerAllModule, NavigationPaneService, ToolbarService, DetailsViewService } from '@syncfusion/ej2-angular-filemanager';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { SignaturePadModule } from 'angular2-signaturepad';
import { ElnHeaderComponent } from './eln-header/eln-header.component';
import { ElnIceqimDetailsComponent } from './eln-iceqim-details/eln-iceqim-details.component';
import { elnDataService } from './service/experiment.data.service';
import { MyCommonModule } from 'src/app/Shared Services etc/my-common/my-common.module';
import { DocumentEditorAllModule, DocumentEditorContainerAllModule } from '@syncfusion/ej2-angular-documenteditor';
import { LoginService } from 'src/app/login/Service/login.service';
import { ElnpdfComponent } from './elnpdf/elnpdf.component';

@NgModule({
  declarations: [ElnNewExperimentsComponent,
    ElnExperimentsAttachmentComponent,
    ElnProcessSummaryComponent,
    ElnSignSubmitsComponent,
    ElnIceqimDetailsComponent,
    ElnPrecautionsComponent,
    ElnSopComponent,
    ElnpdfComponent,
    ElnHeaderComponent],
  imports: [
    DatePickerModule,
    UploaderModule,
    CommonModule,
    MyCommonModule,
    FormsModule,
    FileManagerAllModule,
    FileManagerModule,
    ReactiveFormsModule,
    DocumentEditorAllModule, DocumentEditorContainerAllModule,
    ElnNewExperimentsRoutingModule,
    NgbModule /** for tab */,
    DropDownListModule,
    ComboBoxModule, DateRangePickerModule,
    GridModule,
    RichTextEditorAllModule, TextBoxModule, HttpModule, JsonpModule, DialogModule,
    ButtonModule,
    SignaturePadModule,
    FormsModule
  ],
  providers: [TableService, LoginService, elnDataService, LinkService, ImageService, HtmlEditorService,
    NavigationPaneService, ToolbarService, DetailsViewService,FreezeService, SelectionService],
})
export class ElnNewExperimentsModule { }
