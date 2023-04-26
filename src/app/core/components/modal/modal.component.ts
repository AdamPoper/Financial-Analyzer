import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
	selector: 'app-modal',
	templateUrl: './modal.component.html',
	styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
	@Input() isOpen = false;
	@Output() closeModalEvent = new EventEmitter();

	ngOnInit(): void {

	}

	closeModal() {
		this.closeModalEvent.emit();
	}
}
