import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavetodoComponent } from './savetodo.component';

describe('SavetodoComponent', () => {
  let component: SavetodoComponent;
  let fixture: ComponentFixture<SavetodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavetodoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavetodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
