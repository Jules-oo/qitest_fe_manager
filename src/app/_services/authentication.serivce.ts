import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';  
import {environment } from '../../environments/environment';
@Injectable()
export class AuthenticationService {
  public token: string = '';
  public user!: string;
  public tokendecodec!: string;
  public time!: number;
  public numeroEsami!: number;
  public test: any;
  public headers = new HttpHeaders().set('Authorization', "Bearer " + this.token);

  constructor(private http: HttpClient) {
    // set token if saved in session storage
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser') || '{}');
    this.token = currentUser?.token || '';
    console.log("Numero volte che costruisco " + this.token);
  }

  register(name: string, cognome: string, email: string, passw: string): Observable<boolean> {
    console.log(email);
    return this.http.post<any>(`${environment.baseUrl}/rest/register`, JSON.stringify({
      nome: name, cognome: cognome,
      username: email, password: passw
    })).pipe(
      map(response => {
        console.log(email);
        if (response.status === 200) {
          console.log("Registrazione OK");
          return true;
        } else {
          console.log("Registrazione non pervenuta");
          return false;
        }
      })
    );
  }

  /*
  login(username: string, password: string): Observable<boolean> {
    this.user = username;
    return this.http.post<any>(`${environment.baseUrl}/restApi/loginAdmin`, { username: username, password: password }).pipe(
      map(response => {
        const token = response?.token;
        if (response?.status === 200 && token) {
          this.token = token;
          // Store username and jwt token in session storage
          sessionStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));
          this.headers = new HttpHeaders().set('Authorization', "Bearer " + this.token);
          return true;
        } else {
          return false;
        }
      })
    );
  }*/
  
  login(username: string, password: string): Observable<boolean> {
    this.user = username;
    console.log("Login");
    return this.http.post<any>(environment.baseUrl + '/api/auth/admin-login', { username: username, password: password }).pipe(
      map(response => {
        console.log(response);
        const token = response?.token;
        if (token) {
          this.token = token;
          // Store username and jwt token in session storage
          sessionStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));
          this.headers = new HttpHeaders().set('Authorization', "Bearer " + this.token);
          return true;
        } else {
          return false;
        }
      })
    );
  }

  logout(): void {
    // Clear token and remove user from session storage to log out
    this.token = '';
    sessionStorage.clear();
  }

  getMetadati(ut: string): Observable<boolean> {
    return this.http.post<any>(`${environment.baseUrl}/restApi/getMetadati`, JSON.stringify({ username: ut })).pipe(
      map(response => {
        if (response?.status === 200) {
          this.time = response.time;
          this.numeroEsami = response.number;
          this.test = response.test;

          sessionStorage.setItem('time', JSON.stringify(this.time));
          sessionStorage.setItem('numeroEsami', JSON.stringify(this.numeroEsami));

          return true;
        } else {
          this.time = 0;
          this.numeroEsami = 0;
          this.test = {};
          return false;
        }
      })
    );
  }

  private b64decode(str: string): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    let output = '';

    str = String(str).replace(/=+$/, '');

    if (str.length % 4 === 1) {
      throw new Error("'atob' failed: The string to be decoded is not correctly encoded.");
    }

    for (let bc = 0, bs = 0, buffer, idx = 0; buffer = str.charAt(idx++);) {
      buffer = chars.indexOf(buffer);
      if (~buffer) {
        bs = bc % 4 ? bs * 64 + buffer : buffer;
        if (bc++ % 4) output += String.fromCharCode(255 & bs >> (-2 * bc & 6));
      }
    }

    return output;
  }

  private b64DecodeUnicode(str: string): string {
    return decodeURIComponent(Array.prototype.map.call(this.b64decode(str), (c: any) => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  }

  public decodeToken(token: string): any {
    const parts = token.split('.');

    if (parts.length !== 3) {
      throw new Error('JWT must have 3 parts');
    }

    const decoded = this.urlBase64Decode(parts[1]);
    if (!decoded) {
      throw new Error('Cannot decode the token');
    }

    return JSON.parse(decoded);
  }

  public getTokenExpirationDate(token: string): Date | null {
    const decoded = this.decodeToken(token);
    if (!decoded?.exp) {
      return null;
    }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);

    return date;
  }

  public isTokenExpired(token: string, offsetSeconds = 0): boolean {
    const date = this.getTokenExpirationDate(token);

    if (date == null) {
      return false;
    }

    return !(date.valueOf() > (new Date().valueOf() + (offsetSeconds * 1000)));
  }

  // Base64 URL decoding
  public urlBase64Decode(str: string): string {
    let output = str.replace(/-/g, '+').replace(/_/g, '/');
    switch (output.length % 4) {
      case 0: { break; }
      case 2: { output += '=='; break; }
      case 3: { output += '='; break; }
      default: {
        throw 'Illegal base64url string!';
      }
    }
    return this.b64DecodeUnicode(output);
  }
}
