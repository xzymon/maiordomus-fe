import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {DummyMessageModel} from '../../../model/dummy-message.model';
import {QuarterlyStockCandle} from '../../../model/quarterly-stock-candle.model';

@Injectable({
  providedIn: 'root'
})
export class QuarterlyService {

	constructor() { }

	public getAll(): Observable<QuarterlyStockCandle[]> {
		return new Observable<QuarterlyStockCandle[]>((observer) => {
			fetch('http://localhost:8080/api/v1/qstock/all')
				.then(response => response.json())
				.then(data => {
					observer.next(data);
					console.log(`QuarterlyService: ${data}`);
					observer.complete();
				})
				.catch(error => observer.error(error));
		});
	}
}
