import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../user';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  isAuthenticated = false;
  user$!: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.user$ = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
    })
  }

  ngOnDestroy() {
    this.user$.unsubscribe();
  }

}
