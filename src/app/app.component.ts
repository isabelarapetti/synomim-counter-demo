import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface ScanedText {
  word: string;
  synonyms_found: number;
}

const text: ScanedText[] = [
  { word: 'Hydrogen', synonyms_found: 1 },
  { word: 'Helium', synonyms_found: 2 },
  { word: 'Lithium', synonyms_found: 3 },
  { word: 'Beryllium', synonyms_found: 4 },
  { word: 'Boron', synonyms_found: 5 },
  { word: 'Carbon', synonyms_found: 6 },
  { word: 'Nitrogen', synonyms_found: 7 },
  { word: 'Oxygen', synonyms_found: 8 },
  { word: 'Fluorine', synonyms_found: 9 },
  { word: 'Neon', synonyms_found: 10 },
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'angular-client';
  dataSource = text;

  // Link to our api, pointing to localhost
  API = 'http://localhost:3000';

  // Declare empty list of people
  synonims: any[] = [];

  constructor(private http: HttpClient) {}

  // Angular 2 Life Cycle event when component has been initialized
  ngOnInit() {
    this.getScanedText();
  }

  // Add one person to the API
  parseText(text: string) {
    this.http.post(`${this.API}/scan`, { text }).subscribe(() => {
      this.getScanedText();
    });
  }

  // Get all users from the API
  getScanedText() {
    this.http.get(`${this.API}/scantest`).subscribe((synonims: any) => {
      console.log(synonims);
      this.synonims = synonims;
    });
  }
}
