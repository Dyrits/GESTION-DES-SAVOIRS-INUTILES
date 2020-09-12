const bo = (function() {
  const bo = {};
  bo.savoirs = [];

  bo.Savoir = class {
    constructor(savoir, auteur, date) {
      this._savoir = savoir;
      this._auteur = auteur;
      this._date = date;
    }

    get savoir() { return this._savoir; }
    set savoir(value) { this._savoir = value; }
    get auteur() { return this._auteur; }
    set auteur(value) { this._auteur = value; }
    get date() { return this._date; }
    set date(value) { this._date = value; }

    getDetails() {
      let jour = this._date.getDate().toString().padStart(2, "0");
      let mois = (this._date.getMonth() + 1).toString().padStart(2, "0");
      let annee = this._date.getFullYear();
      return [this._savoir, `Par ${this._auteur}, le ${jour}/${mois}/${annee}`];
    }
  }
  return bo;
}) ();