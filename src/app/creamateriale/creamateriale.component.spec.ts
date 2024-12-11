import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreamaterialeComponent } from './creamateriale.component';

describe('CreamaterialeComponent', () => {
  let component: CreamaterialeComponent;
  let fixture: ComponentFixture<CreamaterialeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreamaterialeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreamaterialeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
