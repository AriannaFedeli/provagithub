import { Component, OnInit } from '@angular/core';
import {GoodService} from './good.service';
import {Good} from './Good';
import {Routes, ActivatedRoute} from '@angular/router';
import { Location } from '@angular/common';
@Component({
moduleId:module.id,
selector : 'goods-edit',
templateUrl:'good-edit.component.html'
})
export class GoodEditComponent implements OnInit{
  id: number;
 // description:string;
  body:string;
  quantity:number;
  price:number;
  postId: number;
  title: string;


  good:Good;
  info:string ="";
  goodedited:boolean = false;

  constructor( private postsService:GoodService, private route: ActivatedRoute, private location: Location){}
goBack(): void {
        this.location.back();     
    }
  ngOnInit(){
    this.id = +this.route.snapshot.params['id'];

    this.postsService.getGoodId(this.id).subscribe((good:Good)=> {

      console.log('Good caricato correttamente');
      this.body=good.body;
      this.postId=good.postId;
      //this.price =good.;
    },
error => {console.log('errore nel caricamento del good' +error);
});

  }

  updateGood(){
    this.good={
      "id":this.id,
      "body":this.body,
      "postId":this.postId,
      "title": this.title
     // "price":this.price
    }

    this.postsService.updateGood(this.good)
    .subscribe(() => {
      this.goodedited=true;
      console.log('good modificato con successo');


    },
    error=> {
      console.log('errore nella modifica del good'+error);
    });
  }


}
