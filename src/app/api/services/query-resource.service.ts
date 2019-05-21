/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { ContactDTO } from '../models/contact-dto';
import { CustomerDTO } from '../models/customer-dto';
import { CategoryDTO } from '../models/category-dto';
import { PageOfCustomer } from '../models/page-of-customer';
import { PageOfProduct } from '../models/page-of-product';
import { UomDTO } from '../models/uom-dto';
import { PageOfStockCurrent } from '../models/page-of-stock-current';
import { PageOfStockDiary } from '../models/page-of-stock-diary';
import { Product } from '../models/product';
import { ProductDTO } from '../models/product-dto';
import { Review } from '../models/review';
import { PageOfSale } from '../models/page-of-sale';
import { SaleDTO } from '../models/sale-dto';
import { StockCurrentDTO } from '../models/stock-current-dto';
import { StockCurrent } from '../models/stock-current';
import { StockDiary } from '../models/stock-diary';
import { StockDiaryDTO } from '../models/stock-diary-dto';
import { StockLine } from '../models/stock-line';
import { Store } from '../models/store';
import { TicketLineDTO } from '../models/ticket-line-dto';
import { TicketLine } from '../models/ticket-line';
import { UserRating } from '../models/user-rating';

/**
 * Query Resource
 */
@Injectable({
  providedIn: 'root',
})
class QueryResourceService extends __BaseService {
  static readonly findContactByIdUsingGETPath = '/api/query/contacts/{id}';
  static readonly exportCustomersUsingGETPath = '/api/query/customers/export';
  static readonly findCustomerByIdUsingGETPath = '/api/query/customers/{id}';
  static readonly findAllCategoriesWithOutImageUsingGETPath = '/api/query/findAllCategoriesWithOutImage';
  static readonly findAllCategoriesUsingGETPath = '/api/query/findAllCateogories';
  static readonly findAllCustomersUsingGETPath = '/api/query/findAllCustomer/{searchTerm}';
  static readonly findAllCustomersWithoutSearchUsingGETPath = '/api/query/findAllCustomers';
  static readonly findAllProductsUsingGETPath = '/api/query/findAllProducts';
  static readonly findAllUomUsingGETPath = '/api/query/findAllUom';
  static readonly findProductByCategoryIdAndUserIdUsingGETPath = '/api/query/findProductByCategoryIdAndUserId/{categoryId}/{userId}';
  static readonly findAllProductBySearchTermUsingGETPath = '/api/query/findProductBySearchTerm/{searchTerm}';
  static readonly findStockCurrentByProductIdUsingGETPath = '/api/query/findStockCurrentByProductId/{productId}';
  static readonly findStockCurrentByProductNameUsingGETPath = '/api/query/findStockCurrentByProductName/{name}';
  static readonly findStockDiaryByProductIdUsingGETPath = '/api/query/findStockDiaryByProductId/{productId}';
  static readonly findAllProductByStoreIdUsingGETPath = '/api/query/findproducts/{storeId}';
  static readonly findAllProductUsingGETPath = '/api/query/products';
  static readonly exportProductsUsingGETPath = '/api/query/products/export';
  static readonly findProductUsingGETPath = '/api/query/products/{id}';
  static readonly findReviewsByStoreIdUsingGETPath = '/api/query/review/{storeId}';
  static readonly findAllReviewsUsingGETPath = '/api/query/reviews';
  static readonly findSalesUsingGETPath = '/api/query/sales';
  static readonly findSaleByIdUsingGETPath = '/api/query/sales/{id}';
  static readonly searchStockCurrentsUsingGETPath = '/api/query/stock-current/{searchTerm}';
  static readonly getAllStockCurrentsUsingGETPath = '/api/query/stock-currents';
  static readonly findOneStockCurrentUsingGETPath = '/api/query/stock-currents/{id}';
  static readonly findAllStockDiariesUsingGETPath = '/api/query/stock-diaries';
  static readonly findOneStockDiaryUsingGETPath = '/api/query/stock-diaries/{id}';
  static readonly searchStockDiariesUsingGETPath = '/api/query/stock-diary/{searchTerm}';
  static readonly findAllStockLinesUsingGETPath = '/api/query/stocklines';
  static readonly findStoreByRegisterNumberUsingGETPath = '/api/query/store/{regNo}';
  static readonly findAllStoresUsingGETPath = '/api/query/stores';
  static readonly findAllTicketlinesUsingGETPath = '/api/query/ticket-lines';
  static readonly findOneTicketLinesUsingGETPath = '/api/query/ticket-lines/{id}';
  static readonly findAllTicketLinesBySaleIdUsingGETPath = '/api/query/ticket-lines/{saleId}';
  static readonly findAllUserRatingsUsingGETPath = '/api/query/user-ratings';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param id id
   * @return OK
   */
  findContactByIdUsingGETResponse(id: number): __Observable<__StrictHttpResponse<ContactDTO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/contacts/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ContactDTO>;
      })
    );
  }
  /**
   * @param id id
   * @return OK
   */
  findContactByIdUsingGET(id: number): __Observable<ContactDTO> {
    return this.findContactByIdUsingGETResponse(id).pipe(
      __map(_r => _r.body as ContactDTO)
    );
  }

  /**
   * @return OK
   */
  exportCustomersUsingGETResponse(): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/customers/export`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'text'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<string>;
      })
    );
  }
  /**
   * @return OK
   */
  exportCustomersUsingGET(): __Observable<string> {
    return this.exportCustomersUsingGETResponse().pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * @param id id
   * @return OK
   */
  findCustomerByIdUsingGETResponse(id: number): __Observable<__StrictHttpResponse<CustomerDTO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/customers/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CustomerDTO>;
      })
    );
  }
  /**
   * @param id id
   * @return OK
   */
  findCustomerByIdUsingGET(id: number): __Observable<CustomerDTO> {
    return this.findCustomerByIdUsingGETResponse(id).pipe(
      __map(_r => _r.body as CustomerDTO)
    );
  }

  /**
   * @param params The `QueryResourceService.FindAllCategoriesWithOutImageUsingGETParams` containing the following parameters:
   *
   * - `sort`: sort
   *
   * - `size`: size
   *
   * - `page`: page
   *
   * @return OK
   */
  findAllCategoriesWithOutImageUsingGETResponse(params: QueryResourceService.FindAllCategoriesWithOutImageUsingGETParams): __Observable<__StrictHttpResponse<Array<CategoryDTO>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    (params.sort || []).forEach(val => {if (val != null) __params = __params.append('sort', val.toString())});
    if (params.size != null) __params = __params.set('size', params.size.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/findAllCategoriesWithOutImage`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<CategoryDTO>>;
      })
    );
  }
  /**
   * @param params The `QueryResourceService.FindAllCategoriesWithOutImageUsingGETParams` containing the following parameters:
   *
   * - `sort`: sort
   *
   * - `size`: size
   *
   * - `page`: page
   *
   * @return OK
   */
  findAllCategoriesWithOutImageUsingGET(params: QueryResourceService.FindAllCategoriesWithOutImageUsingGETParams): __Observable<Array<CategoryDTO>> {
    return this.findAllCategoriesWithOutImageUsingGETResponse(params).pipe(
      __map(_r => _r.body as Array<CategoryDTO>)
    );
  }

  /**
   * @param params The `QueryResourceService.FindAllCategoriesUsingGETParams` containing the following parameters:
   *
   * - `sort`: sort
   *
   * - `size`: size
   *
   * - `page`: page
   *
   * @return OK
   */
  findAllCategoriesUsingGETResponse(params: QueryResourceService.FindAllCategoriesUsingGETParams): __Observable<__StrictHttpResponse<Array<CategoryDTO>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    (params.sort || []).forEach(val => {if (val != null) __params = __params.append('sort', val.toString())});
    if (params.size != null) __params = __params.set('size', params.size.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/findAllCateogories`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<CategoryDTO>>;
      })
    );
  }
  /**
   * @param params The `QueryResourceService.FindAllCategoriesUsingGETParams` containing the following parameters:
   *
   * - `sort`: sort
   *
   * - `size`: size
   *
   * - `page`: page
   *
   * @return OK
   */
  findAllCategoriesUsingGET(params: QueryResourceService.FindAllCategoriesUsingGETParams): __Observable<Array<CategoryDTO>> {
    return this.findAllCategoriesUsingGETResponse(params).pipe(
      __map(_r => _r.body as Array<CategoryDTO>)
    );
  }

  /**
   * @param params The `QueryResourceService.FindAllCustomersUsingGETParams` containing the following parameters:
   *
   * - `searchTerm`: searchTerm
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  findAllCustomersUsingGETResponse(params: QueryResourceService.FindAllCustomersUsingGETParams): __Observable<__StrictHttpResponse<PageOfCustomer>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    (params.sort || []).forEach(val => {if (val != null) __params = __params.append('sort', val.toString())});
    if (params.size != null) __params = __params.set('size', params.size.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/findAllCustomer/${params.searchTerm}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PageOfCustomer>;
      })
    );
  }
  /**
   * @param params The `QueryResourceService.FindAllCustomersUsingGETParams` containing the following parameters:
   *
   * - `searchTerm`: searchTerm
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  findAllCustomersUsingGET(params: QueryResourceService.FindAllCustomersUsingGETParams): __Observable<PageOfCustomer> {
    return this.findAllCustomersUsingGETResponse(params).pipe(
      __map(_r => _r.body as PageOfCustomer)
    );
  }

  /**
   * @param params The `QueryResourceService.FindAllCustomersWithoutSearchUsingGETParams` containing the following parameters:
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  findAllCustomersWithoutSearchUsingGETResponse(params: QueryResourceService.FindAllCustomersWithoutSearchUsingGETParams): __Observable<__StrictHttpResponse<PageOfCustomer>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    (params.sort || []).forEach(val => {if (val != null) __params = __params.append('sort', val.toString())});
    if (params.size != null) __params = __params.set('size', params.size.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/findAllCustomers`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PageOfCustomer>;
      })
    );
  }
  /**
   * @param params The `QueryResourceService.FindAllCustomersWithoutSearchUsingGETParams` containing the following parameters:
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  findAllCustomersWithoutSearchUsingGET(params: QueryResourceService.FindAllCustomersWithoutSearchUsingGETParams): __Observable<PageOfCustomer> {
    return this.findAllCustomersWithoutSearchUsingGETResponse(params).pipe(
      __map(_r => _r.body as PageOfCustomer)
    );
  }

  /**
   * @param params The `QueryResourceService.FindAllProductsUsingGETParams` containing the following parameters:
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  findAllProductsUsingGETResponse(params: QueryResourceService.FindAllProductsUsingGETParams): __Observable<__StrictHttpResponse<PageOfProduct>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    (params.sort || []).forEach(val => {if (val != null) __params = __params.append('sort', val.toString())});
    if (params.size != null) __params = __params.set('size', params.size.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/findAllProducts`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PageOfProduct>;
      })
    );
  }
  /**
   * @param params The `QueryResourceService.FindAllProductsUsingGETParams` containing the following parameters:
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  findAllProductsUsingGET(params: QueryResourceService.FindAllProductsUsingGETParams): __Observable<PageOfProduct> {
    return this.findAllProductsUsingGETResponse(params).pipe(
      __map(_r => _r.body as PageOfProduct)
    );
  }

  /**
   * @param params The `QueryResourceService.FindAllUomUsingGETParams` containing the following parameters:
   *
   * - `sort`: sort
   *
   * - `size`: size
   *
   * - `page`: page
   *
   * @return OK
   */
  findAllUomUsingGETResponse(params: QueryResourceService.FindAllUomUsingGETParams): __Observable<__StrictHttpResponse<Array<UomDTO>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    (params.sort || []).forEach(val => {if (val != null) __params = __params.append('sort', val.toString())});
    if (params.size != null) __params = __params.set('size', params.size.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/findAllUom`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<UomDTO>>;
      })
    );
  }
  /**
   * @param params The `QueryResourceService.FindAllUomUsingGETParams` containing the following parameters:
   *
   * - `sort`: sort
   *
   * - `size`: size
   *
   * - `page`: page
   *
   * @return OK
   */
  findAllUomUsingGET(params: QueryResourceService.FindAllUomUsingGETParams): __Observable<Array<UomDTO>> {
    return this.findAllUomUsingGETResponse(params).pipe(
      __map(_r => _r.body as Array<UomDTO>)
    );
  }

  /**
   * @param params The `QueryResourceService.FindProductByCategoryIdAndUserIdUsingGETParams` containing the following parameters:
   *
   * - `userId`: userId
   *
   * - `categoryId`: categoryId
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  findProductByCategoryIdAndUserIdUsingGETResponse(params: QueryResourceService.FindProductByCategoryIdAndUserIdUsingGETParams): __Observable<__StrictHttpResponse<PageOfProduct>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    (params.sort || []).forEach(val => {if (val != null) __params = __params.append('sort', val.toString())});
    if (params.size != null) __params = __params.set('size', params.size.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/findProductByCategoryIdAndUserId/${params.categoryId}/${params.userId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PageOfProduct>;
      })
    );
  }
  /**
   * @param params The `QueryResourceService.FindProductByCategoryIdAndUserIdUsingGETParams` containing the following parameters:
   *
   * - `userId`: userId
   *
   * - `categoryId`: categoryId
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  findProductByCategoryIdAndUserIdUsingGET(params: QueryResourceService.FindProductByCategoryIdAndUserIdUsingGETParams): __Observable<PageOfProduct> {
    return this.findProductByCategoryIdAndUserIdUsingGETResponse(params).pipe(
      __map(_r => _r.body as PageOfProduct)
    );
  }

  /**
   * @param params The `QueryResourceService.FindAllProductBySearchTermUsingGETParams` containing the following parameters:
   *
   * - `searchTerm`: searchTerm
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  findAllProductBySearchTermUsingGETResponse(params: QueryResourceService.FindAllProductBySearchTermUsingGETParams): __Observable<__StrictHttpResponse<PageOfProduct>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    (params.sort || []).forEach(val => {if (val != null) __params = __params.append('sort', val.toString())});
    if (params.size != null) __params = __params.set('size', params.size.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/findProductBySearchTerm/${params.searchTerm}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PageOfProduct>;
      })
    );
  }
  /**
   * @param params The `QueryResourceService.FindAllProductBySearchTermUsingGETParams` containing the following parameters:
   *
   * - `searchTerm`: searchTerm
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  findAllProductBySearchTermUsingGET(params: QueryResourceService.FindAllProductBySearchTermUsingGETParams): __Observable<PageOfProduct> {
    return this.findAllProductBySearchTermUsingGETResponse(params).pipe(
      __map(_r => _r.body as PageOfProduct)
    );
  }

  /**
   * @param params The `QueryResourceService.FindStockCurrentByProductIdUsingGETParams` containing the following parameters:
   *
   * - `productId`: productId
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  findStockCurrentByProductIdUsingGETResponse(params: QueryResourceService.FindStockCurrentByProductIdUsingGETParams): __Observable<__StrictHttpResponse<PageOfStockCurrent>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    (params.sort || []).forEach(val => {if (val != null) __params = __params.append('sort', val.toString())});
    if (params.size != null) __params = __params.set('size', params.size.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/findStockCurrentByProductId/${params.productId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PageOfStockCurrent>;
      })
    );
  }
  /**
   * @param params The `QueryResourceService.FindStockCurrentByProductIdUsingGETParams` containing the following parameters:
   *
   * - `productId`: productId
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  findStockCurrentByProductIdUsingGET(params: QueryResourceService.FindStockCurrentByProductIdUsingGETParams): __Observable<PageOfStockCurrent> {
    return this.findStockCurrentByProductIdUsingGETResponse(params).pipe(
      __map(_r => _r.body as PageOfStockCurrent)
    );
  }

  /**
   * @param params The `QueryResourceService.FindStockCurrentByProductNameUsingGETParams` containing the following parameters:
   *
   * - `name`: name
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  findStockCurrentByProductNameUsingGETResponse(params: QueryResourceService.FindStockCurrentByProductNameUsingGETParams): __Observable<__StrictHttpResponse<PageOfStockCurrent>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    (params.sort || []).forEach(val => {if (val != null) __params = __params.append('sort', val.toString())});
    if (params.size != null) __params = __params.set('size', params.size.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/findStockCurrentByProductName/${params.name}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PageOfStockCurrent>;
      })
    );
  }
  /**
   * @param params The `QueryResourceService.FindStockCurrentByProductNameUsingGETParams` containing the following parameters:
   *
   * - `name`: name
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  findStockCurrentByProductNameUsingGET(params: QueryResourceService.FindStockCurrentByProductNameUsingGETParams): __Observable<PageOfStockCurrent> {
    return this.findStockCurrentByProductNameUsingGETResponse(params).pipe(
      __map(_r => _r.body as PageOfStockCurrent)
    );
  }

  /**
   * @param params The `QueryResourceService.FindStockDiaryByProductIdUsingGETParams` containing the following parameters:
   *
   * - `productId`: productId
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  findStockDiaryByProductIdUsingGETResponse(params: QueryResourceService.FindStockDiaryByProductIdUsingGETParams): __Observable<__StrictHttpResponse<PageOfStockDiary>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    (params.sort || []).forEach(val => {if (val != null) __params = __params.append('sort', val.toString())});
    if (params.size != null) __params = __params.set('size', params.size.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/findStockDiaryByProductId/${params.productId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PageOfStockDiary>;
      })
    );
  }
  /**
   * @param params The `QueryResourceService.FindStockDiaryByProductIdUsingGETParams` containing the following parameters:
   *
   * - `productId`: productId
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  findStockDiaryByProductIdUsingGET(params: QueryResourceService.FindStockDiaryByProductIdUsingGETParams): __Observable<PageOfStockDiary> {
    return this.findStockDiaryByProductIdUsingGETResponse(params).pipe(
      __map(_r => _r.body as PageOfStockDiary)
    );
  }

  /**
   * @param storeId storeId
   * @return OK
   */
  findAllProductByStoreIdUsingGETResponse(storeId: string): __Observable<__StrictHttpResponse<Array<Product>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/findproducts/${storeId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<Product>>;
      })
    );
  }
  /**
   * @param storeId storeId
   * @return OK
   */
  findAllProductByStoreIdUsingGET(storeId: string): __Observable<Array<Product>> {
    return this.findAllProductByStoreIdUsingGETResponse(storeId).pipe(
      __map(_r => _r.body as Array<Product>)
    );
  }

  /**
   * @param params The `QueryResourceService.FindAllProductUsingGETParams` containing the following parameters:
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  findAllProductUsingGETResponse(params: QueryResourceService.FindAllProductUsingGETParams): __Observable<__StrictHttpResponse<Array<ProductDTO>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    (params.sort || []).forEach(val => {if (val != null) __params = __params.append('sort', val.toString())});
    if (params.size != null) __params = __params.set('size', params.size.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/products`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<ProductDTO>>;
      })
    );
  }
  /**
   * @param params The `QueryResourceService.FindAllProductUsingGETParams` containing the following parameters:
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  findAllProductUsingGET(params: QueryResourceService.FindAllProductUsingGETParams): __Observable<Array<ProductDTO>> {
    return this.findAllProductUsingGETResponse(params).pipe(
      __map(_r => _r.body as Array<ProductDTO>)
    );
  }

  /**
   * @return OK
   */
  exportProductsUsingGETResponse(): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/products/export`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'text'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<string>;
      })
    );
  }
  /**
   * @return OK
   */
  exportProductsUsingGET(): __Observable<string> {
    return this.exportProductsUsingGETResponse().pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * @param id id
   * @return OK
   */
  findProductUsingGETResponse(id: number): __Observable<__StrictHttpResponse<ProductDTO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/products/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ProductDTO>;
      })
    );
  }
  /**
   * @param id id
   * @return OK
   */
  findProductUsingGET(id: number): __Observable<ProductDTO> {
    return this.findProductUsingGETResponse(id).pipe(
      __map(_r => _r.body as ProductDTO)
    );
  }

  /**
   * @param storeId storeId
   * @return OK
   */
  findReviewsByStoreIdUsingGETResponse(storeId: string): __Observable<__StrictHttpResponse<Array<Review>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/review/${storeId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<Review>>;
      })
    );
  }
  /**
   * @param storeId storeId
   * @return OK
   */
  findReviewsByStoreIdUsingGET(storeId: string): __Observable<Array<Review>> {
    return this.findReviewsByStoreIdUsingGETResponse(storeId).pipe(
      __map(_r => _r.body as Array<Review>)
    );
  }

  /**
   * @param params The `QueryResourceService.FindAllReviewsUsingGETParams` containing the following parameters:
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  findAllReviewsUsingGETResponse(params: QueryResourceService.FindAllReviewsUsingGETParams): __Observable<__StrictHttpResponse<Array<Review>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    (params.sort || []).forEach(val => {if (val != null) __params = __params.append('sort', val.toString())});
    if (params.size != null) __params = __params.set('size', params.size.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/reviews`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<Review>>;
      })
    );
  }
  /**
   * @param params The `QueryResourceService.FindAllReviewsUsingGETParams` containing the following parameters:
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  findAllReviewsUsingGET(params: QueryResourceService.FindAllReviewsUsingGETParams): __Observable<Array<Review>> {
    return this.findAllReviewsUsingGETResponse(params).pipe(
      __map(_r => _r.body as Array<Review>)
    );
  }

  /**
   * @param params The `QueryResourceService.FindSalesUsingGETParams` containing the following parameters:
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  findSalesUsingGETResponse(params: QueryResourceService.FindSalesUsingGETParams): __Observable<__StrictHttpResponse<PageOfSale>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    (params.sort || []).forEach(val => {if (val != null) __params = __params.append('sort', val.toString())});
    if (params.size != null) __params = __params.set('size', params.size.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/sales`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PageOfSale>;
      })
    );
  }
  /**
   * @param params The `QueryResourceService.FindSalesUsingGETParams` containing the following parameters:
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  findSalesUsingGET(params: QueryResourceService.FindSalesUsingGETParams): __Observable<PageOfSale> {
    return this.findSalesUsingGETResponse(params).pipe(
      __map(_r => _r.body as PageOfSale)
    );
  }

  /**
   * @param id id
   * @return OK
   */
  findSaleByIdUsingGETResponse(id: number): __Observable<__StrictHttpResponse<SaleDTO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/sales/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<SaleDTO>;
      })
    );
  }
  /**
   * @param id id
   * @return OK
   */
  findSaleByIdUsingGET(id: number): __Observable<SaleDTO> {
    return this.findSaleByIdUsingGETResponse(id).pipe(
      __map(_r => _r.body as SaleDTO)
    );
  }

  /**
   * @param params The `QueryResourceService.SearchStockCurrentsUsingGETParams` containing the following parameters:
   *
   * - `searchTerm`: searchTerm
   *
   * - `sort`: sort
   *
   * - `size`: size
   *
   * - `page`: page
   *
   * @return OK
   */
  searchStockCurrentsUsingGETResponse(params: QueryResourceService.SearchStockCurrentsUsingGETParams): __Observable<__StrictHttpResponse<Array<StockCurrentDTO>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    (params.sort || []).forEach(val => {if (val != null) __params = __params.append('sort', val.toString())});
    if (params.size != null) __params = __params.set('size', params.size.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/stock-current/${params.searchTerm}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<StockCurrentDTO>>;
      })
    );
  }
  /**
   * @param params The `QueryResourceService.SearchStockCurrentsUsingGETParams` containing the following parameters:
   *
   * - `searchTerm`: searchTerm
   *
   * - `sort`: sort
   *
   * - `size`: size
   *
   * - `page`: page
   *
   * @return OK
   */
  searchStockCurrentsUsingGET(params: QueryResourceService.SearchStockCurrentsUsingGETParams): __Observable<Array<StockCurrentDTO>> {
    return this.searchStockCurrentsUsingGETResponse(params).pipe(
      __map(_r => _r.body as Array<StockCurrentDTO>)
    );
  }

  /**
   * @param params The `QueryResourceService.GetAllStockCurrentsUsingGETParams` containing the following parameters:
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  getAllStockCurrentsUsingGETResponse(params: QueryResourceService.GetAllStockCurrentsUsingGETParams): __Observable<__StrictHttpResponse<Array<StockCurrent>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    (params.sort || []).forEach(val => {if (val != null) __params = __params.append('sort', val.toString())});
    if (params.size != null) __params = __params.set('size', params.size.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/stock-currents`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<StockCurrent>>;
      })
    );
  }
  /**
   * @param params The `QueryResourceService.GetAllStockCurrentsUsingGETParams` containing the following parameters:
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  getAllStockCurrentsUsingGET(params: QueryResourceService.GetAllStockCurrentsUsingGETParams): __Observable<Array<StockCurrent>> {
    return this.getAllStockCurrentsUsingGETResponse(params).pipe(
      __map(_r => _r.body as Array<StockCurrent>)
    );
  }

  /**
   * @param id id
   * @return OK
   */
  findOneStockCurrentUsingGETResponse(id: number): __Observable<__StrictHttpResponse<StockCurrentDTO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/stock-currents/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<StockCurrentDTO>;
      })
    );
  }
  /**
   * @param id id
   * @return OK
   */
  findOneStockCurrentUsingGET(id: number): __Observable<StockCurrentDTO> {
    return this.findOneStockCurrentUsingGETResponse(id).pipe(
      __map(_r => _r.body as StockCurrentDTO)
    );
  }

  /**
   * @param params The `QueryResourceService.FindAllStockDiariesUsingGETParams` containing the following parameters:
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  findAllStockDiariesUsingGETResponse(params: QueryResourceService.FindAllStockDiariesUsingGETParams): __Observable<__StrictHttpResponse<Array<StockDiary>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    (params.sort || []).forEach(val => {if (val != null) __params = __params.append('sort', val.toString())});
    if (params.size != null) __params = __params.set('size', params.size.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/stock-diaries`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<StockDiary>>;
      })
    );
  }
  /**
   * @param params The `QueryResourceService.FindAllStockDiariesUsingGETParams` containing the following parameters:
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  findAllStockDiariesUsingGET(params: QueryResourceService.FindAllStockDiariesUsingGETParams): __Observable<Array<StockDiary>> {
    return this.findAllStockDiariesUsingGETResponse(params).pipe(
      __map(_r => _r.body as Array<StockDiary>)
    );
  }

  /**
   * @param id id
   * @return OK
   */
  findOneStockDiaryUsingGETResponse(id: number): __Observable<__StrictHttpResponse<StockDiaryDTO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/stock-diaries/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<StockDiaryDTO>;
      })
    );
  }
  /**
   * @param id id
   * @return OK
   */
  findOneStockDiaryUsingGET(id: number): __Observable<StockDiaryDTO> {
    return this.findOneStockDiaryUsingGETResponse(id).pipe(
      __map(_r => _r.body as StockDiaryDTO)
    );
  }

  /**
   * @param params The `QueryResourceService.SearchStockDiariesUsingGETParams` containing the following parameters:
   *
   * - `searchTerm`: searchTerm
   *
   * - `sort`: sort
   *
   * - `size`: size
   *
   * - `page`: page
   *
   * @return OK
   */
  searchStockDiariesUsingGETResponse(params: QueryResourceService.SearchStockDiariesUsingGETParams): __Observable<__StrictHttpResponse<Array<StockDiaryDTO>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    (params.sort || []).forEach(val => {if (val != null) __params = __params.append('sort', val.toString())});
    if (params.size != null) __params = __params.set('size', params.size.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/stock-diary/${params.searchTerm}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<StockDiaryDTO>>;
      })
    );
  }
  /**
   * @param params The `QueryResourceService.SearchStockDiariesUsingGETParams` containing the following parameters:
   *
   * - `searchTerm`: searchTerm
   *
   * - `sort`: sort
   *
   * - `size`: size
   *
   * - `page`: page
   *
   * @return OK
   */
  searchStockDiariesUsingGET(params: QueryResourceService.SearchStockDiariesUsingGETParams): __Observable<Array<StockDiaryDTO>> {
    return this.searchStockDiariesUsingGETResponse(params).pipe(
      __map(_r => _r.body as Array<StockDiaryDTO>)
    );
  }

  /**
   * @param params The `QueryResourceService.FindAllStockLinesUsingGETParams` containing the following parameters:
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  findAllStockLinesUsingGETResponse(params: QueryResourceService.FindAllStockLinesUsingGETParams): __Observable<__StrictHttpResponse<Array<StockLine>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    (params.sort || []).forEach(val => {if (val != null) __params = __params.append('sort', val.toString())});
    if (params.size != null) __params = __params.set('size', params.size.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/stocklines`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<StockLine>>;
      })
    );
  }
  /**
   * @param params The `QueryResourceService.FindAllStockLinesUsingGETParams` containing the following parameters:
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  findAllStockLinesUsingGET(params: QueryResourceService.FindAllStockLinesUsingGETParams): __Observable<Array<StockLine>> {
    return this.findAllStockLinesUsingGETResponse(params).pipe(
      __map(_r => _r.body as Array<StockLine>)
    );
  }

  /**
   * @param regNo regNo
   * @return OK
   */
  findStoreByRegisterNumberUsingGETResponse(regNo: string): __Observable<__StrictHttpResponse<Store>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/store/${regNo}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Store>;
      })
    );
  }
  /**
   * @param regNo regNo
   * @return OK
   */
  findStoreByRegisterNumberUsingGET(regNo: string): __Observable<Store> {
    return this.findStoreByRegisterNumberUsingGETResponse(regNo).pipe(
      __map(_r => _r.body as Store)
    );
  }

  /**
   * @param params The `QueryResourceService.FindAllStoresUsingGETParams` containing the following parameters:
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  findAllStoresUsingGETResponse(params: QueryResourceService.FindAllStoresUsingGETParams): __Observable<__StrictHttpResponse<Array<Store>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    (params.sort || []).forEach(val => {if (val != null) __params = __params.append('sort', val.toString())});
    if (params.size != null) __params = __params.set('size', params.size.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/stores`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<Store>>;
      })
    );
  }
  /**
   * @param params The `QueryResourceService.FindAllStoresUsingGETParams` containing the following parameters:
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  findAllStoresUsingGET(params: QueryResourceService.FindAllStoresUsingGETParams): __Observable<Array<Store>> {
    return this.findAllStoresUsingGETResponse(params).pipe(
      __map(_r => _r.body as Array<Store>)
    );
  }

  /**
   * @param params The `QueryResourceService.FindAllTicketlinesUsingGETParams` containing the following parameters:
   *
   * - `sort`: sort
   *
   * - `size`: size
   *
   * - `page`: page
   *
   * @return OK
   */
  findAllTicketlinesUsingGETResponse(params: QueryResourceService.FindAllTicketlinesUsingGETParams): __Observable<__StrictHttpResponse<Array<TicketLineDTO>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    (params.sort || []).forEach(val => {if (val != null) __params = __params.append('sort', val.toString())});
    if (params.size != null) __params = __params.set('size', params.size.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/ticket-lines`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<TicketLineDTO>>;
      })
    );
  }
  /**
   * @param params The `QueryResourceService.FindAllTicketlinesUsingGETParams` containing the following parameters:
   *
   * - `sort`: sort
   *
   * - `size`: size
   *
   * - `page`: page
   *
   * @return OK
   */
  findAllTicketlinesUsingGET(params: QueryResourceService.FindAllTicketlinesUsingGETParams): __Observable<Array<TicketLineDTO>> {
    return this.findAllTicketlinesUsingGETResponse(params).pipe(
      __map(_r => _r.body as Array<TicketLineDTO>)
    );
  }

  /**
   * @param id id
   * @return OK
   */
  findOneTicketLinesUsingGETResponse(id: number): __Observable<__StrictHttpResponse<TicketLineDTO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/ticket-lines/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<TicketLineDTO>;
      })
    );
  }
  /**
   * @param id id
   * @return OK
   */
  findOneTicketLinesUsingGET(id: number): __Observable<TicketLineDTO> {
    return this.findOneTicketLinesUsingGETResponse(id).pipe(
      __map(_r => _r.body as TicketLineDTO)
    );
  }

  /**
   * @param saleId saleId
   * @return OK
   */
  findAllTicketLinesBySaleIdUsingGETResponse(saleId: number): __Observable<__StrictHttpResponse<Array<TicketLine>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/ticket-lines/${saleId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<TicketLine>>;
      })
    );
  }
  /**
   * @param saleId saleId
   * @return OK
   */
  findAllTicketLinesBySaleIdUsingGET(saleId: number): __Observable<Array<TicketLine>> {
    return this.findAllTicketLinesBySaleIdUsingGETResponse(saleId).pipe(
      __map(_r => _r.body as Array<TicketLine>)
    );
  }

  /**
   * @param params The `QueryResourceService.FindAllUserRatingsUsingGETParams` containing the following parameters:
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  findAllUserRatingsUsingGETResponse(params: QueryResourceService.FindAllUserRatingsUsingGETParams): __Observable<__StrictHttpResponse<Array<UserRating>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    (params.sort || []).forEach(val => {if (val != null) __params = __params.append('sort', val.toString())});
    if (params.size != null) __params = __params.set('size', params.size.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/user-ratings`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<UserRating>>;
      })
    );
  }
  /**
   * @param params The `QueryResourceService.FindAllUserRatingsUsingGETParams` containing the following parameters:
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  findAllUserRatingsUsingGET(params: QueryResourceService.FindAllUserRatingsUsingGETParams): __Observable<Array<UserRating>> {
    return this.findAllUserRatingsUsingGETResponse(params).pipe(
      __map(_r => _r.body as Array<UserRating>)
    );
  }
}

module QueryResourceService {

  /**
   * Parameters for findAllCategoriesWithOutImageUsingGET
   */
  export interface FindAllCategoriesWithOutImageUsingGETParams {

    /**
     * sort
     */
    sort?: Array<string>;

    /**
     * size
     */
    size?: number;

    /**
     * page
     */
    page?: number;
  }

  /**
   * Parameters for findAllCategoriesUsingGET
   */
  export interface FindAllCategoriesUsingGETParams {

    /**
     * sort
     */
    sort?: Array<string>;

    /**
     * size
     */
    size?: number;

    /**
     * page
     */
    page?: number;
  }

  /**
   * Parameters for findAllCustomersUsingGET
   */
  export interface FindAllCustomersUsingGETParams {

    /**
     * searchTerm
     */
    searchTerm: string;

    /**
     * Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     */
    sort?: Array<string>;

    /**
     * Size of a page
     */
    size?: number;

    /**
     * Page number of the requested page
     */
    page?: number;
  }

  /**
   * Parameters for findAllCustomersWithoutSearchUsingGET
   */
  export interface FindAllCustomersWithoutSearchUsingGETParams {

    /**
     * Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     */
    sort?: Array<string>;

    /**
     * Size of a page
     */
    size?: number;

    /**
     * Page number of the requested page
     */
    page?: number;
  }

  /**
   * Parameters for findAllProductsUsingGET
   */
  export interface FindAllProductsUsingGETParams {

    /**
     * Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     */
    sort?: Array<string>;

    /**
     * Size of a page
     */
    size?: number;

    /**
     * Page number of the requested page
     */
    page?: number;
  }

  /**
   * Parameters for findAllUomUsingGET
   */
  export interface FindAllUomUsingGETParams {

    /**
     * sort
     */
    sort?: Array<string>;

    /**
     * size
     */
    size?: number;

    /**
     * page
     */
    page?: number;
  }

  /**
   * Parameters for findProductByCategoryIdAndUserIdUsingGET
   */
  export interface FindProductByCategoryIdAndUserIdUsingGETParams {

    /**
     * userId
     */
    userId: string;

    /**
     * categoryId
     */
    categoryId: number;

    /**
     * Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     */
    sort?: Array<string>;

    /**
     * Size of a page
     */
    size?: number;

    /**
     * Page number of the requested page
     */
    page?: number;
  }

  /**
   * Parameters for findAllProductBySearchTermUsingGET
   */
  export interface FindAllProductBySearchTermUsingGETParams {

    /**
     * searchTerm
     */
    searchTerm: string;

    /**
     * Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     */
    sort?: Array<string>;

    /**
     * Size of a page
     */
    size?: number;

    /**
     * Page number of the requested page
     */
    page?: number;
  }

  /**
   * Parameters for findStockCurrentByProductIdUsingGET
   */
  export interface FindStockCurrentByProductIdUsingGETParams {

    /**
     * productId
     */
    productId: number;

    /**
     * Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     */
    sort?: Array<string>;

    /**
     * Size of a page
     */
    size?: number;

    /**
     * Page number of the requested page
     */
    page?: number;
  }

  /**
   * Parameters for findStockCurrentByProductNameUsingGET
   */
  export interface FindStockCurrentByProductNameUsingGETParams {

    /**
     * name
     */
    name: string;

    /**
     * Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     */
    sort?: Array<string>;

    /**
     * Size of a page
     */
    size?: number;

    /**
     * Page number of the requested page
     */
    page?: number;
  }

  /**
   * Parameters for findStockDiaryByProductIdUsingGET
   */
  export interface FindStockDiaryByProductIdUsingGETParams {

    /**
     * productId
     */
    productId: number;

    /**
     * Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     */
    sort?: Array<string>;

    /**
     * Size of a page
     */
    size?: number;

    /**
     * Page number of the requested page
     */
    page?: number;
  }

  /**
   * Parameters for findAllProductUsingGET
   */
  export interface FindAllProductUsingGETParams {

    /**
     * Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     */
    sort?: Array<string>;

    /**
     * Size of a page
     */
    size?: number;

    /**
     * Page number of the requested page
     */
    page?: number;
  }

  /**
   * Parameters for findAllReviewsUsingGET
   */
  export interface FindAllReviewsUsingGETParams {

    /**
     * Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     */
    sort?: Array<string>;

    /**
     * Size of a page
     */
    size?: number;

    /**
     * Page number of the requested page
     */
    page?: number;
  }

  /**
   * Parameters for findSalesUsingGET
   */
  export interface FindSalesUsingGETParams {

    /**
     * Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     */
    sort?: Array<string>;

    /**
     * Size of a page
     */
    size?: number;

    /**
     * Page number of the requested page
     */
    page?: number;
  }

  /**
   * Parameters for searchStockCurrentsUsingGET
   */
  export interface SearchStockCurrentsUsingGETParams {

    /**
     * searchTerm
     */
    searchTerm: string;

    /**
     * sort
     */
    sort?: Array<string>;

    /**
     * size
     */
    size?: number;

    /**
     * page
     */
    page?: number;
  }

  /**
   * Parameters for getAllStockCurrentsUsingGET
   */
  export interface GetAllStockCurrentsUsingGETParams {

    /**
     * Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     */
    sort?: Array<string>;

    /**
     * Size of a page
     */
    size?: number;

    /**
     * Page number of the requested page
     */
    page?: number;
  }

  /**
   * Parameters for findAllStockDiariesUsingGET
   */
  export interface FindAllStockDiariesUsingGETParams {

    /**
     * Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     */
    sort?: Array<string>;

    /**
     * Size of a page
     */
    size?: number;

    /**
     * Page number of the requested page
     */
    page?: number;
  }

  /**
   * Parameters for searchStockDiariesUsingGET
   */
  export interface SearchStockDiariesUsingGETParams {

    /**
     * searchTerm
     */
    searchTerm: string;

    /**
     * sort
     */
    sort?: Array<string>;

    /**
     * size
     */
    size?: number;

    /**
     * page
     */
    page?: number;
  }

  /**
   * Parameters for findAllStockLinesUsingGET
   */
  export interface FindAllStockLinesUsingGETParams {

    /**
     * Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     */
    sort?: Array<string>;

    /**
     * Size of a page
     */
    size?: number;

    /**
     * Page number of the requested page
     */
    page?: number;
  }

  /**
   * Parameters for findAllStoresUsingGET
   */
  export interface FindAllStoresUsingGETParams {

    /**
     * Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     */
    sort?: Array<string>;

    /**
     * Size of a page
     */
    size?: number;

    /**
     * Page number of the requested page
     */
    page?: number;
  }

  /**
   * Parameters for findAllTicketlinesUsingGET
   */
  export interface FindAllTicketlinesUsingGETParams {

    /**
     * sort
     */
    sort?: Array<string>;

    /**
     * size
     */
    size?: number;

    /**
     * page
     */
    page?: number;
  }

  /**
   * Parameters for findAllUserRatingsUsingGET
   */
  export interface FindAllUserRatingsUsingGETParams {

    /**
     * Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     */
    sort?: Array<string>;

    /**
     * Size of a page
     */
    size?: number;

    /**
     * Page number of the requested page
     */
    page?: number;
  }
}

export { QueryResourceService }
