/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { CommandResource } from '../models/command-resource';
import { Order } from '../models/order';
import { AddressDTO } from '../models/address-dto';
import { DeliveryInfo } from '../models/delivery-info';
import { PaymentDTO } from '../models/payment-dto';

/**
 * Order Command Resource
 */
@Injectable({
  providedIn: 'root',
})
class OrderCommandResourceService extends __BaseService {
  static readonly initiateOrderUsingPOSTPath = '/api/command/order/initiateOrder';
  static readonly getAllSavedAddressUsingGETPath = '/api/command/orders/addresses';
  static readonly createAddressUsingPOSTPath = '/api/command/orders/addresses';
  static readonly collectDeliveryDetailsUsingPOSTPath = '/api/command/orders/collectDeliveryDetails';
  static readonly confirmDeliveryUsingPOSTPath = '/api/command/orders/confirmDelivery/{phone}/{taskId}';
  static readonly createPaymentUsingPOSTPath = '/api/command/orders/makePayment/{taskId}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param order order
   * @return OK
   */
  initiateOrderUsingPOSTResponse(order: Order): __Observable<__StrictHttpResponse<CommandResource>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = order;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/command/order/initiateOrder`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CommandResource>;
      })
    );
  }
  /**
   * @param order order
   * @return OK
   */
  initiateOrderUsingPOST(order: Order): __Observable<CommandResource> {
    return this.initiateOrderUsingPOSTResponse(order).pipe(
      __map(_r => _r.body as CommandResource)
    );
  }

  /**
   * @return OK
   */
  getAllSavedAddressUsingGETResponse(): __Observable<__StrictHttpResponse<Array<AddressDTO>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/command/orders/addresses`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<AddressDTO>>;
      })
    );
  }
  /**
   * @return OK
   */
  getAllSavedAddressUsingGET(): __Observable<Array<AddressDTO>> {
    return this.getAllSavedAddressUsingGETResponse().pipe(
      __map(_r => _r.body as Array<AddressDTO>)
    );
  }

  /**
   * @param params The `OrderCommandResourceService.CreateAddressUsingPOSTParams` containing the following parameters:
   *
   * - `state`:
   *
   * - `roadNameAreaOrStreet`:
   *
   * - `pincode`:
   *
   * - `phone`:
   *
   * - `name`:
   *
   * - `landmark`:
   *
   * - `id`:
   *
   * - `houseNoOrBuildingName`:
   *
   * - `customerId`:
   *
   * - `city`:
   *
   * - `alternatePhone`:
   *
   * - `addressType`:
   *
   * @return OK
   */
  createAddressUsingPOSTResponse(params: OrderCommandResourceService.CreateAddressUsingPOSTParams): __Observable<__StrictHttpResponse<AddressDTO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.state != null) __params = __params.set('state', params.state.toString());
    if (params.roadNameAreaOrStreet != null) __params = __params.set('roadNameAreaOrStreet', params.roadNameAreaOrStreet.toString());
    if (params.pincode != null) __params = __params.set('pincode', params.pincode.toString());
    if (params.phone != null) __params = __params.set('phone', params.phone.toString());
    if (params.name != null) __params = __params.set('name', params.name.toString());
    if (params.landmark != null) __params = __params.set('landmark', params.landmark.toString());
    if (params.id != null) __params = __params.set('id', params.id.toString());
    if (params.houseNoOrBuildingName != null) __params = __params.set('houseNoOrBuildingName', params.houseNoOrBuildingName.toString());
    if (params.customerId != null) __params = __params.set('customerId', params.customerId.toString());
    if (params.city != null) __params = __params.set('city', params.city.toString());
    if (params.alternatePhone != null) __params = __params.set('alternatePhone', params.alternatePhone.toString());
    if (params.addressType != null) __params = __params.set('addressType', params.addressType.toString());
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/command/orders/addresses`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<AddressDTO>;
      })
    );
  }
  /**
   * @param params The `OrderCommandResourceService.CreateAddressUsingPOSTParams` containing the following parameters:
   *
   * - `state`:
   *
   * - `roadNameAreaOrStreet`:
   *
   * - `pincode`:
   *
   * - `phone`:
   *
   * - `name`:
   *
   * - `landmark`:
   *
   * - `id`:
   *
   * - `houseNoOrBuildingName`:
   *
   * - `customerId`:
   *
   * - `city`:
   *
   * - `alternatePhone`:
   *
   * - `addressType`:
   *
   * @return OK
   */
  createAddressUsingPOST(params: OrderCommandResourceService.CreateAddressUsingPOSTParams): __Observable<AddressDTO> {
    return this.createAddressUsingPOSTResponse(params).pipe(
      __map(_r => _r.body as AddressDTO)
    );
  }

  /**
   * @param deliveryInfo deliveryInfo
   */
  collectDeliveryDetailsUsingPOSTResponse(deliveryInfo: DeliveryInfo): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = deliveryInfo;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/command/orders/collectDeliveryDetails`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param deliveryInfo deliveryInfo
   */
  collectDeliveryDetailsUsingPOST(deliveryInfo: DeliveryInfo): __Observable<null> {
    return this.collectDeliveryDetailsUsingPOSTResponse(deliveryInfo).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `OrderCommandResourceService.ConfirmDeliveryUsingPOSTParams` containing the following parameters:
   *
   * - `taskId`: taskId
   *
   * - `phone`: phone
   *
   * @return OK
   */
  confirmDeliveryUsingPOSTResponse(params: OrderCommandResourceService.ConfirmDeliveryUsingPOSTParams): __Observable<__StrictHttpResponse<CommandResource>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/command/orders/confirmDelivery/${params.phone}/${params.taskId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CommandResource>;
      })
    );
  }
  /**
   * @param params The `OrderCommandResourceService.ConfirmDeliveryUsingPOSTParams` containing the following parameters:
   *
   * - `taskId`: taskId
   *
   * - `phone`: phone
   *
   * @return OK
   */
  confirmDeliveryUsingPOST(params: OrderCommandResourceService.ConfirmDeliveryUsingPOSTParams): __Observable<CommandResource> {
    return this.confirmDeliveryUsingPOSTResponse(params).pipe(
      __map(_r => _r.body as CommandResource)
    );
  }

  /**
   * @param params The `OrderCommandResourceService.CreatePaymentUsingPOSTParams` containing the following parameters:
   *
   * - `taskId`: taskId
   *
   * - `paymentDTO`: paymentDTO
   *
   * @return OK
   */
  createPaymentUsingPOSTResponse(params: OrderCommandResourceService.CreatePaymentUsingPOSTParams): __Observable<__StrictHttpResponse<CommandResource>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.paymentDTO;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/command/orders/makePayment/${params.taskId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CommandResource>;
      })
    );
  }
  /**
   * @param params The `OrderCommandResourceService.CreatePaymentUsingPOSTParams` containing the following parameters:
   *
   * - `taskId`: taskId
   *
   * - `paymentDTO`: paymentDTO
   *
   * @return OK
   */
  createPaymentUsingPOST(params: OrderCommandResourceService.CreatePaymentUsingPOSTParams): __Observable<CommandResource> {
    return this.createPaymentUsingPOSTResponse(params).pipe(
      __map(_r => _r.body as CommandResource)
    );
  }
}

module OrderCommandResourceService {

  /**
   * Parameters for createAddressUsingPOST
   */
  export interface CreateAddressUsingPOSTParams {
    state?: string;
    roadNameAreaOrStreet?: string;
    pincode?: number;
    phone?: number;
    name?: string;
    landmark?: string;
    id?: number;
    houseNoOrBuildingName?: string;
    customerId?: string;
    city?: string;
    alternatePhone?: number;
    addressType?: string;
  }

  /**
   * Parameters for confirmDeliveryUsingPOST
   */
  export interface ConfirmDeliveryUsingPOSTParams {

    /**
     * taskId
     */
    taskId: string;

    /**
     * phone
     */
    phone: number;
  }

  /**
   * Parameters for createPaymentUsingPOST
   */
  export interface CreatePaymentUsingPOSTParams {

    /**
     * taskId
     */
    taskId: string;

    /**
     * paymentDTO
     */
    paymentDTO: PaymentDTO;
  }
}

export { OrderCommandResourceService }
