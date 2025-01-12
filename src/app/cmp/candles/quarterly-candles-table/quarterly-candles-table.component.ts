import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {filter, mergeMap, tap} from 'rxjs';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {QuarterlyService} from '../../../svc/stock/candles/quarterly.service';
import {QuarterlyStockCandle} from '../../../model/quarterly-stock-candle.model';

@Component({
  selector: 'quarterly-candles-table',
	imports: [
		MatTableModule
	],
  templateUrl: './quarterly-candles-table.component.html',
  styleUrl: './quarterly-candles-table.component.scss'
})
export class QuarterlyCandlesTableComponent implements OnInit, OnChanges {
	@Input() candles: QuarterlyStockCandle[] = [];

	dataSource = new MatTableDataSource(this.candles);

	columnsToDisplay: string[] = ['day', 'periodEnd', 'periodEndInDayNo', 'open', 'high', 'low', 'close'];

	constructor(private quarterlyService: QuarterlyService) {}

	ngOnInit(): void {
		this.dataSource = new MatTableDataSource(this.candles);
	}

	ngOnChanges(): void {
		this.dataSource = new MatTableDataSource(this.candles);
	}
}
