import reconcile from "./reconcile";

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
  const prevInstance = rootInstance;
  const nextInstance = reconcile(container, prevInstance, element);
  rootInstance = nextInstance;
};

const updateInstance = internalInstance => {
  const parentDom = internalInstance.dom.parentNode;
  const { element } = internalInstance;
  reconcile(parentDom, internalInstance, element);
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

export default OwnReact;
