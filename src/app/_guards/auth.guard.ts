import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable(
    { providedIn: 'root' }
)
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate() {
        if (sessionStorage.getItem('currentUser')) {
            // logged in so return true
            //console.log(sessionStorage.getItem('currentUser'))
            return true;
        }

        // not logged in so redirect to login page
        this.router.navigate(['/login']);
        return false;
    }
}