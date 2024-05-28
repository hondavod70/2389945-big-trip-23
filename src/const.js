export const DateTimeSettings = {
  LIST_TIME_FORMAT: 'HH:mm',
  LIST_DATE_FORMAT: 'MMM DD',
  EDIT_DATE_FORMAT: 'DD/MM/YY HH:mm',
  ROUTE_DATE_FORMAT: 'DD MMM',
  DAY_HOURS: 24,
  HOUR_MINUTES: 60,
};

export const EventMode = {
  VIEW: 'VIEW',
  EDIT: 'EDIT',
};

export const EventSettings = {
  ITEM_COUNT: 0,
  PRICE_PATTERN: /[0-9]/,
};

export const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

export const filterTypeMessage = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no future events now',
  [FilterType.PRESENT]: 'There are no present events now',
  [FilterType.PAST]: 'There are no past events now',
};

export const EventsMessage = {
  LOADING: 'Loading...',
  ERROR: 'Failed to load latest route information'
};

export const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers',
};

export const UserAction = {
  UPDATE_EVENT: 'UPDATE_EVENT',
  ADD_EVENT: 'ADD_EVENT',
  DELETE_EVENT: 'DELETE_EVENT',
};

export const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
  ERROR: 'ERROR'
};

export const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};
