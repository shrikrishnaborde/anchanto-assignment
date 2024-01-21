import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

export type languageTypeValue = 'en' | 'hb' | 'ar' | 'fr' | 'es';
export type languageTypeLabel = 'English' | 'Hebrew' | 'Arabic' | 'French' | 'Spanish';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  lang = localStorage.getItem('language') || 'en';
  url = localStorage.getItem('url') || '';

  langDir : any= {
    'en': 'English',
    'es': 'Spanish',
    'ar': 'Arabic',
    'fr': 'French',
    'hb': 'Hebrew'
  }

  private selectedLanguage$ = new BehaviorSubject(this.lang);
  language$ = this.selectedLanguage$.asObservable();

  private selectedLanguageLabel$ = new BehaviorSubject(this.langDir[this.lang]);
  languageLabel$ = this.selectedLanguageLabel$.asObservable();

  constructor(public translate: TranslateService,private router: Router) { 
    translate.addLangs(['en', 'hb', 'ar', 'fr', 'es']);

    //Check if language is available in local storage
    //if not set language as English
    translate.setDefaultLang(this.lang);
    translate.use(this.lang);


    this.setDirection()
    this.router.navigateByUrl(this.url)
  }

  //Sets rtl or ltr direction of the html
  setDirection(){
    let htmlTag = document.getElementsByTagName('html')[0] as HTMLHtmlElement;
    htmlTag.dir = ['ar', 'hb'].includes(this.lang) ? 'rtl' : 'ltr';
  }

  //Provide functionality to change Language based on provided input
  changeLanguage(language: { label: languageTypeLabel, value: languageTypeValue }) {
    this.lang = language.value;
    this.setDirection()
    this.translate.use(language.value);
    this.selectedLanguageLabel$.next(language.label);
    localStorage.setItem('language',language.value)
    localStorage.setItem('url',this.router.url)
  }
}
