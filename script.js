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
  
  // Éventuellement, on écoute les événements
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