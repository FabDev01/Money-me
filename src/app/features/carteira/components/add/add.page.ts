import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { Tab2Service } from '../../service/tab2.service';
import { Item } from '../../model/item.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { tap } from 'rxjs/operators';
import { from } from 'rxjs';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
  public item: Item = {
    uid: '',
    title: '',
    type: '',
    amount: 0,
    date: '',
    id: '',
  };

  private uid: string;

  constructor(
    private modalCtrl: ModalController,
    private itemService: Tab2Service,
    private route: ActivatedRoute,
    private auth: AngularFireAuth,
    private toastCtrl: ToastController
  ) {
    from(this.auth.user)
      .pipe(tap(({ uid }) => (this.uid = uid)))
      // tslint:disable-next-line: deprecation
      .subscribe();
  }

  ngOnInit() {
    this.auth.user
      .pipe(
        tap(({ uid }) => {
          this.item.uid = uid;
        })
      )
      // tslint:disable-next-line: deprecation
      .subscribe();
  }

  AddBill() {
    if (
      this.item.title !== '' &&
      this.item.type !== '' &&
      this.item.amount !== 0
    ) {
      this.itemService.addItem(this.item, this.uid);
      console.log(this.item);
      (this.item.title = ''), (this.item.type = ''), (this.item.amount = 0);
      this.close();
    } else {
      this.toast();
    }
    // this.itemService.addItem(this.item);
  }

  async toast() {
    const toast = await this.toastCtrl.create({
      message: 'Preencha todos os campos',
      duration: 2000,
      color: 'warning',
      position: 'top',
    });
    toast.present();
  }

  close() {
    this.modalCtrl.dismiss();
  }
}
