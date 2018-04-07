import {createSelector} from 'reselect';
import {denormalize} from 'normalizr';
import {Schema} from 'utils/schema';

const schemas = state => state.entities;
const driversSchema = state => state.entities.drivers;
const usersSchema = state => state.entities.users;
const getTrackings = state => state.company.trackings;

const getItemIdProp = (state, itemID) => itemID;

const getDriverByID = () => {
  return createSelector([schemas, getItemIdProp], (entities, itemID) =>
    denormalize(itemID, Schema.drivers, entities),
  );
};

const getDrivers = createSelector(
  [schemas, driversSchema, usersSchema],
  (entities, drivers, usersSchema) =>
    Object.keys(drivers).map(driverID => {
      let driver = drivers[driverID];
      return {
        ...driver,
        user: usersSchema[driver.user] || {},
      };
    }),
);

const getDriverTrackings = createSelector(
  [schemas, driversSchema, getTrackings],
  (entities, drivers, trackings) =>
    Object.keys(trackings).map(driverID => {
      let driver = drivers[driverID];
      return {
        ...driver,
        ...trackings[driverID],
      };
    }),
);

export const SELECTORS = {
  getDrivers,
  getDriverByID,
  getDriverTrackings,
};
