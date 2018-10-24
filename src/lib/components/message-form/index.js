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
    <span id="selection" class="attachmentIcon" slot="icon">
        <input id="attachment" type="file" multiple class="attachmentFile">
    </span>
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
    this._initMessages();
  }

  static get observedAttributes() {
    return [
      'action',
      'method',
    ];
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    this._form[attrName] = newVal;
  }

  _initElements() {
    this._form = this.shadowRoot.querySelector('form');
    this._message = this.shadowRoot.querySelector('form-input');
    this._messages = this.shadowRoot.querySelector('#messages');
    this._selection = this.shadowRoot.querySelector('#selection');
    this._attachment = this.shadowRoot.querySelector('#attachment');
  }

  _addHandlers() {
    this._form.addEventListener('submit', this._onSubmit.bind(this));
    this._form.addEventListener('keypress', this._onKeyPress.bind(this));
    this._selection.addEventListener('click', this._selectFiles.bind(this));
    this._attachment.addEventListener('change', this._attachFiles.bind(this));
    this._messages.addEventListener('dragenter', this._dragenter.bind(this));
    this._messages.addEventListener('dragover', this._dragover.bind(this));
    this._messages.addEventListener('drop', this._drop.bind(this));
  }

  _dragenter(event) {
    event.stopPropagation();
    event.preventDefault();
  }

  _dragover(event) {
    event.stopPropagation();
    event.preventDefault();
  }

  _drop(event) {
    event.stopPropagation();
    event.preventDefault();

    this._handleFiles(event.dataTransfer.files);
  }

  _initMessages() {
    this._getMessagesFromStorage().map((message) => {
      this._sendMessage(message);
      return this;
    });
  }

  _getStorage() {
    return localStorage;
  }

  _getMessagesFromStorage() {
    let messages = this._getStorage().getItem('messages');
    if (messages) {
      messages = JSON.parse(messages);
    } else {
      messages = [];
    }
    return messages;
  }

  _saveMessageToStorage(message) {
    let messages = this._getMessagesFromStorage();
    if (message) {
      messages.push(message);
    }
    this._getStorage().setItem('messages', JSON.stringify(messages));
  }

  _sendMessage(text) {
    let message = document.createElement('div');
    message.className = 'message';
    let messageContent = document.createElement('div');
    messageContent.innerText = text;
    messageContent.className = 'message-content right message-from';
    message.appendChild(messageContent);
    this._messages.appendChild(message);
    // this._attachment.dispatchEvent(new Event('sendMessage'));
  }

  _sendFile(file) {
    let message = document.createElement('div');
    message.className = 'message';
    let messageContent = document.createElement('div');
    messageContent = file;
    messageContent.className = 'message-content right message-from preview';
    message.appendChild(messageContent);
    this._messages.appendChild(message);
    // this._attachment.dispatchEvent(new Event('sendFile'));
  }

  _sendGeoPosition() {
    let context = this;
    navigator.geolocation.getCurrentPosition((position) => {
      context._sendMessage(`latitude=${position.coords.latitude}, longitude=${position.coords.longitude}`);
    });
  }

  _onSubmit(event) {
    let { input } = this._message._elements;
    let message = input.value;
    this._sendMessage(message);
    this._saveMessageToStorage(message);
    input.value = '';
    event.preventDefault();
    return false;
  }

  _onKeyPress(event) {
    if (event.keyCode === 13) {
      this._form.dispatchEvent(new Event('submit'));
    }
  }

  _selectFiles(event) {
    this._attachment.click();
  }

  _attachFiles(event) {
    this._handleFiles(this._attachment.files);
  }

  _handleFiles(files) {
    Array.from(files).forEach((file) => {
      let imageType = /image.*/;
      if (file.type.match(imageType)) {
        let img = document.createElement('img');
        let reader = new FileReader();
        reader.onloadend = function () {
          img.src = reader.result;
        };

        if (file) {
          reader.readAsDataURL(file);
        } else {
          img.src = file.name;
        }
        this._sendFile(img);
      } else {
        this._sendMessage(file.name);
      }
    });
  }
}

customElements.define('message-form', MessageForm);
