import { TestBed } from '@angular/core/testing';
import {ChainsService} from "./chains.service";


describe('ChainsService', () => {
  let service: ChainsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChainsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
