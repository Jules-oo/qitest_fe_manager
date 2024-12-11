import { Injectable } from "@angular/core";
import { HttpClient, HttpRequest } from "@angular/common/http";
import { User } from "../_models/user";
@Injectable()
export class UserService {

    constructor(private http: HttpClient) { }
    

    getAll() {
        return this.http.get<User[]>(`/api/users`);
    }

    getById(id: number) {
        return this.http.get(`/api/users/` + id);
    }

    create(user: User) {
        return this.http.post(`/api/users`, user);
    }

    // NEED TESTING
    getByUsername(username: string) {
        return this.http.get(`/api/users/userInfo?username=` + username);
    }

    // NEED TESTING
    aggiornaUtente(user: User) {
        return this.http.put(`/api/users/aggiornaUtente`, JSON.stringify(user));
    }

}