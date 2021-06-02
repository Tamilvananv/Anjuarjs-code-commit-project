import { Component, ViewChild, OnInit, AfterViewInit, Input, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: '[print-error]',
    templateUrl: './print-error-component.html',
    encapsulation: ViewEncapsulation.None,
    providers: []
})
export class PrintErrorComponent implements OnInit, AfterViewInit {
    @Input("control") control: FormControl;
    @ViewChild('errorTooltip', { static: false }) mytooltip: NgbTooltip;
    constructor() { }
    ngOnInit(): void {
        //console.log(this.control);
    }

    ngAfterViewInit() {
        this.control.statusChanges.subscribe(() => {
            //this.mytooltip.toggle();
            if (this.control.invalid && this.control.dirty) {
                //this.mytooltip.triggers='auto';
                this.mytooltip.open();
            } else {
               this.mytooltip.close();
            }
        })
    }
}