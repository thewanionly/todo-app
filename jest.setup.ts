import '@testing-library/jest-dom/extend-expect';

Object.defineProperty(globalThis, 'crypto', {
  value: {
    randomUUID: () => Math.random(),
  },
});
