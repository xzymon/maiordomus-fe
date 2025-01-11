import {Component, OnInit} from '@angular/core';
import {filter, mergeMap, tap} from 'rxjs';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {QuarterlyService} from '../../svc/stock/candles/quarterly.service';
import {QuarterlyStockCandle} from '../../model/quarterly-stock-candle.model';

@Component({
  selector: 'quarterly-candles-table',
	imports: [
		MatTableModule
	],
  templateUrl: './quarterly-candles-table.component.html',
  styleUrl: './quarterly-candles-table.component.scss'
})
export class QuarterlyCandlesTableComponent implements OnInit{
	qsCandlesData: QuarterlyStockCandle[] = [];
	qsCandle!: QuarterlyStockCandle;
	valueFromService: string = '';
	status: string = '';

	dataSource = new MatTableDataSource(this.qsCandlesData);

	columnsToDisplay: string[] = ['day', 'periodEnd', 'periodEndInDayNo', 'open', 'high', 'low', 'close'];

	constructor(private quarterlyService: QuarterlyService) {}

	ngOnInit(): void {
		//this.getWired();
		this.getQuarterlyData();
	}


	public getQuarterlyData() {
		this.quarterlyService.getAll().pipe(
			tap(elements => {
				this.qsCandlesData = elements;
				console.log('[tap] All elements:', this.qsCandlesData);
				this.dataSource = new MatTableDataSource(this.qsCandlesData);
			}),
			mergeMap(elements => elements)//,
			//filter(element => element.id < 10)
		).subscribe({
			next: (filteredElement) => {
				console.log('Filtered Element:', filteredElement);
				// Optionally do something with the filtered element
				this.qsCandle = filteredElement;
				this.valueFromService = this.qsCandle.periodEnd;
				console.log(this.valueFromService);
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
