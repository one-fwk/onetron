import { Injectable, Injector, OneContainer, OnModuleInit, Reflector, Type } from '@one/core';
import { MetadataExplorerService } from '@one/common';
import { BrowserWindow, BrowserWindowConstructorOptions } from 'electron';

import { EVENT_METADATA, WINDOW_METADATA } from './tokens';
import { EventMetadata, WindowMetadata } from './interfaces';
import { InvalidParentWindowException } from 'main/src/exceptions';

@Injectable()
export class WindowsService implements OnModuleInit {
  private readonly windowRefs = new WeakMap<Type<any>, BrowserWindow>();

  constructor(
    private readonly explorer: MetadataExplorerService,
    private readonly container: OneContainer,
    private readonly injector: Injector,
  ) {}

  private getEventProperties(prototype: object): string[] {
    return this.explorer.scanForMethodsMetadata(prototype, EVENT_METADATA);
  }

  private getEventMetadata(windowRef: Type<any>): EventMetadata[] {
    const window = this.injector.get(windowRef);

    return this.getEventProperties(windowRef.prototype).map(propertyKey => ({
      eventName: Reflector.get(window, propertyKey, EVENT_METADATA),
      propertyKey,
    }));
  }

  private getAllWindows(): Type<any>[] {
    return this.container.getAllInjectables().filter(
      injectable => Reflector.has(WINDOW_METADATA, injectable),
    );
  }

  private setParentWindow(
    windowRef: Type<any>,
    metadata: WindowMetadata,
  ): void {
    if (metadata.parent) {
      if (this.windowRefs.has(metadata.parent)) {
        metadata.parent = this.windowRefs.get(metadata.parent);
      } else {
        throw new InvalidParentWindowException(metadata.parent, windowRef);
      }
    }
  }

  private getWindowMetadata(windowRef: Type<any>): WindowMetadata {
    return Reflector.get<WindowMetadata>(WINDOW_METADATA, windowRef)!;
  }

  onModuleInit() {
    this.getAllWindows().forEach(windowRef => {
      const metadata = this.getWindowMetadata(windowRef);

      this.setParentWindow(windowRef, metadata);

      const browserWindow = new BrowserWindow(metadata as any);

      if (metadata.file) {
        browserWindow.loadFile(metadata.file);
      } else if (metadata.url) {
        browserWindow.loadURL(metadata.url);
      }

      this.injector
        .bind(BrowserWindow)
        .toConstantValue(browserWindow)
        .whenInjectedInto(windowRef);

      this.windowRefs.set(windowRef, browserWindow);
    });
  }
}