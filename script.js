document.addEventListener('DOMContentLoaded', function() {
  var form = document.querySelector('form');
  

  form.addEventListener('submit', function(event) {
      event.preventDefault();

      var firstName = document.getElementById('first-name').value;
      var lastName = document.getElementById('last-name').value;
      var comment = document.getElementById('message').value;

      // Contrôle du remplissage des champs
      if (!firstName || !lastName || !comment) {
          displayError("Tous les champs doivent être rempli!");
          return;
          
          
      }

      // Recherche d'un commentaire identique
      if (checkDuplicate(firstName, lastName, comment)) {
          displayError("Un commentaire identique existe déjà!");
          return;
      }

      // Ajout du nouveau commentaire 
      addComment(firstName, lastName, comment);
      document.getElementById("first-name").value = "";
      document.getElementById("last-name").value = "";
      document.getElementById("message").value = "";

      //Suppression du message d'erreur
      var errorDiv = document.getElementById('error-message');
    errorDiv.style.display = 'none';
    errorDiv.textContent = "";
  });
});

function addComment(firstName, lastName, comment) {
  var commentList = document.getElementById('comment-list');

  // Créer un nouveau commentaire
  var newComment = document.createElement('div');
  newComment.classList.add('flex', 'space-x-4', 'text-sm', 'text-gray-500');

  var commentContent = `
      <div class="flex-1 py-10 border-t border-gray-200">
          <h3 class="font-medium text-gray-900">${firstName} ${lastName}</h3>
          <div class="prose prose-sm mt-4 max-w-none text-gray-500">
              <p>${comment}</p>
          </div>
      </div>
  `;

  newComment.innerHTML = commentContent;

  // Ajout du nouveau commentaire à la liste
  commentList.appendChild(newComment);
  
}

function displayError(message) {
  var errorDiv = document.getElementById('error-message');
  errorDiv.style.display = 'block';
  errorDiv.textContent = message;
}

function checkDuplicate(firstName, lastName, comment) {
  var comments = document.querySelectorAll('#comment-list > div');
  for (var i = 0; i < comments.length; i++) {
      var commentName = comments[i].querySelector('h3').textContent;
      var commentMessage = comments[i].querySelector('p').textContent;

      if (commentName.toLowerCase() === (firstName + ' ' + lastName).toLowerCase() &&
      commentMessage.toLowerCase() === comment.toLowerCase()) {
    return true;
          
      }
  }
}

