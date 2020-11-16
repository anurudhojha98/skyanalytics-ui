import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  
  constructor(
    private http:HttpClient
  ) { }
  
  getStocks(pageObj):Observable<any>{
    return this.http.get('http://localhost:3000/stocks',{params:pageObj});
  }

  addStocks(payload):Observable<any>{
    return this.http.post('http://localhost:3000/stocks',payload);
  }

}
