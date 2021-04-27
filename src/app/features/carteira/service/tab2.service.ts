import { Injectable } from '@angular/core';
import { AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { Item } from '../model/item.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class Tab2Service {
  itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;
  itemDoc: AngularFirestoreDocument<Item>;

  constructor(private afs: AngularFirestore) {
    this.itemsCollection = this.afs.collection('Items', (ref) =>
      ref.orderBy('type', 'desc')
    );
  }

  getItems(uid: string) {
    return this.afs
      .collection('Items', (ref) => ref.where('uid', '==', `${uid}`))
      .valueChanges();
  }

  addItem(item: Item, userId: string) {
    const id: string = uuidv4();

    return from(
      this.afs
        .collection('Items')
        .doc(id)
        .set({ ...item, id, uid: userId })
    );
  }

  editItem(item: Item) {
    return from(
      this.afs
        .collection('Items')
        .doc(item.id)
        .update({ ...item })
    );
  }
  delete(uid: string) {
    return from(this.afs.collection('Items').doc(uid).delete());
  }

  searchByName(name: string): Observable<Item[]> {
    return this.afs
      .collection<Item>('Items', (ref) =>
        ref
          .orderBy('title')
          .startAt(name)
          .endAt(name + '\uf8ff')
      )
      .valueChanges();
  }
}
