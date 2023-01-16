import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChainLabelComponent } from './chain-label.component';

describe('ChainLabelComponent', () => {
  let component: ChainLabelComponent;
  let fixture: ComponentFixture<ChainLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChainLabelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChainLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
