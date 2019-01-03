import { InjectionToken } from '@one/core';
import { BrowserWindow } from 'electron';

export const WINDOW_METADATA = Symbol.for('WINDOW_METADATA');
export const EVENT_METADATA = Symbol.for('EVENT_METADATA');

export const WINDOW_REF = new InjectionToken<BrowserWindow>('WINDOW_REF');