import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { LoggedInGuard } from './loggedin.guard';

const routes: Routes = [{path:'', component:HomeComponent},
{path:'signup', component:SignupComponent, canActivate: [LoggedInGuard]},
{path:'login', component:LoginComponent, canActivate: [LoggedInGuard]}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
