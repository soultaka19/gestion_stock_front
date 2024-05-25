import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable, catchError, switchMap, tap, throwError } from 'rxjs';
import { Abonnement } from '../models/abonnement.model';
import { Entreprise } from '../models/entreprise.model';
import { Utilisateur } from '../models/utilisateur.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost/gestion_stock/taf/';

  private token!: string;

  private currentUserSubject!: BehaviorSubject<Utilisateur | null>;
  public currentUser!: Observable<Utilisateur | null>;

  private http = inject(HttpClient);
  constructor() {
    this.currentUserSubject = new BehaviorSubject<Utilisateur | null>(null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): Utilisateur | null {
    return this.currentUserSubject.value;
  }

  inscription(utilisateur: Utilisateur,entreprise: Entreprise,abonnement: Abonnement ): Observable<Utilisateur> {
    return this.http
      .post<Entreprise>(`${this.apiUrl}entreprise/add`, entreprise)
      .pipe(
        tap(
          (entrepriseAjoutee: Entreprise) => {
            console.log(
              "Reponse du backend pour l'ajout de l'entreprise",
              entrepriseAjoutee
            );
          },
          catchError((err) => {
            console.error(
              "Une ereeur esr survenue lors de l'ajout d'entreprise",
              err
            );
            return throwError(err);
          })
        ),
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

  login(Login: string, MotDePasse: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}taf_auth/auth`, {Login: Login,MotDePasse: MotDePasse,})
      .pipe(
        tap((reponse: any) => {
          console.log('Reponse du backend pour la connexion', reponse);
          if (reponse.status && reponse.data) {
            //stocker le token JWT dans le local storage
            this.token = reponse.data;
            localStorage.setItem('token', this.token);

            //decoder le token JWT pour recuperer les informations de l'utilisateur
            const decodedToken = jwtDecode(reponse.data);
            console.log("Informations de l'utilisateur et l'etat du token", decodedToken);

            //stocker les informations de l'utilisateur dans le local storage
            // localStorage.setItem(
            //   'user',
            //   JSON.stringify((decodedToken as any)['taf_data'])
            // );
            this.currentUserSubject.next((decodedToken as any)['taf_data']);
          }
        }),
        catchError((err) => {
          console.error('Une ereeur esr survenue lors de la connexion', err);
          return throwError(err);
        })
      );
  }

  //implementation d'une methode isLogged qui permet de verifier si l'utilisateur est connecte
  isLogged(): boolean {

    return !!localStorage.getItem('token');
  }
}
