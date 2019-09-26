import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FoodListComponent } from './food-list/food-list.component';

const routes: Routes = [
  {
    path: 'food-list',
    component: FoodListComponent
  },
  { path: '', redirectTo: 'food-list', pathMatch: 'full' },
  { path: '**', redirectTo: 'food-list' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
