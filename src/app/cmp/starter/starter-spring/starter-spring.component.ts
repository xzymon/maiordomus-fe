import {Component, OnInit} from '@angular/core';
import {WiredService} from '../../../svc/starter/wired.service';
import {DummyMessageModel} from '../../../model/dummy-message.model';
import {filter, mergeMap, tap} from 'rxjs';
import {MatTable, MatTableDataSource, MatTableModule} from '@angular/material/table';

@Component({
  standalone: true,
  selector: 'app-starter-spring',
  imports: [
    MatTableModule
  ],
  templateUrl: './starter-spring.component.html',
  styleUrl: './starter-spring.component.scss'
})
export class StarterSpringComponent implements OnInit{
  dummyMessages: DummyMessageModel[] = [];
  dummyMessage!: DummyMessageModel;
  valueFromService: string = '';
  status: string = '';

  dataSource = new MatTableDataSource(this.dummyMessages);

  columnsToDisplay: string[] = ['id', 'message'];

  constructor(private wiredService: WiredService) {}

  ngOnInit(): void {
    //this.getWired();
    this.getDummyData();
  }

  public getWired() {
    this.wiredService.getWired().subscribe({
        next: (value) => {
          console.log(value);
          this.valueFromService = value;
          this.status = 'next';
        },
        error: (error) => {
          console.error(error);
          this.status = 'error';
        },
        complete: () => {
          console.info('complete');
          this.status = 'completed';
        }
      }
    );
  }

  /*
  public getDummyData() {
    this.wiredService.getDummyData().subscribe({
        next: (value) => {
          console.log(value);
          this.dummyMessage = value;
          this.valueFromService = this.dummyMessage.message;
          console.log(this.valueFromService);
          this.status = 'next';
        },
        error: (error) => {
          console.error(error);
          this.status = 'error';
        },
        complete: () => {
          console.info('complete');
          this.status = 'completed';
        }
      }
    );
  }
   */

  public getDummyData() {
    this.wiredService.getDummyData().pipe(
      tap(elements => {
        this.dummyMessages = elements;
        console.log('[tap] All elements:', this.dummyMessages);
        this.dataSource = new MatTableDataSource(this.dummyMessages);
      }),
      mergeMap(elements => elements),
      filter(element => element.id === 1)
    ).subscribe({
      next: (filteredElement) => {
        console.log('Filtered Element:', filteredElement);
        // Optionally do something with the filtered element
        this.dummyMessage = filteredElement;
        this.valueFromService = this.dummyMessage.message;
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
