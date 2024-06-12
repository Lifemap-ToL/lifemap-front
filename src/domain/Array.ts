export function findCommon<T = string | number>(array1: T[], array2: T[]): T | undefined {
  return array1.find(element => array2.includes(element));
}

export function sliceTo<T = string | number>(array: T[], to: T, keep = true): T[] {
  const toIndex = array.findIndex(element => element === to)!;
  const sliceIndex = keep ? toIndex + 1 : toIndex;
  return array.slice(0, sliceIndex);
}
