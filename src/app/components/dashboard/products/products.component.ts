import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/interfaces/product';
import { ProductoService } from 'src/app/services/product/producto.service';
import { AddProductComponent } from './add-product/add-product.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  product!: Product;
  listProducts!: Product[];
  
  dataSource: any;
  displayedColumns: string[] = ['id', 'name', 'barcode', 'price', 'quantity', 'category', 'actions'];
  
  constructor(
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,  
    private productService: ProductoService) { }

  ngOnInit(): void {
    this.productService.findProducts().subscribe(data => {
      this.listProducts = data;
      this.dataSource = new MatTableDataSource(this.listProducts);      
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  manageProduct() {
    const dialogRef = this.dialog.open(AddProductComponent, {
      width: '50%',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.productService.findProducts().subscribe(data => {
        this.dataSource.data = data;
      });
    });
  }

  updateProduct(product: Product) {
    const dialogRef = this.dialog.open(AddProductComponent, {
      width: '50%',
      data: product
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.productService.findProducts().subscribe(data => {
        this.dataSource.data = data;
      });
    });
  }

  deleteProduct(product: Product) {
    this.productService.inactivateProduct(product).subscribe(
      () => {
        this.manageMessage('The product was deleted!');
        this.productService.findProducts().subscribe(data => {
          this.dataSource.data = data;
        });
    },
      (error) => {                              //Error callback
        console.error('error caught in component')
        this.manageMessage('Error in delete product');
      }
    );
  }

  manageMessage(message: string) {
    this._snackBar.open(message, '', {
      duration: 1500,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }

}
