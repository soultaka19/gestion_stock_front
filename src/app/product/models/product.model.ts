export interface ProductResponse {
  data: Produit[];
  status: boolean;
}


export interface Produit {
  ID_Produit?:   string;
  PrixUnitaire: number;
  Description:  string;
  Nom:          string;
  fournisseur:  Fournisseur;
}

export interface Fournisseur {
  ID_Fournisseur: number;
  Nom:            string;
  Adresse:        string;
  Contact:        string;
}