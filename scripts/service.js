const service = (
  function(bo) {
    const service = {};

    (function() {
      bo.savoirs = JSON.parse(localStorage.getItem("savoirs")) || [];
      bo.savoirs.forEach(savoir => {
        Object.setPrototypeOf(savoir, bo.Savoir.prototype);
        savoir.date = new Date(savoir.date);
      });
    }) ();

    service.sortBy = function(type) {
      switch (type) {
        case "sort-auteur":
          bo.savoirs.sort((savoirA, savoirB) => savoirA.auteur.toLowerCase() > savoirB.auteur.toLowerCase() ? 1 : -1);
          break;
        case "sort-auteur-reverse":
          bo.savoirs.sort((savoirA, savoirB) => savoirA.auteur.toLowerCase() > savoirB.auteur.toLowerCase() ? -1 : 1);
          break;
        case "sort-date":
          bo.savoirs.sort((savoirA, savoirB) => savoirA.date > savoirB.date ? 1 : -1);
          break;
        case "sort-date-reverse":
          bo.savoirs.sort((savoirA, savoirB) => savoirA.date > savoirB.date ? -1 : 1);
          break;
      }
    }

    service.addSavoir = function(savoir, auteur, date) {
      bo.savoirs.push(new bo.Savoir(savoir, auteur, date));
      service.saveData();
    }

    service.getSavoirs = function() { return bo.savoirs; }

    service.saveData = function() { localStorage.setItem("savoirs", JSON.stringify(bo.savoirs)); }

    return service;
})(bo);