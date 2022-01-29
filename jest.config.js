/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    "^src/(.*)$": "dist/$1"
  },
  //extensionsToTreatAsEsm: [".ts"] // https://stackoverflow.com/questions/70328779/typescript-with-jest-cannot-detect-library
};
