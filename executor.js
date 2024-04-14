export function getExecutor() {
  console.info('Running with local executor');
  return CONSTANT_VUS;
}

const CONSTANT_VUS = {
  scenarios: {
    contacts: {
      executor: 'constant-vus',
      vus: 1,
      duration: '1m',
    },
  },
};

const RAMPING_ARRIVAL_RATE = {
  scenarios: {
    contacts: {
      executor: "ramping-arrival-rate",
      startRate: 1,
      timeUnit: "1s",
      preAllocatedVUs: 5,
      maxVUs: 50,
      stages: [
        { target: 5, duration: "3s" },
      ],
    },
  },
};