const REGEX_EMAIL = /^\w+(-?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

export const validateEmail = (email: string): boolean => {
  return REGEX_EMAIL.test(email);
};
