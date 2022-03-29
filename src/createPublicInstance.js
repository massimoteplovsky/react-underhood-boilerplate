const createPublicInstance = (element, internalInstance) => {
  const { type: Type, props } = element;
  const publicInstance = new Type(props);
  publicInstance.__internalInstance = internalInstance;
  return publicInstance;
};

export default createPublicInstance;
