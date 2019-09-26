import { Component, OnInit } from '@angular/core';
import { FoodService } from '../shared/food.service';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.scss']
})
export class FoodListComponent implements OnInit {

  constructor(private foodService: FoodService) { }

  allFoodItems$: Observable<FoodItem[]>;
  vegetarianFoodItems$: Observable<FoodItem[]>;
  veganFoodItems$: Observable<FoodItem[]>;
  searchTerm$: BehaviorSubject<string> = new BehaviorSubject('');

  searchTerm: string;

  ngOnInit() {
    this.allFoodItems$ = combineLatest(
      this.foodService.getFoodItems(),
      this.searchTerm$
    ).pipe(
      map(obj => obj[0].filter(x => x.name.toLowerCase().includes(obj[1].toLowerCase())))
    );

    this.vegetarianFoodItems$ = this.allFoodItems$.pipe(
      map(x => x.filter(y => y.isVegetarian)),
    );

    this.veganFoodItems$ = this.allFoodItems$.pipe(
      map(x => x.filter(y => y.isVegan))
    );

    this.vegetarianFoodItems$.subscribe(x => console.log(x));
  }

  searchFoodItems(searchTerm: string) {
    this.searchTerm$.next(searchTerm);
  }

}

export interface FoodItem {
  name: string,
  isVegetarian: boolean,
  isVegan: boolean,
  price: number
}
