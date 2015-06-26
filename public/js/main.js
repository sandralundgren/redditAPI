//document.getElementById('theButton').addEventListener('click', getJSON); 

$(document).ready(function () {

  alert('main.js is linked');

  $.ajax({
        url: '/reddit',
        type: 'get',
        success: function (data) {

          for (var i = 0; i < data.length; i++) {

            $('#posts').append('<li>' + '<a href="' + data[i].url + '">' + data[i].title + '</a>' + '</li>');

          }
        }
      });	
             
});


