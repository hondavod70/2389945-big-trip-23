import { createElement } from '../render.js';

const createEventsMessageTemplate = (message) =>
  `<p class="trip-events__msg">${message}</p>`;

export default class EventsMessageView {
  constructor({ message }) {
    this.message = message;
  }

  getTemplate() {
    return createEventsMessageTemplate(this.message);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}