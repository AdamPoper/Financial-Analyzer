import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommoditiesComponentComponent } from './commodities.component';

describe('CommoditiesComponentComponent', () => {
  let component: CommoditiesComponentComponent;
  let fixture: ComponentFixture<CommoditiesComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommoditiesComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommoditiesComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
