import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, fromEvent, of, merge } from 'rxjs';
import { mapTo } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  online$!: Observable<any>;

  constructor(private router: Router) { 
    this.checkOnline()
  }

  //Created Observable to check if user is online or offline
  checkOnline(){
    this.online$ = merge(
      fromEvent(window, 'online').pipe(mapTo(true)),
      fromEvent(window, 'offline').pipe(mapTo(false)),
      of(navigator.onLine)
    )
  }
}
