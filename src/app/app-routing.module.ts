import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './componentes/dashboard/dashboard.component';
import { WelcomeComponent } from './componentes/welcome/welcome.component';

const routes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'dashboard', component: DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
