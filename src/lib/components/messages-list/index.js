/* eslint-disable no-underscore-dangle, no-tabs, no-unused-vars, no-restricted-syntax, no-plusplus, max-len */

import shadowStyles from './shadow.css';

import Message from './-message';

const template = `
	<style>${shadowStyles.toString()}</style>
	<div id="container"></div>
`;

class MessagesList extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = template;
    this._getElements();
    this._messages = {};
    this.addMessage({
      text: 'what\'s up?', time: new Date(), my: false, id: 1, status: 'loading',
    });
  }

  static get observedAttributes() {
    return [
      'action',
      'method',
    ];
  }

  addMessage(message) {
    if (!(message.time in this._messages)) {
      const messageElement = MessagesList.createMessage(message);
      const { container } = this._elements;
      container.appendChild(messageElement);
      this.scrollTop = this.scrollHeight - this.offsetHeight;
      return messageElement;
    }
    return null;
  }

  _getElements() {
    this._elements = {
      container: this.shadowRoot.getElementById('container'),
    };
  }

  updateMessage(message) {
    const elements = this._elements.container.childNodes;
    for (const element of elements) {
      if (element.id === message.id.toString()) {
        const timeElement = element.shadowRoot.querySelector('time');
        const status = document.createElement(message.status);
        timeElement.replaceChild(status, timeElement.lastChild);
      }
    }
    return this;
  }

  static createMessage(message) {
    const messageElement = document.createElement('list-message');
    messageElement.my = message.my;
    messageElement.id = message.id;
    messageElement.setMessage(message);
    return messageElement;
  }
}

customElements.define('messages-list', MessagesList);

export default MessagesList;
