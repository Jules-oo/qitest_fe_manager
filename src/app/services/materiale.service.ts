import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Materiale } from '../models/materiale';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { TestMateriale } from '../models/testMateriale';

@Injectable({
  providedIn: 'root'
})
export class MaterialeService {

  constructor(private http: HttpClient) { }

  creaMateriale(materiale: Materiale) {
    return this.http.post(environment.baseUrl + "/materiale/nuovo", materiale);
  }

  modificaMateriale(materiale: Materiale) {
    return this.http.put(environment.baseUrl + "/materiale", materiale);
  }

  eliminaMateriale(id: number) {
    return this.http.delete(environment.baseUrl + "/materiale/" + id);
  }

  getAllTest(): Observable<TestMateriale[]> {
    return this.http.get<TestMateriale[]>(environment.baseUrl + "/test/all");
  }

  caricaMaterialeById(id: number): Observable<Materiale> {
    return this.http.get<Materiale>(environment.baseUrl + "/materiale/materialeTest/" + id);
  }
}
