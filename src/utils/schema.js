import {schema} from 'normalizr';
const categoriesSchema = new schema.Entity('categories');
const packagesSchema = new schema.Entity('packages');
const servicesSchema = new schema.Entity('services');
const timingsSchema = new schema.Entity('timings');
const ordersSchema = new schema.Entity('orders');
const usersSchema = new schema.Entity('users');
const driversSchema = new schema.Entity('drivers');
const jobsSchema = new schema.Entity('jobs');
const areasSchema = new schema.Entity('areas');

const profileSchema = new schema.Union(
  {
    drivers: driversSchema,
  },
  input => input.schema,
);

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
  job: jobsSchema,
  packages: [packagesSchema],
  // services:[servicesSchema]
});

jobsSchema.define({
  driver: driversSchema,
});

usersSchema.define({
  orders: [ordersSchema],
  profile: profileSchema,
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
  areas: areasSchema,
};
