import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/auth.service';
import { SubSink } from '../../util/subSink';
import { Router } from '@angular/router';
import { UserQuery } from '../../query/user.query';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-login-component',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

	private sub = new SubSink();

	username: string;
	password: string;

	constructor(
		private authService: AuthenticationService,
		private router: Router,
		private userQuery: UserQuery
	) {}

	ngOnInit(): void {
		if (this.userQuery.getUser()) {
			this.authService.logout();
		}
	}

	submit(event: Event): void {
		event.preventDefault();
		this.sub.sink = this.authService.login(this.username, this.password)
			.subscribe({
				next: () => this.router.navigateByUrl('/stocks'),
				error: (err: HttpErrorResponse) => alert(err.error.message)
			});
	}

	onSignUp(): void {
		this.router.navigateByUrl('/signup');
	}

	ngOnDestroy(): void {
		this.sub.unsubscribe();
	}
}
