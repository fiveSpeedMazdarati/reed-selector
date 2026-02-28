
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UserService } from './user.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe]
})
export class AppComponent {
  private userService = inject(UserService);
  users$ = this.userService.getUsers();
}
