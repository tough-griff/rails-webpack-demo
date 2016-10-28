import { createSelector } from 'reselect';

const getImmutableApplication = createSelector(
  state => state.get('application'),
  application => application,
);

const getImmutableAlerts = createSelector(
  getImmutableApplication,
  application => application.get('alerts'),
);

export const getAlerts = createSelector(
  getImmutableAlerts,
  alerts => alerts.toJS(),
);

export const getIsLoading = createSelector(
  getImmutableApplication,
  application => application.get('isLoading'),
);
