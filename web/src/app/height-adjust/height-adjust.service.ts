import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Data } from './json.model';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeightAdjustService {
  private apiUrl = 'http://localhost:3000/height-adjust/adjust';

  constructor(private http: HttpClient) {}

  sendHeightAdjustData(data: Data): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(this.apiUrl, data, { headers })
      .pipe(
        catchError(error => {
          // If it's a 201 status, treat as success
          if (error.status === 201) {
            return [error.error];
          }
          throw error;
        })
      );
  }
}