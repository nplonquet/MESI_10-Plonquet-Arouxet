username = ""
user = {
    username: "",
    email: "",
    preferences_jeux: [{
        pref1: "",
        pref2: "",
        pref3: ""
    }
    ],
    preferences_films: [{
        pref1: "",
        pref2: "",
        pref3: ""
    }
    ],
    preferences_série: [{
        pref1: "",
        pref2: "",
        pref3: ""
    }
    ],
};

id = 1
// $.ajax({
//     URL: 'utilisateur.json',
//     type: 'GET',
//     data:"user" 
// })



$.getJSON("utilisateur.json", function recup_user (data) {

    console.log(data, data.user.length, data.user)
    for (var i = 0; i < data.user.length; i++){
        console.log(data.user[i].id)
        if (data.user[i].id == id){
            user = data.user[i]
            username = data.user[i].username
            console.log(user)
            $('#nom').html(data.user[i].username)
            $('#genre').html()
            $('#date').html(data.user[i].Date_inscription)
            console.log(data.user[i].preferences_jeux[0].pref1)
            $('#pref1f').html(data.user[i].preferences_films[0].pref1)
            $('#pref2f').html(data.user[i].preferences_films[0].pref2)

            $('#pref1j').html(data.user[i].preferences_jeux[0].pref1)
            $('#pref2j').html(data.user[i].preferences_jeux[0].pref2)
            

        }
    }
});
