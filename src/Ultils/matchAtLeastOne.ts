export function matchAtLeastOne(array: string[]) {
  return new RegExp(`${array.join('|')}`);
}
