import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaMaterialeComponent } from './lista-materiale.component';

describe('ListaMaterialeComponent', () => {
  let component: ListaMaterialeComponent;
  let fixture: ComponentFixture<ListaMaterialeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaMaterialeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaMaterialeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
