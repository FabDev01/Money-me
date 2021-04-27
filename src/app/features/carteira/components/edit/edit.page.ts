import { Component, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { from } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Item } from '../../../home/model/item.model';
import { Tab2Service } from '../../service/tab2.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  public items: Item[];
  @Input() item: Item;
  public itemForm = this.fb.group({
    uid: ['', Validators.required],
    title: ['', Validators.required],
    type: ['', Validators.required],
    amount: [0, Validators.required],
    date: ['', Validators.required],
    id: ['', Validators.required],
  });
  constructor(
    private modalCtrl: ModalController,
    private auth: AngularFireAuth,
    private itemService: Tab2Service,
    private fb: FormBuilder
  ) {
    from(this.auth.user)
      .pipe(tap(({ uid }) => (this.itemForm.value.uid = uid)))
      // tslint:disable-next-line: deprecation
      .subscribe();
  }

  ngOnInit() {
    this.itemForm.patchValue(this.item);
    this.auth.user.pipe(
      tap(({ uid }) => {
        this.itemForm.value.uid = uid;
      })
    );
  }

  EditBill() {
    this.itemService.editItem(this.itemForm.value);
    console.log(this.itemForm.value);
    this.close();
  }

  close() {
    this.modalCtrl.dismiss();
  }
}
