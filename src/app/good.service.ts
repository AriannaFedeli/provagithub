import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Good } from './Good';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/toPromise';


@Injectable()

export class GoodService {


  //richiamo al servizio Good del server
  private baseUrl: string = "http://localhost:8000/goods";
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }

  //metodo per prendere ogni oggetto Good dal server tramite il file .json
 /*getGoods(): Observable<Good[]> {
    return this.http.get(this.baseUrl)
      .map((res: Response) => { return res.json().data as Good[]; })
      .catch(this.handleError);
  }*/
  
  

getGoods(): Promise<Good[]> {
     return this.http.get(this.baseUrl)
      .toPromise()
      .then(response => response.json().data as Good[])
      .catch(this.handleError);

  }
//mettere filed per field
  /*hetgoodsordinati(id: number): Observable<Good[]> {
      const url = `${this.baseUrl}/{?}${id=id}`;

    return this.http.get(url)
      .map((res: Response) => { return res.json(); })
      .catch(this.handleError);
  }*/
getgGoodId(id: number): Promise<Good> {
    return this.getGoods()
      .then(goods=> goods.find(good => good.id === id))
  }

  getGoodId(id: number): Observable<Good> {
       const url = `${this.baseUrl}/${id}`;
    return this.http.get(url)
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

    return this.http
    .post(this.baseUrl, JSON.stringify({
      description: description,
      quantity: quantity,
      price: price
    }),
    {headers: this.headers})
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }
  //metodo CRUD update



    updateGood(good:Good): Promise<Good> {
    const url = `${this.baseUrl}/${good.id}`;
    return this.http
      .put(url, JSON.stringify(good), {headers: this.headers})
      .toPromise()
      .then(() => good)
      .catch(this.handleError);
  }


  /*updateGood(good: Good): Observable<void> {
     const url = `${this.baseUrl}/${good.id}`;
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    return this.http.put(url, JSON.stringify(good), {headers: headers})
      .map((res: Response) => {return;})
      .catch(this.handleError);
  }
*/
delete(id: number): Promise<void> {

    const url = `${this.baseUrl}/${id}`;
    return this.http
      .delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  //metodo CRUD delete
 /* removegood(id: number): Observable<void> {
        const url = `${this.baseUrl}/${id}`;
    return this.http.delete(url)
      .map((res: Response) => {
        return;
      })
      .catch(this.handleError);
  }*/

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

    return Observable.throw(applicationError || modelStateErrors || serverError);
  }

}
