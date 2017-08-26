// YOUR CODE HERE:

$(document).ready(function() {
  // app.init();
  
  app.fetch();
  
  //console.log(window.location.search);
  data.username = _.escape(data.username);
  data.username = window.location.search.replace(/^\?username=/g, '');
  
  //console.log(data);
  $('#submitmsg').click(function(event) {
    event.preventDefault();
    data.text = $('#msgbox').val();
    $('#msgbox').val('');
    app.renderMessage(data);
    app.send(data);
  });

  $('#clearmsgbox').click(function(event) {
    event.preventDefault();
    app.clearMessages();
  });

  $('#add_rm').click(function(event) {
    var roomname = $('#rm_name').val();
    $('#rm_name').val('');
    app.renderRoom(roomname);
  });
    
});

let data = {
  username: 'shawndrost',
  text: 'trololo',
  roomname: ''
};
let friends = {};
let msg = [];

let app = {};

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
    data: {
      order: '-createdAt'
    },
    success: function (data) {
      console.log(data, 'chatterbox: Message received');
      for (var i = 0; i < data.results.length; i++) {
      // msg.push(data.results[0]);
        app.renderMessage(data.results[i]);
      }
      app.handleUsernameClick();
      console.log(friends);

      
      // msg = data;
    },
    // complete: function() {
    //   setTimeout(function() {
    //     app.fetch();
    //   }, 1000);
    // },
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
};

app.renderMessage = function(data) {
 
  // let handle = `<div class="chat username">
  //                   <strong>${data.username}:</strong><br>
  //                   ${data.text}
  //               </div>`;
  // handle = _.escape(handle);
  let text = _.escape(data.text);
  let user = _.escape(data.username);
  if (data.text !== undefined && data.username !== undefined) {
    $('#chats').prepend('<div class="chat username"><strong>' + user + 
                        ':</strong><br>' + text + '</div>');
  }

  // $('.chat').append('<span>' + message + '</span><br>');

};

app.renderRoom = function(roomName) {
  roomName = _.escape(roomName);
  $('#rm_select').append('<option>' + roomName + '</option>');
};

app.handleUsernameClick = function() {

  $('.username').click(function(event) {
    
    let handle = event.currentTarget.childNodes[0].innerHTML;
    console.log(handle);
    if (!friends.hasOwnProperty(handle)) {
      friends[handle] = handle;
    }
    console.log(friends);
  });
};