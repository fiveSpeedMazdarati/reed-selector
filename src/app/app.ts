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

  latestPairings = [
    { reed: 'Vandoren Java Traditional 2.5', mouthpiece: 'Yamaha 4C', note: 'Great response and balanced tone', added: '2026-03-10' },
    { reed: 'Rico Royal 2.5', mouthpiece: 'Theo Wanne Durga 5', note: 'Warm, rich low register', added: '2026-03-13' },
    { reed: 'DAddario Reserve 2.5', mouthpiece: 'Selmer S80 C*', note: 'Smooth every dynamic', added: '2026-03-15' },
  ];
}
