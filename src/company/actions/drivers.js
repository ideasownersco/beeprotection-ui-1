export const ACTION_TYPES = {
  FETCH_DRIVERS_REQUEST: '@company/drivers/FETCH_DRIVERS_REQUEST',
  FETCH_DRIVERS_SUCCESS: '@company/drivers/FETCH_DRIVERS_SUCCESS',
  FETCH_DRIVERS_FAILURE: '@company/drivers/FETCH_DRIVERS_FAILURE',

  FETCH_DRIVER_REQUEST: '@company/drivers/FETCH_DRIVER_REQUEST',
  FETCH_DRIVER_SUCCESS: '@company/drivers/FETCH_DRIVER_SUCCESS',
  FETCH_DRIVER_FAILURE: '@company/drivers/FETCH_DRIVER_FAILURE',

  ASSIGN_DRIVER_REQUEST: '@company/drivers/ASSIGN_DRIVER_REQUEST',
  ASSIGN_DRIVER_SUCCESS: '@company/drivers/ASSIGN_DRIVER_SUCCESS',
  ASSIGN_DRIVER_FAILURE: '@company/drivers/ASSIGN_DRIVER_FAILURE',
};

function fetchDriver(id) {
  return {
    type: ACTION_TYPES.FETCH_DRIVER_REQUEST,
    driver_id: id,
  };
}

function fetchDrivers(params) {
  return {
    type: ACTION_TYPES.FETCH_DRIVERS_REQUEST,
    params,
  };
}

function assignDriver(id, params) {
  return {
    type: ACTION_TYPES.ASSIGN_DRIVER_REQUEST,
    order_id: id,
    params,
  };
}

export const ACTIONS = {
  fetchDrivers,
  fetchDriver,
  assignDriver,
};
