import { BrowserWindowConstructorOptions } from 'electron';
import { Type } from '@one/core';

export interface WindowMetadata extends BrowserWindowConstructorOptions {
  parent?: Type<any>;
  file?: string;
  url?: string;
}