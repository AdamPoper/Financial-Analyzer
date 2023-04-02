import { Component, OnInit } from '@angular/core';
import { IndexService } from './core/services/index.service';
import { Index } from './core/models/Index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public indices: Index[] = [];

  constructor(private indexService: IndexService) {
  }

  ngOnInit(): void {
    this.indexService.fetchAllMajorIndices()
      .subscribe((indices: Index[]) => this.indices = indices);
  }

  get marketStatus(): string {
    // temporary
    return 'closed';
  }
}
