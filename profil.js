//CREATION D'UN TABLEAU CONTENANT TOUS LES UTILISATEURS
var utilisateurs = [];

//Variable pour saoir si un utlisateur est connecté
var estConnecte = false;

//création d'un prototype utilisateurs
var utilisateur = {
    //initialiser l'utilisateurs
    initUser: function (id, date, genre, mail, password, pseudo, preferences) {
        this.id = id;
        this.mail = mail;
        this.password = password;
        this.pseudo = pseudo;
        this.preferences = preferences;
        this.date = date;
        this.genre = genre;
    },
    //ajouter cet utilisateur dans le tableau
    ajouter: function () {
        utilisateurs.push(this);
    }
};

//Charger tous les utilisateurs présents dans le fichier json pour les ajouter dans le tableau
$(document).ready(function ($) {
    $.get(
        'utilisateur.json',
        function (data) {
            var i = 0;
            while (i < data.user.length) {
                var util = Object.create(utilisateur);
                util.initUser(data.user[i].id, data.user[i].date, data.user[i].genre , data.user[i].email, data.user[i].password, data.user[i].username, data[i].user[i].preferences);
                util.ajouter();
                console.log(data.user[i]);
                i++;
            }
        },
        'json'
    );
});

 $(document).ready(function($){
     if(utilisateurs != [])
     console.log(utilisateurs)
     user_info(utilisateurs, 0)
 })

function user_info(utilisateurs, id) {
    // Déclaration des variables
    console.log(utilisateurs)
    current_user = []
    for (var i = 0; i < utilisateurs.length; i++){
        if (id == utilisateur[i].id){
            current_user = utilisateur[i]
        }
    }

    $('#nom').html(current_user.username)
    $('#genre').html()
    $('#date').html(current_user.date)
    //$('#pref1j').html(current_user.preferences[0])
    //$('#pref2j').html(urrent_user.preferences[1])
}
// $(document).ready(function ($) {
// for (var i = 0; i < utilisateurs.length; i++) {
//     console.log(data.user[i].id)
//     if (data.user[i].id == id) {
//         user = data.user[i]
//         username = data.user[i].username
//         console.log(user)
//         $('#nom').html(data.user[i].username)
//         $('#genre').html()
//         $('#date').html(data.user[i].Date_inscription)
//         console.log(data.user[i].preferences_jeux[0].pref1)
//         $('#pref1f').html(data.user[i].preferences_films[0].pref1)
//         $('#pref2f').html(data.user[i].preferences_films[0].pref2)

//         $('#pref1j').html(data.user[i].preferences_jeux[0].pref1)
//         $('#pref2j').html(data.user[i].preferences_jeux[0].pref2)


//     }
// }
// });
