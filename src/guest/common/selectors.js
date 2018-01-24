import map from 'lodash/map';
import {createSelector} from 'reselect';
import {denormalize} from 'normalizr';
import {Schema} from 'utils/schema';

const schemas = state => state.entities;
const isAuthenticated = state => state.user.isAuthenticated;
const usersEntity = state => state.entities.users;
const getAuthUserID = state => state.user.id;
const getAuthUserType = state => state.user.type;

const getAuthUser = createSelector(
  schemas,
  usersEntity,
  getAuthUserID,
  (entities, users, userID) => {
    return userID ? users[userID] : {};
  },
);

/**
 * for driver, shipper
 */
const getAuthUserProfile = createSelector(
  schemas,
  getAuthUser,
  (entities, user) => {
    let {id, schema} = user.profile;
    return entities[schema][id];
  },
);

export const SELECTORS = {
  isAuthenticated,
  getAuthUser,
  getAuthUserType,
  getAuthUserProfile,
  getAuthUserID,
};
