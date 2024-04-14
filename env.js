export function getConfigurations() {
  return {
    coreServiceHost: __ENV.coreServiceHost || 'http://localhost:8080',
    vus: __ENV.vus,
    rate: __ENV.rate,
    timeUnit: __ENV.timeUnit,
    duration: __ENV.duration,
    timeout: __ENV.timeout
  };
}
