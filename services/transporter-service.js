import * as headers from "../common/headers.js";
import * as env from "../env.js";
import http from "k6/http";

export class TransporterService {
  constructor() {
    this.config = env.getConfigurations();
    this.transporterUrl = `${this.config.coreServiceHost}/transporter`;
  }
  
  getTransporterById(transporterId) {
    const url = `${this.transporterUrl}/${transporterId}`;
    const customHeaders = headers.getHeaders();
    return http.get(url, customHeaders);
  }

  createTransporter(transporterPayload)  {
    const customHeaders = headers.getHeaders();
    return http.post(
      this.transporterUrl, 
      JSON.stringify(transporterPayload), 
      customHeaders);
  }

  updateTransporter(transporterId, transporterPayload) {
    const url = `${this.transporterUrl}/${transporterId}`;
    const customHeaders = headers.getHeaders();
    return http.put(
      url, 
      JSON.stringify(transporterPayload), 
      customHeaders);
  }

  deleteTransporter(transporterId) {
    const url = `${this.transporterUrl}/${transporterId}`;
    const customHeaders = headers.getHeaders();
    return http.del(url, null, customHeaders);
  }

  patchTransporter(transporterId, transporterPayload) {
    const url = `${this.transporterUrl}/${transporterId}`;
    const customHeaders = headers.getHeaders();
    return http.patch(
      url, 
      JSON.stringify(transporterPayload), 
      customHeaders);
  }

  getTransportersByBranchId(branchId) {
    const url = `${this.transporterUrl}/branch/${branchId}`;
    const customHeaders = headers.getHeaders();
    return http.get(url, customHeaders);
  }

  getTransporterDataById(transporterId) {
    const url = `${this.transporterUrl}-data/${transporterId}`;
    const customHeaders = headers.getHeaders();
    return http.get(url, customHeaders);
  }

  getTransporterDataByBranchId(branchId) {
    const url = `${this.transporterUrl}-data/branch/${branchId}`;
    const customHeaders = headers.getHeaders();
    return http.get(url, customHeaders);
  }

  getTransporterDataByQuery(query) {
    const url = `${this.transporterUrl}-data?query=${query}`;
    const customHeaders = headers.getHeaders();
    return http.get(url, customHeaders);
  }
}