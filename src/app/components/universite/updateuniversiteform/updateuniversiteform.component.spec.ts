import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateuniversiteformComponent } from './updateuniversiteform.component';

describe('UpdateuniversiteformComponent', () => {
  let component: UpdateuniversiteformComponent;
  let fixture: ComponentFixture<UpdateuniversiteformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateuniversiteformComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateuniversiteformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
