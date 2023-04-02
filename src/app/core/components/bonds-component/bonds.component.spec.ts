import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BondsComponent } from './bonds.component';

describe('BondsComponentComponent', () => {
  let component: BondsComponent;
  let fixture: ComponentFixture<BondsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BondsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BondsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
