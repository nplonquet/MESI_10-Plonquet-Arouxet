//Utilisé pour éviter le conflit avec d’autres plugins qui seraient liés
//à la page
//jQuery.noConflict();

jQuery(document).ready(function() {
//Evénement lié au clic du bouton de la page
jQuery(".shadowbox").click(function() {
   cpt = 0
//Récupération des dimensions de la page
var xHeight = jQuery(document).height();
var xWidth = jQuery(document).width();
//Dimensionnement du masque recouvrant la page
jQuery("#page").css({"width":xWidth,"height":xHeight});
//Apparition du masque
jQuery("#page").fadeIn();
//Attribution à celui-ci d’une transparence de
//façon à laisser la page légèrement visible 
jQuery("#page").fadeTo("fast",0.6); 
var xH = jQuery(document).height();
var xW = jQuery(document).width();
//Centrage de la shadow box
jQuery("#dialog").css("top", xH/6-jQuery("#dialog").height()/2);
jQuery("#dialog").css("left", xW/2-jQuery("#dialog").width()/2);
//Apparition de la shadow box
jQuery("#dialog").fadeIn(); 

});
//Fermeture de la shadow box si l'on clique en dehors de celle-ci
jQuery(".window .close").click(function (e) {
jQuery("#page").hide();
jQuery(".window").hide(); 
//} else {cpt ++}
}); 
}); 