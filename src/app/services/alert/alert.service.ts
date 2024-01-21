import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private alert$ = new Subject();
  alert = this.alert$.asObservable()

  constructor() { }

  //Asks AppComponent to show an alert
  showAlert(alert: { type: string, message: string}){
    this.alert$.next(alert);
  }
}
