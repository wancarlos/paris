$(document).ready(function(){
  $('.submitbtn').on('click', function(){
    var name = $('.name').val();
    var email = $('.email').val();
      $('.name').removeClass('errorinput');
      $('.email').removeClass('errorinput');
    if(name != "" && email != ""){
      $.ajax({
        method: 'POST',
        url: '/send',
        contentType: 'application/json',
        data: JSON.stringify({name: name, email: email}),
        success: function(response){
          if(response.errors){


          }

          if(response.ok){


          }
        }
      });
    } else {
      if(name == ""){
        $('.name').addClass('errorinput');
      }

      if(email == ""){
        $('.email').addClass('errorinput');
      }
    }
  });
})
