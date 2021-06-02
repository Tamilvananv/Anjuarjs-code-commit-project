import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';

@Injectable({
  providedIn: 'root',
})
export class CommonListService {
  // readonly _urlIcsCommon = environment.apiUrl + '/api/ICSCommon/';
  constructor(private _http: HttpClient, private _toastr: ToastrService) { }

  public monthsList: object[] = [
    { Name: 'Select', Id: 0}, { Name: '1', Id: 1 }, { Name: '2', Id: 2 },
    { Name: '3', Id: 3 }, { Name: '4', Id: 4 }, { Name: '5', Id: 5 }, { Name: '6', Id: 6 },
    { Name: '7', Id: 7 }, { Name: '8', Id: 8 }, { Name: '9', Id: 9 }, { Name: '10', Id: 10 },
    { Name: '11', Id: 11 }, { Name: '12', Id: 12 }];
  public monthsWithNAList: object[] = [
    { Name: 'Select', Id: '0' }, { Name: 'NA', Id: '-1' }, { Name: '1', Id: '1' }, { Name: '2', Id: '2' },
    { Name: '3', Id: '3' }, { Name: '4', Id: '4' }, { Name: '5', Id: '5' }, { Name: '6', Id: '6' },
    { Name: '7', Id: '7' }, { Name: '8', Id: '8' }, { Name: '9', Id: '9' }, { Name: '10', Id: '10' },
    { Name: '11', Id: '11' }, { Name: '12', Id: '12' }];

  GetMonthList() {
    return this.monthsList;
  }
  GetMonthsWithNAList() {
    return this.monthsWithNAList;
  }

  public tools: ToolbarModule = {
    type: 'Expand',
    items: ['Bold', 'Italic', 'Underline', '|', 'Formats', 'Alignments',
      'OrderedList', 'UnorderedList', '|', 'CreateLink', 'Image', '|', 'SourceCode',
      'Undo', 'Redo', 'FontColor', 'BackgroundColor', 'StrikeThrough', 'FontName',
      'FontSize', 'CreateTable', 'Print', 'LowerCase', 'UpperCase', '|', 'Outdent',
      'Indent', '|', 'ClearFormat', 'SourceCode', 'FullScreen', '|',
      {
        tooltipText: 'Save Template',
        template: ' <span><i class="ti-save"></i></span>'
      }, {
        tooltipText: 'Import Template',
        template: ' <span><i class="ti-import"></i></span>'
      }]
  };

  GetTools() {
    return this.tools;
  }
}
