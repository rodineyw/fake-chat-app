const messageContent = $('.msgs-content');
const messageInput = $('.msg-input');
const messageSubmit = $('.msg-submit');
const avatarImage = '/img/logo.png';
const fakeMessages = [
    'Hi there, I\'m AsmrProg and you?',
    'Nice to meet you',
    'How are you?',
    'Not too bad, thanks',
    'That\'s awesome',
    'Youtube is a nice place to share video',
    'I think you\'re a nice person',
    'Why do you think that?',
    'Can you explain?',
    'Anyway I\'ve gotta go now',
    'It was a pleasure chat with you',
    'Time to make a new video',
    'Bye',
    ':)'
  ];

  let minutes = 0;

  // Inicializar a barra de rolagem e exibir uma mensagem falsa ao carregar a janela

  $(window).on('load', function() {
    messageContent.mCustomScrollbar();
    setTimeout(fakeMessage, 100);
  });

  // Atualize a barra de rolagem para baixo e adicione carimbo de data/hora

  function UpdateScrollbar() {
    messageContent.mCustomScrollbar('update').mCustomScrollbar('scrollTo', 'bottom', {
        scrollInertia: 10,
        timeout: 0
    });
  };

  function addTimestamp() {
    const date = new Date();
    const minutesNow = date.getMinutes();

    if(minutes !== minutesNow) {
        minutes = minutesNow;
        const timestamp = $('<div class="timestamp"></div>').
        text('${date.getHours()}:${minutes}')
        $('.msg:last').append(timestamp);
    };
  };

  function addMessageToPage(msg, isPersonal = false) {
    const message = $('<div class="msg"></div>').text(msg);
    if(isPersonal) {
        message.addClass('msg-pesonal');
    }else {
        const figure = $('<figure class="avatar"></figure>');
        const image = $('<img>').attr('src', avatarImage);
        figure.append(image);
        message.addClass('new').prepend(figure);
    };
    $('.mCSB_container').append(message);
    addTimestamp();
    UpdateScrollbar();
 };

 // Função para inserir mensagem do usuário e acionar mensagem falsa após 1 segundo

 function insertMessage() {
    const messageText = messageInput.val().trim();
    if(messageText == '') {
        return false;
    };
    addMessageToPage(messageText, true);
    messageInput.val(null);
    setTimeout(fakeMessage, 1000 + (Math.random() * 20) * 100);
 };

 // Entrada de mensagem e ouvinte de evento do botão enviar

 messageInput.on('keydown', function(e) {
    // se o usuário pressionar enter, enviar mensagem
    if(e.which == 13) {
        insertMessage();
        return false;
    };
 });

messageSubmit.on('click', insertMessage);

// Função para exibir a mensagem de carregamento e substituir por mensagem falsa após 1 a 2 segundos

function fakeMessage() {
    if(messageInput.val() !== '') {
        return false;
    };

    const loadingMessage = $('<div class="msg loading new"></div>');
    const figure = $('<figure class="avatar"></figure>');
    const image = $('<img>').attr('src', avatarImage);
    figure.append(image);
    loadingMessage.append(figure).append($('<span></span>'));
    $('.mCSB_container').append(loadingMessage);
    UpdateScrollbar();

    setTimeout(function(){
        loadingMessage.remove();
        addMessageToPage(fakeMessages.shift());
    }, 1000 * (Math.random() *  20) * 100);
};

const { Configuration, OpenAiApi } = require("openai");

const configuration = new Configuration({
    apiKey: ProcessingInstruction.env.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,
});
const openai = new OpenAiApi(configuration);

const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: "Hello World",
});
console.log(completion.data.choices[0].text);