/* MODELE DE DONNEES POUR LES LIVRES */
export class Book {
  photo: string;
  synopsis: string;

  constructor(public title: string, public author: string) {
  }

}
