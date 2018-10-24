/* eslint-disable no-unused-vars,no-underscore-dangle,prefer-const */

// import styles from './index.css';
import shadowStyles from './shadow.css';

const slotName = 'message-input';

const template = `
<style>${shadowStyles.toString()}</style>
<form class="chat">

    <div class="chat-content">
      <div id="messages" class="messages">
      
        <div class="message">
            <div class="message-content left message-to">Привет, Рустам!</div>
        </div>
        <div class="message">
            <div class="message-content right message-from">Привет, Мартин!</div>
        </div>
    
      </div>
  
  </div>
  <form-input type="text" name="message_text" placeholder="Введите сообщение" slot="message-input">
    <span slot="icon" class="attachment"></span>
  </form-input>
</form>
`;

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
    const messages = this.shadowRoot.querySelector('#messages');
    this._elements = {
      form,
      messages,
    };
  }

  _addHandlers() {
    this._elements.form.addEventListener('submit', this._onSubmit.bind(this));
    this._elements.form.addEventListener('keypress', this._onKeyPress.bind(this));
    // this._elements.inputSlot.addEventListener('slotchange', this._onSlotChange.bind(this));
  }

  _onSubmit(event) {
    let message = document.createElement('div');
    message.className = 'message';
    let messageContent = document.createElement('div');
    messageContent.className = 'message-content right message-from';
    let { form } = this._elements;
    messageContent.innerText = Array.from(form.elements)
      .map(
        el => el.value,
      )
      .join(', ');
    message.appendChild(messageContent);
    let { messages } = this._elements;
    messages.appendChild(message);
    // form._elements.input.value = '';
    event.preventDefault();
    return false;
  }

  _onKeyPress(event) {
    if (event.keyCode === 13) {
      this._elements.form.dispatchEvent(new Event('submit'));
      this._elements.form.input = null;
    }
  }
}

customElements.define('message-form', MessageForm);
