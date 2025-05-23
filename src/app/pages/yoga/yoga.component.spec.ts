import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YogaComponent } from './yoga.component';

describe('YogaComponent', () => {
  let component: YogaComponent;
  let fixture: ComponentFixture<YogaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YogaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(YogaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
