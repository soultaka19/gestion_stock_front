import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Product } from './models/product.model';

@Injectable()
export class ProductService {
  private apiUrl = 'http://localhost/gestion_stock/taf/';

  constructor(private http: HttpClient) {}

  // Create a new product
  createProduct(product: Product): Observable<Product> {
    return this.http
      .post<Product>(`${this.apiUrl}produit/add`, product)
      .pipe(catchError(this.handleError));
  }

  // Get all products
  getProducts(): Observable<any> {
    return this.http
      .get<any>(`${this.apiUrl}/produit/get`)
      .pipe(catchError(this.handleError));
  }

  // get all fournisseurs
  getFournisseurs(): Observable<any> {
    return this.http
      .get<any>(`${this.apiUrl}/fournisseur/get`)
      .pipe(catchError(this.handleError));
  }

  getProductById(productId: number): Observable<Product> {
    const url = `${this.apiUrl}/${productId}`;
    return this.http.get<Product>(url).pipe(catchError(this.handleError));
  }

  // Update a product
  updateProduct(productId: number, product: Product): Observable<Product> {
    const url = `${this.apiUrl}/${productId}`;
    return this.http
      .put<Product>(url, product)
      .pipe(catchError(this.handleError));
  }

  // Delete a product
  deleteProduct(productId: number): Observable<any> {
    const url = `${this.apiUrl}/${productId}`;
    return this.http.delete<any>(url).pipe(catchError(this.handleError));
  }

  // Handle errors
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = error.error.message;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
