import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import {CONFIG} from '../common/config';

export interface IReferences {
  priorities: Map<number, string>;
}

@Injectable()
export class ReferencesService {
  private _referencesUrl = `${CONFIG.baseApiUrl}references`;
  private _references: ReplaySubject<IReferences> = null;

  constructor(private _http: Http) { }

  getReferences(): Observable<IReferences> {
    if (this._references === null) {
      this._references = new ReplaySubject<IReferences>();
      this._http.get(this._referencesUrl)
      .map((response: Response) => <IReferences>response.json())
      .catch(this.handleError)
      .subscribe((references: IReferences) => this._references.next(references));
    }
    return this._references;
  }

  private handleError(error: Response) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    // console.log(error.json());
    // console.log(error.statusText);
    return Observable.throw(error.json().error || 'Server error');
  }
}
