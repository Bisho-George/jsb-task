import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { User } from 'src/app/models/User.model';
import { UserService } from '../User.service';
import { FullUser } from 'src/app/models/FullUser.model';
import { Subscription } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-UserForm',
  templateUrl: './UserForm.component.html',
  styleUrls: ['./UserForm.component.css']
})
export class UserFormComponent implements OnInit {
  user!: FullUser;
  subscription!: Subscription;
  isEditing: boolean = false;
  profileForm!: FormGroup;
  acceptedFormats: string[] = ['image/jpeg', 'image/jpg', 'image/png'];
  imagePreview: string | ArrayBuffer | null = null;

  constructor(private toast: ToastrService, private router: Router, private formBuilder: FormBuilder, private route: ActivatedRoute, private userService: UserService, fab: FaIconLibrary) {
    fab.addIcons(faCamera);
  }

  ngOnInit() {
    this.profileForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      picture: [null]
    });
    this.subscription = this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditing = true;
        this.getUser(params['id']);
      }
    })
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];

    if (file) {
      // Ensure file type is valid
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (!validTypes.includes(file.type)) {
        alert('Only JPEG, JPG, and PNG files are allowed.');
        return;
      }
      // Update form control value
      this.profileForm.patchValue({ picture: file.name });
      this.profileForm.get('picture')?.updateValueAndValidity();
      // File preview
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
      // Clear the file input after processing to allow re-uploading the same file if needed
      (event.target as HTMLInputElement).value = '';
    }
  }

  onCreateUser() {
    if (this.profileForm.valid) {
      console.log(this.profileForm.value);
      if (this.isEditing) {
        this.userService.updateUser(this.user.id, this.profileForm.value).subscribe(
          response => {
            this.toast.success('User updated successfully!', 'Success', { closeButton: true, timeOut: 3000 });
            this.cancel();
          },
          error => {
            this.toast.error('An error occurred while updating the user.', 'Error', { closeButton: true, timeOut: 3000 });
            console.error(error);
          }
        );
      }
      else {
        this.userService.createUser(this.profileForm.value).subscribe(
          response => {
            this.toast.success('User created successfully!', 'Success', { closeButton: true, timeOut: 3000 });
            this.cancel();
          },
          error => {
            this.toast.error("one of the fields not valid", 'Error', { closeButton: true, timeOut: 3000 });
            console.log(error.error.error);
          }
        );
      }
    }
  }

  getUser(id: string) {
    this.userService.getUserById(id).subscribe(user => {
      this.user = user;
      // Populate the form with the user data
      this.profileForm.patchValue({
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        email: this.user.email,
        picture: this.user.picture // Assuming this holds the file name
      });
      // If you want to display the current user's picture, set imagePreview as well
      this.imagePreview = this.user.picture; // or the appropriate path for the image
    });
  }

  cancel() {
    this.router.navigate(['/']);
  }
  get firstName () {
    return this.profileForm.get('firstName');
  }

  get lastName () {
    return this.profileForm.get('lastName');
  }

  get email () {
    return this.profileForm.get('email');
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
