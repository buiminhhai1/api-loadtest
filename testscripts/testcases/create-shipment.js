import { check } from 'k6';
import { Rate, Trend } from 'k6/metrics';
import { 
  TransporterServiceService, 
  IntegratedTransporterService, 
  TransporterService,
  ShipmentService,
} from '../../services/index.js';

export class CreateShipmentWithFullService {
  constructor() {
    this.integratedTransporterService = new IntegratedTransporterService();
    this.transporterService = new TransporterService();
    this.transporterServiceService = new TransporterServiceService()
    this.shipmentService = new ShipmentService();

    this.createIntegratedSuccessRate = new Rate('create_integrated_success_rate');
    this.createTransporterSuccessRate = new Rate('create_transporter_success_rate');
    this.createTransporterServiceSuccessRate = new Rate('create_transporter_service_success_rate');
    this.createShipmentSuccessRate = new Rate('create_shipment_success_rate');
    this.getShipmentSuccessRate = new Rate('get_shipment_success_rate');

    this.createIntegratedDuration = new Trend('create_integrated_duration');
    this.createTransporterDuration = new Trend('create_transporter_duration');
    this.createTransporterServiceDuration = new Trend('create_transporter_service_duration');
    this.createShipmentDuration = new Trend('create_shipment_duration');
    this.getShipmentDuration = new Trend('get_shipment_duration');
  }

  setup() {
    console.log('Setting up CreateShipmentWithFullService');
  }

  getName() {
    return 'CreateShipmentWithFullService';
  }

  teardown() {}

  run(context) {
    this.testCreateShipment(context);
  }

