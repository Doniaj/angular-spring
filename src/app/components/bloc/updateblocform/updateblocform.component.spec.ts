import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateblocformComponent } from './updateblocform.component';

describe('UpdateblocformComponent', () => {
  let component: UpdateblocformComponent;
  let fixture: ComponentFixture<UpdateblocformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateblocformComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateblocformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
