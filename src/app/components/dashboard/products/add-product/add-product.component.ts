import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Category } from 'src/app/interfaces/category';
import { Product } from 'src/app/interfaces/product';
import { CategoriaService } from 'src/app/services/category/categoria.service';
import { ProductoService } from 'src/app/services/product/producto.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  form: FormGroup;
  titulo: string = 'New Product';

  categories!: Category[];

  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,    
    public dialogRef: MatDialogRef<AddProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product,
    private productService: ProductoService,
    private categoryService: CategoriaService) {

    this.form = this.fb.group({
      barcode: ['', Validators.required],
      name: ['', Validators.required],
      price: ['', Validators.required],
      quantity: ['', Validators.required],
      categoryId: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.categoryService.findCategories()
    .subscribe(data => {
      this.categories = data;
      this.isEdit();
    });
  }

  isEdit() {
    if (this.data) {
      this.titulo = 'Edit Product';
      this.form.setValue({
        barcode: this.data.barcode,
        name: this.data.name,
        price: this.data.price,
        quantity: this.data.quantity,
        categoryId: this.data.categoryId
      });
    }
  }

  addProduct() {
    const product: Product = {
      barcode: this.form.value.barcode,
      name: this.form.value.name,
      price: this.form.value.price,
      quantity: this.form.value.quantity,
      categoryId: this.form.value.categoryId,
      quantityOrder: 0,
      categoryName: null,
      categoryType: null
    }

    if (this.data) {
      product.id = this.data.id;
      this.updateProduct(product);
    } else {
      this.createProduct(product);
    }
  }

  createProduct(product: Product) {
    this.productService.createProduct(product).subscribe(
      () => {                   
        this.manageMessage('The product was successfully added!');
        this.dialogRef.close();
    },
      (error) => {                              //Error callback
        console.error('error caught in component')
        this.manageMessage('Error in create product');
        this.dialogRef.close();
      }
    );
  }

  updateProduct(product: Product) {
    this.productService.updateProduct(product).subscribe(
      () => {                   
        this.manageMessage('The product was successfully added!');
        this.dialogRef.close();
    },
      (error) => {                              //Error callback
        console.error('error caught in component')
        this.manageMessage('Error in create product');
        this.dialogRef.close();
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
  
  cancelManage(): void {
    this.dialogRef.close();
  }

}
