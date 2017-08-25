// YOUR CODE HERE:

$(document).ready(function() {
  app.init();
  //console.log(window.location.search);
  data.username = window.location.search.replace(/^\?username=/g, '');
  //console.log(data);
  $('#submitmsg').click(function(event) {
    event.preventDefault();
    data.message = $('#msgbox').val();
    $('#msgbox').val('');
    app.renderMessage(data);
    app.send(data);
  });

  $('#clearmsgbox').click(function(event) {
    event.preventDefault();
    app.clearMessages();
  });
    
  
  // var html = 
  // $('#chats').append('<span>OMG IT\'s 1998!</span><br>');
  // $('#chats').append('<span>FUUUUUUUUU!</span><br>');
  app.fetch();
});

let data = {
  username: 'shawndrost',
  text: 'trololo',
  roomname: '4chan'
};
// let App = function() {
//   this.server = 'http://parse.la.hackreactor.com/chatterbox/classes/messages';
// };

let app = {};
// let app = new App

app.server = 'http://parse.la.hackreactor.com/chatterbox/classes/messages';

app.init = function() {
  return 0;
};

app.send = function(message) {
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'http://parse.la.hackreactor.com/chatterbox/classes/messages',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
};

app.fetch = function() {
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'http://parse.la.hackreactor.com/chatterbox/classes/messages',
    type: 'GET',
    success: function (data) {
      console.log(data, 'chatterbox: Message received');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to get message', data);
    }
  });
};

app.clearMessages = function() {
  var node = $('#chats').children();
  for (var i = 0; i < node.length; i++) {
    node.remove(node.children[i]);
  }

  // var node = $('.chat').children();
  // for (var i = 0; i < node.length; i++) {
  //   node.remove(node.children[i]);
  // }
};

app.renderMessage = function(data) {
  let handle = `<div class="chat username">
                    <strong>${data.username}:</strong><br>
                    ${data.message}
                </div>`;

  // console.log($('#chats').children().length);
  $('#chats').append(handle);
  // $('#chats').append(handle);
  // console.log($('#chats').children().length);

  // $('.chat').append('<span>' + message + '</span><br>');

};

app.renderRoom = function(roomName) {
  $('#roomSelect').append('<option>' + roomName + '</option>');
}