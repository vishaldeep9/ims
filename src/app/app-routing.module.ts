import { CreateStudentComponent } from './components/create-student/create-student.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AuthGuard } from './services/guards/auth.guard';
import { AllStudentsComponent } from './components/all-students/all-students.component';
import { NotifyGuard } from './services/guards/notify.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'create-student', component: CreateStudentComponent ,canDeactivate:[NotifyGuard]},
      { path: 'all-students', component: AllStudentsComponent },
      {path:'',component:AllStudentsComponent}
    ],
  },
  { path: '', component: LoginComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
