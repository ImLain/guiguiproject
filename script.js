// Assurez-vous que game.js est chargé avant script.js dans votre HTML

function checkName() {
  var nameInput = document.getElementById("nameInput");
  var input = nameInput.value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // Transforme en minuscule et supprime les accents

  var contentDiv = document.getElementById("content");
  var responseDiv = document.getElementById("response");
  if (input === "guillaume") {
    contentDiv.innerHTML = "<p id='welcomeMessage'>Aaaaaah Guigui ! Je suis content de te voir !</p>";
    var nextButton = document.createElement('button');
    nextButton.innerText = 'Suivant';
    nextButton.id = 'nextButton';
    nextButton.className = 'validButton';
    nextButton.onclick = displayOptions;
    contentDiv.appendChild(nextButton);
  } else {
    responseDiv.innerHTML = "<p>C'est qui ça ? Je n'accepte que Guillaume.<br>Sorry not sorry !</p>";
    nameInput.value = "";
  }
}

function displayOptions() {
  var contentDiv = document.getElementById("content");

  // Supprimer le contenu spécifique (charades, blagues, surprise), mais garder les boutons
  Array.from(contentDiv.children).forEach(child => {
    if (!child.classList.contains('options-container')) {
      child.remove();
    }
  });

  // Créer le conteneur des boutons s'il n'existe pas déjà
  var buttonsContainer = document.getElementById('options-container');
  if (!buttonsContainer) {
    buttonsContainer = document.createElement('div');
    buttonsContainer.id = 'options-container';
    buttonsContainer.className = 'options-container';

    // var options = ['Charades', 'Blagues', 'Surprise'];
    var options = ['Charades', 'Blagues', 'Surprise'];

    options.forEach(function(option) {
      var button = document.createElement('button');
      button.innerText = option;
      button.className = 'validButton';
      button.onclick = function() {
        if (option === 'Charades') {
          displayRiddle();
        } else if (option === 'Blagues') {
          displayJoke();
        } else if (option === 'Surprise') {
          displaySurprise(0);
        }
      };
      buttonsContainer.appendChild(button);
    });

    contentDiv.appendChild(buttonsContainer);
  }
}

function displayRiddle() {
  var riddles = Object.values(riddlesData);
  var randomRiddle = riddles[Math.floor(Math.random() * riddles.length)];

  // Supprimer le div de blague s'il existe
  var jokeDiv = document.getElementById("jokeDiv");
  if (jokeDiv) {
    jokeDiv.remove();
  }

  // Supprimer le div de surprise s'il existe
  var surpriseContainer = document.getElementById("surpriseContainer");
  if (surpriseContainer) {
    surpriseContainer.remove();
  }


  var riddleDiv = document.getElementById("riddleDiv") || document.createElement('div');
  riddleDiv.id = 'riddleDiv';
  riddleDiv.innerHTML = `<p class="riddleQst">${randomRiddle.question}</p>
                          <div class="input-button-container">
                            <input type="text" id="riddleAnswer" class="inputStyle" />
                            <i class="fa-regular fa-circle-check validButton3" onclick="checkRiddleAnswer('${randomRiddle.answer}')"></i>
                          </div>
                          <div id="riddleResponse"></div>
                          <p id="merdeQuestion">T'es une merde ? <button class="validButton2" onclick="showAnswer('${randomRiddle.answer}')">Oui...</button></p>`;

  var contentDiv = document.getElementById("content");
  if (!document.getElementById("riddleDiv")) {
    contentDiv.appendChild(riddleDiv);
  }

  // Ajout de l'écouteur d'événements pour la touche "Entrée"
  var riddleAnswerInput = document.getElementById("riddleAnswer");
  riddleAnswerInput.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
      checkRiddleAnswer(randomRiddle.answer);
    }
  });
}



function checkRiddleAnswer(correctAnswer) {
  var userAnswer = document.getElementById("riddleAnswer").value.toLowerCase();
  var riddleResponseDiv = document.getElementById("riddleResponse");
  var inputButtonContainer = document.querySelector('.input-button-container');
  var merdeQuestion = document.getElementById("merdeQuestion");

  if (userAnswer === correctAnswer.toLowerCase()) {
    riddleResponseDiv.innerHTML = `<p class="answer" >Bravo ! T'as trouvé ! La réponse était bien "${correctAnswer}" !</p>`;

    if (inputButtonContainer) {
      inputButtonContainer.style.display = 'none'; // Cacher l'input et le bouton
    }
    removeMerdeQuestion()
  } else {
    riddleResponseDiv.innerHTML = "<p>Eh non ! C'est pas ça !</p>";
    document.getElementById("riddleAnswer").value = ""; // Réinitialiser l'input
  }
}


