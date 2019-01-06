import { IPackageNode } from "./parser/ast";
import { Package, Dependency } from "./types";
import Parser from "./parser/parser";

export const camelCase = (value: string): string =>
  value[0].toLowerCase() + value.substr(1);

export function arraySort<T>(array: T[], sortFn: (a: T, b: T) => number): T[] {
  return [...array].sort(sortFn);
}

export function arrayFind<T>(
  array: T[],
  comparatorFn: (obj: T) => boolean
): T | null {
  return array.filter(comparatorFn)[0];
}

export function inArray<T>(
  array: T[],
  comparatorFn: (obj: T) => boolean
): boolean {
  return array.filter(comparatorFn).length > 0;
}
