import { Test, TestingModule } from '@one/testing';
import { BrowserWindow } from 'electron';

import { WindowsService } from '../windows.service';
import { Event, Window, WindowRef } from '../decorators';

jest.mock('electron', () => ({
  BrowserWindow: class {},
}));

describe('WindowsService', () => {
  let module: TestingModule;
  let windows: any;

  @Window()
  class TestWindow {
    // @WindowRef() public ref!: BrowserWindow;
    constructor(public ref: BrowserWindow) {}

    @Event()
    closed() {}
  }

  beforeEach(async () => {
    module = await Test.createTestingModule({
      providers: [
        WindowsService,
        TestWindow,
      ],
    }).compile();

    windows = module.get(WindowsService);
  });

  describe('getAllWindows', () => {
    it('should return all injectables decorated with @Window()', () => {
      expect(windows.getAllWindows()).toMatchObject([
        TestWindow,
      ]);
    });
  });

  describe('getEventProperties', () => {
    it('should get all methods on class decorated with @Event()', () => {

    });
  });

  describe('onModuleInit', () => {
    it('should have an unique reference of BrowserWindow', () => {
      windows.getAllWindows = jest.fn(() => [TestWindow]);

      windows.onModuleInit();

      expect(module.get(TestWindow).ref).toBeInstanceOf(BrowserWindow);
      expect(windows.windowRefs.has(TestWindow)).toBeTrue();
    });
  });
});