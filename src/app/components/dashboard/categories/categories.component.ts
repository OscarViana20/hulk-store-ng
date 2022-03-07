import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Category } from 'src/app/interfaces/category';
import { CategoriaService } from 'src/app/services/category/categoria.service';
import { AddCategoryComponent } from './add-category/add-category.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  category!: Category;
  categories!: Category[];

  dataSource: any;
  displayedColumns: string[] = ['id', 'name', 'description', 'categoryType'];

  constructor(
    public dialog: MatDialog,
    private categoryService: CategoriaService) {
  }

  ngOnInit(): void {
    this.categoryService.findCategories()
    .subscribe(data => {
      this.categories = data;
      this.dataSource = new MatTableDataSource(this.categories);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addCategory() {
    const dialogRef = this.dialog.open(AddCategoryComponent, {
      width: '20%',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.category = result;
    });
  }

  delete(id: any) {

  }

}
