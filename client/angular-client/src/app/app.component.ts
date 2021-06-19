import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

let searchResult: ScanedText[] = [];

export interface ScanedText {
  word: string;
  synonyms_found: number;
}

const text: ScanedText[] = [
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
  dataSource = searchResult;
  hasResults: boolean = false;
  URL_API: string = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // this.http.get(`${this.URL_API}/`).subscribe(() => {
    //   console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAA');
    // });
    this.parseText('dog cat');
  }

  parseText(textToParse: string) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let body = JSON.stringify({ text: textToParse });

    let url = `${this.URL_API}/parse`;

    this.http
      .post(url, body)
      .pipe(map((data) => {}))
      .subscribe((result) => {
        console.log(result);
      });
    // this.http
    //   .post(`${this.URL_API}/parse`, { text })
    //   .subscribe((result: any) => {
    //     console.log(result);
    //     searchResult = result;
    //     this.hasResults = true;
    //   });
  }

  clearText() {
    searchResult = [];
    this.hasResults = false;
  }
}
