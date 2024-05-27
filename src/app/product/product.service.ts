import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ProductResponse, Produit } from './models/product.model';
@Injectable()
export class ProductService {
  private apiUrl = 'http://localhost/gestion_stock/taf/';

  private produits$_: BehaviorSubject<Produit[]> = new BehaviorSubject<Produit[]>([]);

  private loading$_ = new BehaviorSubject<boolean>(false);

  http = inject(HttpClient);

  get produits$(): Observable<Produit[]> {
    return this.produits$_.asObservable();
  }

  get loading$(): Observable<boolean> {
    return this.loading$_;
  }

  private setLoading(loading: boolean) {
    this.loading$_.next(loading);
  }

  getProductsFromApi() : void {
    this.setLoading(true);
    this.http.get<ProductResponse>(`${this.apiUrl}/produit/get`)
      .pipe(
        tap((products) => {
          console.log("produits : ", products.data);
          this.produits$_.next(products.data);
          this.setLoading(false);
        }),
        catchError(this.handleError)
    ).subscribe();
  }


  addProduit(produit: Produit): void {
    //ajouter le produit a la liste 
    console.log("produit : ", produit);
    this.http
      .post<ProductResponse>(`${this.apiUrl}produit/add`, produit)
      .pipe(
        tap((products) => {
          console.log("produits : ", products.data);
          this.produits$_.next([...this.produits$_.getValue(), produit]);
        }),
        catchError(this.handleError)
      )
      .subscribe();
  }


  // Create a new product
  createProduct(produit: Produit): Observable<ProductResponse> {
    return this.http.post<ProductResponse>(`${this.apiUrl}produit/add`, produit)
  }
  // get all fournisseurs
  getFournisseurs(): Observable<any> {
    return this.http
      .get<any>(`${this.apiUrl}/fournisseur/get`)
      .pipe(catchError(this.handleError));
  }

 
  // Handle errors
   handleError(error: HttpErrorResponse) {
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
