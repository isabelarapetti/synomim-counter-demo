import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
    this.parseText('dog');
  }

  parseText(text: string) {
    this.http
      .post(`${this.URL_API}/parse`, { text })
      .subscribe((result: any) => {
        console.log(result);
        searchResult = result;
        this.hasResults = true;
      });
  }

  clearText() {
    searchResult = [];
    this.hasResults = false;
  }
}
