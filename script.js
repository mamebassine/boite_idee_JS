// Ajouter un événement d'écoute pour la soumission du formulaire
document.getElementById('ideaForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Empêcher le comportement par défaut du formulaire

    // Récupérer les valeurs des champs de formulaire
    const libelle = document.getElementById('libelle').value.trim();
    const categorie = document.getElementById('categorie').value;
    const message = document.getElementById('message').value.trim();

    // Valider les données du formulaire
    if (!libelle || !categorie || !message) {
        displayMessage('Tous les champs doivent être remplis.', true); // Afficher un message d'erreur
        return;
    }

    // Vérifier si le libellé contient uniquement des lettres
    if (!/^[A-Za-zÀ-ÿ\s]+$/.test(libelle)) {
        displayMessage('Le libellé ne doit contenir que des lettres et des espaces.', true);
        return;
    }

    // Ajouter l'idée au tableau des idées
    addIdea(libelle, categorie, message);
    resetForm(); // Réinitialiser le formulaire
    displayMessage('Votre idée a été soumise avec succès.', false); // Afficher un message de succès
});

// Fonction pour afficher des messages de succès ou d'erreur
function displayMessage(msg, isError) {
    const messageContainer = document.getElementById('messageContainer');
    messageContainer.textContent = msg; // Afficher le message
    messageContainer.className = isError ? 'error' : ''; // Ajouter une classe d'erreur si nécessaire
    setTimeout(() => {
        messageContainer.textContent = ''; // Masquer le message après 2 secondes
    }, 2000);
}

let ideas = []; // Tableau pour stocker les idées

// Fonction pour ajouter une idée au tableau et rendre l'affichage
function addIdea(libelle, categorie, message) {
    const idea = { libelle, categorie, message, approved: false }; // Créer un objet idée
    ideas.push(idea); // Ajouter l'idée au tableau
    renderIdeas(); // Mettre à jour l'affichage des idées
}

// Fonction pour afficher les idées sur la page
function renderIdeas() {
    const ideasTableBody = document.getElementById('ideasTableBody');
    ideasTableBody.innerHTML = ''; // Réinitialiser le corps de la table
    ideas.forEach((idea, index) => {
        const row = document.createElement('tr'); // Créer une ligne de tableau pour chaque idée
        row.innerHTML = `
            <td>${idea.libelle}</td>
            <td>${idea.categorie}</td>
            <td>${idea.message}</td>
            <td class="actions">
                <button class="approve" onclick="approveIdea(${index})">${idea.approved ? 'Désapprouver' : 'Approuver'}</button>
                <button class="delete" onclick="deleteIdea(${index})">Supprimer</button>
            </td>
        `;
        ideasTableBody.appendChild(row); // Ajouter la ligne au corps de la table
    });
}

// Fonction pour approuver ou désapprouver une idée
function approveIdea(index) {
    ideas[index].approved = !ideas[index].approved; // Inverser le statut d'approbation
    renderIdeas(); // Mettre à jour l'affichage des idées
}

// Fonction pour supprimer une idée
function deleteIdea(index) {
    ideas.splice(index, 1); // Supprimer l'idée du tableau
    renderIdeas(); // Mettre à jour l'affichage des idées
}

// Fonction pour réinitialiser le formulaire
function resetForm() {
    document.getElementById('ideaForm').reset(); // Réinitialiser les champs du formulaire
}
