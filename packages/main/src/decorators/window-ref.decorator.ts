import { Inject } from '@one/core';

import { WINDOW_REF } from '../tokens';

export function WindowRef() {
  return (target: object, propertyKey: string, index?: number) => {
    Inject(WINDOW_REF)(target, propertyKey, index);
  };
}