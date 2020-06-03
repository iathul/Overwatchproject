import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateuserdataComponent } from './updateuserdata.component';

describe('UpdateuserdataComponent', () => {
  let component: UpdateuserdataComponent;
  let fixture: ComponentFixture<UpdateuserdataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateuserdataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateuserdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
