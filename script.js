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
      saveData();
    });
    card.appendChild(deleteBtn);
  }
  document.querySelectorAll(".card").forEach((card) => {
    if (!card.querySelector(".delete-btn")) {
      DelCard(card);
    }
  });

  //--------------------------------DRAG & DROP-----------------------------------------//
  const cards = document.querySelectorAll(".card");
  const columns = document.querySelectorAll(".column");

  cards.forEach(card => {
    card.setAttribute("draggable", "true");
  
    card.addEventListener("dragstart", (event) => {
      const cardId = event.target.getAttribute("data-id");
      event.dataTransfer.setData("text/plain", cardId);
    });
  });

  columns.forEach(column => {
    column.addEventListener("dragover", (event) => {
      event.preventDefault();
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
          card.setAttribute("data-status", column.getAttribute("data-status"));
          saveData();
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

      DelCard(newCard);

      newCard.addEventListener("dragstart", (event) => {
        const cardId = event.target.getAttribute("data-id");
        event.dataTransfer.setData("text/plain", cardId);
      });

      saveData();
    }
  });

  function saveData() {
    const columns = document.querySelectorAll(".column");
    const boardState = {};

    columns.forEach(column => {
      const columnStatus = column.getAttribute("data-status");
      boardState[columnStatus] = [];

      const cards = column.querySelectorAll(".card");
      cards.forEach(card => {
        const cardData = {
          id: card.getAttribute("data-id"),
          title: card.querySelector("h3").textContent,
          content: card.querySelector("p").textContent,
          priority: card.getAttribute("data-priority"),
        };
        boardState[columnStatus].push(cardData);
      });
    });

    localStorage.setItem("kanbanBoard", JSON.stringify(boardState));
  }

  function loadData() {
    const savedState = localStorage.getItem("kanbanBoard");
    if (!savedState) return;
  
    const boardState = JSON.parse(savedState);
  
    for (let status in boardState) {
      const column = document.querySelector(`[data-status="${status}"]`);
      if (!column) return;
  
      boardState[status].forEach(cardData => {
        const newCard = document.createElement("div");
        newCard.classList.add("card");
        newCard.setAttribute("data-id", cardData.id);
        newCard.setAttribute("data-priority", cardData.priority);
        newCard.setAttribute("draggable", "true");
        newCard.innerHTML = "<h3>" + cardData.title + "</h3><p>" + cardData.content + "</p><span>Priorité : " + cardData.priority + "</span>";
  
        column.appendChild(newCard);
        DelCard(newCard);
  
        newCard.addEventListener("dragstart", (event) => {
          const cardId = event.target.getAttribute("data-id");
          event.dataTransfer.setData("text/plain", cardId);
        });
      });
    }
  }
  loadData();
  searchInput.addEventListener('input', () => {
    // ...
  });

  sortByPriorityBtn.addEventListener('click', () => {

      const priority = {high: 1,medium: 2,low: 3 };
      const columns = document.querySelectorAll('.column');
      columns.forEach(column => {
        
        const cards = Array.from(column.querySelectorAll('.card'));

        cards.sort((a, b) => {
          const priorityA = priority[a.dataset.priority];
          const priorityB = priority[b.dataset.priority];
          return priorityA - priorityB;
        });
        cards.forEach(card => column.appendChild(card));
      });
  });
});
