import * as headers from "../common/headers.js";
import * as env from "../env.js";
import http from "k6/http";

export class TransporterServiceService {
  constructor() {
    this.config = env.getConfigurations();
    this.transporterServiceUrl = `${this.config.coreServiceHost}/transporter-service`;
  }

  createTransporterService(transporterServicePayload)  {
    const customHeaders = headers.getHeaders();
    return http.post(
      this.transporterServiceUrl, 
      JSON.stringify(transporterServicePayload), 
      customHeaders);
  }

  getTransporterServiceById(transporterServiceId) {
    const url = `${this.transporterServiceUrl}/${transporterServiceId}`;
    const customHeaders = headers.getHeaders();
    return http.get(url, customHeaders);
  }

  updateTransporterService(transporterServiceId, transporterServicePayload) {
    const url = `${this.transporterServiceUrl}/${transporterServiceId}`;
    const customHeaders = headers.getHeaders();
    return http.put(
      url, 
      JSON.stringify(transporterServicePayload), 
      customHeaders);
  }

  patchTransporterService(transporterServiceId, transporterServicePayload) {
    const url = `${this.transporterServiceUrl}/${transporterServiceId}`;
    const customHeaders = headers.getHeaders();
    return http.patch(
      url, 
      JSON.stringify(transporterServicePayload), 
      customHeaders);
  }  

  deleteTransporterService(transporterServiceId) {
    const url = `${this.transporterServiceUrl}/${transporterServiceId}`;
    const customHeaders = headers.getHeaders();
    return http.del(url, null, customHeaders);
  }
}