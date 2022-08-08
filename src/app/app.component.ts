import { Component, OnInit } from '@angular/core';
import {Router, Event, NavigationError, NavigationStart, NavigationEnd, NavigationCancel} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = '"Digital microstructure repository';
  loading = true;

  constructor(private router: Router) {
    router.events.subscribe((routerEvent: Event) => {
      this.checkRouterEvent(routerEvent);
    });
  }

  checkRouterEvent(routerEvent: Event): void {
      if (routerEvent instanceof NavigationStart) {
        this.loading = true;
      }

      if (routerEvent instanceof NavigationEnd ||
      routerEvent instanceof NavigationCancel ||
      routerEvent instanceof NavigationError) {
      this.loading = false;
      }
  }

  ngOnInit() {
  }



  get isLoggedIn(): boolean {
    // return this.authService.isLoggedIn;
    return true;
  }

  get userName(): string {
    // if (this.authService.currentUser) {
    //   return this.authService.currentUser.userName;
    // }
    return 'test-user';
  }

  logOut(): void {
    //this.authService.logout();
    console.log('Log out');
    this.router.navigateByUrl('/home');
  }
}
