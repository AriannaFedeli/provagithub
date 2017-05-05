import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Good } from './Good';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { Observer } from 'rxjs/Observer'

@Injectable()

export class GoodService {

  private headers = new Headers({ 'Content-Type': 'application/json' });
  //richiamo al servizio Good del server
  private baseUrl: string = "http://localhost:8000/goods";
  

  constructor(private http: Http) { }

  //metodo per prendere ogni oggetto Good dal server tramite il file .json
  getGoods(): Observable<Good[]> {
    return this.http.get(this.baseUrl)
      .map((res: Response) => { return res.json(); })
      .catch(this.handleError);
  }
  
  


  getgoodsordinati(): Observable<Good[]> {
    return this.http.get(this.baseUrl + "?field=" + "field")
      .map((res: Response) => { return res.json(); })
      .catch(this.handleError);
  }

  getGoodId(id: number): Observable<Good> {
    return this.http.get(this.baseUrl + '/' + id)
      .map((res: Response) => { return res.json(); })
      .catch(this.handleError);
  }

  /*
    //metodo CRUD create
    createGood(good: Good): Observable<Good> {
  
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
  
      return this.http.post(this.baseUrl, JSON.stringify(good), {
        headers: headers
      })
      .map((res: Response) => {
        return res.json();
      }).catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }*/


  createGood(description: string, quantity: number, price: number): Promise<Good> {
    let bod = JSON.stringify({
      description: description,
      quantity: quantity,
      price: price
    });
    return this.http.post(this.baseUrl, bod, { headers: this.headers })
      .toPromise()
      .then(res => res.json().data as Good)
      .catch(this.handleError);
  }
  //metodo CRUD update
  updateGood(good: Good): Observable<void> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    return this.http.put(this.baseUrl + '/' + good.id, JSON.stringify(good), {
      headers: headers
    })
      .map((res: Response) => {
        return;
      })
      .catch(this.handleError);
  }


  //metodo CRUD delete
  removegood(id: number): Observable<void> {
    return this.http.delete(this.baseUrl + '/' + id)
      .map((res: Response) => {
        return;
      })
      .catch(this.handleError);
  }

  private handleError(error: any) {
    var applicationError = error.headers.get('Application-Error');
    var serverError = error.json();
    var modelStateErrors: string = '';

    if (!serverError.type) {
      console.log(serverError);
      for (var key in serverError) {
        if (serverError[key])
          modelStateErrors += serverError[key] + '\n';
      }
    }

    modelStateErrors = modelStateErrors = '' ? null : modelStateErrors;

    return Observable.throw(applicationError || modelStateErrors || 'Server error');
  }

}
