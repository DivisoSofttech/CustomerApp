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
import { PageOfType } from '../models/page-of-type';
import { CategoryDTO } from '../models/category-dto';
import { PageOfCustomer } from '../models/page-of-customer';
import { PageOfProduct } from '../models/page-of-product';
import { Entry } from '../models/entry';
import { PageOfCategory } from '../models/page-of-category';
import { PageOfRatingReview } from '../models/page-of-rating-review';
import { PageOfStockCurrent } from '../models/page-of-stock-current';
import { StockCurrent } from '../models/stock-current';
import { PageOfStore } from '../models/page-of-store';
import { Product } from '../models/product';
import { OrderMaster } from '../models/order-master';
import { PageOfOrder } from '../models/page-of-order';
import { ProductDTO } from '../models/product-dto';
import { UserRating } from '../models/user-rating';
import { Review } from '../models/review';
import { StockCurrentDTO } from '../models/stock-current-dto';
import { StockDiaryDTO } from '../models/stock-diary-dto';
import { StockLine } from '../models/stock-line';
import { Store } from '../models/store';

/**
 * Query Resource
 */
@Injectable({
  providedIn: 'root',
})
class QueryResourceService extends __BaseService {
  static readonly findContactByIdUsingGETPath = '/api/query/contacts/{id}';
  static readonly findCustomerByReferenceUsingGETPath = '/api/query/customers/findByReference/{reference}';
  static readonly findCustomerByIdUsingGETPath = '/api/query/customers/{id}';
  static readonly findAllDeliveryTypesByStoreIdUsingGETPath = '/api/query/deliveryTypes/{storeId}';
  static readonly findAllCategoriesWithOutImageUsingGETPath = '/api/query/findAllCategoriesWithOutImage';
  static readonly findAllCategoriesUsingGETPath = '/api/query/findAllCateogories';
  static readonly findAllCustomersWithoutSearchUsingGETPath = '/api/query/findAllCustomers';
  static readonly findAllProductsUsingGETPath = '/api/query/findAllProducts';
  static readonly findCategoryAndCountUsingGETPath = '/api/query/findCategoryAndCount';
  static readonly findCategoryByStoreIdUsingGETPath = '/api/query/findCategoryByStoreId/{userId}';
  static readonly findCategoryIdByUserIdUsingGETPath = '/api/query/findCategoryByUserId/{userId}';
  static readonly findProductByCategoryIdAndUserIdUsingGETPath = '/api/query/findProductByCategoryIdAndUserId/{categoryId}/{userId}';
  static readonly findAllProductBySearchTermUsingGETPath = '/api/query/findProductBySearchTerm/{searchTerm}';
  static readonly findProductByStoreIdAndCategoryNameUsingGETPath = '/api/query/findProductByStoreIdAndCategoryName/{userId}/{categoryId}';
  static readonly findRatingReviewByStoreidAndCustomerNameUsingGETPath = '/api/query/findRatingReview/{storeId}';
  static readonly findStockCurrentByProductIdUsingGETPath = '/api/query/findStockCurrentByProductId/{productId}';
  static readonly findStockCurrentByProductNameUsingGETPath = '/api/query/findStockCurrentByProductName/{name}';
  static readonly findProductByStoreIdAndCategoryIdUsingGETPath = '/api/query/findStockCurrentByStoreIdAndCategoryId/{userId}/{categoryId}';
  static readonly findAllStockCurrentByProductNameStoreIdUsingGETPath = '/api/query/findStocks/{name}/{storeId}';
  static readonly findStoreBySearchTermUsingGETPath = '/api/query/findStore/{searchTerm}';
  static readonly findStoreByTypeNameUsingGETPath = '/api/query/findStoreByTypeName/{name}';
  static readonly findAllProductByStoreIdUsingGETPath = '/api/query/findproducts/{storeId}';
  static readonly findOrderMasterByOrderIdUsingGETPath = '/api/query/orderMaster/{orderId}';
  static readonly findOrdersByCustomerIdUsingGETPath = '/api/query/ordersByCustomerId/{customerId}';
  static readonly findAndSortProductByPriceUsingGETPath = '/api/query/productByPrice/{from}/{to}';
  static readonly findAllProductUsingGETPath = '/api/query/products';
  static readonly findProductUsingGETPath = '/api/query/products/{id}';
  static readonly findRatingCountUsingGETPath = '/api/query/rating-count';
  static readonly findRatingByStoreIdUsingGETPath = '/api/query/rating/{storeId}';
  static readonly findRatingByStoreIdAndCustomerNameUsingGETPath = '/api/query/rating/{storeId}/{name}';
  static readonly findRatingByCustomerNameUsingGETPath = '/api/query/ratingByName/{name}';
  static readonly findReviewByStoreIdAndCustomerNameUsingGETPath = '/api/query/review/{storeId}/{name}';
  static readonly findReviewsByStoreIdUsingGETPath = '/api/query/review/{userName}';
  static readonly findAllReviewsUsingGETPath = '/api/query/reviews';
  static readonly searchStockCurrentsUsingGETPath = '/api/query/stock-current/{searchTerm}';
  static readonly getAllStockCurrentsUsingGETPath = '/api/query/stock-currents';
  static readonly findOneStockCurrentUsingGETPath = '/api/query/stock-currents/{id}';
  static readonly findOneStockDiaryUsingGETPath = '/api/query/stock-diaries/{id}';
  static readonly searchStockDiariesUsingGETPath = '/api/query/stock-diary/{searchTerm}';
  static readonly findStockCurrentByStoreIdUsingGETPath = '/api/query/stockcurrent/{storeId}';
  static readonly findAllStockLinesUsingGETPath = '/api/query/stocklines';
  static readonly findStoreByRegisterNumberUsingGETPath = '/api/query/store/{regNo}';
  static readonly findStoreByRatingUsingGETPath = '/api/query/storeByRating';
  static readonly findAllStoresUsingGETPath = '/api/query/stores';
  static readonly findStoresByTypeUsingGETPath = '/api/query/storesByDeliveryType/{deliveryType}';
  static readonly findUserRatingByRegNoUsingGETPath = '/api/query/user-rating/{regNo}';
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
   * @param reference reference
   * @return OK
   */
  findCustomerByReferenceUsingGETResponse(reference: string): __Observable<__StrictHttpResponse<CustomerDTO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/customers/findByReference/${reference}`,
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
   * @param reference reference
   * @return OK
   */
  findCustomerByReferenceUsingGET(reference: string): __Observable<CustomerDTO> {
    return this.findCustomerByReferenceUsingGETResponse(reference).pipe(
      __map(_r => _r.body as CustomerDTO)
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
   * @param params The `QueryResourceService.FindAllDeliveryTypesByStoreIdUsingGETParams` containing the following parameters:
   *
   * - `storeId`: storeId
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  findAllDeliveryTypesByStoreIdUsingGETResponse(params: QueryResourceService.FindAllDeliveryTypesByStoreIdUsingGETParams): __Observable<__StrictHttpResponse<PageOfType>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    (params.sort || []).forEach(val => {if (val != null) __params = __params.append('sort', val.toString())});
    if (params.size != null) __params = __params.set('size', params.size.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/deliveryTypes/${params.storeId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PageOfType>;
      })
    );
  }
  /**
   * @param params The `QueryResourceService.FindAllDeliveryTypesByStoreIdUsingGETParams` containing the following parameters:
   *
   * - `storeId`: storeId
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  findAllDeliveryTypesByStoreIdUsingGET(params: QueryResourceService.FindAllDeliveryTypesByStoreIdUsingGETParams): __Observable<PageOfType> {
    return this.findAllDeliveryTypesByStoreIdUsingGETResponse(params).pipe(
      __map(_r => _r.body as PageOfType)
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
   * @param params The `QueryResourceService.FindCategoryAndCountUsingGETParams` containing the following parameters:
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  findCategoryAndCountUsingGETResponse(params: QueryResourceService.FindCategoryAndCountUsingGETParams): __Observable<__StrictHttpResponse<Array<Entry>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    (params.sort || []).forEach(val => {if (val != null) __params = __params.append('sort', val.toString())});
    if (params.size != null) __params = __params.set('size', params.size.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/findCategoryAndCount`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<Entry>>;
      })
    );
  }
  /**
   * @param params The `QueryResourceService.FindCategoryAndCountUsingGETParams` containing the following parameters:
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  findCategoryAndCountUsingGET(params: QueryResourceService.FindCategoryAndCountUsingGETParams): __Observable<Array<Entry>> {
    return this.findCategoryAndCountUsingGETResponse(params).pipe(
      __map(_r => _r.body as Array<Entry>)
    );
  }

  /**
   * @param params The `QueryResourceService.FindCategoryByStoreIdUsingGETParams` containing the following parameters:
   *
   * - `userId`: userId
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  findCategoryByStoreIdUsingGETResponse(params: QueryResourceService.FindCategoryByStoreIdUsingGETParams): __Observable<__StrictHttpResponse<PageOfCategory>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    (params.sort || []).forEach(val => {if (val != null) __params = __params.append('sort', val.toString())});
    if (params.size != null) __params = __params.set('size', params.size.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/findCategoryByStoreId/${params.userId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PageOfCategory>;
      })
    );
  }
  /**
   * @param params The `QueryResourceService.FindCategoryByStoreIdUsingGETParams` containing the following parameters:
   *
   * - `userId`: userId
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  findCategoryByStoreIdUsingGET(params: QueryResourceService.FindCategoryByStoreIdUsingGETParams): __Observable<PageOfCategory> {
    return this.findCategoryByStoreIdUsingGETResponse(params).pipe(
      __map(_r => _r.body as PageOfCategory)
    );
  }

  /**
   * @param params The `QueryResourceService.FindCategoryIdByUserIdUsingGETParams` containing the following parameters:
   *
   * - `userId`: userId
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  findCategoryIdByUserIdUsingGETResponse(params: QueryResourceService.FindCategoryIdByUserIdUsingGETParams): __Observable<__StrictHttpResponse<PageOfCategory>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    (params.sort || []).forEach(val => {if (val != null) __params = __params.append('sort', val.toString())});
    if (params.size != null) __params = __params.set('size', params.size.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/findCategoryByUserId/${params.userId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PageOfCategory>;
      })
    );
  }
  /**
   * @param params The `QueryResourceService.FindCategoryIdByUserIdUsingGETParams` containing the following parameters:
   *
   * - `userId`: userId
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  findCategoryIdByUserIdUsingGET(params: QueryResourceService.FindCategoryIdByUserIdUsingGETParams): __Observable<PageOfCategory> {
    return this.findCategoryIdByUserIdUsingGETResponse(params).pipe(
      __map(_r => _r.body as PageOfCategory)
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
   * @param params The `QueryResourceService.FindProductByStoreIdAndCategoryNameUsingGETParams` containing the following parameters:
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
  findProductByStoreIdAndCategoryNameUsingGETResponse(params: QueryResourceService.FindProductByStoreIdAndCategoryNameUsingGETParams): __Observable<__StrictHttpResponse<PageOfProduct>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    (params.sort || []).forEach(val => {if (val != null) __params = __params.append('sort', val.toString())});
    if (params.size != null) __params = __params.set('size', params.size.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/findProductByStoreIdAndCategoryName/${params.userId}/${params.categoryId}`,
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
   * @param params The `QueryResourceService.FindProductByStoreIdAndCategoryNameUsingGETParams` containing the following parameters:
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
  findProductByStoreIdAndCategoryNameUsingGET(params: QueryResourceService.FindProductByStoreIdAndCategoryNameUsingGETParams): __Observable<PageOfProduct> {
    return this.findProductByStoreIdAndCategoryNameUsingGETResponse(params).pipe(
      __map(_r => _r.body as PageOfProduct)
    );
  }

  /**
   * @param params The `QueryResourceService.FindRatingReviewByStoreidAndCustomerNameUsingGETParams` containing the following parameters:
   *
   * - `storeId`: storeId
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  findRatingReviewByStoreidAndCustomerNameUsingGETResponse(params: QueryResourceService.FindRatingReviewByStoreidAndCustomerNameUsingGETParams): __Observable<__StrictHttpResponse<PageOfRatingReview>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    (params.sort || []).forEach(val => {if (val != null) __params = __params.append('sort', val.toString())});
    if (params.size != null) __params = __params.set('size', params.size.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/findRatingReview/${params.storeId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PageOfRatingReview>;
      })
    );
  }
  /**
   * @param params The `QueryResourceService.FindRatingReviewByStoreidAndCustomerNameUsingGETParams` containing the following parameters:
   *
   * - `storeId`: storeId
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  findRatingReviewByStoreidAndCustomerNameUsingGET(params: QueryResourceService.FindRatingReviewByStoreidAndCustomerNameUsingGETParams): __Observable<PageOfRatingReview> {
    return this.findRatingReviewByStoreidAndCustomerNameUsingGETResponse(params).pipe(
      __map(_r => _r.body as PageOfRatingReview)
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
   * @param params The `QueryResourceService.FindProductByStoreIdAndCategoryIdUsingGETParams` containing the following parameters:
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
  findProductByStoreIdAndCategoryIdUsingGETResponse(params: QueryResourceService.FindProductByStoreIdAndCategoryIdUsingGETParams): __Observable<__StrictHttpResponse<Array<StockCurrent>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    (params.sort || []).forEach(val => {if (val != null) __params = __params.append('sort', val.toString())});
    if (params.size != null) __params = __params.set('size', params.size.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/findStockCurrentByStoreIdAndCategoryId/${params.userId}/${params.categoryId}`,
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
   * @param params The `QueryResourceService.FindProductByStoreIdAndCategoryIdUsingGETParams` containing the following parameters:
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
  findProductByStoreIdAndCategoryIdUsingGET(params: QueryResourceService.FindProductByStoreIdAndCategoryIdUsingGETParams): __Observable<Array<StockCurrent>> {
    return this.findProductByStoreIdAndCategoryIdUsingGETResponse(params).pipe(
      __map(_r => _r.body as Array<StockCurrent>)
    );
  }

  /**
   * @param params The `QueryResourceService.FindAllStockCurrentByProductNameStoreIdUsingGETParams` containing the following parameters:
   *
   * - `storeId`: storeId
   *
   * - `name`: name
   *
   * @return OK
   */
  findAllStockCurrentByProductNameStoreIdUsingGETResponse(params: QueryResourceService.FindAllStockCurrentByProductNameStoreIdUsingGETParams): __Observable<__StrictHttpResponse<Array<StockCurrent>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/findStocks/${params.name}/${params.storeId}`,
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
   * @param params The `QueryResourceService.FindAllStockCurrentByProductNameStoreIdUsingGETParams` containing the following parameters:
   *
   * - `storeId`: storeId
   *
   * - `name`: name
   *
   * @return OK
   */
  findAllStockCurrentByProductNameStoreIdUsingGET(params: QueryResourceService.FindAllStockCurrentByProductNameStoreIdUsingGETParams): __Observable<Array<StockCurrent>> {
    return this.findAllStockCurrentByProductNameStoreIdUsingGETResponse(params).pipe(
      __map(_r => _r.body as Array<StockCurrent>)
    );
  }

  /**
   * @param params The `QueryResourceService.FindStoreBySearchTermUsingGETParams` containing the following parameters:
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
  findStoreBySearchTermUsingGETResponse(params: QueryResourceService.FindStoreBySearchTermUsingGETParams): __Observable<__StrictHttpResponse<PageOfStore>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    (params.sort || []).forEach(val => {if (val != null) __params = __params.append('sort', val.toString())});
    if (params.size != null) __params = __params.set('size', params.size.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/findStore/${params.searchTerm}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PageOfStore>;
      })
    );
  }
  /**
   * @param params The `QueryResourceService.FindStoreBySearchTermUsingGETParams` containing the following parameters:
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
  findStoreBySearchTermUsingGET(params: QueryResourceService.FindStoreBySearchTermUsingGETParams): __Observable<PageOfStore> {
    return this.findStoreBySearchTermUsingGETResponse(params).pipe(
      __map(_r => _r.body as PageOfStore)
    );
  }

  /**
   * @param params The `QueryResourceService.FindStoreByTypeNameUsingGETParams` containing the following parameters:
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
  findStoreByTypeNameUsingGETResponse(params: QueryResourceService.FindStoreByTypeNameUsingGETParams): __Observable<__StrictHttpResponse<PageOfStore>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    (params.sort || []).forEach(val => {if (val != null) __params = __params.append('sort', val.toString())});
    if (params.size != null) __params = __params.set('size', params.size.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/findStoreByTypeName/${params.name}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PageOfStore>;
      })
    );
  }
  /**
   * @param params The `QueryResourceService.FindStoreByTypeNameUsingGETParams` containing the following parameters:
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
  findStoreByTypeNameUsingGET(params: QueryResourceService.FindStoreByTypeNameUsingGETParams): __Observable<PageOfStore> {
    return this.findStoreByTypeNameUsingGETResponse(params).pipe(
      __map(_r => _r.body as PageOfStore)
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
   * @param orderId orderId
   * @return OK
   */
  findOrderMasterByOrderIdUsingGETResponse(orderId: string): __Observable<__StrictHttpResponse<OrderMaster>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/orderMaster/${orderId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<OrderMaster>;
      })
    );
  }
  /**
   * @param orderId orderId
   * @return OK
   */
  findOrderMasterByOrderIdUsingGET(orderId: string): __Observable<OrderMaster> {
    return this.findOrderMasterByOrderIdUsingGETResponse(orderId).pipe(
      __map(_r => _r.body as OrderMaster)
    );
  }

  /**
   * @param params The `QueryResourceService.FindOrdersByCustomerIdUsingGETParams` containing the following parameters:
   *
   * - `customerId`: customerId
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  findOrdersByCustomerIdUsingGETResponse(params: QueryResourceService.FindOrdersByCustomerIdUsingGETParams): __Observable<__StrictHttpResponse<PageOfOrder>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    (params.sort || []).forEach(val => {if (val != null) __params = __params.append('sort', val.toString())});
    if (params.size != null) __params = __params.set('size', params.size.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/ordersByCustomerId/${params.customerId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PageOfOrder>;
      })
    );
  }
  /**
   * @param params The `QueryResourceService.FindOrdersByCustomerIdUsingGETParams` containing the following parameters:
   *
   * - `customerId`: customerId
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  findOrdersByCustomerIdUsingGET(params: QueryResourceService.FindOrdersByCustomerIdUsingGETParams): __Observable<PageOfOrder> {
    return this.findOrdersByCustomerIdUsingGETResponse(params).pipe(
      __map(_r => _r.body as PageOfOrder)
    );
  }

  /**
   * @param params The `QueryResourceService.FindAndSortProductByPriceUsingGETParams` containing the following parameters:
   *
   * - `to`: to
   *
   * - `from`: from
   *
   * @return OK
   */
  findAndSortProductByPriceUsingGETResponse(params: QueryResourceService.FindAndSortProductByPriceUsingGETParams): __Observable<__StrictHttpResponse<PageOfStockCurrent>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/productByPrice/${params.from}/${params.to}`,
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
   * @param params The `QueryResourceService.FindAndSortProductByPriceUsingGETParams` containing the following parameters:
   *
   * - `to`: to
   *
   * - `from`: from
   *
   * @return OK
   */
  findAndSortProductByPriceUsingGET(params: QueryResourceService.FindAndSortProductByPriceUsingGETParams): __Observable<PageOfStockCurrent> {
    return this.findAndSortProductByPriceUsingGETResponse(params).pipe(
      __map(_r => _r.body as PageOfStockCurrent)
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
   * @param params The `QueryResourceService.FindRatingCountUsingGETParams` containing the following parameters:
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  findRatingCountUsingGETResponse(params: QueryResourceService.FindRatingCountUsingGETParams): __Observable<__StrictHttpResponse<Array<Entry>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    (params.sort || []).forEach(val => {if (val != null) __params = __params.append('sort', val.toString())});
    if (params.size != null) __params = __params.set('size', params.size.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/rating-count`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<Entry>>;
      })
    );
  }
  /**
   * @param params The `QueryResourceService.FindRatingCountUsingGETParams` containing the following parameters:
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  findRatingCountUsingGET(params: QueryResourceService.FindRatingCountUsingGETParams): __Observable<Array<Entry>> {
    return this.findRatingCountUsingGETResponse(params).pipe(
      __map(_r => _r.body as Array<Entry>)
    );
  }

  /**
   * @param storeId storeId
   * @return OK
   */
  findRatingByStoreIdUsingGETResponse(storeId: string): __Observable<__StrictHttpResponse<UserRating>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/rating/${storeId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<UserRating>;
      })
    );
  }
  /**
   * @param storeId storeId
   * @return OK
   */
  findRatingByStoreIdUsingGET(storeId: string): __Observable<UserRating> {
    return this.findRatingByStoreIdUsingGETResponse(storeId).pipe(
      __map(_r => _r.body as UserRating)
    );
  }

  /**
   * @param params The `QueryResourceService.FindRatingByStoreIdAndCustomerNameUsingGETParams` containing the following parameters:
   *
   * - `storeId`: storeId
   *
   * - `name`: name
   *
   * @return OK
   */
  findRatingByStoreIdAndCustomerNameUsingGETResponse(params: QueryResourceService.FindRatingByStoreIdAndCustomerNameUsingGETParams): __Observable<__StrictHttpResponse<UserRating>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/rating/${params.storeId}/${params.name}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<UserRating>;
      })
    );
  }
  /**
   * @param params The `QueryResourceService.FindRatingByStoreIdAndCustomerNameUsingGETParams` containing the following parameters:
   *
   * - `storeId`: storeId
   *
   * - `name`: name
   *
   * @return OK
   */
  findRatingByStoreIdAndCustomerNameUsingGET(params: QueryResourceService.FindRatingByStoreIdAndCustomerNameUsingGETParams): __Observable<UserRating> {
    return this.findRatingByStoreIdAndCustomerNameUsingGETResponse(params).pipe(
      __map(_r => _r.body as UserRating)
    );
  }

  /**
   * @param name name
   * @return OK
   */
  findRatingByCustomerNameUsingGETResponse(name: string): __Observable<__StrictHttpResponse<UserRating>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/ratingByName/${name}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<UserRating>;
      })
    );
  }
  /**
   * @param name name
   * @return OK
   */
  findRatingByCustomerNameUsingGET(name: string): __Observable<UserRating> {
    return this.findRatingByCustomerNameUsingGETResponse(name).pipe(
      __map(_r => _r.body as UserRating)
    );
  }

  /**
   * @param params The `QueryResourceService.FindReviewByStoreIdAndCustomerNameUsingGETParams` containing the following parameters:
   *
   * - `storeId`: storeId
   *
   * - `name`: name
   *
   * @return OK
   */
  findReviewByStoreIdAndCustomerNameUsingGETResponse(params: QueryResourceService.FindReviewByStoreIdAndCustomerNameUsingGETParams): __Observable<__StrictHttpResponse<Review>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/review/${params.storeId}/${params.name}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Review>;
      })
    );
  }
  /**
   * @param params The `QueryResourceService.FindReviewByStoreIdAndCustomerNameUsingGETParams` containing the following parameters:
   *
   * - `storeId`: storeId
   *
   * - `name`: name
   *
   * @return OK
   */
  findReviewByStoreIdAndCustomerNameUsingGET(params: QueryResourceService.FindReviewByStoreIdAndCustomerNameUsingGETParams): __Observable<Review> {
    return this.findReviewByStoreIdAndCustomerNameUsingGETResponse(params).pipe(
      __map(_r => _r.body as Review)
    );
  }

  /**
   * @param userName userName
   * @return OK
   */
  findReviewsByStoreIdUsingGETResponse(userName: string): __Observable<__StrictHttpResponse<Array<Review>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/review/${userName}`,
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
   * @param userName userName
   * @return OK
   */
  findReviewsByStoreIdUsingGET(userName: string): __Observable<Array<Review>> {
    return this.findReviewsByStoreIdUsingGETResponse(userName).pipe(
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
   * @param storeId storeId
   * @return OK
   */
  findStockCurrentByStoreIdUsingGETResponse(storeId: string): __Observable<__StrictHttpResponse<Array<StockCurrent>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/stockcurrent/${storeId}`,
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
   * @param storeId storeId
   * @return OK
   */
  findStockCurrentByStoreIdUsingGET(storeId: string): __Observable<Array<StockCurrent>> {
    return this.findStockCurrentByStoreIdUsingGETResponse(storeId).pipe(
      __map(_r => _r.body as Array<StockCurrent>)
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
   * @return OK
   */
  findStoreByRatingUsingGETResponse(): __Observable<__StrictHttpResponse<Array<Store>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/storeByRating`,
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
   * @return OK
   */
  findStoreByRatingUsingGET(): __Observable<Array<Store>> {
    return this.findStoreByRatingUsingGETResponse().pipe(
      __map(_r => _r.body as Array<Store>)
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
   * @param deliveryType deliveryType
   * @return OK
   */
  findStoresByTypeUsingGETResponse(deliveryType: string): __Observable<__StrictHttpResponse<Array<Store>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/storesByDeliveryType/${deliveryType}`,
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
   * @param deliveryType deliveryType
   * @return OK
   */
  findStoresByTypeUsingGET(deliveryType: string): __Observable<Array<Store>> {
    return this.findStoresByTypeUsingGETResponse(deliveryType).pipe(
      __map(_r => _r.body as Array<Store>)
    );
  }

  /**
   * @param regNo regNo
   * @return OK
   */
  findUserRatingByRegNoUsingGETResponse(regNo: string): __Observable<__StrictHttpResponse<Array<UserRating>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/user-rating/${regNo}`,
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
   * @param regNo regNo
   * @return OK
   */
  findUserRatingByRegNoUsingGET(regNo: string): __Observable<Array<UserRating>> {
    return this.findUserRatingByRegNoUsingGETResponse(regNo).pipe(
      __map(_r => _r.body as Array<UserRating>)
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
   * Parameters for findAllDeliveryTypesByStoreIdUsingGET
   */
  export interface FindAllDeliveryTypesByStoreIdUsingGETParams {

    /**
     * storeId
     */
    storeId: number;

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
   * Parameters for findCategoryAndCountUsingGET
   */
  export interface FindCategoryAndCountUsingGETParams {

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
   * Parameters for findCategoryByStoreIdUsingGET
   */
  export interface FindCategoryByStoreIdUsingGETParams {

    /**
     * userId
     */
    userId: string;

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
   * Parameters for findCategoryIdByUserIdUsingGET
   */
  export interface FindCategoryIdByUserIdUsingGETParams {

    /**
     * userId
     */
    userId: string;

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
   * Parameters for findProductByStoreIdAndCategoryNameUsingGET
   */
  export interface FindProductByStoreIdAndCategoryNameUsingGETParams {

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
   * Parameters for findRatingReviewByStoreidAndCustomerNameUsingGET
   */
  export interface FindRatingReviewByStoreidAndCustomerNameUsingGETParams {

    /**
     * storeId
     */
    storeId: string;

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
   * Parameters for findProductByStoreIdAndCategoryIdUsingGET
   */
  export interface FindProductByStoreIdAndCategoryIdUsingGETParams {

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
   * Parameters for findAllStockCurrentByProductNameStoreIdUsingGET
   */
  export interface FindAllStockCurrentByProductNameStoreIdUsingGETParams {

    /**
     * storeId
     */
    storeId: string;

    /**
     * name
     */
    name: string;
  }

  /**
   * Parameters for findStoreBySearchTermUsingGET
   */
  export interface FindStoreBySearchTermUsingGETParams {

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
   * Parameters for findStoreByTypeNameUsingGET
   */
  export interface FindStoreByTypeNameUsingGETParams {

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
   * Parameters for findOrdersByCustomerIdUsingGET
   */
  export interface FindOrdersByCustomerIdUsingGETParams {

    /**
     * customerId
     */
    customerId: string;

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
   * Parameters for findAndSortProductByPriceUsingGET
   */
  export interface FindAndSortProductByPriceUsingGETParams {

    /**
     * to
     */
    to: number;

    /**
     * from
     */
    from: number;
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
   * Parameters for findRatingCountUsingGET
   */
  export interface FindRatingCountUsingGETParams {

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
   * Parameters for findRatingByStoreIdAndCustomerNameUsingGET
   */
  export interface FindRatingByStoreIdAndCustomerNameUsingGETParams {

    /**
     * storeId
     */
    storeId: string;

    /**
     * name
     */
    name: string;
  }

  /**
   * Parameters for findReviewByStoreIdAndCustomerNameUsingGET
   */
  export interface FindReviewByStoreIdAndCustomerNameUsingGETParams {

    /**
     * storeId
     */
    storeId: string;

    /**
     * name
     */
    name: string;
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
