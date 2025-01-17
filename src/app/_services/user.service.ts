import { Injectable } from "@angular/core";
import { HttpClient, HttpRequest } from "@angular/common/http";
import { User } from "../_models/user";
import { environment } from "../../environments/environment";
@Injectable()
export class UserService {

    constructor(private http: HttpClient) { }

    getUsers() {
        return this.http.get<User[]>(environment.baseUrl + '/api/utenti');
    }
    
    // NEED TESTING
    getAll() {
        return this.http.get<User[]>(`/api/utenti/azienda/` + JSON.parse(localStorage.getItem('currentUser') || '{}').azienda.id);
    }

    // LINED UP
    getById(id: number) {
        return this.http.get(`/api/utenti/` + id);
    }

    // NOT EXISTING IN BACKEND
    create(user: User) {
        return this.http.post(`/api/utenti`, user);
    }

    // LINED UP
    getByUsername(username: string) {
        return this.http.get(`/api/utenti/email/` + username);
    }

    // LINED UP
    aggiornaUtente(user: User) {
        return this.http.put(`/api/utenti/merge`, JSON.stringify(user));
    }

}