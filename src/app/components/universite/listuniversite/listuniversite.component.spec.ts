import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListuniversiteComponent } from './listuniversite.component';

describe('ListuniversiteComponent', () => {
  let component: ListuniversiteComponent;
  let fixture: ComponentFixture<ListuniversiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListuniversiteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListuniversiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
