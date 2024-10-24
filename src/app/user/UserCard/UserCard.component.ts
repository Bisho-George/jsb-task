import { Component, Input, OnInit } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/models/User.model';

@Component({
  selector: 'app-UserCard',
  templateUrl: './UserCard.component.html',
  styleUrls: ['./UserCard.component.css']
})
export class UserCardComponent implements OnInit {
  @Input() user!: User;

  constructor(private fab: FaIconLibrary) {
    fab.addIcons(faEdit, faTrash);
  }

  ngOnInit() {
    console.log(this.user);
  }

}
