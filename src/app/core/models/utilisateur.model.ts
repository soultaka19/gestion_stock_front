import { Abonnement } from "./abonnement.model";
import { Entreprise } from "./entreprise.model";
import { Profil } from "./profil.model";

export class Utilisateur {
  ID_Utilisateur?: number;
  Nom!: string;
  Login!: string;
  MotDePasse?: string;
  ID_Entreprise: Entreprise['ID_Entreprise'];
  NomEntreprise?: Entreprise['Nom'];
  ID_Profil: Profil['ID_Profil'];
  Role?: string
  ID_Abonnement?: Abonnement['ID_Abonnement'];
}                                                                         