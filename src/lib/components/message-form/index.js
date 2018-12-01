/* eslint-disable no-unused-vars, no-tabs, no-underscore-dangle, no-return-assign, no-param-reassign, class-methods-use-this, no-plusplus, max-len */

import shadowStyles from './shadow.css';
import FormInput from '../form/-input';
import GeoInput from '../form/-geo-input';
import FileInput from '../form/-file-input';

const template = `
	<style>${shadowStyles.toString()}</style>
	<form>
		<form-input name="message_text" placeholder="Введите сообщение" slot="message-input">
			<div slot="before">
			</div>
			<div slot="after">
				<file-input></file-input>
				<button type="submit"></button>
			</div>
		</form-input>
		<geo-input name="message-pos"></geo-input>
	</form>
`;

const stateClasses = {
  withMessage: 'with-message',
};

class MessageForm extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = template;
    this._initElements();
    this._addHandlers();
  }

  static get observedAttributes() {
    return [
      'action',
      'method',
    ];
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    this._elements.form[attrName] = newVal;
  }

  _initElements() {
    const form = this.shadowRoot.querySelector('form');
    const message = this.shadowRoot.querySelector('form-input');
    const fileInput = this.shadowRoot.querySelector('file-input');
    this._elements = {
      form,
      message,
      file: fileInput,
    };
  }

  _addHandlers() {
    this._elements.form.addEventListener('submit', this._onSubmit.bind(this));
    this._elements.message.addEventListener('input', this._onInput.bind(this));
    this._elements.form.addEventListener('keypress', this._onKeyPress.bind(this));
    this._elements.file.addEventListener('change', this._onFileChange.bind(this));
  }

  _onSubmit(event) {
    const messageText = this._elements.message.value;
    if (!messageText) return;
    const message = this.createMessage({
      text: messageText,
      my: true,
    });
    this._elements.message.value = '';
    this._elements.form.classList.remove(stateClasses.withMessage);
    this._sendMessage(message);
    event.preventDefault();
  }

  _onKeyPress(event) {
    if (event.keyCode === 13) {
      this._elements.form.dispatchEvent(new Event('submit'));
    }
  }

  _onInput() {
    if (this._elements.message.value.length > 0) {
      this._elements.form.classList.add(stateClasses.withMessage);
    } else {
      this._elements.form.classList.remove(stateClasses.withMessage);
    }
  }

  _onFileChange(event) {
    const message = this.createMessage({
      text: null,
      my: true,
      attach: event.target.files[0],
    });
    this._sendMessage(message);
  }

  createMessage(params) {
    const message = Object.create({});
    Object.keys(params).forEach(key => message[key] = params[key]);
    Object.defineProperty(message, 'my', {
      configurable: true,
      enumerable: false,
    });
    message.my = true;
    message.time = new Date();
    message.time.toString = message.time.getTime();
    message.id = Math.round(new Date().getTime() + (Math.random() * 100));
    message.status = 'loading';
    return message;
  }

  _sendMessage(message) {
    message.sending = fetch(this.action, {
      method: 'POST',
      body: Object.keys(message).reduce((formData, key) => {
        if (message[key]) formData.append(key, message[key]);
        return formData;
      }, new FormData()),
    }).then((response) => {
      if (response.ok) {
        message.status = 'loaded';
        const newMessageEvent = new CustomEvent('update-message', {
          bubbles: false,
          detail: message,
        });
        this.dispatchEvent(newMessageEvent);
      }
    });
    const newMessageEvent = new CustomEvent('new-message', {
      bubbles: false,
      detail: message,
    });
    this.dispatchEvent(newMessageEvent);
  }
}

customElements.define('message-form', MessageForm);

export default MessageForm;
