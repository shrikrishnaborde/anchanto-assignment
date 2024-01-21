import { Component, OnInit } from '@angular/core';
import { LanguageService, languageTypeValue, languageTypeLabel } from 'src/app/services/language/language.service';

@Component({
  selector: 'sixth',
  templateUrl: './sixth.component.html',
  styleUrls: ['./sixth.component.scss']
})
export class SixthComponent implements OnInit {

  constructor(public languageService: LanguageService){}

  languages : {label: languageTypeLabel, value : languageTypeValue}[] = [
    { label: 'English', value : 'en'},
    { label: 'Hebrew', value : 'hb'},
    { label: 'Arabic', value : 'ar'},
    { label: 'French', value : 'fr'},
    { label: 'Spanish', value : 'es'},
  ]

  ngOnInit(): void {
  }

  setLanguage(language:{label:languageTypeLabel, value:languageTypeValue}){
    this.languageService.changeLanguage(language);
  }

}
