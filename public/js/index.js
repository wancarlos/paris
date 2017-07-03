$('.toggle').on('click', function() {
  function validateEmail($mail) {
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailReg.test( $mail );
  }
  var email = $('.emailof').val();

  if(validateEmail(email) && email != ""){
    $('.container').stop().addClass('active');
  } else {
    new Noty({
      text: 'Entrez une adresse email valid dans le champ',
      layout: 'centerRight',
      timeout: '2000',
      killer: true,
      theme: 'sunset'
    }).show();
  }
});

$('.close').on('click', function() {
  $('.container').stop().removeClass('active');
});

$('.enbtn').on('click', function() {

  var email = $('.emailof').val();
  var name = $('.myname').val();

  if(name != ""){
    $.ajax({
      url: '/send',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({"email": email, "name": name}),
      success: function(response){
        if(response.ok){
          alert("Merci ! Vous êtes un vrai ami.")
        }
        if(response.errr){
          alert("Une erreur s'est produite veuillez réessayer");
        }
      }
    })
  } else {
    new Noty({
      text: 'Entrez Votre prénom dans le champ',
      layout: 'centerRight',
      timeout: '2000',
      killer: true,
      theme: 'sunset'
    }).show();
  }
});
