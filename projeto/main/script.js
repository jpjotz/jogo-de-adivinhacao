// criando as variáveis

let randomNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 10;
let guessCount = 0;
let streak = 0;
let streakSave = localStorage.getItem("streak");


// Verificando se o jogador já possui uma sequência de vitórias

if (streakSave !== null){
  streak = parseInt(streakSave);
} else{
  streak = 0;
}


// criando a funcionalidade do jogo

function checkGuess (){
  attempts--;
  const inputElement = document.getElementById("guess");
  const guess = inputElement.value;
  const feedbackElement = document.getElementById("feedback");

  if (guess === "") {
    feedbackElement.innerHTML = "Você precisa digitar um número";
    feedbackElement.style.color = "red";
    attempts++;
    return;
  }
  
    else if (guess <= 0){
      feedbackElement.innerHTML = "Digite um número maior que 0!";
      feedbackElement.style.color = "red";
      attempts++;
      return;
    }

    else if (guess > 100){
      feedbackElement.innerHTML = "Digite um valor menor que 100!";
      feedbackElement.style.color = "red";
      attempts++;
      return;
    }

    if (guess == randomNumber){
      guessCount++;
      streak++;
      localStorage.setItem("streak", streak);
      feedbackElement.innerHTML = `Você Acertou! Sua vitória foi na ${guessCount}ª tentativa.`;
      feedbackElement.style.color = "green";
      document.getElementById("streakText").innerHTML = `🔥 Sequência de vitórias: ${streak}`;
      return;
    }
      else if (guess < randomNumber) {
        feedbackElement.innerHTML = `Muito baixo! Tente novamente. ${attempts} tentativas restantes`;
        feedbackElement.style.color = "red";
        guessCount++;
      }      
        else{
          feedbackElement.innerHTML = `Muito alto! Tente novamente. ${attempts} tentativas restantes`;
          feedbackElement.style.color = "red";
          guessCount++;
        }
  
  if (attempts === 0) {
      feedbackElement.innerHTML = `Sinto muito, suas tentativas acabaram. O número correto era ${randomNumber}.`;
      feedbackElement.style.color = "red";
      
      streak = 0;
      localStorage.setItem("streak", streak);
      document.getElementById("streakText").innerHTML = `🔥 Sequência de vitórias: ${streak}`;
  }
}

// Função de reiniciar o jogo

function reiniciar() {
  const guess = document.getElementById('guess');
  guess.value = '';

  const feedback = document.getElementById('feedback');
  feedback.innerHTML = ('');

  attempts = 10;
  guessCount = 0;

  randomNumber = Math.floor(Math.random() * 100) + 1;
}

// Função de compartilhar o site

function share(){
const shareData = {
    title: "Jogo de adivinhação",
    text: "Teste sua sorte e adivinhe o número!",
    url: window.location.href
  };

  if (navigator.share) {
    navigator.share(shareData)
      .then(() => console.log("Compartilhado com sucesso!"))
      .catch((err) => console.log("Erro ao compartilhar:", err));
  } else {
    navigator.clipboard.writeText(shareData.url)
      .then(() => alert("Link copiado para a área de transferência!"))
      .catch(() => alert("Não foi possível copiar o link."));
  }

}

//Função de enviar palpite apertando a tecla Enter

window.onload = function() {
  const inputElement = document.getElementById("guess");
  inputElement.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      checkGuess();
    }
  });

// Remover pop-up de instalação do Mimo

  const symbolMimo = document.getElementById("mimo-install-banner");
    if (symbolMimo){
      symbolMimo.remove();
    }

  const symbolMimoMobile = document.getElementById("mimo-install-banner-mobile");
    if (symbolMimoMobile){
      symbolMimoMobile.remove();
    }

  document.getElementById("streakText").innerHTML = `🔥 Sequência de vitórias: ${streak}`;
};

// Criando a função de deletar a sequência de vitórias

function streakClear() {
  streak = 0;
  localStorage.setItem("streak", streak);
  document.getElementById("streakText").innerHTML = `🔥 Sequência de vitórias: ${streak}`;
}