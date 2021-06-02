import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumberDirective } from '../Directives/numberDIrective';
import { DisableControlDirective } from '../Directives/controlDisabledDirective';
import { YesNoPipe } from '../Pipes/yes-no.pipe';
import { RemoveCharPipe } from '../Pipes/remove_char.pipe';
import { Filterlist } from '../Pipes/app.filter-list';
import { PrintErrorComponent } from 'src/app/Shared Services etc/FormValidation/print-error-component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from 'src/app/login/service/login.service';
import { CommonService } from 'src/app/Shared Services etc/Services/Common.service';
import { FileNamePipe } from '../Pipes/filename.pipe';
import { DocumentEditorAppComponent } from 'src/app/shared HTML/document-editor/app-document-editor-component';
import { DocumentEditorAllModule, DocumentEditorContainerAllModule } from '@syncfusion/ej2-angular-documenteditor';
import { SecurePipe } from '../Pipes/img-secure';

@NgModule({
  declarations: [NumberDirective,DisableControlDirective,SecurePipe,YesNoPipe,RemoveCharPipe,FileNamePipe,DocumentEditorAppComponent,PrintErrorComponent,Filterlist],
  imports: [CommonModule,NgbModule,
    DocumentEditorAllModule, DocumentEditorContainerAllModule,],
  providers:[LoginService, CommonService],
  exports: [NumberDirective,DisableControlDirective,SecurePipe,YesNoPipe,RemoveCharPipe,FileNamePipe,DocumentEditorAppComponent,PrintErrorComponent,Filterlist]
})
export class MyCommonModule { }
