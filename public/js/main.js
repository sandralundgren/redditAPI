//document.getElementById('theButton').addEventListener('click', getJSON); 

$(document).ready(function () {

  $.ajax({
        // Let's use the local file instead
        url: '/reddit-local',
        type: 'get',
        success: function (data) {

          for (var i = 0; i < data.length; i++) {

            $('#posts').append('<li>' + '<a href="' + data[i].url + '">' + data[i].title + '</a>' + '</li>');

          }
        },
        fail: function () {
        	console.log('Something went wrong.');
        }
      });	
             
});


