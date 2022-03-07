import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PaymentType } from 'src/app/interfaces/paymentType';
import { Product } from 'src/app/interfaces/product';
import { PurchaseOrderService } from 'src/app/services/orders/purchase-order.service';
import { ProductoService } from 'src/app/services/product/producto.service';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css']
})
export class ShoppingComponent implements OnInit {  

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  product!: Product;

  listProducts!: Product[];
  listProductsSel: Product[] = [];
  listPaymentType: PaymentType[] = [];

  displayedColumns: string[] = ['id', 'select', 'barcode', 'name', 'price', 'quantity', 'category'];
  displayedColumnsSel: string[] = ['id', 'barcode', 'name', 'price', 'category', 'action'];

  dataSource: any;
  dataSourceSel = new MatTableDataSource(this.listProductsSel)

  selection = new SelectionModel<Product>(true, []);

  constructor(    
    private productService: ProductoService,
    private purchaOrderService: PurchaseOrderService) { }

  ngOnInit(): void {
    this.productService.findProducts().subscribe(data => {
      this.listProducts = data;
      this.dataSource = new MatTableDataSource(this.listProducts);      
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    this.purchaOrderService.findAllPaymentType().subscribe(data => {
      this.listPaymentType = data;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  isAllSelected() {
    if (this.dataSource && this.dataSource.data) {      
      const numSelected = this.selection.selected.length;
      const numRows = this.dataSource.data.length;
      return numSelected === numRows;
    }
    return false;
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.data);
  }

  selectProduct(product: Product) {
    if (this.selection.isSelected(product)) {
      this.listProductsSel =  this.listProductsSel.filter((item) => item.id !== product.id);
    } else {
      this.listProductsSel.push(product);
    }
    this.dataSourceSel.data = this.listProductsSel;
  }

  buyProducts() {

  }

}
