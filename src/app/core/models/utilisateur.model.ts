import { Abonnement } from "./abonnement.model";
import { Entreprise } from "./entreprise.model";
import { Profil } from "./profil.model";

export class Utilisateur {
  ID_Utilisateur?: number;
  Nom!: string;
  Login!: string;
  MotDePasse!: string;
  ID_Profil: Profil['ID_Profil'];
  ID_Entreprise: Entreprise['ID_Entreprise'];
  ID_Abonnement?: Abonnement['ID_Abonnement'];
}