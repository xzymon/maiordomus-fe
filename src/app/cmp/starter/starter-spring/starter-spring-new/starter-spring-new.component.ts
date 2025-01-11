import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'starter-spring-new',
	imports: [
		ReactiveFormsModule
	],
  templateUrl: './starter-spring-new.component.html',
  styleUrl: './starter-spring-new.component.scss'
})
export class StarterSpringNewComponent implements OnInit{

	@Output()
	public onNewValue: EventEmitter<any> = new EventEmitter();

	constructor(private formBuilder: FormBuilder) {
	}

	newDummyForm!: FormGroup;

	ngOnInit() {
		this.newDummyForm = this.formBuilder.group({
			message: new FormControl(''),
		});
	}

	onSubmit() {
		console.log(this.newDummyForm.value);
		this.onNewValue.emit(this.newDummyForm.value.message);
	}
}
