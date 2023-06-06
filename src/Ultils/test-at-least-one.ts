export function testAtLeastOne(testee: string, array: string[]): boolean {
  return new RegExp(`${array.join('|')}`).test(testee);
}
