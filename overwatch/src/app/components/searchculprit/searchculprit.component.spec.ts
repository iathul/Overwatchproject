import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchculpritComponent } from './searchculprit.component';

describe('SearchculpritComponent', () => {
  let component: SearchculpritComponent;
  let fixture: ComponentFixture<SearchculpritComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchculpritComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchculpritComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
