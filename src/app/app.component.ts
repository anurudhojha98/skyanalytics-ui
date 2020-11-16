import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { RequestService } from './services/request.service';
import { MatDialog } from '@angular/material/dialog';
import { AddStockComponent } from './components/add-stock/add-stock.component';
import { SocketService } from './services/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = ['date', 'open', 'high', 'low','close'];
  dataSource1:any;
  total:number=0;
  page:number=0;
  pageSize:number=30;
  pageSizeOptions:any=[5,10,30,50];
    constructor(
      private requestService:RequestService,
      private dialog:MatDialog,
      private socketService:SocketService
    ){}

  ngOnInit(){
    this.getStockData();
    this.getStockData1();
  }
  getStockData(){
    let obj={page:this.page,perPage:this.pageSize}
    this.requestService.getStocks(obj).subscribe((res:any)=>{
      this.total=res.total;
      if(res.data.length){
       this.dataSource1=res.data;
      }
    },err=>{
      console.error(err);
    })
  }
  loadPage(event){
    this.page=event.pageIndex;
    this.pageSize=event.pageSize;
    this.getStockData();
  }
  addStock(data){
    const dialogConsentRef = this.dialog.open(AddStockComponent, {
      width: '500px',
      data: {data}
    });
    dialogConsentRef.afterClosed().subscribe(result => {
      // this.getStockData1();
    
    });
  }
  getStockData1(){
    this.socketService.getData().subscribe((data:any)=>{
       this.ngOnInit();
    

  
    })
  }
}

export interface PeriodicElement {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  position:number;
}
