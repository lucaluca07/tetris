export const deepClone = (data: any): any => {
  if (typeof data !== "object" || !data) return data;
  if (Array.isArray(data)) {
    return data.map((item) => deepClone(item));
  } else {
    const obj: any = {};
    Object.keys(data).forEach((key) => {
      obj[key] = deepClone(data[key]);
    });
    return obj;
  }
};
