import { BrowserWindowConstructorOptions } from 'electron';
import { Injectable, Reflector } from '@one/core';

import { WINDOW_METADATA } from '../tokens';

export function Window(
  // "parent" property should reference to parent window service instead,
  // "loadUrl" property should reference to window.loadURL
   // "loadFile" property should reference to window.loadFile
  options: BrowserWindowConstructorOptions = {},
): ClassDecorator {
  return (target) => {
    Reflector.set(WINDOW_METADATA, options, target);
    Injectable()(target);
  };
}