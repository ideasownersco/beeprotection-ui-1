import {createSelector} from 'reselect';
import {SELECTORS as USER_SELECTORS} from 'guest/common/selectors';

const getProfile = createSelector(
  [USER_SELECTORS.getAuthUserProfile],
  driver => {
    return {
      ...driver,
    };
  },
);

export const SELECTORS = {
  getProfile,
};
