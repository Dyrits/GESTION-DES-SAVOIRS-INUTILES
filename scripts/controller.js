const controller = (
  function(service) {
    const controller = {};

    controller.refresh = function () {
      document.querySelector("#date").valueAsDate = new Date();
      document.querySelector("#savoir").focus();
      controller.updateDisplay();
    }

    controller.updateDisplay = function () {
      document.querySelector("#liste").innerHTML = "";
      service.getSavoirs().forEach(savoir => {
        let element = document.createElement("li");
        let savoirParagraph = document.createElement("p");
        let detailsParagraph = document.createElement("p");
        [savoirParagraph.innerText, detailsParagraph.innerText] = savoir.getDetails();
        element.setAttribute("savoir", savoir);
        element.appendChild(savoirParagraph);
        element.appendChild(detailsParagraph);
        element.onclick = ($event) => {
          if (confirm(`Voulez-vous supprimer vraiment supprimer ce savoir inutile ?`)) {
            $event.currentTarget.remove();
            service.savoirs.pop($event.currentTarget.getAttribute("savoir"));
            service.saveData();
          }
        }
        document.querySelector("#liste").appendChild(element);
      });
    }

    controller.sortBy = function(type) {
      service.sortBy(type);
      controller.refresh();
    }

    // EVENTS

    controller.initializeEvents = function() {
      document.querySelector("#ajouter").onclick = () => {
        try {
          service.addSavoir(document.querySelector("#savoir").value, document.querySelector("#auteur").value, document.querySelector("#date").valueAsDate);
          controller.refresh();
        } catch (error) { alert("Tous les champs sont obligatoires"); }
      }

      document.querySelectorAll(".sort").forEach(button => {
        button.onclick = () => { controller.sortBy(button.id); }
      })
    }

    return controller;
}) (service);

controller.initializeEvents();
controller.refresh();