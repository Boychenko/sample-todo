import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { IItem } from './item';
import { IListResponse } from '../common/listResponse';
import {CONFIG} from '../common/config';

@Injectable()
export class ItemsService {
    private _ItemsUrl = `${CONFIG.baseApiUrl}items`;

    constructor(private _http: Http) { }

    getItems(): Observable<IListResponse<IItem>> {
        return this._http.get(this._ItemsUrl)
            .map((response: Response) => {
              let result = <IListResponse<IItem>> response.json();
              result.list.forEach(i => i.dueDate = new Date(i.dueDate.toString()));
              return result;
            })

            .do(data => console.log('All: ' +  JSON.stringify(data)))
            .catch(this.handleError);
    }

/*    getItem2(id: number): Observable<Item2> {
        return this.getItems()
            .map((Item2s: Item2[]) => Item2s.find(p => p.id === id));
    }*/

    private handleError(error: Response) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        // console.log(error.json());
        // console.log(error.statusText);
        return Observable.throw(error.json().error || 'Server error');
    }

}
