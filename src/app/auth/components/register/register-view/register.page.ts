import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  user: any = {};
  constructor(
    private authObj: AngularFireAuth,
    private router: Router,
    private toastCtrl: ToastController,
    public loadingController: LoadingController
  ) {}

  ngOnInit() {}
  register() {
    if (this.user.email && this.user.password) {
      this.authObj
        .createUserWithEmailAndPassword(this.user.email, this.user.password)
        .then((r) => {
          console.log(r);
          this.toastRun();
          this.presentLoading();
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      this.toastNot();
    }
  }

  async toastNot() {
    const toastEr = await this.toastCtrl.create({
      message: 'Preencha todos os campos',
      duration: 2000,
      color: 'warning',
      position: 'bottom',
    });
    toastEr.present();
  }

  async toastRun() {
    const toastYes = await this.toastCtrl.create({
      message: 'Usuario Cadastrado',
      duration: 1500,
      color: 'warning',
      position: 'bottom',
    });
    toastYes.present();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Redirecionando',
      duration: 2000,
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    this.router.navigateByUrl('/tabs/tab1');
    console.log('Loading dismissed!');
  }
}
