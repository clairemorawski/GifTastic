//Array of Variables
var topics = ["Puppies", "Bunnies", "Lions", "Sea Otters", "Miniature Ponies", "Kangaroos", "Koalas", "Panadas", "Foxes", "Sloths"];

// initially calls the makeButtons function
function makeButtons() {
    $('#buttonsView').empty();
    for (var i = 0; i < topics.length; i++) {
        var button = $("<button>").text(topics[i]);
        button.attr("data-animal", topics[i]);
        button.addClass("topic-button");
        $("#buttonsView").append(button);
    }
}



//Adding an animal
$("#addAnimal").on("click", function (p) {
    p.preventDefault();
    var alreadyExist = false;
    if (topics.indexOf($("#new-animal-input").val()) != -1) {
        alreadyExist = true;
        console.log(alreadyExist)
    }
    // topics.push($("#new-animal-input").val())
    if ($("#new-animal-input").val() != "" && alreadyExist === false) {

        console.log(alreadyExist)
        // var newAnimal = $("#new-animal-input").val().toLowerCase();
        // topics.push(newAnimal);
        // var button = $("<button>").text(newAnimal);
        // button.attr("data-animal", newAnimal);
        // button.addClass("topic-button");
        // $("#buttons-group").append(button);
        $("#new-animal-input").val()
    }
    console.log("add animal click")
    $("new-animal-input").val("");
});

//Display Gifs
$(document).on("click", ".topic-button", function () {
    var animal = $(this).data("animal");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&limit=9&api_key=dS7eZbLLiOZjoEFQJYT8QafIwJ81sYr4";

    console.log(queryURL)
    //AJAX
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function (response) {
        //Results are saved as variable
        console.log(response)
        var results = response.data;
        var resultsContainerSection = $("<section class='results-container'>");

        for (var i = 0; i < results.length; i++) {
            var singleResultDiv = $("<div class='result-container'>");
            var rating = results[i].rating;
            var p = $("<p>").text("Rating: " + rating);

            var animalImg = $("<img class='result'>");
            animalImg.attr("src", results[i].images.fixed_height_still.url);
            animalImg.attr("data-state", "still");
            animalImg.attr("data-still", results[i].images.fixed_height_still.url);
            animalImg.attr("data-animate", results[i].images.fixed_height.url);

            singleResultDiv.prepend(animalImg);
            singleResultDiv.prepend(p);
            resultsContainerSection.prepend(singleResultDiv);
        }
        $("#gifsView").prepend(resultsContainerSection);
    });
});

//Animating Gifs
$(document).on("click", ".result", function () {
    var state = $(this).attr('data-state');
    if (state === "still") {
        $(this).attr("src", $(this).data("animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).data("still"));
        $(this).attr("data-state", "still");
    };
});

// function for displaying show gifs
// $(document).on("click", ".show", displayGifs());
makeButtons()
