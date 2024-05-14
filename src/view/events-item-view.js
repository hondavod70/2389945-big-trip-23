import { DateTimeSettings } from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';
import {
  calcTotalPrice,
  formatDate,
  getDurationTime,
} from '../utils/common.js';

const createEventOffersTemplate = (offers) => {
  let offersTemplate = '';
  offers.forEach((offer) => {
    offersTemplate += `<li class="event__offer">
  <span class="event__offer-title">${offer.title}</span>
    &plus;&euro;&nbsp;
  <span class="event__offer-price">${offer.price}</span>
</li>`;
  });

  return offersTemplate;
};

const createEventsItemTemplate = (event, eventInfo) => {
  const { type, basePrice, isFavorite, dateFrom, dateTo } = event;
  const { destination, selectedOffers } = eventInfo;

  const startDate = formatDate(dateFrom, DateTimeSettings.LIST_DATE_FORMAT);
  const startTime = formatDate(dateFrom, DateTimeSettings.LIST_TIME_FORMAT);
  const endTime = formatDate(dateTo, DateTimeSettings.LIST_TIME_FORMAT);
  const durationTime = getDurationTime(dateFrom, dateTo);

  const totalPrice = calcTotalPrice(basePrice, selectedOffers);
  const offersTemplate = createEventOffersTemplate(selectedOffers);

  return `<li class="trip-events__item">
	<div class="event">
		<time class="event__date" datetime="2019-03-18">${startDate}</time>
		<div class="event__type">
			<img class="event__type-icon" width="42" height="42" src="./img/icons/${type}.png" alt="Event type icon">
		</div>
		<h3 class="event__title">${type} ${destination.name}</h3>
		<div class="event__schedule">
			<p class="event__time">
				<time class="event__start-time" datetime="2019-03-18T12:25">${startTime}</time>
				&mdash;
				<time class="event__end-time" datetime="2019-03-18T13:35">${endTime}</time>
			</p>
			<p class="event__duration">${durationTime}</p>
		</div>
		<p class="event__price">
			&euro;&nbsp;<span class="event__price-value">${totalPrice}</span>
		</p>
		<h4 class="visually-hidden">Offers:</h4>
		<ul class="event__selected-offers">
      ${offersTemplate}
    </ul>
		<button class="event__favorite-btn ${
  isFavorite ? 'event__favorite-btn--active' : ''
}" type="button">
			<span class="visually-hidden">Add to favorite</span>
			<svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
				<path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
			</svg>
		</button>
		<button class="event__rollup-btn" type="button">
			<span class="visually-hidden">Open event</span>
		</button>
	</div>
</li>`;
};

export default class EventsItemView extends AbstractView {
  #event = null;
  #eventInfo = null;
  #handleEditClick = null;

  constructor({ event, eventInfo, onEditClick }) {
    super();
    this.#event = event;
    this.#eventInfo = eventInfo;
    this.#handleEditClick = onEditClick;

    this.element
      .querySelector('.event__rollup-btn')
      .addEventListener('click', this.#editClickHandler);
  }

  get template() {
    return createEventsItemTemplate(this.#event, this.#eventInfo);
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditClick();
  };
}
