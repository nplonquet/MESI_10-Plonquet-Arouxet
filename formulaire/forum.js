$(document).ready(function() {

  window.MyApp = window.MyApp || {};

  function markInputAsValid( input ) {
    // Utiliser les classes Bootstrap .is-valid et .is-invalid
    input
    .addClass('is-valid')
    .removeClass('is-invalid');
    // On va se servir de l'id pour le sélecteur suivant
    // (balise small adjacente au champ input)
    var inputId = input.attr( 'id' );
    $( '#' + inputId + ' + small' )
    .removeClass( 'show' );
  }

  function markInputAsInvalid( input, message ) {
    input
    .addClass('is-invalid')
    .removeClass('is-valid');
    var inputId = input.attr( 'id' );
    console.log( inputId, $( '#' + inputId + ' + small' ), message );
    $( '#' + inputId + ' + small' )
    .addClass( 'show' )
    .html( message );
  }

  // Paramètres pour les envois par AJAX
  $.ajaxSetup({
      headers: {
          'content-type': 'application/json'
      }
  });

  // Gestion des erreurs
  $( document ).ajaxError(function(event, jqXHR,  ajaxSettings, thrownError) {
    var data = JSON.parse(jqXHR.responseText);
    window.MyApp.alert( 'danger', data.message );
  });

  $('#register-username')
  .change(function(e) {
    console.log("register-usernamne")
    nom_user = "";
    var inputUsername = $(this);
    var username = inputUsername.val();
    var re = /^[A-Za-z][A-Za-z0-9_]+$/;
    var isUsernameValid = username.match(re);
    user_verif = verif(isUsernameValid)
    console.log(user_verif)
    if(! isUsernameValid) {
      markInputAsInvalid( inputUsername,
        "L'identifiant doit commencer par une lettre, et être suivi par " +
        "au moins une lettre OU un chiffre OU un tiret bas _"
      );



      return;
    }});

  /*function verif(isUsernameValid) {
    console.log("verif_user")
    $.ajax({
      URL: 'utilisateur.json',
      type: 'GET',
      data: 'username',
      success: function (json) {
        for (var user in json) {
          alert(json[user]);
        }
    });
        console.log("nom_user: ", nom_user)
        if (nom_user == isUsernameValid) {
          return true;
        }
        else {
          return false;
        }
      }}; */

    // Envoi d'une requête AJAX vers une URL qui va nous renvoyer un
    // objet JSON avec un booléen "success" qui va nous dire si le username
    // est disponible (true) ou non (false)


  $('#register-email')
  .change(function(e) {
    var inputEmail = $(this);
    var email = inputEmail.val();
    var re = /^[A-Za-z][A-Za-z0-9_\.]+@[A-Za-z][A-Za-z0-9_\.]+\.[a-z]{2,}$/;
    var isEmailValid = email.match(re);
    if(! isEmailValid) {
        markInputAsInvalid( inputEmail );
        return;
    };

    // Même chose que pour le username, cette fois avec l'email
    $.get(
      "utilisateur.json",
      function(response) {
        console.log(response.success)
        if(response.success) {
          markInputAsValid( isEmailValid );
        }
        else {
          markInputAsInvalid( inputEmail, "Cet e-mail est déjà pris" );
        }
      }
    );
  })

$('#register-password')
  .change(function(e) {
    var inputPassword = $(this);
    var password = inputPassword.val();
    if(password.length < 4) {
        markInputAsInvalid( inputPassword, "Mot de passe trop court (4 caractères minimum" );
        return;
    }

    markInputAsValid( inputPassword );
  });

  // Soumission du formulaire d'inscription vers le serveur
  $('#form-register').submit(function(e) {
    var inputs = $(this).find('input');
    var emptyOrInvalid = [];
    inputs.each( function( index, elem ) {
      var input = $( this );
      if( ! input.val() || ! input.hasClass( 'is-valid' ) ) {
        emptyOrInvalid.push( input.siblings( 'label' ).html() );
      }
    } );
    // Si au moins un champ est vide ou n'a pas is-valid
    // on notifie et on interrompt par return
    if( emptyOrInvalid.length ) {
      var message = emptyOrInvalid.length + ' champs vides ou ' +
        'invalides :<br>' + emptyOrInvalid.join(', ');
      MyApp.alert( 'danger', message );
      return false;
    }
    // Dans chaque itération input[i] est un élément DOM
    var username = $('#register-username').val();
    var email    = $('#register-email').val();
    var password = $('#register-password').val();
    var user = {
      username: username,
      email: email,
      password: password
    };
    var userJSON = JSON.stringify(user);
    console.log(user);
    console.log(userJSON);
    e.preventDefault();
    inputs.val('').removeClass('is-valid');
    $.post(
      'utilisateur.json',
      userJSON,
      function(data) {
        window.MyApp.alert( 'success', 'Bienvenue, ' + data.user.username );
      },
      'json'
    );
  })


  $('#form-login').submit(function(e) {
      var identifier = $('#login-identifier').val();
      var password   = $('#login-password').val();
      var user = {
          identifier: identifier,
          password: password
      };
      e.preventDefault();
      $(this).find('input').val('');
      $.post(
        'utilisateur.json',
        user,
        function(data) {
          console.log("passage")
          var i = 0
          while(i < data.user.length){
            console.log(user.identifier, user.password, data.user[i], i, data.user.length);
            if (user.identifier == data.user[i].username && user.password == data.user[i].password){
            MyApp.alert('success', "Vous êtes identifié, " + data.user[i].username)
            break;}
          else if (i == data.user.length - 1){
            if(user.identifier == "" || user.password == ""){
              MyApp.alert('danger', "Veuillez saisir tous les champs pour vous identifier")
            } else{
            MyApp.alert('danger', "Nous ne parvenons pas à vous identifier: utilisateur ou mdp incorrect")
            }
        }
        i++}
        },
        'json'
      );
  })

  var onglets = $('#onglets li a');

  onglets.click(function(e) {
      var link = $(this);
      onglets.removeClass('active');
      link.addClass('active');
      var idPanneau = link.data('tab-id');
      $('.tab').hide();
      $('#' + idPanneau).show();
  });


});
