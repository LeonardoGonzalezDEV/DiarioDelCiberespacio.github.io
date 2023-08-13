document.addEventListener('DOMContentLoaded', () => {
    const diaryEntry = document.getElementById('diary-entry');
    const saveButton = document.getElementById('save-button');
    const cardsContainer = document.getElementById('cards-container');

    saveButton.addEventListener('click', () => {
        const entryContent = diaryEntry.value;
        if (entryContent.trim() !== '') {
            const timestamp = new Date().toLocaleString();
            const card = createCard(entryContent, timestamp);
            cardsContainer.appendChild(card);
            saveEntry(entryContent, timestamp);
            diaryEntry.value = '';
            alert('Entrada de diario guardada correctamente.');
        } else {
            alert('La entrada de diario está vacía. Escribe algo antes de guardar.');
        }
    });

    const savedEntries = JSON.parse(localStorage.getItem('diaryEntries')) || [];
    for (const entry of savedEntries) {
        const card = createCard(entry.content, entry.timestamp);
        cardsContainer.appendChild(card);
    }

    cardsContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('delete-button')) {
            const card = event.target.closest('.card');
            const timestamp = card.querySelector('.timestamp').textContent;
            deleteEntry(timestamp);
            cardsContainer.removeChild(card);
        }
    });
});

function createCard(content, timestamp) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
        <p>${content}</p>
        <span class="timestamp">${timestamp}</span>
        <button class="delete-button">Eliminar</button>
    `;
    return card;
}

function saveEntry(content, timestamp) {
    const savedEntries = JSON.parse(localStorage.getItem('diaryEntries')) || [];
    savedEntries.push({ content, timestamp });
    localStorage.setItem('diaryEntries', JSON.stringify(savedEntries));
}

function deleteEntry(timestamp) {
    const savedEntries = JSON.parse(localStorage.getItem('diaryEntries')) || [];
    const updatedEntries = savedEntries.filter(entry => entry.timestamp !== timestamp);
    localStorage.setItem('diaryEntries', JSON.stringify(updatedEntries));
}
