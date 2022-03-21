import updateDomProperties from "./updateDomProperties";

function instantiate(element) {
  const { type, props } = element;

  const isTextElement = type === "TEXT ELEMENT";
  const dom = isTextElement
    ? document.createTextNode("")
    : document.createElement(type);

  updateDomProperties(dom, {}, props);

  // Добавляем инстансы потомков
  const childElements = props.children || [];
  const childInstances = childElements.map(instantiate);
  const childDoms = childInstances.map(childInstance => childInstance.dom);
  childDoms.forEach(childDom => dom.appendChild(childDom));
  const instance = { dom, element, childInstances };
  return instance;
}

export default instantiate;
