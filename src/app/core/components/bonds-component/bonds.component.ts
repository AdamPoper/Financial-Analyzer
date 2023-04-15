import { Component, OnInit } from '@angular/core';
import { BondsService } from '../../services/bonds.service';
import { Bond, BondNames } from '../../models/bond';
import { AppUtil } from '../../util/app-util';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-bonds-component',
  templateUrl: './bonds.component.html',
  styleUrls: ['./bonds.component.css']
})
export class BondsComponent implements OnInit {

  public bonds = new Array<Bond>();
  public yieldCurveConfigData: ChartConfiguration['data'] | undefined;
  public yieldCurveConfigOptions: ChartConfiguration['options'] | undefined;

  constructor(private bondService: BondsService) {

  }

  ngOnInit(): void {
    this.bondService.fetchUSTreasuries()
      .subscribe((bonds: Bond[]) => {
        this.bonds = bonds;
        this.initYieldCurveConfig();
      });
  }

  public roundYield(yieldChange: number): number {
    return AppUtil.round(yieldChange, 2);
  }

  public getYieldChangeStyle(bond: Bond): object {
    return {
      'color': bond.yieldChange < 0 ? '#eb4b4b' : '#3dd153'
    }
  }

  private initYieldCurveConfig(): void {
    const names = new Map<string, string>(Object.entries(BondNames));
    this.yieldCurveConfigData = {
      datasets: [{
        data: this.bonds.map(bond => bond.couponRate),
        fill: false,
        backgroundColor: '#3485d1',
        label: undefined
      }],
      labels: this.bonds.map(bond => names.get(bond.label))
    };
    this.yieldCurveConfigOptions = {
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      },
    };
  }
}
