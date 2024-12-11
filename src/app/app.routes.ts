import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './_guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { CreaTestComponent } from './createst/createst.component';
import { GestionetestComponent } from './gestionetest/gestionetest.component';
import { CreautenteComponent } from './creautente/creautente.component';
import { GestionematerialeComponent } from './gestionemateriale/gestionemateriale.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
   
    //AuthGuard Attivo 
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'createst', component: CreaTestComponent,canActivate: [AuthGuard]},
    { path: 'gestionetest', component: GestionetestComponent,canActivate: [AuthGuard]  },
    { path: 'creautente', component: CreautenteComponent, canActivate: [AuthGuard]},
    { path: 'gestionetest/:id', component: GestionetestComponent,canActivate: [AuthGuard]  },
    { path: 'gestionemateriale', component: GestionematerialeComponent,canActivate: [AuthGuard]  },
    //Redirect to Home
    { path: '**', redirectTo: 'home' }
];
