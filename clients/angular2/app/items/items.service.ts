import {Injectable} from '@angular/core';
import {Http, Response, URLSearchParams, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import {IItem} from './item';
import {IListResponse} from '../common/listResponse';
import {CONFIG} from '../common/config';

@Injectable()
export class ItemsService {
  private _ItemsUrl = `${CONFIG.baseApiUrl}items`;

  constructor(private _http: Http) { }

  getItems(page: number, pageSize: number): Observable<IListResponse<IItem>> {
    let params = new URLSearchParams();
    params.set('page', page.toString());
    params.set('pageSize', pageSize.toString());
    return this._http.get(this._ItemsUrl, { search: params })
      .map((response: Response) => {
        let result = <IListResponse<IItem>>response.json();
        result.list.forEach(i => i.dueDate = new Date(i.dueDate.toString()));
        return result;
      })
      .catch(this.handleError);
  }

  getItem(id: number): Observable<IItem> {
    return this._http.get(this._ItemsUrl + `/${id}`)
      .map((response: Response) => {
        let result = <IItem>response.json();
        result.dueDate = new Date(result.dueDate.toString());
        return result;
      })
      .catch(this.handleError);
  }

  saveItem(item: IItem) {
    let method;
    if (item.id) {
      method = this._http.put.bind(this._http);
    } else {
      method = this._http.post.bind(this._http)
    }

    return method(this._ItemsUrl, JSON.stringify(item))
      .catch(this.handleError);
  }

  deleteItem(item: IItem) {
    return this._http.delete(this._ItemsUrl + `/${item.id}`).catch(this.handleError);
  }

  private handleError(error: Response) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    // console.log(error.json());
    // console.log(error.statusText);
    return Observable.throw(error.json().error || 'Server error');
  }
}
