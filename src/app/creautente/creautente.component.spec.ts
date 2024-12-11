import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreautenteComponent } from './creautente.component';

describe('CreautenteComponent', () => {
  let component: CreautenteComponent;
  let fixture: ComponentFixture<CreautenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreautenteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreautenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
