import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

//let searchResult: Object = [];

export interface ScanedText {
  word: string;
  synonyms_found: number;
}

const text = [
  { word: 'Table', synonyms_found: 1 },
  { word: 'Dictionary', synonyms_found: 2 },
  { word: 'Book', synonyms_found: 3 },
  { word: 'Library', synonyms_found: 1 },
];
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'angular-client';
  dataSource: ScanedText[] = [];
  hasResults: boolean = false;
  URL_API: string = 'http://localhost:4000';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.parseText('door clown');
  }

  parseText(textToParse: string) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let body = { text: textToParse };

    let url = `${this.URL_API}/parse`;

    this.http
      .post(url, body)
      .pipe(
        map((response) => {
          this.dataSource = <ScanedText[]>response;
          this.hasResults = true;
        })
      )
      .subscribe();
  }

  clearText() {
    this.dataSource.length = 0;
    this.hasResults = false;
  }
}
