import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { DataTableModule } from "angular2-datatable";
import { HttpModule } from "@angular/http";
import { GoodService } from "./good.service";
import { GoodComponent } from './good.component';
import { DataFilterPipe } from './data-filter.pipe';

@NgModule({
  imports: [
    CommonModule,
    DataTableModule,
    FormsModule,
    HttpModule
  ],
  providers: [GoodService],
  declarations: [GoodComponent, DataFilterPipe],
  exports: [GoodComponent]
})

export class DemoModule { }


