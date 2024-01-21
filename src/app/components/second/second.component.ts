import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'second',
  templateUrl: './second.component.html',
  styleUrls: ['./second.component.scss']
})
export class SecondComponent implements OnInit {

  valueParam !: Observable<any>;
  constructor(private activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {
    //checks if there is any cchange in the url params, if yes display same
    this.valueParam = this.activatedRoute.queryParamMap
    .pipe(
      map((params) => params.get('value'))
    )
  }

}
