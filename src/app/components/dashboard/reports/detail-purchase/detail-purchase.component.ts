import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { PurchaseReportDetail } from 'src/app/interfaces/purchaseReportDetail';
import { PurchaseOrderService } from 'src/app/services/orders/purchase-order.service';

@Component({
  selector: 'app-detail-purchase',
  templateUrl: './detail-purchase.component.html',
  styleUrls: ['./detail-purchase.component.css']
})
export class DetailPurchaseComponent implements OnInit {


  listDetails!: PurchaseReportDetail[];

  dataSource: any;
  displayedColumns: string[] = ['barcode', 'name', 'quantity', 'categoryName'];

  constructor(  
    public dialogRef: MatDialogRef<DetailPurchaseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number,
    private purchaseService: PurchaseOrderService) { }

  ngOnInit(): void {
    this.purchaseService.findDetailPurchaseOrder(this.data).subscribe(data => {      
      this.listDetails = data;
      this.dataSource = new MatTableDataSource(this.listDetails);
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
