import { Component, OnDestroy, OnInit } from '@angular/core';
import { SubSink } from '../../util/subSink';
import { AuthenticationService } from '../../services/auth.service';
import { take } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserQuery } from '../../query/user.query';

@Component({
	selector: 'app-sign-up',
	templateUrl: './sign-up.component.html',
	styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

	username: string;
	password: string;
	confirmPassword: string;

	constructor(private authService: AuthenticationService,
				private router: Router,
				private userQuery: UserQuery
	) {}

	ngOnInit(): void {
		if (this.userQuery.getUser()) {
			this.authService.logout();
		}
	}

	onSignUp(event: Event): void {
		event.preventDefault();
		if (!this.validatePasswords()) {
			alert('Passwords do not match!');
			return;
		}

		this.authService.signUp(this.username, this.password)
			.pipe(take(1))
			.subscribe({
				next: () => this.router.navigateByUrl('/stocks'),
				error: (err: HttpErrorResponse) => alert(err.error.message)
			});
	}

	returnToLogin(e: Event): void {
		e.preventDefault();
		this.router.navigateByUrl('/login');
	}

	private validatePasswords(): boolean {
		return this.password === this.confirmPassword;
	}
}
