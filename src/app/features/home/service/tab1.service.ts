import { Injectable } from '@angular/core';
import { Item } from '../model/item.model';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, filter, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
@Injectable({
  providedIn: 'root',
})
export class Tab1Service {
  itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;
  // itemDoc: AngularFirestoreDocument<Item>;

  constructor(public afs: AngularFirestore) {
    // this.items = this.afs.collection('Items').valueChanges();
    this.itemsCollection = this.afs.collection('Items', (ref) =>
      ref.orderBy('type', 'asc')
    );
  }

  getWithfilter(filtering: string): Observable<unknown[]> {
    return this.afs
      .collection('Items', (ref) => ref.where('type', '==', `${filtering}`))
      .valueChanges();
  }

  getItems(uid: string) {
    return this.afs
      .collection('Items', (ref) => ref.where('uid', '==', `${uid}`))
      .valueChanges();
  }

  // getItems(uid: string) {
  //   return this.afs
  //     .collection('Items', (ref) => ref.where('uid', '==', `${uid}`))
  //     .valueChanges();
  // }
}
