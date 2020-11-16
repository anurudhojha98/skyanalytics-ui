import { Component, OnInit } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormGroupDirective, NgForm, FormControl, Validators, FormGroup } from '@angular/forms';
import { RequestService } from 'src/app/services/request.service';
import { SocketService } from 'src/app/services/socket.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.scss']
})
export class AddStockComponent implements OnInit {
  matcher:ErrorStateMatcher;
  addStockForm:FormGroup;
  maxDate:Date=new Date();
  constructor(
    private requestService:RequestService,
    private socketService:SocketService
  ) { }
  ngOnInit(): void {
    this.addStockForm=new FormGroup({
      openBalenceFormControl : new FormControl('', [
        Validators.required
      ]),
      lowBalenceFormControl : new FormControl('', [
        Validators.required
      ]),
      highBalenceFormControl : new FormControl('', [
        Validators.required
      ]),
      closeBalenceFormControl : new FormControl('', [
        Validators.required
      ]),
      dateFormControl : new FormControl('', [
        Validators.required
      ]),
    });
    this.matcher = new MyErrorStateMatcher();
  }

  onSubmit():void{
    if(this.addStockForm.valid){
      let payload={
        Open:this.addStockForm.value.openBalenceFormControl,
        Close:this.addStockForm.value.closeBalenceFormControl,
        Low:this.addStockForm.value.lowBalenceFormControl,
        High:this.addStockForm.value.highBalenceFormControl,
        Date:this.addStockForm.value.dateFormControl
      }
      // this.requestService.addStocks(payload).subscribe((res:any)=>{
      //   console.log(res);
      // },err=>{
      //   console.error(err);
      // })

      this.socketService.sendData(payload);

    }
  }

}
