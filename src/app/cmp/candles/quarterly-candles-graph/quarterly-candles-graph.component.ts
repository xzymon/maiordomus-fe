import {AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {QuarterlyStockCandle} from '../../../model/quarterly-stock-candle.model';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'quarterly-candles-graph',
  imports: [],
  templateUrl: './quarterly-candles-graph.component.html',
  styleUrl: './quarterly-candles-graph.component.scss'
})
export class QuarterlyCandlesGraphComponent implements AfterViewInit, OnInit, OnChanges {
	@Input() candles: QuarterlyStockCandle[] = [];

	@ViewChild('canvasBackground', { static: false }) canvasBackground!: ElementRef<HTMLCanvasElement>;
	@ViewChild('canvasGauges', { static: false }) canvasGauges!: ElementRef<HTMLCanvasElement>;
	@ViewChild('canvasCandles', { static: false }) canvasCandles!: ElementRef<HTMLCanvasElement>;

	private bakCtx!: CanvasRenderingContext2D;
	private gaugesCtx!: CanvasRenderingContext2D;
	private candlesCtx!: CanvasRenderingContext2D;

	private maxNoOfCandles: number = 96;
	private candleHalfWidthFromCore: number = 4;
	private candleCoreWidth: number = 1;
	private candlesGap: number = 1;
	private frameHeight: number = 600;
	private frameLeft: number = 50;
	private frameTop: number = 50;
	private frameWidth: number = 0;
	private frameBottom: number = 0;
	private frameRight: number = 0;
	private zeroCandleX: number = 0;
	private candleOffset: number = 0;
	private verticalPadding: number = 10;
	private extremumTop: number = 0;
	private extremumBottom: number = 0;
	private transTop: number = 144.0;
	private transBottom: number = 141.5;
	private transNormalizedStepsCount: number = 0;
	private transNormalizedStep: number = 0;

	ngOnInit(): void {
		console.log('[ngOnInit] All elements:');
		console.log(this.candles);
	}

	ngOnChanges(): void {
		console.log('[ngOnChanges] All elements:');
		console.log(this.candles);
		for (let i = 0; i < this.candles.length; i++) {
			let candle = this.candles[i];
			let candleId = candle.periodEndInDayNo;
			let candleOpen = this.translateVertical(candle.open);
			let candleHigh = this.translateVertical(candle.high);
			let candleLow = this.translateVertical(candle.low);
			let candleClose = this.translateVertical(candle.close);
			this.drawStandardNthCandle(candleId, candleOpen, candleHigh, candleLow, candleClose);
		}
	}

	ngAfterViewInit(): void {
		this.frameWidth = this.maxNoOfCandles * (this.candleHalfWidthFromCore * 2 + this.candleCoreWidth + this.candlesGap) + 2 * (this.candleHalfWidthFromCore + this.candlesGap);
		this.frameRight = this.frameLeft + this.frameWidth;
		this.frameBottom = this.frameTop + this.frameHeight;
		this.zeroCandleX = this.frameLeft + this.candleHalfWidthFromCore * 2 + 2 * this.candlesGap;
		this.candleOffset = this.candleHalfWidthFromCore * 2 + this.candleCoreWidth + this.candlesGap;
		this.extremumTop = this.frameTop + this.verticalPadding;
		this.extremumBottom = this.frameBottom - this.verticalPadding;
		this.transNormalizedStepsCount = this.extremumBottom - this.extremumTop; // ? +1
		this.transNormalizedStep = (this.transTop - this.transBottom) / this.transNormalizedStepsCount;
		if (this.canvasBackground) {
			// Pobierz kontekst 2D dla <canvas>
			this.bakCtx = this.canvasBackground.nativeElement.getContext('2d') as CanvasRenderingContext2D;
			this.gaugesCtx = this.canvasGauges.nativeElement.getContext('2d') as CanvasRenderingContext2D;
			this.candlesCtx = this.canvasCandles.nativeElement.getContext('2d') as CanvasRenderingContext2D;

			this.drawFrameBasedOnCandleDimensionsSimplified();

			//this.drawStandardNthCandle(0, 410, 300, 420, 320);
			//this.drawStandardNthCandle(10, 200, 100, 220, 150);
			//this.drawStandardNthCandle(95, 200, 180, 300, 270);

			/*
			console.log(`transNormalizedStepsCount: ${this.transNormalizedStepsCount}`);
			console.log(`transNormalizedStep: ${this.transNormalizedStep}`);
			const translatedMax =  this.translateVertical(144.0);
			console.log(`translatedMax: ${translatedMax}`);
			const translated1 =  this.translateVertical(143.5);
			console.log(`translated1: ${translated1}`);
			const translated2 =  this.translateVertical(143.0);
			console.log(`translated2: ${translated2}`);
			const translated3 =  this.translateVertical(142.5);
			console.log(`translated3: ${translated3}`);
			const translated4 =  this.translateVertical(142.0);
			console.log(`translated4: ${translated4}`);
			const translatedMin =  this.translateVertical(141.5);
			console.log(`translatedMin: ${translatedMin}`);
			 */
		}
	}

