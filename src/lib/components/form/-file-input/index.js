/* eslint-disable no-underscore-dangle */
import shadowStyles from './shadow.css';

import FormInput from '../-input';

class FileInput extends FormInput {
  constructor() {
    super();
    this._customizeInput();
    this._addStyles();
    this._addChangeHandler();
  }

  _addStyles() {
    const style = document.createElement('style');
    style.appendChild(document.createTextNode(shadowStyles));
    this.shadowRoot.appendChild(style);
  }

  _customizeInput() {
    const { input } = this._elements;
    const label = document.createElement('label');
    input.type = 'file';
    input.parentNode.insertBefore(label, input);
    label.appendChild(input);
  }

  _addChangeHandler() {
    this._elements.input.addEventListener('change', () => {
      const fileEvent = new Event('change');
      this.dispatchEvent(fileEvent);
    });
  }

  get files() {
    return this._elements.input.files;
  }

  set value(newVal) {
    if (newVal === '') {
      this._elements.input.value = newVal;
    }
  }
}

customElements.define('file-input', FileInput);

export default FileInput;
