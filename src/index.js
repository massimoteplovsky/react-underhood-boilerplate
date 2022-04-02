import reconcile from "./reconcile";
import performancer from "./service/performancer";

performancer.startTracking();

let rootInstance = null;

const createElement = (type, props, ...children) => {
  const createTextElement = text => {
    return {
      type: "TEXT ELEMENT",
      props: {
        nodeValue: text
      }
    };
  };

  const generatedProps = {
    ...props,
    children: children
      .flat()
      .map(child =>
        typeof child === "object" ? child : createTextElement(child)
      )
  };

  if (typeof type === "function" && !type.isClassComponent) {
    return type(generatedProps);
  }

  return {
    type,
    props: generatedProps
  };
};

const render = (element, container) => {
  performancer.start("Render component");
  const prevInstance = rootInstance;
  const nextInstance = reconcile(container, prevInstance, element);
  rootInstance = nextInstance;
  performancer.end("Render component");
  performancer.measure("Render component");
};

const updateInstance = internalInstance => {
  performancer.start("Update component instance");
  const parentDom = internalInstance.dom.parentNode;
  const { element } = internalInstance;
  reconcile(parentDom, internalInstance, element);
  performancer.end("Update component instance");
  performancer.measure("Update component instance");
};

class Component {
  constructor(props) {
    this.props = props;
    this.state = this.state || {};
  }

  setState(partialState) {
    this.state = { ...this.state, ...partialState };
    updateInstance(this.__internalInstance);
  }
}

Component.isClassComponent = true;

const OwnReact = {
  render,
  createElement,
  Component
};

performancer.stopTracking();

export default OwnReact;
