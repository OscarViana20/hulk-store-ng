import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PurchaseOrderReport } from 'src/app/interfaces/purchaseOrderReport';
import { PurchaseOrderService } from 'src/app/services/orders/purchase-order.service';
import { DetailPurchaseComponent } from './detail-purchase/detail-purchase.component';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  listReports!: PurchaseOrderReport[];

  dataSource: any;
  displayedColumns: string[] = ['id', 'name', 'totalPurchase', 'paymentType', 'createdDate', 'actions'];

  constructor(
    public dialog: MatDialog,
    private purchaseService: PurchaseOrderService) { }

  ngOnInit(): void {
    this.purchaseService.findAllPurchaseOrder().subscribe(data => {      
      this.listReports = data;
      this.dataSource = new MatTableDataSource(this.listReports);      
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  detailPurchase(purchaseOrder: PurchaseOrderReport) {
    const dialogRef = this.dialog.open(DetailPurchaseComponent, {
      width: '65%',
      data: purchaseOrder.id
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
