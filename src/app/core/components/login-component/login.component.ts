import { Component, OnDestroy } from '@angular/core';
import { AuthenticationService } from '../../services/auth.service';
import { SubSink } from '../../util/subSink';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login-component',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy{

	private sub = new SubSink();

	username: string;
	password: string;

	constructor(
		private authService: AuthenticationService,
		private router: Router
	) {}

	submit(event: Event): void {
		event.preventDefault();
		this.sub.sink = this.authService.login(this.username, this.password)
			.subscribe((status: boolean) => {
				if (status) {
					this.router.navigateByUrl('/stocks');
				}
			});
	}

	ngOnDestroy(): void {
		this.sub.unsubscribe();
	}
}
