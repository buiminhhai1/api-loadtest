import * as headers from "../common/headers.js";
import * as env from "../env.js";
import http from "k6/http";

export class IntegratedTransporterService {
  constructor() {
    this.config = env.getConfigurations();
    this.integratedUrl = `${this.config.coreServiceHost}/integrated-transporter`;
  }

  createIntegratedTransporter(integratedPayload) {
    console.log("integratedUrl", this.integratedUrl);
    const customHeaders = headers.getHeaders();
    return http.post(
      this.integratedUrl,
      JSON.stringify(integratedPayload),
      customHeaders
    );
  }

  getIntegratedTransporterById(integratedId) {
    const url = `${this.integratedUrl}/${integratedId}`;
    const customHeaders = headers.getHeaders();
    return http.get(url, customHeaders);
  }

  updateIntegratedTransporter(integratedId, integratedPayload) {
    const url = `${this.integratedUrl}/${integratedId}`;
    const customHeaders = headers.getHeaders();
    return http.put(
      url,
      JSON.stringify(integratedPayload),
      customHeaders
    );
  }
}