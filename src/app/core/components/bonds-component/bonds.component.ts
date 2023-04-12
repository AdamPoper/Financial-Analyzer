import { Component, OnInit } from '@angular/core';
import { BondsService } from '../../services/bonds.service';
import { Bond, BondNames } from '../../models/bond';
import { AppUtil } from '../../util/app-util';
import { ChartConfiguration, ChartEvent } from 'chart.js';
import { Chart } from 'chart.js/dist';

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
      onClick: (event, activeElements) => {
        if (activeElements.length > 0) {
          const element = activeElements[0];
          const bondKey = Array.from(Object.keys(BondNames))[element.index];
          this.bondService.fetchUSTreasuryHistory(
            bondKey,
            AppUtil.monthsAgoFromToday(3),
            new Date(),
          ).subscribe(yields => console.log(yields));
        }
      } 
    };
  }

  public onColumnClickHandle(event: ChartEvent, chartInstance: Chart) {
    console.log(chartInstance);
    const activeElement = chartInstance.getActiveElements();
    console.log(activeElement);
    if (activeElement) {
      // const value = chartInstance.data.datasets[activeElement._datasetIndex].data[activeElement._index];
      // const label = chartInstance.data.labels[activeElement._index];
      // console.log(`Clicked on column ${label} with value ${value}`);
    }
  }
}
