//CREATION D'UN TABLEAU CONTENANT TOUS LES UTILISATEURS ET TOUS LES TOPICS
var topics = [];
var utilisateurs = []


//création d'un prototype utilisateurs
var topic = {
    //initialiser l'utilisateurs
    initTopic: function (id, tags, date ) {
        this.id = id;
        this.tags = tags;
        this.date = date;
    },
    //ajouter cet utilisateur dans le tableau
    ajouter: function () {
        topics.push(this);
    }
};

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
        'topic.json',
        function (data) {
            var i = 0;
           while (i < data.topic.length) {
                var top = Object.create(topic);
                top.initTopic(data.topic[i].id, data.topic[i].tags, data.topic[i].date);
                top.ajouter();
                //console.log(data.user[i]);
                
                i++; 
            }
        },
        'json'
    );

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


/* Fonction algortihme: Trie et remonte les 3 topices les mieux notée e nfonction des utilisateurs dans le mois
 * Prends en entrez: les préférences utilisateurs, les topics
 * Donne en sortie: l'id des topics
 */


function test (topics){
    //date = topics[0].date
    console.log(topics)
}

 function filtre_pref (user_pref, topics){
     var topic_filtre = []
     var topic_tag = []

     type()
 }

$('#test').click(function () {
    console.log('Click');
});