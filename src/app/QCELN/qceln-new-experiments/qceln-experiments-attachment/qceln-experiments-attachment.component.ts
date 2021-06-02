import { Component, OnInit, ViewChild, EventEmitter, Output, AfterViewInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AjaxSettingsModel, SearchSettingsModel } from '@syncfusion/ej2-filemanager';
import { FileManagerComponent, NavigationPaneService, ToolbarService, DetailsViewService } from '@syncfusion/ej2-angular-filemanager';
import { ExpVersionEnt } from "../service/qcelnexperiment.model";
import { elnDataService } from "../service/qcelnexperiment.data.service";

@Component({
  selector: 'app-qceln-experiments-attachment',
  templateUrl: './qceln-experiments-attachment.component.html',
  styleUrls: ['./qceln-experiments-attachment.component.css'],
  providers: [NavigationPaneService, ToolbarService, DetailsViewService]
})
export class QCElnExperimentsAttachmentComponent implements OnInit, AfterViewInit {
  @ViewChild('fileManagerCtrl', { static: false }) public fileManagerCtrl: FileManagerComponent;
  @Output('goToTab') parentTabMove: EventEmitter<string> = new EventEmitter<string>();
  public ajaxSettings: AjaxSettingsModel;
  public searchSettings: SearchSettingsModel;
  public contextMenuSettings: object;
  public navigationPaneSettings: object;
  public toolbarSettings: object;
  public showHiddenItems: boolean = true;
  public showFileManager: boolean = true;
  public _restApi = environment.apiUrl + '/FileManager/';
  expVersionObj: ExpVersionEnt = {
    ExperimentId: null, VersionId: null, IsAllowEdit: true, IsSendForApproval: false,  VersionNo: null,

    IsRework: false, StatusCode: 'N', IsFavourite: false, IsAllowDiscontinue: false
  };

  constructor(
    private data: elnDataService,
  ) { }
  public ngOnInit(): void {
    this.data.currenntVersionObj.subscribe(obj => {
      this.expVersionObj = obj;
      this.initFileManager();
    });
  }

  ngAfterViewInit() {
    //this.fileManagerCtrl.refresh();
  }

  initFileManager() {
    this.ajaxSettings = {
      url: this._restApi + 'FileOperations',
      getImageUrl: this._restApi + 'GetImage',
      uploadUrl: this._restApi + 'Upload',
      downloadUrl: this._restApi + 'Download'
    };
    this.searchSettings = {
      allowSearchOnTyping: false
    };
    this.navigationPaneSettings = { maxWidth: '850px', minWidth: '140px', visible: true };
    this.contextMenuSettings = { file: ['Open', '|', 'Details'], folder: ['Open', '|', 'Details'], layout: ['SortBy', 'View', 'Refresh', '|', 'Details', '|'], visible: true };
    let toolBarList = [ 'Cut', 'Copy', 'Paste', 'Download', 'Rename', 'SortBy', 'Refresh', 'Selection', 'View', 'Details'];
    if (this.expVersionObj.IsAllowEdit) {
      toolBarList.push('NewFolder');
      toolBarList.push('Upload');
      if (this.expVersionObj.StatusCode == 'N') {
        toolBarList.push('Delete');
      }
    }
    this.toolbarSettings = { items: toolBarList, visible: true };
    this.showHiddenItems = true;
  }

  moveToTab(tabToMove) {
    this.parentTabMove.emit(tabToMove);
  }

  successFunction(resp) {
    console.log(resp);
  }

  beforeSend(args) {
    // Get the value of Dropdownlist.
    let restrictedPath = "qceln/e_" + (this.expVersionObj.ExperimentId > 0 ? this.expVersionObj.ExperimentId.toString() : "") +
      "/v_" + (this.expVersionObj.VersionId > 0 ? this.expVersionObj.VersionId.toString() : "") + '/elnattachment';
    if (args["name"] == 'beforeImageLoad' && args['imageUrl'].indexOf(restrictedPath) == -1) {
      let indexOfPath = args['imageUrl'].indexOf('path=') + 5;
      args["imageUrl"] = args['imageUrl'].substring(0, indexOfPath) + restrictedPath + args['imageUrl'].substring(indexOfPath);
    } else if (args.name == "beforeDownload") {
      if (args.data["path"].indexOf(restrictedPath) == -1) {
        args.data["path"] = restrictedPath + args.data["path"];
      }
    } else {
      var data = JSON.parse(args.ajaxSettings.data);
      if (args["action"] == 'Upload') {
        if (data[0]["path"].indexOf(restrictedPath) == -1) {
          data[0]["path"] = restrictedPath + data[0]["path"];
        }
      } else if (data["path"].indexOf(restrictedPath) == -1) {
        data["path"] = restrictedPath + data["path"];
        if (args["action"] == 'move') {
          data["targetPath"] = restrictedPath + data["targetPath"];
        }else if (args["action"] == 'copy') {
          data["targetPath"] = restrictedPath + data["targetPath"];
        }
      }
      args.ajaxSettings.data = JSON.stringify(data);
    }

  }
}