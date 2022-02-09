import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WpTableComponent } from './wp-table.component';

describe('WpTableComponent', () => {
  let component: WpTableComponent;
  let fixture: ComponentFixture<WpTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WpTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WpTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
