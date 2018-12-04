/* eslint-disable no-tabs,no-param-reassign */
import shadowStyles from './shadow.css';

import { imagePattern, getReadableSize } from '../../../../utils/file';

const template = `
	<style>${shadowStyles.toString()}</style>
	<section></section>
	<time></time>
`;

const stateClasses = {
  myMessages: 'my',
  image: 'image',
};

class Message extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = template;
  }

  setMessage(message) {
    const timeElement = this.shadowRoot.querySelector('time');
    const contentElement = this.shadowRoot.querySelector('section');
    if (message.attach) {
      const size = document.createElement('span');
      const file = message.attach;
      size.innerText = getReadableSize(file.size);
      this.shadowRoot.insertBefore(size, timeElement);
      if (file.type.match(imagePattern)) {
        const image = document.createElement('img');
        image.src = URL.createObjectURL(file);
        image.onload = () => URL.revokeObjectURL(image.src);
        contentElement.appendChild(image);
        this.classList.add(stateClasses.image);
      } else {
        const name = document.createElement('a');
        name.href = URL.createObjectURL(file);
        name.innerText = file.name;
        contentElement.appendChild(name);
      }
    } else if (message.text) {
      contentElement.innerText = message.text;
    }
    timeElement.innerText = [
      message.time.getHours(),
      message.time.getMinutes(),
    ].map(num => (num < 10 ? `0${num}` : num)).join(':');
    if (message.my) {
      const status = document.createElement(message.status);
      timeElement.appendChild(status);
    }
  }

  set my(val) {
    this.classList[val ? 'add' : 'remove'](stateClasses.myMessages);
  }
}

customElements.define('list-message', Message);

export default Message;
