import { Component, OnInit } from '@angular/core';
import { IndexService } from './core/services/index.service';
import { Index } from './core/models';
import { GeneralMarketService } from './core/services/general-market.service';
import { AppUtil } from './core/util/app-util';
import { UserQuery } from './core/query/user.query';
import { map, Observable } from 'rxjs';
import { User } from './core/models/user';
import { AuthenticationService } from './core/services/auth.service';

const AmericanIndexSymbols = {
  SP500: '^GSPC',
  DJI: '^DJI',
  NASDAQ_COMP: '^IXIC'
};

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

	private indices: Index[];
	public mainAmericanIndices: Index[];
	public isMarketOpen: boolean;

	constructor(
		private indexService: IndexService,
		private generalMarketService: GeneralMarketService,
		private userQuery: UserQuery,
		private authService: AuthenticationService
	) { }

	ngOnInit(): void {
		this.indices = new Array<Index>();
		this.mainAmericanIndices = new Array<Index>();
		this.isMarketOpen = false;
		this.fetchAllMajorIndices();
		this.fetchIsMarketOpen();
		this.isMarketOpen = false;
	}

	public isUserLoggedIn$(): Observable<boolean> {
		return this.userQuery.currentUser$
			.pipe(map((user: User) => user != null));
	}

	public round(value: number) {
		return AppUtil.round(value, 2);
	}

	public onLogout() {
		this.authService.logout();
	}

	private fetchAllMajorIndices() {
		this.indexService.fetchAllMajorIndices()
		.subscribe((indices: Index[]) => {
			this.indices = [...indices];
			for(const symbol of Object.values(AmericanIndexSymbols)) {
				const index = this.indices.find(i => i.symbol === symbol);
				if (index) {
					this.mainAmericanIndices.push(index);
				}
			}
		});
	}

	private fetchIsMarketOpen() {
		this.generalMarketService.fetchIsMarketOpen()
		.subscribe((isMarketOpen: boolean) => {
			this.isMarketOpen = isMarketOpen;
		});
	}

	public get marketStatus(): string {
		return this.isMarketOpen ? 'Open' : 'Closed';
	}
}
