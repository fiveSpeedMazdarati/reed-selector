import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DatabaseService } from './database.service';
import { AsyncPipe } from '@angular/common';
import { User } from './user'; // Import the User interface

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe]
})
export class AppComponent {
  private database = inject(DatabaseService);
  // Strongly type the users$ observable
  users$ = this.database.getCollection<User>('users');
}
