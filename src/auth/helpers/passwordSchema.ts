export const passwordSchema = Object.freeze({
  upperCase: {
    reg: /(?=.*[A-Z])/,
    message: 'The password must contain at least one capital letter',
  },
  lowerCase: {
    reg: /(?=.*[a-z])/,
    message: 'The password must contain at least one lowercase letter',
  },
  symbol: {
    reg: /(?=.*[!@#$%^&*_])/,
    message: 'The password must contain at least one special character',
  },
  number: {
    reg: /(?=.*[0-9])/,
    message: 'The password must contain one number',
  },
  min: {
    reg: /[0-9a-zA-Z!@#$%^&*_]{7,}/,
    message: 'Minimum length',
  },
  original: {
    reg: /(?=.*[0-9])(?=.*[!@#$%^&*_])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*_]{7,}/,
    message: 'Invalid password',
  },
});
