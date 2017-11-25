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



//CREATION D'UN TABLEAU CONTENANT TOUS LES UTILISATEURS
var utilisateurs = [];

//Variable pour saoir si un utlisateur est connecté
var estConnecte = false;

//création d'un prototype utilisateurs
var utilisateur = {
  //initialiser l'utilisateurs
  initUser: function (mail, password, pseudo) {
    this.mail = mail;
    this.password = password;
    this.pseudo = pseudo;
  },
  //ajouter cet utilisateur dans le tableau
  ajouter: function () {
    utilisateurs.push(this);
  }
};

//Charger tous les utilisateurs présents dans le fichier json pour les ajouter dans le tableau
$(document).ready(function ($) {
  $.post(
    'utilisateur.json',
    function (data) {
      var i = 0;
      while (i < data.user.length) {
        var util = Object.create(utilisateur);
        util.initUser(data.user[i].email, data.user[i].password, data.user[i].username);
        util.ajouter();
        //console.log(data.user[i]);
        //console.log(utilisateurs)
        i++;
      }
    },
    'json'
  );
});

function verif_username (IsValidUN, utilisateurs){
  console.log("verif_username")
  for (var i = 0; i < utilisateurs.length; i++){
    if (utilisateurs[i].pseudo == IsValidUN){
      return true;
    } else if (i == utilisateurs.length - 1){
      return false
    }

  }
}

  function verif_mail(IsValidmail, utilisateurs) {
    console.log("verif_mail")
    for (var i = 0; i < utilisateurs.length; i++) {
      if (utilisateurs[i].mail == IsValidmail) {
        return true;
      } else if (i == utilisateurs.length - 1) {
        return false
      }

    }
  }

  function verif_password(IsValidpassword, utilisateurs) {
    console.log("verif_password")
    for (var i = 0; i < utilisateurs.length; i++) {
      if (utilisateurs[i].password == IsValidpassword) {
        return true;
      } else if (i == utilisateurs.length - 1) {
        return false
      }

    }
  }
  $('#register-username')
  .change(function(e) {
    console.log(utilisateurs)
    nom_user = "";
    var inputUsername = $(this);
    var username = inputUsername.val();
    var re = /^[A-Za-z][A-Za-z0-9_]+$/;
    var isUsernameValid = username.match(re);
    console.log("fonction")
    user_verif = verif_username(isUsernameValid, utilisateurs)
    console.log(user_verif)
    if(! isUsernameValid) {
      markInputAsInvalid( inputUsername,
        "L'identifiant doit commencer par une lettre, et être suivi par " +
        "au moins une lettre OU un chiffre OU un tiret bas _"
      );} else if (user_verif == true) {
         markInputAsInvalid(inputUsername,
        "L'identifiant déjà pris... " +
        "Veuillez-en choisir un autre"
      );} else{
        markInputAsValid(inputUsername);
      }
      return;
    });


    // Envoi d'une requête AJAX vers une URL qui va nous renvoyer un
    // objet JSON avec un booléen "success" qui va nous dire si le username
    // est disponible (true) ou non (false)


  $('#register-email')
  .change(function(e) {
    var inputEmail = $(this);
    var email = inputEmail.val();
    var re = /^[A-Za-z][A-Za-z0-9_\.]+@[A-Za-z][A-Za-z0-9_\.]+\.[a-z]{2,}$/;
    var isEmailValid = email.match(re);
    var email_verif = verif_mail(isEmailValid, utilisateurs);
    if(! isEmailValid) {
        markInputAsInvalid( inputEmail, 
        "Email invalide il doit posséder une lettre suivis de" +
        "au moins un chiffre ou une lettre ou un . et elle doit comporter un @ et un ."
       );
        return;
    } else if(email_verif == true){
      markInputAsInvalid(inputEmail,
        "L'email déjà pris... " +
        "Veuillez-en choisir un autre");
    } else {
      markInputAsValid(inputEmail);
    }});
      

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
    var username = $('#register-username').val();
    window.MyApp.alert( 'success', 'Bienvenue, ' + username );

  })


  $('#form-login').submit(function(e) {
      var identifier = $('#login-identifier').val();
      var password   = $('#login-password').val();

      if (verif_username(identifier, utilisateurs) && verif_password(password, utilisateurs)){
        MyApp.alert('success', "Vous êtes identifié, " + identifier)
      } else if (identifier == "" || password == ""){
        MyApp.alert('danger', "Veuillez saisir tous les champs pour vous identifier")
      } else {
        MyApp.alert('danger', "Nous ne parvenons pas à vous identifier: utilisateur ou mdp incorrect")
      }
      e.preventDefault();
      
  });
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
