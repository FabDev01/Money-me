import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user: any = {};

  constructor(
    private authObj: AngularFireAuth,
    private router: Router,
    private toastCtrl: ToastController,
    public loadingController: LoadingController
  ) {}

  ngOnInit() {}

  login() {
    if (this.user.email && this.user.password !== '') {
      this.authObj
        .signInWithEmailAndPassword(this.user.email, this.user.password)
        .then((res) => {
          this.presentLoading();
          console.log(res);
        })
        .catch((e) => {
          console.log(e);
          this.toastNot();
        });
    } else {
      this.toastRes();
    }
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Carregando',
      duration: 2000,
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    this.router.navigateByUrl('/tabs/tab1');
    console.log('Loading dismissed!');
  }

  async toastNot() {
    const toastEr = await this.toastCtrl.create({
      message: 'Senha ou Email invalido',
      duration: 2000,
      color: 'warning',
      position: 'bottom',
    });
    toastEr.present();
  }

  async toastRes() {
    const toastRe = await this.toastCtrl.create({
      message: 'Preencha todos os campos',
      duration: 2000,
      color: 'warning',
      position: 'bottom',
    });
    toastRe.present();
  }
}
