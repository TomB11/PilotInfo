import { HttpClient } from '@angular/common/http';
import { Injectable, Signal, signal } from '@angular/core';
import { catchError, firstValueFrom, throwError } from 'rxjs';
import { StationReport } from '../interfaces/station';
import { Store } from '@ngrx/store';
import { setWeatherData } from '../store/weather.reducer';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  resultDataFromServer = signal<StationReport[]>([]);
  postCounter = signal(0);

  constructor(public http: HttpClient, private store: Store) {}

  async postJsonRpcQuery(query: any): Promise<any[]> {
    this.postCounter.update((prev) => prev + 1);
    const url = 'https://ogcie.iblsoft.com/ria/opmetquery';
    try {
      const response: any = await firstValueFrom(
        this.http.post(url, query).pipe(
          catchError(error => {
            console.error('API error:', error);
            return throwError(() => error);
          })
        )
      );
      
      this.store.dispatch(setWeatherData({ data: response.result }));
      return response.result;
    } catch (error) {
      // Handle error as needed (e.g., show notification)
      console.error('Request failed:', error);
      return [];
    }
  }
}
