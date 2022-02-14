import { Component } from '@angular/core';
import { AuthService } from 'src/app/services';
import { UserResponseData } from 'src/app/interfaces/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cefcom-ui';
  currentUser: UserResponseData;
  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.authService.currentUser.subscribe(x => { console.log('x', x); this.currentUser = x; });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
