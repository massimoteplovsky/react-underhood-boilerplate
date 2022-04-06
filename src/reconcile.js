import instantiate from "./instantiate";
import updateDomProperties from "./updateDomProperties";
import performancer from "./service/performancer";

performancer.startTracking();

function reconcile(parentDom, instance, element) {
  if (instance === null) {
    // Создаём инстанс
    performancer.start("Create instance");
    const newInstance = instantiate(element);
    parentDom.appendChild(newInstance.dom);
    performancer.end("Create instance");
    performancer.measure("Create instance");
    return newInstance;
  }
  if (element === null) {
    // Убираем инстанс
    performancer.start("Remove instance");
    parentDom.removeChild(instance.dom);
    performancer.end("Remove instance");
    performancer.measure("Remove instance");
    return null;
  }
  if (
    (instance.element.type === element.type &&
      !instance.element.type.isClassComponent) ||
    typeof element.type === "string"
  ) {
    // Обновляем инстанс
    performancer.start("Update DOM instance");
    updateDomProperties(instance.dom, instance.element.props, element.props);
    instance.childInstances = reconcileChildren(instance, element);
    instance.element = element;
    performancer.end("Update DOM instance");
    performancer.measure("Update DOM instance");
    return instance;
  }

  // Обновляем инстанс компонента
  performancer.start("Update instance");
  instance.publicInstance.props = element.props;
  const childElement = instance.publicInstance.render();
  const oldChildInstance = instance.childInstance;
  const childInstance = reconcile(parentDom, oldChildInstance, childElement);
  instance.dom = childInstance.dom;
  instance.childInstance = childInstance;
  instance.element = element;
  performancer.end("Update instance");
  performancer.measure("Update instance");
  return instance;
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

  return newChildInstances.filter(childInstance => childInstance !== null);
}

performancer.stopTracking();

export default reconcile;
