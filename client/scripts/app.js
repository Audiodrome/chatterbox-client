// YOUR CODE HERE:



let data = {
  username: 'shawndrost',
  text: 'trololo',
  roomname: ''
};

// let friends = {};
// let msg = [];

let App = function() {
  this.friends = {};
  this.msg = [];
  this.server = 'http://parse.la.hackreactor.com/chatterbox/classes/messages';
};

// app.server = 'http://parse.la.hackreactor.com/chatterbox/classes/messages';

App.prototype.init = function() {
  
  this.fetch();
};

App.prototype.send = function(message) {
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

App.prototype.fetch = function() {
  
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
      console.log(this.friends);

      
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

App.prototype.clearMessages = function() {
  var node = $('#chats').children();
  for (var i = 0; i < node.length; i++) {
    node.remove(node.children[i]);
  }
};

App.prototype.renderMessage = function(data) {
 
  // let handle = `<div class="chat username">
  //                   <strong>${data.username}:</strong><br>
  //                   ${data.text}
  //               </div>`;
  // handle = _.escape(handle);
  
  if (data.text !== undefined && data.username !== undefined) {
    data.username = data.username.replace(/%20/g, '');
    let text = _.escape(data.text);
    let user = _.escape(data.username);
    $('#chats').prepend('<div class="chat username"><strong>' + user + 
                        ':</strong><br>' + text + '</div>');
  }

  // $('.chat').append('<span>' + message + '</span><br>');

};

App.prototype.renderRoom = function(roomName) {
  roomName = _.escape(roomName);
  $('#rm_select').append('<option>' + roomName + '</option>');
};

App.prototype.handleUsernameClick = function() {
  let friends = this.friends;
  $('.username').click(function(event) {
    // console.log(event);
    let handle = event.currentTarget.childNodes[0].innerHTML;
    console.log(handle);
    if (!friends.hasOwnProperty(handle)) {
      friends[handle] = handle;
    }
    console.log(friends);
  });
};

let app = new App();

$(document).ready(function() {
  app.init();
  
  // app.fetch();
  
  //console.log(window.location.search);
  data.username = _.escape(data.username);
  data.username = window.location.search.replace(/^\?username=/g, '');
  data.username = data.username.replace(/%20/g, ' ');
  
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

  $('.username').click(function(event) {
    // console.log(event);
    let handle = event.currentTarget.childNodes[0].innerHTML;
    app.handleUsernameClick(handle);
  });
    
});