	private drawBlueRectangle(): void {
		this.bakCtx.fillStyle = '#00f'; // Niebieski
		this.bakCtx.fillRect(50, 50, 200, 100); // Rysuje prostokąt o wymiarach 200x100 na pozycji (50, 50)
	}

	private drawRectangle(color: string, x: number, y: number): void {
		this.bakCtx.fillStyle = color; // Niebieski
		this.bakCtx.fillRect(x, y, 200, 100); // Rysuje prostokąt o wymiarach 200x100 na pozycji (50, 50)
	}

	private drawLine(): void {
		this.bakCtx.strokeStyle = '#00ff00'; // Zielony
		this.bakCtx.lineWidth = 5;
		this.bakCtx.beginPath();
		this.bakCtx.moveTo(300, 100); // Pozycja początkowa
		this.bakCtx.lineTo(500, 100); // Pozycja końcowa
		this.bakCtx.stroke();
	}

	private drawCircle(): void {
		this.bakCtx.strokeStyle = '#ff0000'; // Czerwony
		this.bakCtx.lineWidth = 5;
		this.bakCtx.beginPath();
		this.bakCtx.arc(400, 300, 80, 0, Math.PI * 1.5); // Rysuje okrąg o środku (400, 300) i promieniu 80
		this.bakCtx.stroke();
	}

	private drawCandle(coreX: number, halfWidth: number, openY: number, highY: number, lowY: number, closeY: number, whiteColor: string, grayColor: string, blackColor: string): void {
		// wartości Y narastają wraz z ruchem "w dół" na ekranie
		// wartości X narastają wraz z ruchem "w prawo" na ekranie
		// z tego powodu highY musi otrzymywać wartość mniejszą niż lowY
		// przy czym tego nie sprawdzamy w tej metodzie, ale zakładamy, że to zachodzi
		let color = blackColor;
		if (closeY < openY) color = whiteColor;
		if (closeY == openY) color = grayColor;
		this.candlesCtx.fillStyle = color;
		let rectX = coreX - halfWidth;
		let rectY = Math.min(openY, closeY);
		let rectWidth = halfWidth * 2;
		let rectHeight = Math.abs(openY - closeY);
		this.candlesCtx.fillRect(rectX, rectY, rectWidth, rectHeight);

		this.candlesCtx.strokeStyle = color;
		this.candlesCtx.lineWidth = 1;
		this.candlesCtx.beginPath();
		this.candlesCtx.moveTo(coreX, highY);
		this.candlesCtx.lineTo(coreX, lowY);
		this.candlesCtx.stroke();
	}

	private drawStandardNthCandle(candleNo: number, openY: number, highY: number, lowY: number, closeY: number): void {
		let coreX = this.zeroCandleX + (candleNo * this.candleOffset);
		this.drawCandle(coreX, this.candleHalfWidthFromCore, openY, highY, lowY, closeY, '#0f0', '#888', '#f00');
	}

	private drawFrameBasedOnCandleDimensions(maxNoOfCandles: number,
											 frameTop: number, frameRight: number, frameBottom: number, frameLeft: number,
											 frameWidth: number, frameHeight: number,
											 extremumTop: number, extremumBottom: number,
											 zeroCandleX: number, candleOffset: number): void {
		this.gaugesCtx.lineWidth = 1;
		this.gaugesCtx.strokeStyle = '#fff';
		this.gaugesCtx.strokeRect(frameLeft, frameTop, frameWidth, frameHeight);

		for (let i = 7; i < maxNoOfCandles; i=i+8) {
			let candleX = zeroCandleX + (i * candleOffset);
			this.gaugesCtx.beginPath();
			this.gaugesCtx.moveTo(candleX, extremumTop);
			this.gaugesCtx.lineTo(candleX, extremumBottom);
			this.gaugesCtx.stroke();
		}

		this.gaugesCtx.beginPath();
		this.gaugesCtx.moveTo(frameLeft, extremumTop);
		this.gaugesCtx.lineTo(frameRight, extremumTop);
		this.gaugesCtx.stroke();

		this.gaugesCtx.beginPath();
		this.gaugesCtx.moveTo(frameLeft, extremumBottom);
		this.gaugesCtx.lineTo(frameRight, extremumBottom);
		this.gaugesCtx.stroke();
	}

	private drawFrameBasedOnCandleDimensionsSimplified(): void {
		this.drawFrameBasedOnCandleDimensions(
			this.maxNoOfCandles,
			this.frameTop, this.frameRight, this.frameBottom, this.frameLeft,
			this.frameWidth, this.frameHeight,
			this.extremumTop, this.extremumBottom,
			this.zeroCandleX, this.candleOffset
		);
	}

	private translateVertical(value: number): number {
		return ((this.transTop - value) / this.transNormalizedStep) + this.extremumTop;
	}
}
