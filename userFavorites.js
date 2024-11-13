$(document).ready(function () {

    var fav = [];
    var usersStoredFavorites = (window.localStorage.getItem("fav"))

    var favURL = window.location.pathname + "?icao="
    var favZoom = "&zoom=2"

    if (!window.localStorage.getItem("fav")) {
        $("#listOfFaves").text("CLEARING BROWSER COOKIES WILL CLEAR OUT ANY STORED FAVORITES.  \n \nNo favorites currently set. \n \nUse the section below to add new favorites. ")
        window.localStorage.setItem("fav", [])
    } else {
        fav.push(usersStoredFavorites.toString().replace(/"/g, " "))
        // fav.forEach(favLoop)
        fav.forEach(favLoop)


        function favLoop(item) {
            $("#listOfFaves").html(`${item}`)
        }
    }

    $(".addFavButtonSet").on("click", function () {
        var currentlyStoredFavorites = (window.localStorage.getItem("fav"))
        fav.push(currentlyStoredFavorites)
        var newFavoriteText = JSON.stringify($("#addNewFavorite").val())
        fav.push(newFavoriteText)
        fav.shift()

        localStorage.setItem("fav", fav)
        $(".ICAOSaved").html(`${newFavoriteText} saved to Favorites!`);

        location.reload();
    });
    $('#addNewFavorite').keypress(function(e){ //user entered value into the text field()
        if(e.which == 13){//Enter key pressed
            $('.addFavButtonSet').click();//button
        }
    });

    $("#loadFavorites").on("click", function () {
        var loadOnMap = []

        loadOnMap.push(usersStoredFavorites.toString().replace(/"/g, ""))
        console.log(loadOnMap.toString().replace(/"/g, ""))
        window.location = favURL + loadOnMap 

    })

    $("#clearAllFaves").on("click", function (e) {
        e.preventDefault();
        if (window.confirm("Are you sure you want to delete all favorites?")) {
            window.localStorage.removeItem("fav");
            location.reload();
        }
        
    });

});