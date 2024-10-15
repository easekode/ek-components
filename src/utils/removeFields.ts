export const removeFields = (obj: any, fields: string[]) => {
  if (Array.isArray(obj)) {
    return obj.map(item => removeFields(item, fields));
  } else if (obj && typeof obj === 'object') {
    return Object.keys(obj).reduce((acc, key) => {
      if (!fields.includes(key)) {
        acc[key] = removeFields(obj[key], fields);
      }
      return acc;
    }, {} as any);
  }
  return obj;
};