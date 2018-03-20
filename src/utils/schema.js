import {schema} from 'normalizr';
const categoriesSchema = new schema.Entity('categories');
const packagesSchema = new schema.Entity('packages');
const servicesSchema = new schema.Entity('services');
const timingsSchema = new schema.Entity('timings');
const ordersSchema = new schema.Entity('orders');
const usersSchema = new schema.Entity('users');
const driversSchema = new schema.Entity('drivers');
const jobsSchema = new schema.Entity('jobs');

categoriesSchema.define({
  packages: [packagesSchema],
});

packagesSchema.define({
  services: [servicesSchema],
  category: categoriesSchema,
});

servicesSchema.define({
  package: packagesSchema,
});

ordersSchema.define({
  user: usersSchema,
  accepted_job: jobsSchema,
  packages:[packagesSchema],
  // services:[servicesSchema]
});

jobsSchema.define({
  order: ordersSchema,
  driver: driversSchema,
});

usersSchema.define({
  orders: [ordersSchema],
  profile: driversSchema,
});

driversSchema.define({
  user: usersSchema,
  working_order: ordersSchema,
  past_orders: [ordersSchema],
  upcoming_orders: [ordersSchema],
});

export const Schema = {
  categories: categoriesSchema,
  packages: packagesSchema,
  timings: timingsSchema,
  orders: ordersSchema,
  users: usersSchema,
  drivers: driversSchema,
  jobs: jobsSchema,
};
