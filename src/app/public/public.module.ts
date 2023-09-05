import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PublicRoutingModule } from './public-routing.module';
import { PublicComponent } from './public.component';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
    declarations: [
        PublicComponent
    ],
    imports: [
        CommonModule,
        FormsModule, ReactiveFormsModule,
        NgxSpinnerModule,
        PublicRoutingModule
    ]
})
export class PublicModule {}
