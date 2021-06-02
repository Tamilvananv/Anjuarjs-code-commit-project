import { Component, Input, ViewChild, OnInit, ViewEncapsulation, EventEmitter, Output } from '@angular/core';
import { ToolbarService, SfdtExportService, EditorService, SelectionService, CommentDeleteEventArgs, DocumentEditorContainerComponent, ToolbarItem } from '@syncfusion/ej2-angular-documenteditor';
import { DialogUtility } from '@syncfusion/ej2-popups';
import { TitleBar } from 'src/app/shared HTML/document-editor/title.bar';
import { environment } from 'src/environments/environment';
import { DocumentEditorAppConfiguration } from './app-document-editor-model';
@Component({
    selector: 'app-document-editor',
    templateUrl: './app-document-editor-component.html',
    providers: [ToolbarService, EditorService, SelectionService, SfdtExportService],
    encapsulation: ViewEncapsulation.None
})

export class DocumentEditorAppComponent implements OnInit {
    @Input('id') public ctrlId: string;
    @Input('title') public title: string;
    @Input('content') public content: string;
    @Output('onContentChange') public contentchanged: EventEmitter<boolean> = new EventEmitter<boolean>();;
    @Input('configuration') public configuration: DocumentEditorAppConfiguration;
    @ViewChild('documenteditor_default', { static: false }) public container: DocumentEditorContainerComponent;
    public culture: string = 'en-US';
    titleBar: TitleBar;
    private IsDataLoaded = false;
    private toolbarList: string[] = [
        //"New", "Open", "Separator", 
        "Undo", "Redo", "Separator", "Image", "Table",
        "Hyperlink", "Bookmark", "TableOfContents", "Separator", "Header", "Footer",
        "PageSetup", "PageNumber", "Break", "Separator", "Find", "Separator", "Comments",
        "TrackChanges", "Separator", "LocalClipboard",
        //"RestrictEditing", "Separator", 
        //"FormFields", "UpdateFields"
    ];
    onCreate(): void {
        let titleBarElement: HTMLElement = document.getElementById('default_title_bar' + this.title);
        this.titleBar = new TitleBar(titleBarElement, this.container.documentEditor, true);
        this.container.serviceUrl = environment.apiUrl + '/api/DocumentEditor/';
        this.container.documentEditor.serviceUrl = environment.apiUrl + '/api/DocumentEditor/';
        this.container.documentEditor.documentName = this.title;
        this.titleBar.updateDocumentTitle();
        this.configureDocumentEditor(this.container);
    }

    configureDocumentEditor(container: DocumentEditorContainerComponent) {
        this.IsDataLoaded=false;
        container.documentEditor.spellChecker.languageID = 1033 //LCID of "en-us";
        container.documentEditor.spellChecker.removeUnderline = false;
        container.documentEditor.spellChecker.allowSpellCheckAndSuggestion = true;
        container.documentEditor.enableComment = this.configuration.allowComment;
        let custometoolbar = <string[]>JSON.parse(JSON.stringify(this.toolbarList));
        if (this.configuration.allowEdit == false) {
            container.restrictEditing = true;
            container.showPropertiesPane = false;
            let index = custometoolbar.indexOf("RestrictEditing");
            custometoolbar.splice(index, 1);
            container.documentEditor.showComments = container.documentEditor.enableComment;
            if (container.documentEditor.enableComment) {
                container.toolbarModule.reInitToolbarItems(["Comments", "Find"]);
            } else {
                container.toolbarModule.reInitToolbarItems(["Find"]);
            }
        }
        if (container.documentEditor.enableComment == false) {
            let index = custometoolbar.indexOf("Comments");
            custometoolbar.splice(index, 1);
        }
        container.documentEditor.enableTrackChanges = this.configuration.allowTrackChanges;
        if (container.documentEditor.enableTrackChanges == false) {
            let index = custometoolbar.indexOf("TrackChanges");
            custometoolbar.splice(index, 1);
        }
        let arraList = custometoolbar as [];
        container.toolbarModule.reInitToolbarItems(arraList);
        container.documentEditor.currentUser = this.configuration.currentUser;
        if (this.content != undefined && this.IsDataLoaded == false && this.content.length > 0) {
            container.documentEditor.open(this.content);
        }
        this.IsDataLoaded = true;
    }

    onContentChange(): void {
        if (this.IsDataLoaded) {
            this.contentchanged.emit(this.configuration.allowEdit);
        }
    }

    beforeCommentBegin(args: CommentDeleteEventArgs): void {
        if (args['type'] != 'Reply') {
            if (args.author !== this.container.documentEditor.currentUser) {
                args.cancel = true;
                DialogUtility.alert({
                    title: 'Not Allowed',
                    content: 'You are not allowed to ' + args['type'].toLowerCase() + ', Only the author of the comment can ' + args['type'].toLowerCase() + ' it.',
                    showCloseIcon: true,
                    closeOnEscape: true,
                });
            }
        }
    }

    ngOnInit() {
    }
}