import {ComponentFixture, TestBed} from "@angular/core/testing";
import {ChainSelectComponent} from "./chain-select.component";


describe('ChainSelectComponent', () => {
  let component: ChainSelectComponent;
  let fixture: ComponentFixture<ChainSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChainSelectComponent ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ChainSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
