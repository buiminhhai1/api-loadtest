import * as headers from "../common/headers.js";
import * as env from "../env.js";
import http from "k6/http";

export class ShipmentService {
  constructor() {
    this.config = env.getConfigurations();
    this.shipmentUrl = `${this.config.coreServiceHost}/shipment`;
  }

  createShipment(shipmentPayload) {
    const customHeaders = headers.getHeaders();
    return http.post(
      this.shipmentUrl,
      JSON.stringify(shipmentPayload),
      customHeaders
    );
  }

  getShipmentById(shipmentId) {
    const url = `${this.shipmentUrl}/${shipmentId}`;
    const customHeaders = headers.getHeaders();
    return http.get(url, customHeaders);
  }
}