###################
# BUILD FOR PRODUCTION
###################
FROM node:18-bullseye-slim As build

WORKDIR /test

COPY ./ /test

RUN npm install
RUN npm run bundle

# Use the node user from the image (instead of the root user)
USER node

###################
# PRODUCTION
###################

FROM grafana/k6:latest

COPY --from=build /test/dist/ /test/

WORKDIR /test

# Override the entry point of the base k6 image
ENTRYPOINT []

CMD ["sh", "-c", "K6_STATSD_ENABLE_TAGS=true k6 run --out statsd --vus 10 --duration 1m runner.bundle.js"]

