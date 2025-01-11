import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {DummyMessageModel} from '../../model/dummy-message.model';

@Injectable({
  providedIn: 'root'
})
export class WiredService {

  constructor() { }

  public getWired(): Observable<string> {
    return new Observable<string>((observer) => {
      observer.next('wired!');
      observer.complete();
    });
  }

  public getDummyData(): Observable<DummyMessageModel[]> {
    return new Observable<DummyMessageModel[]>((observer) => {
      fetch('http://localhost:8080/api/v1/dummy/all')
        .then(response => response.json())
        .then(data => {
          observer.next(data);
          console.log(`WiredService: ${data}`);
          observer.complete();
        })
        .catch(error => observer.error(error));
    });
  }

  public postDummyData(message: string): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      fetch('http://localhost:8080/api/v1/dummy/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({message})
      })
        .then(response => {
			if (response.status === 201) {
				observer.next(true);
			} else {
				observer.next(false);
			}
			observer.complete();
		})
    })
  }
}
