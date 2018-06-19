/* eslint arrow-body-style: off, no-param-reassign: off */

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

  css = (v) => this.each((i) => (i.style.cssText += v));
  cssdom = (v) =>
    this.each((i) => Object.keys(v).forEach((key) => (i.style[key] = v[key])));

  on = (type, fn) => this.each((i) => i.addEventListener(type, fn, false));

  addClass = (v) =>
    this.each(
      (i) => (i.classList ? i.classList.add(v) : (i.className += ` ${v}`)),
    );
  toggleClass = (v) => this.each((i) => i.classList.toggle(v));
  removeClass = (v) => this.each((i) => i.classList.remove(v));

  html = (v) => this.each((i) => (i.innerHTML = v));

  insertBefore = (v) =>
    this.each((i) => i.insertAdjacentHTML('beforeBegin', v));
  insertAfter = (v) => this.each((i) => i.insertAdjacentHTML('afterEnd', v));
  insertFirst = (v) => this.each((i) => i.insertAdjacentHTML('afterBegin', v));
  insertLast = (v) => this.each((i) => i.insertAdjacentHTML('beforeEnd', v));

  empty = () => this.each((i) => (i.innerHTML = ''));
  val = () =>
    Array.from(this.value[0].elements).reduce((result, el) => {
      if (!el.name || !el.type) return result;
      result[el.name] = el.value;
      return result;
    }, {});
}

const $ = (s) => new Dom(s);
export default $;
