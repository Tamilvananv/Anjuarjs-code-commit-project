import * as $ from 'jquery';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FullComponent } from './layouts/full/full.component';
import { BlankComponent } from './layouts/blank/blank.component';

import { NavigationComponent } from './shared HTML/header-navigation/navigation.component';
import { BreadcrumbComponent } from './shared HTML/breadcrumb/breadcrumb.component';

import { Approutes } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoaderInterceptor } from './shared HTML/spinner.component';
import { LoaderService } from './Shared Services etc/Services/loader.service';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './Auth/auth.guard';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { SidebarIcsComponent } from './shared HTML/sidebar-ics/sidebar-ics.component';
import { LandingComponent } from './landing/landing.component';
import { HeaderComponent } from './shared HTML/header/header.component';
import { GridModule } from '@syncfusion/ej2-angular-grids';
// import { PageService, SortService, FilterService, GroupService } from '@syncfusion/ej2-angular-grids';
import { ToastrModule } from 'ngx-toastr';
import { FooterComponent } from './shared HTML/footer/footer.component';
import { DropDownButtonModule } from '@syncfusion/ej2-angular-splitbuttons';
import { AuthInterceptor } from './Auth/auth.interceptor';
import { SwitchModule } from '@syncfusion/ej2-angular-buttons';
import { MyCommonModule } from './Shared Services etc/my-common/my-common.module';
import { ConfirmationDialogComponent } from './shared HTML/confirmation-dialog/confirmation-dialog.component';
import { ConfirmationDialogService } from './shared HTML/confirmation-dialog/confirmation-dialog.component.service';
import { LoaderComponent } from './shared HTML/Loader/loader.component';
import { TooltipModule } from '@syncfusion/ej2-angular-popups';
import { FormErrorDisplayService } from './Shared Services etc/FormValidation/form-error-display-service';
// import { Filterlist } from './Shared Services etc/Pipes/app.filter-list';
import { DocumentEditorAllModule, DocumentEditorContainerAllModule } from '@syncfusion/ej2-angular-documenteditor';
import { UnauthorizeComponent } from './login/unauthorize/unauthorize.component';
import { ChangelogComponent } from './changelog/changelog.component';
import { AccordionModule } from '@syncfusion/ej2-angular-navigations';
import { PushNotificationComponent } from './Shared Services etc/PushNotification/push.notification.component';
import { PushNotificationService } from './Shared Services etc/PushNotification/push.notification.service';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { SignalRModule, SignalRConfiguration } from 'ng2-signalr';
import { environment } from 'src/environments/environment';
import { LoginService } from 'src/app/login/Service/login.service';
import { AutoCompleteModule } from '@syncfusion/ej2-angular-dropdowns';
import { EncrDecrService } from './Shared Services etc/Services/EncrDecrService';
import { MsalInterceptor, MsalModule } from '@azure/msal-angular';
import { MsalUserService } from './login/Service/msaluser.service';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UploaderModule } from '@syncfusion/ej2-angular-inputs';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
//import { ResponseComponent } from './EQMS/raise-new-request/response/response.component';
// >= v2.0.0
export function createConfig(): SignalRConfiguration {
  const c = new SignalRConfiguration();
  c.hubName = 'ChatHub';
  //c.qs = { user: 'alon' };
  c.url = environment.apiUrl;
  c.logging = true;

  // >= v5.0.0
  c.executeEventsInZone = true; // optional, default is true
  c.executeErrorsInZone = false; // optional, default is false
  c.executeStatusChangeInZone = true; // optional, default is true
  return c;
}

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelSpeed: 2,
  wheelPropagation: true,
  minScrollbarLength: 20
};

export const protectedResourceMap: any =
  [
    [environment.baseUrl, environment.scopeUri]
  ];

@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent,
    FullComponent,
    BlankComponent,
    NavigationComponent,
    BreadcrumbComponent,
    LoginComponent,
    PushNotificationComponent,
    ChangelogComponent,
    UnauthorizeComponent,
    SidebarIcsComponent,
    LandingComponent,
    HeaderComponent,
    FooterComponent,
    ConfirmationDialogComponent,
    UserProfileComponent,
    // ResponseComponent,
  ],
  imports: [
    CommonModule,
    MyCommonModule,
    BrowserModule,
    SwitchModule,
    AccordionModule,
    RxReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TooltipModule,
    UploaderModule,
    ButtonModule,
    NgbModule,
    GridModule,
    SignalRModule.forRoot(createConfig),
    RouterModule.forRoot(Approutes),
    PerfectScrollbarModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-right'
    }),
    MsalModule.forRoot({
      clientID: environment.uiClienId,
      authority: 'https://login.microsoftonline.com/' + environment.tenantId,
      //cacheLocation: 'localStorage',  
      protectedResourceMap: protectedResourceMap,
      redirectUri: environment.redirectUrl
    }),
    DropDownButtonModule,
    AutoCompleteModule
  ],
  providers: [AuthGuard, MsalUserService, LoginService, EncrDecrService, ConfirmationDialogService, LoaderService, FormErrorDisplayService, PushNotificationService,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS, useClass: MsalInterceptor, multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmationDialogComponent],
})
export class AppModule { }
