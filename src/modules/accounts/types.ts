export type Account = {
  id: string;
  name: string;
  balance: number;
};

export type CreateAccountRequest = {
  name: string;
};

export type UpdateAccountRequest = {
  name: string;
};
