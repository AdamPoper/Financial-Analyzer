import { Component, OnInit } from '@angular/core';
import { BondsService } from '../../services/bonds.service';
import { Bond } from '../../models/bond';
import { AppUtil } from '../../util/app-util';

@Component({
  selector: 'app-bonds-component',
  templateUrl: './bonds.component.html',
  styleUrls: ['./bonds.component.css']
})
export class BondsComponent implements OnInit {

  public bonds = new Array<Bond>();

  constructor(private bondService: BondsService) {

  }

  ngOnInit(): void {
    this.fetchBondValues();
  }

  public fetchBondValues() {
    this.bondService.fetchUSTreasuries()
      .subscribe(bonds => this.bonds = bonds);
  }

  public roundYield(yieldChange: number): number {
    return AppUtil.round(yieldChange, 2);
  }
}
