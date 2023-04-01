import { User } from '@prisma/client';

export const returnUserObject = (user: User) => {
  const { password, ...restUser } = user;

  return restUser;
};