function removeMerdeQuestion() {
  var merdeQuestion = document.getElementById("merdeQuestion");
  if (merdeQuestion) {
    merdeQuestion.remove();
  }
}



function showAnswer(answer) {
  var riddleResponseDiv = document.getElementById("riddleResponse");
  var inputButtonContainer = document.querySelector('.input-button-container'); // Récupérer le conteneur de l'input et du bouton

  riddleResponseDiv.innerHTML = `<p class="answer" >La réponse était '${answer}' !</p>`;

  // Cacher ou supprimer le conteneur de l'input et du bouton
  if (inputButtonContainer) {
    inputButtonContainer.style.display = 'none'; // Ou inputButtonContainer.remove();
  }

  // Supprimer la question "T'es une merde ?"
  removeMerdeQuestion();
}


function displayJoke() {
  var jokesArray = Object.values(jokes); // Convertir les données de blagues en array
  var randomJoke = jokesArray[Math.floor(Math.random() * jokesArray.length)]; // Sélectionner une blague aléatoire

  var surpriseContainer = document.getElementById("surpriseContainer");
  if (surpriseContainer) {
    surpriseContainer.remove();
  }

  var riddleDiv = document.getElementById("riddleDiv");
  if (riddleDiv) {
    riddleDiv.remove();
  }

  // Supprimer le div de charade s'il existe
  var jokeDiv = document.getElementById("jokeDiv") || document.createElement('div');
  jokeDiv.id = 'jokeDiv';
  jokeDiv.innerHTML = `<p>${randomJoke}</p>`;

  var contentDiv = document.getElementById("content");
  if (!document.getElementById("jokeDiv")) {
    contentDiv.appendChild(jokeDiv);
  } else {
    document.getElementById("jokeDiv").innerHTML = `<p>${randomJoke}</p>`; // Mettre à jour la blague si jokeDiv existe déjà
  }
}


function displaySurprise(index = 0) {
  var jokeDiv = document.getElementById("jokeDiv");
  if (jokeDiv) {
    jokeDiv.remove();
  }

  var riddleDiv = document.getElementById("riddleDiv");
  if (riddleDiv) {
    riddleDiv.remove();
  }

  var contentDiv = document.getElementById("content");

  // Vérifier si le conteneur de "Surprise" existe déjà, sinon le créer
  var surpriseContainer = document.getElementById('surpriseContainer');
  if (!surpriseContainer) {
    surpriseContainer = document.createElement('div');
    surpriseContainer.id = 'surpriseContainer';
    contentDiv.appendChild(surpriseContainer);
  }

  // Nettoyer uniquement le contenu du conteneur de "Surprise"
  while (surpriseContainer.firstChild) {
    surpriseContainer.removeChild(surpriseContainer.firstChild);
  }

  var messageDiv = document.createElement('div');
  messageDiv.className = 'surprise-container'; // Assigner la classe "surprise-container"
  messageDiv.innerHTML = `<p class="surpriseTxt">${surprise[index]}</p>`;
  surpriseContainer.appendChild(messageDiv);

  // Créer un conteneur pour les boutons
  var footBtnContainer = document.createElement('div');
  footBtnContainer.className = 'footBtn';

  // Bouton "Suivant"
  if (index < surprise.length - 1) {
    var nextButton = document.createElement('i');
    nextButton.className = 'fa-regular fa-circle-right nextBtn';
    nextButton.onclick = function() { displaySurprise(index + 1); };
    footBtnContainer.appendChild(nextButton);
  }

  // Bouton "Précédent"
  if (index > 0 && index < surprise.length - 1) {
    var prevButton = document.createElement('i');
    prevButton.className = 'fa-regular fa-circle-left previousBtn';
    prevButton.onclick = function() { displaySurprise(index - 1); };
    footBtnContainer.appendChild(prevButton);
  }

  // Ajouter le conteneur footBtn au messageDiv
  messageDiv.appendChild(footBtnContainer);

  // Gérer l'affichage de l'image pour le dernier élément
  if (index === surprise.length - 1) {
    var image = document.createElement('img');
    image.src = 'images/akita.png';
    image.alt = 'Akita';
    image.classList.add('akita-image');
    messageDiv.appendChild(image);
  }

  surpriseContainer.appendChild(messageDiv);
}



// Ecouteur d'événements pour la touche "Entrée"
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('nameInput').addEventListener('keyup', function(event) {
      if (event.key === 'Enter') {
          checkName();
      }
  });
});
