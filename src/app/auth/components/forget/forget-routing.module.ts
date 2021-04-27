import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ForgetPage } from './forget-view/forget.page';

const routes: Routes = [
  {
    path: '',
    component: ForgetPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForgetPageRoutingModule {}
