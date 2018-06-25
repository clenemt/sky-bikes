/* eslint arrow-body-style: off, no-param-reassign: off */

/**
 * A small jquery like abstraction for manipulating the DOM.
 */
class Dom {
  constructor(s) {
    if (typeof s === 'string')
      this.value = Array.prototype.slice.call(document.querySelectorAll(s));
    if (typeof s === 'object') this.value = [s];
  }

  each = (fn) => {
    [].forEach.call(this.value, fn);
    return this;
  };

  val = () =>
    Array.from(this.value[0].elements).reduce((result, el) => {
      if (!el.name || !el.type) return result;
      result[el.name] = el.value;
      return result;
    }, {});

  on = (type, fn) => this.each((i) => i.addEventListener(type, fn, false));
  html = (v) => this.each((i) => (i.innerHTML = v));
  insertLast = (v) => this.each((i) => i.insertAdjacentHTML('beforeEnd', v));
  empty = () => this.each((i) => (i.innerHTML = ''));
  remove = () => this.each((i) => i.parentNode.removeChild(i));
}

const $ = (s) => new Dom(s);
export default $;
