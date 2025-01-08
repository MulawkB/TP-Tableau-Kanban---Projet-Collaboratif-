console.log("Kanban JS loaded...");

// Exemple éventuel de structure
window.addEventListener("DOMContentLoaded", () => {
  // Ici, on récupère les éléments du DOM
  const addCardBtn = document.getElementById('addCardBtn');
  const searchInput = document.getElementById('searchInput');
  const sortByPriorityBtn = document.getElementById('sortByPriorityBtn');
  
  let cardId = 0;

  const generateUniqueId = () => {
    let id = cardId + 1;
    while (document.querySelector(`[data-id="${id}"]`)) {
      id += 1;
    }
    cardId = id;
    return id;
  };

  // Éventuellement, on écoute les événements
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
      newCard.setAttribute("date-id", generateUniqueId());
      newCard.setAttribute("data-priority", priority);
      newCard.innerHTML = "<h3>" + title + "</h3><p>" + content + "</p><span>Priorité : " + priority + "</span>";

      const todoColumn = document.querySelector("[data-status='todo']");
      todoColumn.appendChild(newCard);
    }
  });

  searchInput.addEventListener('input', () => {
    // ...
  });

  sortByPriorityBtn.addEventListener('click', () => {
    // ...
  });
});