  testCreateShipment(context) {
    let id =  1;
    console.log('context', context);
    
    // 0. create integrated transporter
    const integratedServiceName = `integrated transporter ${id}`;
    const integratedTransporterPayload = {
      name: integratedServiceName,
      transporterServiceDefinitions: [
        {
            serviceName: "service one",
            integrationServiceName: integratedServiceName
        }
      ]
    }
    const integratedServiceResponse = this.integratedTransporterService.createIntegratedTransporter(integratedTransporterPayload);
    this.createIntegratedDuration.add(integratedServiceResponse.timings.duration);
    this.createIntegratedSuccessRate.add(check(
      integratedServiceResponse,
      {
        "Create Integrated Transporter response successfully ": r => integratedServiceResponse.status === 200
      }
    ));
    const integratedService = JSON.parse(integratedServiceResponse.body);

    // 1. create transporter with integrated transporter
    const transporterPayload = {
      branchId: "01226N0640J7M",
      integratedTransporterId: integratedService.id,
      transporterType: "CARRIER",
      accountNumber: "QA-001",
      apiKey: "apiKey123",
      apiPassword: "apiPassword123",
      meterNumber: "meterXYZ",
      trackUrl: "http://track.co/url",
      wsUrl: "http://ws.co/url",
      extraPreferences: {
          pref1: "dooda",
          additionalProp1: "xuandinh"
      }
    }
    const transporterResponse = this.transporterService.createTransporter(transporterPayload);
    this.createTransporterDuration.add(transporterResponse.timings.duration);
    this.createTransporterSuccessRate.add(check(transporterResponse, 
      {
        "Create Transporter response successfully ": r => transporterResponse.status === 200 
      }));
    const transporter = JSON.parse(transporterResponse.body);
    
    // 2. create 2 transporterServices from transporter
    const transporterServicePayload = {
      transporterId: transporter.id,
      name: "2day",
      returnDefault: true
  }
    const transporterServiceResponse = this.transporterServiceService.createTransporterService(transporterServicePayload);

    this.createTransporterServiceDuration.add(transporterServiceResponse.timings.duration);
    this.createTransporterServiceSuccessRate.add(check(transporterServiceResponse,
      {
        "Create Transporter Service response successfully ": r => transporterServiceResponse.status === 200
      }));
    const transporterService = JSON.parse(transporterServiceResponse.body);

    // 3. create shipment with transporterServices
    const shipmentPayload = {
      "packages": [
          {
              "items": [
                  {
                      "itemId": "0FBPFJ28F1CCY",
                      "type": "EXTERNAL_KIT",
                      "description": "WTC",
                      "erpCode": "TLTMUP"
                  },
                  {
                      "itemId": "0FBPFJ28F1CD1",
                      "type": "CASE_KIT",
                      "description": "YBW",
                      "erpCode": "AWXHG"
                  }
              ],
              "length": 1953.87,
              "width": 3484.46,
              "height": 6899.67,
              "dimensionMeasurement": "FT",
              "weight": 2855.94,
              "weightMeasurement": "LB"
          }
      ],
      "transporterServiceId": transporterService.id,
      "returnTransporterServiceId": transporterService.id,
      "destinationAddress": {
          "attention": "SXNRUXRWK",
          "address1": "KCSGX",
          "address2": "MIXBMKQYXP",
          "address3": "HRBUX",
          "address4": "XYZK",
          "city": "QEEEG",
          "state": "state-abc",
          "region": "JWV",
          "subdivisionCode": "ABCDEFG",
          "country": "JAOXWUU",
          "postal": "HIRNNKKNQ",
          "erpCode": "LVMBSCMM",
          "locationErpCode": "LURFHGJ"
      },
      "originAddress": {
          "attention": "RLUU",
          "address1": "EDGE",
          "address2": "UADKP",
          "address3": "KIQSTLW",
          "address4": "XYZKRFYJ",
          "city": "YBIAD",
          "state": "state-abc",
          "region": "BUH",
          "subdivisionCode": "UHYGRDC",
          "country": "OCSSXSL",
          "postal": "REHE",
          "erpCode": "GEA",
          "locationErpCode": "OOXRGKYKBJ"
      },
      "returnAddress": {
          "attention": "PDCJG",
          "address1": "GQNZJXNGZ",
          "address2": "MTIQLKNWR",
          "address3": "FSBHVNG",
          "address4": "MJNHBGVFC",
          "city": "CZOVRHRHAD",
          "state": "state-abc",
          "region": "AWEDRFTG",
          "subdivisionCode": "PLOKIJU",
          "country": "DDK",
          "postal": "SWGN",
          "erpCode": "ZRXS",
          "locationErpCode": "BKVN"
      },
      "warehouseAddress": {
          "attention": "IVQURUCWZW",
          "address1": "MCTLARIWHB",
          "address2": "SKCCKZHDS",
          "address3": "UXHY",
          "address4": "ZAXCDVFBG",
          "city": "IUZ",
          "state": "state-abc",
          "region": "AZWXE",
          "subdivisionCode": "1234567",
          "country": "KDWJA",
          "postal": "GWOWPFQYQM",
          "erpCode": "HCVYPYZAA",
          "locationErpCode": "DJLCGPPJ"
      },
      "kitWarehouseId": "0FBPFJ29B1CD8",
      "caseId": "0FBPFJ29B1CD9",
      "instructions": "SQO",
      "cost": 806.82,
      "pickupDate": "1977-04-12",
      "scheduledArrivalDate": "2071-04-22",
      "tubsDesc": "TAOSAGRXZQ",
      "traysDesc": "MHWUYUYU",
      "dueBackDate": "2088-12-21",
      "loanerBankTransfer": false,
      "currCode": "USD",
      "recipientPoneNumber": "AGDBFXW",
      "saturdayDelivery": true,
      "automatedTracking": false,
      "printReturnLabels": true,
      "invoiceNumber": "RER",
      "poNumber": "FIVDVVMW",
      "referenceNumber": "VTPA",
      "arrivalTime": "18:30:16Z",
      "extraAttributes": {
          "OKTBAZEXD": "NBTC",
          "YHUDBS": "VWFUS",
          "VLJ": "UMN",
          "NOBQIM": "QUVBUXA"
      },
      "status": "NEW"
    };
    const shipmentResponse = this.shipmentService.createShipment(shipmentPayload);
    this.createShipmentDuration.add(shipmentResponse.timings.duration);
    this.createShipmentSuccessRate.add(check(shipmentResponse, 
      {
        "Create Shipment response successfully ": r => shipmentResponse.status === 200
      }));
    const shipment = JSON.parse(shipmentResponse.body);
    
    // 4. get shipment by id
    const shipmentId = shipment.id;
    const getShipmentResponse = this.shipmentService.getShipmentById(shipmentId);
    this.getShipmentDuration.add(getShipmentResponse.timings.duration);
    this.getShipmentSuccessRate.add(check(getShipmentResponse, 
      {
        "Get Shipment response successfully ": r => getShipmentResponse.status === 200
      }));
  }
}