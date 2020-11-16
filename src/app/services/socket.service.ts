import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private url = 'http://localhost:3000';
  private socket;    

  constructor() {
      this.socket = io(this.url);
  }
  public sendData(data) {
    this.socket.emit('new-stock', data);
}

public getData = () => {
    return Observable.create((observer) => {
        this.socket.on('new-stock', (data) => {
            observer.next(data);
        });
    });
}
}
