export class Component {
  constructor() {}
  createElement(tagName, classNames = [], text) {
    const element = document.createElement(tagName);
    if (text) {
      element.textContent = text;
    }
    element.classList.add(...classNames);
    return element;
  }
  removeClass(element, className) {
    element.classList.remove(className);
  }
  addClass(element, className) {
    element.classList.add(className);
  }
}
