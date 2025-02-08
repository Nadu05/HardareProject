import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { catchError, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SensorService {

  private apiUrl = 'http://localhost:3000/sensor/data';

  constructor(private http:HttpClient) { }

  getSensorData():Observable<any>{
    return this.http.get(this.apiUrl)
      .pipe(
        catchError(error => {
          throw error;
        })
      );
  }
}
