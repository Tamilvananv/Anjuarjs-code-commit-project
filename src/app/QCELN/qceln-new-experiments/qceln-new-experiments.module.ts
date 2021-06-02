import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QCElnNewExperimentsRoutingModule } from './qceln-new-experiments-routing.module';
import { QCElnNewExperimentsComponent } from './qceln-new-experiments.component';
import { QCElnExperimentsAttachmentComponent } from './qceln-experiments-attachment/qceln-experiments-attachment.component';
import { QCElnProcessSummaryComponent } from './qceln-experiments-process-result/qceln-experiments-process-result.component';
import { QCElnSignSubmitsComponent } from './qceln-sign-submits/qceln-sign-submits.component';
import { QCElnPrecautionsComponent } from './qceln-precautions/qceln-precautions.component';
import { QCElnSopComponent } from './qceln-sop/qceln-sop.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { ComboBoxModule } from '@syncfusion/ej2-angular-dropdowns';
import { DateRangePickerModule, DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { LinkService, ImageService, HtmlEditorService, RichTextEditorAllModule, TableService } from '@syncfusion/ej2-angular-richtexteditor';
import { TextBoxModule, UploaderModule } from '@syncfusion/ej2-angular-inputs';
import { HttpModule, JsonpModule } from '@angular/http';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { FileManagerModule, FileManagerAllModule, NavigationPaneService, ToolbarService, DetailsViewService } from '@syncfusion/ej2-angular-filemanager';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { SignaturePadModule } from 'angular2-signaturepad';
import { QCElnHeaderComponent } from './qceln-header/qceln-header.component';
import { QCElnIceqimDetailsComponent } from './qceln-iceqim-details/qceln-iceqim-details.component';
import { elnDataService } from './service/qcelnexperiment.data.service';
import { MyCommonModule } from 'src/app/Shared Services etc/my-common/my-common.module';
import { DocumentEditorAllModule, DocumentEditorContainerAllModule } from '@syncfusion/ej2-angular-documenteditor';
import { LoginService } from 'src/app/login/Service/login.service';
import { QCElnpdfComponent } from './qcelnpdf/qcelnpdf.component';
import { QCElnSampleInformationComponent } from './qceln-sample-information/qceln-sample-information.component';

@NgModule({
  declarations: [QCElnNewExperimentsComponent,
    QCElnExperimentsAttachmentComponent,
    QCElnProcessSummaryComponent,
    QCElnSignSubmitsComponent,
    QCElnSampleInformationComponent,
    QCElnIceqimDetailsComponent,
    QCElnPrecautionsComponent,
    QCElnSopComponent,
    QCElnpdfComponent,
    QCElnHeaderComponent],
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
    QCElnNewExperimentsRoutingModule,
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
    NavigationPaneService, ToolbarService, DetailsViewService],
})
export class QCElnNewExperimentsModule { }
