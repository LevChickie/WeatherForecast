import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForecastFivedaysComponent } from './forecast-fivedays.component';

describe('ForecastFivedaysComponent', () => {
  let component: ForecastFivedaysComponent;
  let fixture: ComponentFixture<ForecastFivedaysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForecastFivedaysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForecastFivedaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
