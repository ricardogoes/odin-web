import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';

import { SidebarModule } from './layout/sidebar/sidebar.module';
import { HeaderModule } from './layout/header/header.module';
import { SecureRoutingModule } from './secure-routing.module';

import { SecureComponent } from './secure.component';


@NgModule({
    declarations: [
        SecureComponent
    ],
    imports: [
        CommonModule,
        FormsModule, ReactiveFormsModule,
        NgxSpinnerModule,
        SecureRoutingModule,
        HeaderModule, SidebarModule
    ]
})
export class SecureModule {}
