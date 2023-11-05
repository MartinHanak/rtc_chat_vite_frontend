export default {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    // process `*.tsx` files with `ts-jest`
  },
  rootDir: "src",
  moduleNameMapper: {
    "\\.(gif|ttf|eot|svg|png)$": "<rootDir>/__ mocks __/fileMock.js",
  },
  globals: {
    "ts-jest": {
      tsConfigFile: "tsconfig.json",
    },
    TextEncoder: require("util").TextEncoder,
    TextDecoder: require("util").TextDecoder,
  },
};
