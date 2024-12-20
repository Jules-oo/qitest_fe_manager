import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http: HttpClient) { }

  get(url: string, user: string) {
    const params = new HttpParams()
    .set('idTest', url)
    .set('user', user);
    return this.http.get(environment.baseUrl + 'test/getTest', {params});
  }
  // 
  getMaterialeDisponibile(idUtente: number): Observable<number[]> {
    return this.http.get<number[]>(environment.baseUrl + 'test/materialeStudio/' + idUtente);
  }
}
