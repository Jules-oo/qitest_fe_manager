import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatestComponent } from './createst.component';

describe('CreatestComponent', () => {
  let component: CreatestComponent;
  let fixture: ComponentFixture<CreatestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
