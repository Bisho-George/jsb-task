import { NgModule } from '@angular/core';
import { CommonModule, NgFor, NgOptimizedImage } from '@angular/common';
import { UserComponent } from './User.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserCardComponent } from './UserCard/UserCard.component';
import { UserFormComponent } from './UserForm/UserForm.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: UserComponent },
  { path: 'user/create', component: UserFormComponent },
  { path: 'user/:id', component: UserFormComponent }
]
@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FontAwesomeModule,
    NgOptimizedImage,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [UserComponent, UserCardComponent, UserFormComponent]
})
export class UserModule { }
