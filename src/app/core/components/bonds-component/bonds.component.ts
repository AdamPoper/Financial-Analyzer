import { Component, OnInit } from '@angular/core';
import { BondsService } from '../../services/bonds.service';
import { Bond } from '../../models/bond';

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

  public roundYield(yieldChange: number) {
    return Math.round(yieldChange * 100) / 100;
  }
}
