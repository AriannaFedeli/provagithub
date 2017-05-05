import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { DataTableModule } from "angular2-datatable";
import { HttpModule } from "@angular/http";
import { GoodService } from "./good.service";
import { GoodComponent } from './good.component';
import { DataFilterPipe } from './data-filter.pipe';
import { AppComponent }   from './app.component';
import {RouterModule, Routes} from '@angular/router';
import {routing} from './app.routes';
import {GoodEditComponent} from './good-edit.component';
import {GoodNewComponent} from './good-new.component';

@NgModule({
  imports:      [ BrowserModule, CommonModule,DataTableModule,FormsModule, HttpModule, routing],
  declarations: [ AppComponent,GoodComponent, DataFilterPipe, GoodEditComponent,GoodNewComponent],
  bootstrap:    [ AppComponent ],
  providers: [GoodService]
})


export class AppModule { }
