export const all = <T>(array: any[]) => Promise.all<T>(array);
export const resolve = (toResolve: any) => Promise.resolve(toResolve);
