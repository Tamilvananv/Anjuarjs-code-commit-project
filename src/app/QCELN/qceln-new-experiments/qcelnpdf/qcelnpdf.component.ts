import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DocumentEditor } from '@syncfusion/ej2-angular-documenteditor';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { QCExperimentService } from '../service/qcelnexperiment.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-qcelnpdf',
  templateUrl: './qcelnpdf.component.html',
  styleUrls: ['./qcelnpdf.component.css']
})
export class QCElnpdfComponent implements OnInit {
  @Input() pdfData: {};
  currentDate: Date;
  applicationUrl: string = environment.apiUrl;
  constructor(
    private _DomSanitizationService: DomSanitizer,
    private _http: HttpClient,
    private _elnExperimentService: QCExperimentService,
    private modalService: NgbModal,
  ) { }

  ngOnInit() {
    this.currentDate = new Date();
  }

  loadFile(fileUrl) {
    return environment.apiUrl + '/FileManager/GetAWSFile?filePath=' + fileUrl;
  }

  sanitizeImageUrl(imageUrl: string): SafeUrl {
    return this._DomSanitizationService.bypassSecurityTrustUrl(imageUrl);
  }

  onCreate(contnent, ctrlId: string) {
    if (contnent !== undefined && contnent != "" && contnent != null) {
      let obj = { htmlContent: contnent };
      this._elnExperimentService.getSftdToHtml(obj).subscribe((data: string) => {
        document.getElementById('html' + ctrlId).innerHTML = data;
        setTimeout(() => {
          document.getElementById('editor' + ctrlId).remove();
        });
      });
    } else {
      document.getElementById('html' + ctrlId).innerHTML = "";
      setTimeout(() => {
        document.getElementById('editor' + ctrlId).remove();
      });
    }
  }

  convertBlobToBase64(blob: Blob) {
    return Observable.create(observer => {
      const reader = new FileReader();
      const binaryString = reader.readAsDataURL(blob);
      reader.onload = (event: any) => {
        console.log('Image in Base64: ', event.target.result);
        observer.next(event.target.result);
        observer.complete();
      };

      reader.onerror = (event: any) => {
        console.log("File could not be read: " + event.target.error.code);
        observer.next(event.target.error.code);
        observer.complete();
      };
    });
  }
}
