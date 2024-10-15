// use generics to clone any type of object
export const cloneDeep = <T extends any>(obj: T): T => {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  return JSON.parse(JSON.stringify(obj)) as T;
  /* if (Array.isArray(obj)) {
    return obj.map((item) => cloneDeep(item)) as T;
  }

  const newObj = {} as T;
  for (const key in obj) {
    newObj[key] = cloneDeep(obj[key]);
  }

  return newObj; */
};
