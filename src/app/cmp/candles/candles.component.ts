import { Component } from '@angular/core';
import {QuarterlyCandlesTableComponent} from './quarterly-candles-table/quarterly-candles-table.component';
import {QuarterlyCandlesGraphComponent} from './quarterly-candles-graph/quarterly-candles-graph.component';
import {QuarterlyStockCandle} from '../../model/quarterly-stock-candle.model';
import {mergeMap, tap} from 'rxjs';
import {MatTableDataSource} from '@angular/material/table';
import {QuarterlyService} from '../../svc/stock/candles/quarterly.service';

@Component({
  selector: 'candles',
	imports: [
		QuarterlyCandlesTableComponent,
		QuarterlyCandlesGraphComponent
	],
  templateUrl: './candles.component.html',
  styleUrl: './candles.component.scss'
})
export class CandlesComponent {
	qsCandlesData: QuarterlyStockCandle[] = [];
	qsCandle!: QuarterlyStockCandle;
	valueFromService: string = '';
	status: string = '';

	constructor(private quarterlyService: QuarterlyService) {}

	ngOnInit(): void {
		this.getQuarterlyData();
	}

	public getQuarterlyData() {
		this.quarterlyService.getAll().pipe(
			tap(elements => {
				this.qsCandlesData = elements;
				//console.log('[tap] All elements:', this.qsCandlesData);
			}),
			mergeMap(elements => elements)//,
			//filter(element => element.id < 10)
		).subscribe({
			next: (filteredElement) => {
				//console.log('Filtered Element:', filteredElement);
				// Optionally do something with the filtered element
				this.qsCandle = filteredElement;
				this.valueFromService = this.qsCandle.periodEnd;
				//console.log(this.valueFromService);
			},
			error: (error) => {
				console.error('Error occurred while fetching filtered elements:', error);
			},
			complete: () => {
				console.info('Completed filtered element subscription');
			}
		});
	}

}
