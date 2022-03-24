const createPublicInstance = (element, internalInstance) => {
  const { type, props } = element;
  const publicInstance = new type(props);
  publicInstance.__internalInstance = internalInstance;
  return publicInstance;
};

export default createPublicInstance;
