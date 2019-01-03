import { Reflector } from '@one/core';

import { EVENT_METADATA } from '../tokens';

export function Event(name?: string): MethodDecorator {
  return (target, propertyKey) => {
    Reflector.set(EVENT_METADATA, name || propertyKey, target, propertyKey);
  };
}