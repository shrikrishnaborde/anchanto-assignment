import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable, fromEvent, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { ConnectionService } from './services/connection/connection.service';
import { AlertService } from './services/alert/alert.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @ViewChild('input') input !: ElementRef;
  valueParam !: Observable<any>;
  routerEvent: any;
  showAlert = false;
  alertType !: string;
  alertMessage !: string;

  constructor(public translate: TranslateService,
    private router: Router,
    private connectionService: ConnectionService,
    private alertService: AlertService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {

    //sets the value in input from url
    this.valueParam = this.activatedRoute.queryParamMap
      .pipe(
        map((params) => params.get('value'))
      )

    //if user goes online or offline, display respective alerts
    this.connectionService.online$.subscribe((resp) => {
      if (resp) {
        this.alertService.showAlert({ type: 'success', message: 'connectionRestored' })
      } else {
        this.alertService.showAlert({ type: 'danger', message: 'disconnectedFromInternet' })
      }
    })

    //if there is any alert to display, display alert for 5 seconds
    this.alertService.alert.subscribe((alert: any) => {
      this.showAlert = true;
      this.alertType = alert.type;
      this.alertMessage = alert.message;

      setTimeout(() => {
        this.showAlert = false;
        this.alertType = '';
        this.alertMessage = '';
      }, 5000)
    })
  }

  //check if value in parameter input has changed, if yes, route to second component with same param
  ngAfterViewInit(): void {
    this.routerEvent = fromEvent(this.input.nativeElement, 'keyup').pipe(
      distinctUntilChanged(),
      debounceTime(300),
      switchMap((e: any) => of(e.target.value))
    ).subscribe((value) => [
      this.router.navigate(['second'], { queryParams: { value } })
    ])
  }

  //destroy the input checking observable
  ngOnDestroy(): void {
    this.routerEvent.unsubscribe();
  }
}
