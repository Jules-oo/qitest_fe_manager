import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CirclebuttonComponent } from './circlebutton.component';

describe('CirclebuttonComponent', () => {
  let component: CirclebuttonComponent;
  let fixture: ComponentFixture<CirclebuttonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CirclebuttonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CirclebuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
