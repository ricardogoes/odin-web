import { NgModule } from '@angular/core';
import {
  BrowserModule,
  Title,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HttpTokenInterceptor } from './_shared/interceptors/http.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    NgxSpinnerModule,
    AppRoutingModule,
  ],
  providers: [
    Title,
    provideClientHydration(),
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
    { provide: 'AUTH_API_URL', useValue: environment.authApiUrl },
    { provide: 'BASELINE_API_URL', useValue: environment.baselineApiUrl },
    { provide: 'CUSTOMER_ID', useValue: 'b7ef3024-5f20-48d5-989d-0a0502f73968' } // TODO: Ajustar
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
