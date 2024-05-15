import { EventSettings } from '../const.js';
import { remove, render, replace } from '../framework/render.js';
import EventEditView from '../view/event-edit-view.js';
import EventView from '../view/event-view.js';

export default class EventPresenter {
  #eventsListContainer = null;
  #handleDataChange = null;
  #handleModeChange = null;

  #eventComponent = null;
  #eventEditComponent = null;

  #event = null;
  #eventInfo = null;
  #allDestinations = null;
  #availableOffers = null;
  #mode = EventSettings.DEFAULT_MODE;

  constructor({
    eventsListContainer,
    eventInfo,
    allDestinations,
    availableOffers,
    onDataChange,
    onModeChange,
  }) {
    this.#eventsListContainer = eventsListContainer;
    this.#eventInfo = eventInfo;
    this.#allDestinations = allDestinations;
    this.#availableOffers = availableOffers;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init(event) {
    this.#event = event;

    const prevEventComponent = this.#eventComponent;
    const prevEventEditComponent = this.#eventEditComponent;

    this.#eventComponent = new EventView({
      event: this.#event,
      eventInfo: this.#eventInfo,
      allDestinations: this.#allDestinations,
      availableOffers: this.#availableOffers,
      onEditClick: this.#handleEditClick,
      onFavoriteClick: this.#handleFavoriteClick,
    });

    this.#eventEditComponent = new EventEditView({
      event: this.#event,
      eventInfo: this.#eventInfo,
      allDestinations: this.#allDestinations,
      availableOffers: this.#availableOffers,
      onFormSubmit: this.#handleFormSubmit,
      onFormClose: this.#handleFormClose,
    });

    if (prevEventComponent === null || prevEventEditComponent === null) {
      render(this.#eventComponent, this.#eventsListContainer);
      return;
    }

    if (this.#mode === EventSettings.DEFAULT_MODE) {
      replace(this.#eventComponent, prevEventComponent);
    }

    if (this.#mode === EventSettings.EDITING_MODE) {
      replace(this.#eventEditComponent, prevEventEditComponent);
    }

    remove(prevEventComponent);
    remove(prevEventEditComponent);
  }

  destroy() {
    remove(this.#eventComponent);
    remove(this.#eventEditComponent);
  }

  resetView() {
    if (this.#mode !== EventSettings.DEFAULT_MODE) {
      this.#replaceFormToEvent();
    }
  }

  #replaceEventToForm() {
    replace(this.#eventEditComponent, this.#eventComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#handleModeChange();
    this.#mode = EventSettings.EDITING_MODE;
  }

  #replaceFormToEvent() {
    replace(this.#eventComponent, this.#eventEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = EventSettings.DEFAULT_MODE;
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#eventEditComponent.form.reset();
      this.#replaceFormToEvent();
    }
  };

  #handleEditClick = () => {
    this.#replaceEventToForm();
  };

  #handleFavoriteClick = () => {
    this.#handleDataChange({
      ...this.#event,
      isFavorite: !this.#event.isFavorite,
    });
  };

  #handleFormSubmit = () => {
    //this.#handleDataChange(event);
    this.#replaceFormToEvent();
  };

  #handleFormClose = () => {
    this.#replaceFormToEvent();
  };
}
