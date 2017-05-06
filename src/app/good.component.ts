import { Component } from "@angular/core";
import { Http } from "@angular/http";
import { OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Good } from './Good';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { GoodService } from "./good.service";
import { Observer } from 'rxjs/Observer'


@Component({
    moduleId: module.id,
    selector: 'good',
    templateUrl: './good.component.html',
    providers: [GoodService]
})

export class GoodComponent implements OnInit {

    public goods: Good[] = []; //array di goods
    data:Good[]; //array di  lavoro
    dataordinati:Good[];
    public filterQuery = "";
    public rowsOnPage = 10;
    public sortBy = "id";
    public sortOrder = "asc";

  selectedgoods: Good;
    constructor(private GoodService: GoodService) {}

    ngOnInit() {
        /*this.GoodService.getGoods()
            .subscribe(
            (goods: Good[]) => { this.data = goods; },
            error => {
                console.log('Failed to load Goods' + error);
            });
        console.log("Success to load Goods");*/
 this.getGoods();
  }

	getGoods(): void {
	  this.GoodService.getGoods().then(heroes => this.goods = heroes);
  }


 add(description, quantity,price): void {
    this.GoodService.createGood(description, quantity, price)
      .then(hero => {
        this.goods.push(hero);
        this.selectedgoods = null;
      });
  }

  delete(hero: Good): void {
	  this.GoodService
      .delete(hero.id)
      .then(() => {
	      this.goods = this.goods.filter(h => h !== hero);
	      if(this.selectedgoods === hero) {
	        this.selectedgoods = null;
        }
      });
  }


/*
        this.GoodService.getGoods()
      .then(goods => this.goods  = goods);
   */
  

    public toInt(num: string) {
        return +num;
    }
/*
public onclick(){
    this.GoodService.getgoodsordinati()
            .subscribe(
            (goods: Good[]) => { this.data = goods; },
            error => {
                console.log('Failed to load Goods' + error);
            });
        console.log("Success to load Goodsordinati");
}*/
}