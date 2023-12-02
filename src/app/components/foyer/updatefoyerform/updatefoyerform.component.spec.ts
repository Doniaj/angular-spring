import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatefoyerformComponent } from './updatefoyerform.component';

describe('UpdatefoyerformComponent', () => {
  let component: UpdatefoyerformComponent;
  let fixture: ComponentFixture<UpdatefoyerformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatefoyerformComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatefoyerformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
