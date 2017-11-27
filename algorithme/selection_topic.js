//CREATION D'UN TABLEAU CONTENANT TOUS LES UTILISATEURS ET TOUS LES TOPICS
var topics = [];
var utilisateurs = []


//création d'un prototype utilisateurs
var topic = {
    //initialiser l'utilisateurs
    initTopic: function (id, titre, tags, date, rate, auteur ) {
        this.id = id;
        this.tags = tags;
        this.date = date;
        this.rate = rate;
        this.titre = titre;
        this.auteur = auteur;
    },
    //ajouter cet utilisateur dans le tableau
    ajouter: function () {
        topics.push(this);
    }
};

var utilisateur = {
    //initialiser l'utilisateurs
    initUser: function (id, pref) {
        this.id = id;
        this.pref = pref;
    },
    //ajouter cet utilisateur dans le tableau
    ajouter: function () {
        utilisateurs.push(this);
    }
};

//Charger tous les utilisateurs présents dans le fichier json pour les ajouter dans le tableau
$(document).ready(function($) {
  $('#ex1-button1').click(function() {
    $(this).toggleClass('red');
    filtre_pref(utilisateurs, topics_brut, 1);
  });

  $("#jeux_interet").hover(function(e){
      topics_brut = []
          topics_brut = topics
          console.log(topics_brut)

      topics = filtre_pref(utilisateurs, topics_brut, 2);
      console.log(topics)
      $("#interet1").html('<a href = "#" ><strong>'+ (topics[0].titre)+ '</strong> - auteur: ' + topics[0].auteur + '- date: '+ topics[0].date+'</a>');
      $("#interet2").html('<a href = "#" ><strong>' + (topics[1].titre) + '</strong> - auteur: ' + topics[1].auteur + '- date: ' + topics[1].date + '</a>');
      $("#interet3").html('<a href = "#" ><strong>' + (topics[2].titre) + '</strong> - auteur: ' + topics[2].auteur + '- date: ' + topics[2].date + '</a>');
      e.preventDefault();
  })
    $.post(
        'topic.json',
        function (data) {
            var i = 0;
           while (i < data.topic.length) {
                var top = Object.create(topic);
                top.initTopic(data.topic[i].id, data.topic[i].titre, data.topic[i].tags, data.topic[i].date, data.topic[i].rate, data.topic[i].Auteur);
                top.ajouter();
                console.log(topics)

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
                util.initUser(data.user[i].id, data.user[i].preferencesJ);
                util.ajouter();
                i++;
                console.log(data)
            }
        },
        'json'
    );
});


/* Fonction algortihme: Trie et remonte les 3 topices les mieux notée e nfonction des utilisateurs dans le mois
 * Prends en entrez: les préférences utilisateurs, les topics
 * Donne en sortie: l'id des topics
 */


function filtre_pref (user_pref, topics_brut, id){

    // Définition des données
    var preferences = [];
     var topic_retour = []
     var topic_tag = []
     var inter = []

     // Récupération des préférence de l'utilisateur connecté
     for (var i = 0; i < user_pref.length; i++){
         if (user_pref[i].id == id){
            preferences = user_pref[i].pref
         }
     }

    // Si l'utilisateurs n'a pas de préférences return un tableau vide
     if (preferences == []){
         return []
     }


    //1ere étape: trie par date
     //Comming Soon...


    //2nd étape: trie par préférences
    for (var i = 0; i < topics_brut.length; i++){
        var sortie = false;
        var cpt = 0
        while(!sortie && (cpt < preferences.length)){
           var j = 0;
           while(j < topics_brut[i].tags.length){
               if(preferences[cpt] == topics_brut[i].tags[j]){
                   topic_tag.push(topics_brut[i])
                   sortie = true
               }
               j++
           }
            cpt++
        }
    }
    //3eme étape: trie par note (tri à bulle)
     i = 0;
     while(i < topic_tag.length){
         console.log("coucou")
      var j = i + 1;
       for(j; j < topics_brut.length - 1; j++){
           if (topic_tag[i].rate < topic_tag[j].rate){
               inter = topic_tag[i];
               topic_tag[i] = topic_tag[j];
               topic_tag[j] = inter;
               inter = []
               console.log(topic_tag)
           }
       }
       i++
     }

    //4eme étape: retour des variable
     for(var i = 0; i < 3; i++){
        topic_retour.push(topic_tag[i])
     }

     return topic_retour
 }
