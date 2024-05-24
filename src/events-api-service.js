import ApiService from './framework/api-service.js';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
};

export default class EventsApiService extends ApiService {
  get events() {
    return this._load({ url: 'points' }).then(ApiService.parseResponse);
  }

  get destinations () {
    return this._load({ url: 'destinations' }).then(ApiService.parseResponse);
  }

  get offers () {
    return this._load({ url: 'offers' }).then(ApiService.parseResponse);
  }

  async updateEvent(event) {
    const response = await this._load({
      url: `events/${event.id}`,
      method: Method.PUT,
      body: JSON.stringify(event),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  #adaptToServer(event) {
    const adaptedEvent = {
      ...event,
      ['base_price']: event.basePrice,
      ['date_from']:
        event.dateFrom instanceof Date ? event.dateFrom.toISOString() : null,
      ['date_to']:
        event.dateTo instanceof Date ? event.dateTo.toISOString() : null,
      ['destination']: event.destination,
      ['is_favorite']: event.isFavorite,
      ['offers']: event.offers,
      ['type']: event.type,
    };

    delete adaptedEvent.basePrice;
    delete adaptedEvent.dateFrom;
    delete adaptedEvent.dateTo;
    delete adaptedEvent.destination;
    delete adaptedEvent.isFavorite;
    delete adaptedEvent.offers;
    delete adaptedEvent.type;

    return adaptedEvent;
  }
}
