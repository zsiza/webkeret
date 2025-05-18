import { Injectable } from '@angular/core';
import {
  Auth,
  authState,
  signInWithEmailAndPassword,
  User as FirebaseUser,
  UserCredential,
  signOut,
  createUserWithEmailAndPassword,
} from '@angular/fire/auth';
import {
  CollectionReference,
  DocumentData,
  Firestore,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  where,
  query,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser: Observable<FirebaseUser | null>;

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private router: Router
  ) {
    this.currentUser = authState(this.auth);
  }

  login(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout(): Promise<void> {
    return signOut(this.auth).then(() => {
      this.router.navigateByUrl('/');
    });
  }
  isLoggedIn(): Observable<FirebaseUser | null> {
    return this.currentUser;
  }
  getUserId(): string {
    const user = this.auth.currentUser;
    return user ? user.uid : '';
  }
  getUserNameById(userId: string): Promise<string | null> {
    const usersRef = collection(
      this.firestore,
      'users'
    ) as CollectionReference<User>;
    const q = query(usersRef, where('id', '==', userId));
    return getDocs(q)
      .then((querySnapshot) => {
        if (querySnapshot.empty) {
          return null; // No user found
        }
        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data();
        return `${userData.name.firstname} ${userData.name.lastname}`;
      })
      .catch((error) => {
        console.error('Error fetching user name:', error);
        return null;
      });
  }

  updateLoginStatus(isLoggedIn: boolean): void {
    localStorage.setItem('isLoggedIn', isLoggedIn ? 'true' : 'false');
  }
  async updateSubscriptionStatus(subscription: boolean): Promise<void> {
    localStorage.setItem('subscription', subscription ? 'true' : 'false');
    const user = this.auth.currentUser;
    if (user) {
      const userDocRef = doc(this.firestore, 'users', user.uid);
      return updateDoc(userDocRef, {
        subscription: subscription,
      });
    } else {
      return Promise.reject('No authenticated user found');
    }
  }
  async signUp(
    email: string,
    password: string,
    userData: Partial<User>
  ): Promise<UserCredential> {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );

      await this.createUserData(userCredential.user.uid, {
        ...userData,
        id: userCredential.user.uid,
        email: email,
        subscription: false,
      });
      return userCredential;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  private async createUserData(
    userId: string,
    userData: Partial<User>
  ): Promise<void> {
    const userRef = doc(collection(this.firestore, 'users'), userId);
    return setDoc(userRef, userData);
  }

  async getCurrentUser(userId: string): Promise<User | null> {
    try {
      const userDoc = await getDoc(doc(this.firestore, 'users', userId));
      if (userDoc.exists()) {
        return userDoc.data() as User;
      }
      return null;
    } catch (error) {
      console.error('Error fetching user data:', error);
      return null;
    }
  }
  async hasActiveSubscription(): Promise<boolean> {
    const user = this.auth.currentUser;
    if (!user) return false;

    try {
      const userDoc = await getDoc(doc(this.firestore, 'users', user.uid));
      const userData = userDoc.data();
      return userData?.['subscription'] === true;
    } catch (error) {
      console.error('Error checking subscription status:', error);
      return false;
    }
  }

  getSubscriptionStatus() {
    return from(this.hasActiveSubscription());
  }
}
