import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatelookoutdataComponent } from './updatelookoutdata.component';

describe('UpdatelookoutdataComponent', () => {
  let component: UpdatelookoutdataComponent;
  let fixture: ComponentFixture<UpdatelookoutdataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatelookoutdataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatelookoutdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
