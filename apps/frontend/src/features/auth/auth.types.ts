// We can't import directly from the backend, so we redefine the types here.
// In a more advanced setup, we could generate these from the GraphQL schema.
export type LoginInput = {
  email: string;
  password?: string;
};

export type RegisterInput = LoginInput & {
  fullname: string;
};

export type ProfileResponse = {
  id: string;
  email: string;
  fullname: string;
  is_active: boolean;
  is_demo: boolean;
};
