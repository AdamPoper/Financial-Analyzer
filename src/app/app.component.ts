import { Component, OnInit } from '@angular/core';
import { IndexService } from './core/services/index.service';
import { Index } from './core/models';
import { GeneralMarketService } from './core/services/general-market.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public indices: Index[] = [];
  private isMarketOpen: boolean = false;

  constructor(
    private indexService: IndexService,
    private generalMarketService: GeneralMarketService
  ) { }

  ngOnInit(): void {
    this.fetchAllMajorIndices();
    this.fetchIsMarketOpen();
  }

  private fetchAllMajorIndices() {
    this.indexService.fetchAllMajorIndices()
      .subscribe((indices: Index[]) => this.indices = indices);
  }

  private fetchIsMarketOpen() {
    this.generalMarketService.fetchIsMarketOpen()
      .subscribe((isMarketOpen: boolean) => this.isMarketOpen = isMarketOpen);
  }

  public get marketStatus(): string {
    return this.isMarketOpen ? 'Open' : 'Closed';
  }
}
