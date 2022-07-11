import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesComponent } from './employees/employees.component';
import { GroupsComponent } from './groups/groups.component';
import { GuardGuard } from './guard.guard';
import { MainComponent } from './main/main.component';
import { NavbarComponent } from './navbar/navbar.component';

const routes: Routes = [
  { path: '', redirectTo: 'zeus', pathMatch: 'full' },
  {
    path: 'zeus', component: NavbarComponent,
    children: [
      { path: 'main', component: MainComponent },
      { path: 'employees', component: EmployeesComponent },
      { path: 'groups', component: GroupsComponent },
      { path: '**', redirectTo: "main" },
    ],
    canActivate: [GuardGuard]
  },
  { path: '**', redirectTo: "zeus" },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
