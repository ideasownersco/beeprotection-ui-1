import {createSelector} from 'reselect';
import {denormalize} from 'normalizr';
import {Schema} from 'utils/schema';

const schemas = state => state.entities;
const driversSchema = state => state.entities.drivers;
const usersSchema = state => state.entities.users;

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

export const SELECTORS = {
  getDrivers,
};
