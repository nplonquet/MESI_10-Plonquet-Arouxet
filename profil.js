//CREATION D'UN TABLEAU CONTENANT TOUS LES UTILISATEURS
var utilisateurs = [];

//Variable pour saoir si un utlisateur est connecté
var estConnecte = false;

//création d'un prototype utilisateurs
var utilisateur = {
    //initialiser l'utilisateurs
    initUser: function (id, date, genre, mail, password, username, preferencesJ, preferencesF, preferencesS, image) {
        this.id = id;
        this.mail = mail;
        this.password = password;
        this.username = username;
        this.preferencesJ = preferencesJ;
        this.preferencesF = preferencesF;
        this.preferencesS = preferencesS;
        this.date = date;
        this.genre = genre;
        this.image = image;
    },
    //ajouter cet utilisateur dans le tableau
    ajouter: function () {
        utilisateurs.push(this);
    }
};

//Charger tous les utilisateurs présents dans le fichier json pour les ajouter dans le tableau
$(document).ready(function ($) {
    $("body").hover(function(){
        console.log("hello")
        user_info(utilisateurs, 1)
    })
    $.get(
        'utilisateur.json',
        function (data) {
            var i = 0;
            while (i < data.user.length) {
                var util = Object.create(utilisateur);
                util.initUser(data.user[i].id, data.user[i].date, data.user[i].genre , data.user[i].email, data.user[i].password, data.user[i].username, data.user[i].preferencesJ, data.user[i].preferencesF, data.user[i].preferencesS, data.user[i].image);
                util.ajouter();
                i++;
            }
        },
        'json'
    );
});

 $("#cont").click(function($){
     console.log(utilisateurs)
     user_info(utilisateurs, 0)
 })

function user_info(utilisateurs, id) {
    // Déclaration des variables
    console.log(utilisateurs)
    current_user = []
    for (var i = 0; i < utilisateurs.length; i++){
        if (id == utilisateurs[i].id){
            current_user = utilisateurs[i]
        }
    }
    console.log(current_user)

    $('#nom').html(current_user.username)
    $('#genre').html(current_user.genre)
    $('#date').html("Inscrit le: " + current_user.date)
    $('#ps1').html(current_user.preferencesS[0])
    $('#ps2').html(current_user.preferencesS[1])
    $('#ps3').html(current_user.preferencesS[2])
    $('#pf1').html(current_user.preferencesF[0])
    $('#pf2').html(current_user.preferencesF[1])
    $('#pf3').html(current_user.preferencesF[2])
    $('#pj1').html(current_user.preferencesJ[0])
    $('#pj2').html(current_user.preferencesJ[1])
    $('#pj3').html(current_user.preferencesJ[2])
    $('#image').html('<img src = "' + current_user.image + '"/>')
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
