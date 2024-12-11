import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionetestComponent } from './gestionetest.component';

describe('GestionetestComponent', () => {
  let component: GestionetestComponent;
  let fixture: ComponentFixture<GestionetestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionetestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionetestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
