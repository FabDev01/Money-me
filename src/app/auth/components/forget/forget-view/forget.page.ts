import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-forget',
  templateUrl: './forget.page.html',
  styleUrls: ['./forget.page.scss'],
})
export class ForgetPage implements OnInit {
  email: any;
  constructor(
    private authObj: AngularFireAuth,
    private router: Router,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {}

  reset() {
    if (this.email) {
      this.authObj
        .sendPasswordResetEmail(this.email)
        .then((r) => {
          console.log(r, ' email enviado');
          this.toastRun();
        })
        .catch((e) => {
          console.log('e');
        });
    } else {
      this.toastErr();
    }
  }

  async toastRun() {
    const toastYes = await this.toastCtrl.create({
      message: 'Link enviado com sucesso',
      duration: 2000,
      color: 'warning',
      position: 'bottom',
    });
    toastYes.present();
  }
  async toastErr() {
    const toastNo = await this.toastCtrl.create({
      message: 'Insira seu email cadastrado',
      duration: 2000,
      color: 'warning',
      position: 'bottom',
      cssClass: 'custom-load',
    });
    toastNo.present();
  }
}
