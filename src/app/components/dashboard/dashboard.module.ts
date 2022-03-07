import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';

import { DashboardComponent } from './dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProductsComponent } from './products/products.component';
import { CategoriesComponent } from './categories/categories.component';
import { AddProductComponent } from './products/add-product/add-product.component';
import { AddCategoryComponent } from './categories/add-category/add-category.component';
import { ShoppingComponent } from './shopping/shopping.component';



@NgModule({
  declarations: [
    DashboardComponent,
    NavbarComponent,
    ProductsComponent,
    CategoriesComponent,
    AddProductComponent,
    AddCategoryComponent,
    ShoppingComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
