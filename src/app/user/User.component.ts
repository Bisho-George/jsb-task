import { Component, OnInit } from '@angular/core';
import { UserService } from './User.service';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { User } from '../models/User.model';

@Component({
  selector: 'app-User',
  templateUrl: './User.component.html',
  styleUrls: ['./User.component.css']
})
export class UserComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService, private fab: FaIconLibrary) {
    fab.addIcons(faAdd);
  }

  ngOnInit() {
    this.userService.getUsers(2, 0).subscribe((data) => {
      this.users = data.data;
    })
  }

}
