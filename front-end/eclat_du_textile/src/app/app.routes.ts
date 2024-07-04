import { Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
    {path:"", component:IndexComponent},
    {path:"dashboard", component:DashboardComponent, canActivate: [authGuard] },
    {path:"login", component: LoginComponent},
    {path:"register", component:RegisterComponent }
];
