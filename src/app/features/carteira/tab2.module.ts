import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Tab2Page } from './components/tab2/tab2.page';
import { Tab2PageRoutingModule } from './tab2-routing.module';
import { AddPage } from './components/add/add.page';
import { EditPage } from './components/edit/edit.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab2PageRoutingModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  declarations: [Tab2Page, AddPage, EditPage],
  entryComponents: [AddPage, EditPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Tab2PageModule {}
