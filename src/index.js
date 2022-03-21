import reconcile from './reconcile';

let rootInstance = null;

class OwnReact {
  static createElement(type, props, ...children) {
    const createTextElement = (text) => {
      return {
        type: 'TEXT ELEMENT',
        props: {
          nodeValue: text,
        },
      };
    };

    const generatedProps = {
      ...props,
      children: children
        .flat()
        .map((child) =>
          typeof child === 'object' ? child : createTextElement(child)
        ),
    };

    if (typeof type === 'function') {
      return type(generatedProps);
    }

    return {
      type,
      props: generatedProps,
    };
  }

  static render(element, container) {
    const prevInstance = rootInstance;
    const nextInstance = reconcile(container, prevInstance, element);
    rootInstance = nextInstance;
  }
}

export default OwnReact;
