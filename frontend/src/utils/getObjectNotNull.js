const getObjectNotNull = (obj) => {
  Object.keys(obj).forEach((key) => {
    obj[key] = obj[key] === null ? '' : obj[key];
  });
  return obj;
};

export default getObjectNotNull;
