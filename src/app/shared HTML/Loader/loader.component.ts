// my-loader.component.ts
import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/Shared Services etc/Services/loader.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './loader.component.html'
})
export class LoaderComponent implements OnInit {

  loading: boolean;

  constructor(private loaderService: LoaderService) {

    this.loaderService.isLoading.subscribe((v) => {
      this.loading = v;
    });

  }
  ngOnInit() {
  }
}

