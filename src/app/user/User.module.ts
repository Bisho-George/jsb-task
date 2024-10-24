import { NgModule } from '@angular/core';
import { CommonModule, NgFor, NgOptimizedImage } from '@angular/common';
import { UserComponent } from './User.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserCardComponent } from './UserCard/UserCard.component';

const routes: Routes = [
  { path: '', component: UserComponent }
]
@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FontAwesomeModule,
    NgOptimizedImage
  ],
  declarations: [UserComponent, UserCardComponent]
})
export class UserModule { }
