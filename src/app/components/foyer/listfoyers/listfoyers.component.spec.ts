import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListfoyersComponent } from './listfoyers.component';

describe('ListfoyersComponent', () => {
  let component: ListfoyersComponent;
  let fixture: ComponentFixture<ListfoyersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListfoyersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListfoyersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
