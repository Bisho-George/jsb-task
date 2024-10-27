import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from './User.service';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faAdd, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { User } from '../models/User.model';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { LoadingService } from '../shared/services/loading.service';

@Component({
  selector: 'app-User',
  templateUrl: './User.component.html',
  styleUrls: ['./User.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  users: User[] = [];
  filteredUsers: User[] = [];
  pageNumber: number = 0;
  totalPages!: number;
  isLoading = this.loadingService.loading$;
  searchTerm: string = '';
  private searchTerm$ = new Subject<string>();

  private destroy$ = new Subject<void>();

  trackFn(index: number, item: User) {
    return item.id;
  }

  constructor(private loadingService: LoadingService, private router: Router, private userService: UserService, private fab: FaIconLibrary) {
    fab.addIcons(faAdd, faChevronLeft, faChevronRight);
  }

  ngOnInit() {
    this.loadUsers(5, 0);
    this.searchTerm$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe((term) => {
      this.searchTerm = term;
      this.applySearchFilter();
    })
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  decrementPage() {
    if (this.pageNumber === 0) { return; }
    this.updatePage(this.pageNumber - 1);
  }

  incrementPage() {
    if (this.pageNumber === this.totalPages - 1) { return; }
    this.updatePage(this.pageNumber + 1);
  }

  private updatePage(page: number) {
    this.loadUsers(5, page);
  }

  private loadUsers(limit: number, page: number) {
    this.userService.getUsers(limit, page)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.users = data.data;
        this.applySearchFilter();
        this.pageNumber = data.page;
        this.totalPages = Math.ceil(data.total / limit);
      });
  }

  onCreateUser() {
    this.router.navigate(['user', 'create']);
  }

  onDeleteUser(id: string) {
    this.users = this.users.filter((user) => user.id !== id);
  }

  applySearchFilter() {
    if (this.searchTerm.trim() === '') {
      // Show all users if searchTerm is empty
      this.filteredUsers = this.users;
    } else {
      const term = this.searchTerm.toLowerCase();
      // Filter users by checking if the combined name includes the search term
      this.filteredUsers = this.users.filter(user => {
        const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
        return fullName.includes(term);
      });
    }
  }

  onSearchTermChange(term: string) {
    this.searchTerm$.next(term);
  }


}
