import instantiate from "./instantiate";
import updateDomProperties from "./updateDomProperties";

function reconcile(parentDom, instance, element) {
  if (instance === null) {
    const newInstance = instantiate(element);
    parentDom.appendChild(newInstance.dom);
    return newInstance;
  }
  if (element === null) {
    // Убираем инстанс
    parentDom.removeChild(instance.dom);
    return null;
  }
  if (instance.element.type === element.type) {
    // Обновляем инстанс
    updateDomProperties(instance.dom, instance.element.props, element.props);
    instance.childInstances = reconcileChildren(instance, element);
    instance.element = element;
    return instance;
  }
  // Заменяем инстанс
  const newInstance = instantiate(element);
  parentDom.replaceChild(newInstance.dom, instance.dom);
  return newInstance;
}

function reconcileChildren(instance, element) {
  const { dom, childInstances } = instance;
  const nextChildElements = element.props.children || [];
  const newChildInstances = [];
  const count = Math.max(childInstances.length, nextChildElements.length);

  for (let i = 0; i < count; i++) {
    const childInstance = childInstances[i];
    const childElement = nextChildElements[i];
    const newChildInstance = reconcile(dom, childInstance, childElement);
    newChildInstances.push(newChildInstance);
  }
  return newChildInstances.filter(childInstance => childInstance != null);
}

export default reconcile;
