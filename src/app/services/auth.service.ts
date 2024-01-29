import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, switchMap, tap, throwError } from 'rxjs';
import { Abonnement } from '../core/models/abonnement.model';
import { Entreprise } from '../core/models/entreprise.model';
import { Utilisateur } from '../core/models/utilisateur.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost/gestion_stock/taf/';

  // private currentUserSubject: BehaviorSubject<Utilisateur>;
  // public currentUser: Observable<Utilisateur>;

  private http = inject(HttpClient);
  constructor() {
    // const currentUser = localStorage.getItem('currentUser');
    // this.currentUserSubject = new BehaviorSubject<Utilisateur>(
    //   currentUser ? JSON.parse(currentUser) : null
    // );
    // this.currentUser = this.currentUserSubject.asObservable();
    //this.currentUserSubject = new BehaviorSubject<Utilisateur>(JSON.parse(localStorage.getItem('currentUser')))
  }

  // public get currentUserValue(): Utilisateur {
  //   return this.currentUserSubject.value;
  // }

  inscription(utilisateur: Utilisateur,entreprise: Entreprise,abonnement: Abonnement ): Observable<Utilisateur> {
    return this.http.post<Entreprise>(`${this.apiUrl}entreprise/add`,entreprise).pipe(
      tap((entrepriseAjoutee: Entreprise) => {
        console.log('Reponse du backend pour l\'ajout de l\'entreprise', entrepriseAjoutee);
      },
      catchError((err) => {
        console.error('Une ereeur esr survenue lors de l\'ajout d\'entreprise', err);
        return throwError(err);
      })),
      switchMap((entrepriseAjoutee: any) => {
        if (entrepriseAjoutee.status && entrepriseAjoutee.data) {
          utilisateur.ID_Entreprise = entrepriseAjoutee.data[`id_entreprise`];
          utilisateur.ID_Abonnement = abonnement.ID_Abonnement;
          return this.http
            .post<Utilisateur>(`${this.apiUrl}utilisateur/add`, utilisateur)
            .pipe(
              tap((utilisateurAjoute: Utilisateur) => {
                console.log(
                  "Reponse du backend pour l'inscription de l'utilisateur",
                  utilisateurAjoute
                );
              }),
              catchError((err) => {
                console.error(
                  "Une ereeur esr survenue lors de l'inscription",
                  err
                );
                return throwError(err);
              })
            );
        } else {
          return throwError(new Error('Reponse du backend invalide'));
        }
      })
    );
  }

}
