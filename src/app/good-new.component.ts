import { Component, OnInit } from '@angular/core';
import { GoodService } from './good.service';
import { Good } from './Good';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  moduleId: module.id,
  selector: 'goods-new',
  templateUrl: 'good-new.component.html'
})
export class GoodNewComponent {
  goods: Good[];
  goodCreated: boolean = false;

  constructor(private postsService: GoodService, private route: ActivatedRoute, private location: Location) { }

  newGood(description: string, quantity: number, price: number) {
    this.postsService.createGood(description, quantity, price)
      .then(newgood => {
        this.goods.push(newgood);
      });
  }

  goBack(): void {
    this.location.back();
  }
}
