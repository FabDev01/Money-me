import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AddPage } from './components/add/add.page';
import { Tab2Page } from './components/tab2/tab2.page';

const routes: Routes = [
  {
    path: '',
    component: Tab2Page,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), ReactiveFormsModule, FormsModule],
  exports: [RouterModule],
})
export class Tab2PageRoutingModule {}
