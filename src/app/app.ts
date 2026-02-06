import { ChangeDetectionStrategy, Component, WritableSignal, inject, signal } from '@angular/core';
import { Auth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut, User } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  private auth: Auth = inject(Auth);
  public user: WritableSignal<User | null> = signal(null);

  constructor() {
    this.auth.onAuthStateChanged((user) => {
      this.user.set(user);
    });
  }

  async login(email: string, pass: string): Promise<void> {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, pass);
      this.user.set(userCredential.user);
    } catch (e) {
      console.error(e);
      alert('Invalid credentials!');
    }
  }

  async loginWithGoogle(): Promise<void> {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(this.auth, provider);
      this.user.set(userCredential.user);
    } catch (e) {
      console.error(e);
    }
  }

  async logout(): Promise<void> {
    try {
      await signOut(this.auth);
      this.user.set(null);
    } catch (e) {
      console.error(e);
    }
  }
}
