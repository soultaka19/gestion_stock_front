export interface Product {
  ID_Produit? : number;
  Nom: string;
  Description?: string;
  PrixUnitaire?: number;
  ID_Fournisseur: number;
}

export interface ProductResponse {
  data: Product[];
  status: boolean;
}


export interface Produit {
  ID_Produit:   string;
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