import { UserService } from './../User.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faEdit, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Toast, ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/User.model';

@Component({
  selector: 'app-UserCard',
  templateUrl: './UserCard.component.html',
  styleUrls: ['./UserCard.component.css']
})
export class UserCardComponent implements OnInit {
  @Input() user!: User;
  @Output() removeUser = new EventEmitter<string>();

  constructor(private fab: FaIconLibrary, private toastr: ToastrService, private router: Router, private userService: UserService) {
    fab.addIcons(faEdit, faTrashCan);
  }

  ngOnInit() { }

  editUser() {
    this.router.navigate([`user/${this.user.id}`]);
  }

  onDeleteUser() {
    this.userService.deleteUser(this.user.id).subscribe(() => {
      this.toastr.success('User deleted successfully!', 'Success', {closeButton: true});
      this.removeUser.emit(this.user.id);
    });
  }

}
