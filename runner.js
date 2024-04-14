import { testSuite } from './testscripts/testsuite.js'
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";
import { getConfigurations } from './env.js'

const testCases = initializeTestCases();

export function setup() {

  let context = {};
  for (let testCase of testCases) {
    context[testCase.getName()] = testCase.setup();
  }
  return context;
}

export default function (context) {
  try {
    testCases.forEach(testCase => {
      try {
        const testCaseContext = context[testCase.getName()];
        testCase.run(testCaseContext);
      } catch (e) {
        console.log(`Test case run failed with error: ${e}`);
      }
    });
  } catch (e) {
    console.log(`Execution failed: ${e}`);
  }
}

export function handleSummary(data) {
  return {
    stdout: textSummary(data, { indent: " ", enableColors: true }),
    "report.html": htmlReport(data),
  };
}

function initializeTestCases() {
  let testCases = [];
  console.log('test', getConfigurations());
  testSuite.forEach(testCase => {
    try {
      testCases.push(new testCase());
    } catch (e) {
      console.log(`Running test case with error: ${e}`);
    }
  });
  return testCases;
}
