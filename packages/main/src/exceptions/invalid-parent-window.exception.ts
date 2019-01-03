import { Type } from '@one/core';

export class InvalidParentWindowException extends Error {
  constructor(parent: Type<any>, window: Type<any>) {
    super(
      `Parent window ${parent.name} of ${window.name} is not yet created`,
    );
  }
}