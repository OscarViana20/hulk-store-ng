import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PaymentType } from 'src/app/interfaces/paymentType';
import { Product } from 'src/app/interfaces/product';
import { PurchaseDetail } from 'src/app/interfaces/purchaseDetail';
import { PurchaseOrder } from 'src/app/interfaces/purchaseOrder';
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

  paymentTypeId!: number;

  product!: Product;

  listProducts!: Product[];
  listProductsSel: Product[] = [];
  listPaymentType: PaymentType[] = [];

  displayedColumns: string[] = ['id', 'select', 'barcode', 'name', 'price', 'quantity', 'category'];
  displayedColumnsSel: string[] = ['id', 'barcode', 'name', 'price', 'quantity', 'category', 'action'];

  dataSource: any;
  dataSourceSel = new MatTableDataSource(this.listProductsSel)

  selection = new SelectionModel<Product>(true, []);

  constructor(
    private _snackBar: MatSnackBar,  
    private productService: ProductoService,
    private purchaseOrderService: PurchaseOrderService) { }

  ngOnInit(): void {
    this.productService.findStockProducts().subscribe(data => {
      this.listProducts = data;
      this.dataSource = new MatTableDataSource(this.listProducts);      
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    this.purchaseOrderService.findAllPaymentType().subscribe(data => {
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

  validateStock(product: Product): void {
    if (product.quantityOrder) {      
      if (product.quantityOrder > product.quantity) {
        product.quantityOrder = product.quantity;
        this._snackBar.open('the quantity cannot exceed the stock', '', {
          duration: 1500,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
      }
    }
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
    try {
      this.validateSelectedProducts();
      const purchaseOrder = this.createPurchaseOrderData(this.selection.selected);
      this.purchaseOrderService.createPurchaseOrder(purchaseOrder).subscribe(() => {
        this.selection.clear();
        this.listProductsSel = [];
        this.dataSourceSel.data = [];
        this._snackBar.open('Purchase order registered with success', '', {
          duration: 1500,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
        this.productService.findStockProducts().subscribe(data => {
          this.listProducts = data;
          this.dataSource.data = data;
        });
      });
    } catch (e:any) {
      this._snackBar.open(e.message, '', {
        duration: 1500,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
    }
  }

  createPurchaseOrderData(productSelected: Product[]): PurchaseOrder {    
    const detail: PurchaseDetail[] = [];
    
    console.log('purchaseOrder', productSelected);
    productSelected.forEach(product => {

      console.log('product', product);

      detail.push({
        productId: product.id,
        quantity: product.quantityOrder,
        price: product.price,
        stock: product.quantity
      });
    });

    console.log('detail', this.paymentTypeId);
    return {
      paymentTypeId: this.paymentTypeId,
      purchaseDetail: detail
    };
  }

  private validateSelectedProducts(): void {
    if(!this.paymentTypeId) {
      throw new Error('PaymentType not selected');
    }
    if(this.selection.selected.length == 0) {
      throw new Error('No products selected');
    }
    for (const product of this.selection.selected) {
      if (!product.quantityOrder  || product.quantityOrder <= 0) {
        throw new Error('there are items without quantity');
      }
    }
  }

}
