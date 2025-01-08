console.log("Kanban JS loaded...");

// Exemple éventuel de structure
window.addEventListener("DOMContentLoaded", () => {
  // Ici, on récupère les éléments du DOM
  const addCardBtn = document.getElementById('addCardBtn');
  const searchInput = document.getElementById('searchInput');
  const sortByPriorityBtn = document.getElementById('sortByPriorityBtn');

  //--------------------------------DRAG & DROP-----------------------------------------//
  // Sélectionner les cartes et les colonnes
  const cards = document.querySelectorAll(".card");
  const columns = document.querySelectorAll(".column");

  // Ajouter la fonctionnalité drag & drop aux cartes
  cards.forEach(card => {
    card.setAttribute("draggable", "true");
  
    card.addEventListener("dragstart", (event) => {
      const cardId = event.target.getAttribute("data-id");
      console.log(`Drag started for card: ${cardId}`);
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
  
        console.log(`Carte déplacée dans la colonne: ${column.getAttribute("data-status")}`);
      }
    });
  });  
  //--------------------------------FIN DRAG & DROP-----------------------------------------//

  // Écoute des événements globaux (à l'extérieur de la boucle)
  addCardBtn.addEventListener('click', () => {
    // ...
  });

  searchInput.addEventListener('input', () => {
    // ...
  });

  sortByPriorityBtn.addEventListener('click', () => {
    // ...
  });
});
