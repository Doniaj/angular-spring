import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatechambreformComponent } from './updatechambreform.component';

describe('UpdatechambreformComponent', () => {
  let component: UpdatechambreformComponent;
  let fixture: ComponentFixture<UpdatechambreformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatechambreformComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatechambreformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
