var app = angular.module('Forum', []);

app.controller('ForumController', function(){
  this.vue = topics;
});

var topics ={ name: 'Azurite', date: '1388123412323', price: 2.9, soldOut: false, canPurchase: true }; /*{
  nom: "Star wars BF2 arnaque ou coup de génie",
  auteur: "BestProGamer",
  date: '1388123412323',
  text: "Lorem ipsum",
  pb = 0,
  pr = 0
};*/
