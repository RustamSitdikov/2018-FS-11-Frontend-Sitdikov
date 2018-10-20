/* eslint-disable linebreak-style */

import say from './test';
import './message.css';

function getMessageEditText() {
  const messageEditText = document.createElement('input');
  messageEditText.setAttribute('id', 'messageEditText');
  return messageEditText;
}

function getMessageButton() {
  const messageButton = document.createElement('button');
  messageButton.innerHTML = 'Set message';
  messageButton.onclick = () => {
    document.getElementById('messageText').innerHTML = say(document.getElementById('messageEditText').value);
  };
  return messageButton;
}

function getMessageElement(message) {
  const parent = document.createElement('div');

  const child = document.createElement('div');
  child.appendChild(getMessageEditText());
  child.appendChild(getMessageButton());

  const messageText = document.createElement('p');
  messageText.setAttribute('id', 'messageText');
  messageText.className = 'messageTextStyle';
  messageText.innerHTML = say(message);

  parent.appendChild(child);
  parent.appendChild(messageText);

  return parent;
}

const initMessage = 'Hello friend!';
document.body.appendChild(getMessageElement(initMessage));
