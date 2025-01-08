console.log("Kanban JS loaded...");

// Exemple éventuel de structure
window.addEventListener("DOMContentLoaded", () => {
  // Ici, on récupère les éléments du DOM
  const addCardBtn = document.getElementById('addCardBtn');
  const searchInput = document.getElementById('searchInput');
  const sortByPriorityBtn = document.getElementById('sortByPriorityBtn');

  function DelCard(card) {
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "x";
    deleteBtn.className = "delete-btn";
    deleteBtn.addEventListener("click", () => {
      card.remove();
    });
    card.appendChild(deleteBtn);
  }
  document.querySelectorAll(".card").forEach((card) => {
    if (!card.querySelector(".delete-btn")) {
        DelCard(card);
    }
  });

  //--------------------------------DRAG & DROP-----------------------------------------//
  // Sélectionner les cartes et les colonnes
  const cards = document.querySelectorAll(".card");
  const columns = document.querySelectorAll(".column");

  // Ajouter la fonctionnalité drag & drop aux cartes
  cards.forEach(card => {
    card.setAttribute("draggable", "true");
  
    card.addEventListener("dragstart", (event) => {
      const cardId = event.target.getAttribute("data-id");
      event.dataTransfer.setData("text/plain", cardId);
    });
  });

  // Gérer le dragover et le drop sur les colonnes
  columns.forEach(column => {
    column.addEventListener("dragover", (event) => {
      event.preventDefault(); // Autorise le drop
      column.classList.add("dragover");
    });
  
    column.addEventListener("dragleave", () => {
      column.classList.remove("dragover");
    });
  
    column.addEventListener("drop", (event) => {
      event.preventDefault();
      column.classList.remove("dragover");
  
      const cardId = event.dataTransfer.getData("text/plain");
      const card = document.querySelector(`[data-id='${cardId}']`);
  
      if (card) {
        column.appendChild(card);
  
        // Met à jour le data-status de la carte
        card.setAttribute("data-status", column.getAttribute("data-status"));
      }
    });
  });  
  //--------------------------------FIN DRAG & DROP-----------------------------------------//

  // Écoute des événements globaux (à l'extérieur de la boucle)
  let cardId = 0;

  const generateUniqueId = () => {
    let id = cardId + 1;
    while (document.querySelector(`[data-id="${id}"]`)) {
      id += 1;
    }
    cardId = id;
    return id;
  };

  addCardBtn.addEventListener('click', () => {
    const title = window.prompt("Veuillez saisir un titre.");
    const content = window.prompt("Veuillez saisir un contenu.");
    const priority = window.prompt("Veuillez saisir une priorité (low, medium, high)");

    if (title && title.length <= 3) {
      alert("Le titre doit avoir plus de 3 caractères.");
    } else if (content && content.length <= 7) {
      alert("Le contenu doit avoir plus de 7 caractères.");
    } else if (priority && !(priority === "low" || priority === "medium" || priority === "high")) {
      alert("La priorité doit être 'low', 'medium' ou 'high'.");
    } else {
      const newCard = document.createElement("div");
      newCard.classList.add("card");
      newCard.setAttribute("data-id", generateUniqueId());
      newCard.setAttribute("data-priority", priority);
      newCard.setAttribute("draggable", "true");
      newCard.innerHTML = "<h3>" + title + "</h3><p>" + content + "</p><span>Priorité : " + priority + "</span>";
      
      const todoColumn = document.querySelector("[data-status='todo']");
      todoColumn.appendChild(newCard);

      newCard.addEventListener("dragstart", (event) => {
        const cardId = event.target.getAttribute("data-id");
        event.dataTransfer.setData("text/plain", cardId);
      });
    }
  });

  searchInput.addEventListener('input', () => {
    // ...
  });

  sortByPriorityBtn.addEventListener('click', () => {
    // ...
  });
});
