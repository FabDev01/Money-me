import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AddPage } from '../add/add.page';
import { Tab2Service } from '../../service/tab2.service';
import { Item } from '../../model/item.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { tap } from 'rxjs/operators';
import { from } from 'rxjs';
import { EditPage } from '../edit/edit.page';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  public items: Item[];
  public filterTransaction: Item[];
  public lupe: boolean;
  public top: boolean;
  // public term = '';
  private uid: string;
  constructor(
    private router: Router,
    private modalCtrl: ModalController,
    private itemService: Tab2Service,
    private auth: AngularFireAuth
  ) {
    from(this.auth.user)
      .pipe(tap(({ uid }) => (this.uid = uid)))
      // tslint:disable-next-line: deprecation
      .subscribe();
  }

  ngOnInit() {
    this.get();
    this.auth.user
      .pipe(
        tap(({ uid }) => {
          this.uid = uid;
          this.get();
        })
      )
      // tslint:disable-next-line: deprecation
      .subscribe();
    this.top = true;
  }

  get() {
    // tslint:disable-next-line: deprecation
    this.itemService.getItems(this.uid).subscribe((items: Item[]) => {
      this.items = items;
      this.filterTransaction = items;
    });
  }

  search() {
    this.lupe = true;
    this.top = false;
  }

  refresh() {
    this.lupe = false;
    this.top = true;
  }

  delete_transactions(item: Item) {
    // tslint:disable-next-line: deprecation
    this.itemService.delete(item.id).subscribe(console.log);
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: AddPage,
    });
    return await modal.present();
  }

  async openModalEdit(item: Item) {
    const modal = await this.modalCtrl.create({
      component: EditPage,
      componentProps: {
        item,
      },
    });
    return await modal.present();
  }

  filter(event: any) {
    const regex = RegExp(event.detail.value, 'gmi');
    this.filterTransaction = this.items.filter((item) =>
      regex.exec(item.title)
    );
  }

  doRefresh(event) {
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 1000);
    this.get();
  }
}
