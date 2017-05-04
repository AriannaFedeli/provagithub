
import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GoodComponent } from './good.component';
import { GoodEditComponent } from './good-edit.component';
import { GoodNewComponent } from './good-new.component';


const appRoutes: Routes = [
    
{path:'', redirectTo:'/goods', pathMatch:'full'},
     { path:'goods',  component: GoodComponent },
   { path: 'goods-edit/:id', component: GoodEditComponent },
   { path: 'goods-new', component: GoodNewComponent }

    ];
    
   export const routing = RouterModule.forRoot(appRoutes);
