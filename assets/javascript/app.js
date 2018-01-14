
var topics = ["Gandalf", "Sam Gamgee", "Frodo", "Aragorn", "Gimli"];

function displayCharacterGifs() {
	$("#characters").empty();

	var character = $(this).attr("char-name");

	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        character + "&api_key=CB46iVTGG009grx74us972tJ7cUalnZ7&limit=10";

    $.ajax({
          url: queryURL,
          method: "GET"
        })
        .then(function(response) {
        	console.log(response);

        	var characters = response.data;

        	for(var i = 0; i < characters.length; i++){
        		var div = $("<div>");
        		div.attr("id", "gifDiv");

        		//Get the still url and append it to the page
        		var gif = $("<img>");
        		var still_img = characters[i].images.fixed_height_still.url;
        		gif.attr("still_url", still_img);
        		gif.attr("src", still_img);
        		gif.attr("id", "gif");
        		gif.attr("state", "still");
        		div.append(gif);

        		//Get the url for the moving gif and attach to the img
        		var moving_img = characters[i].images.fixed_height.url;
        		gif.attr("moving_url", moving_img);

        		var rating = characters[i].rating;
        		var p = $("<p>");
        		p.text("Rating: " + rating);
        		div.append(p);

        		$("#characters").append(div);
        }
    });
};

//Play and pause the gif's
$(document).on("click", "#gif", function() {
	if($(this).attr("state")=="still"){
		$(this).attr("src", $(this).attr("moving_url"));
		$(this).attr("state", "moving");
	}
	else{
		$(this).attr("src", $(this).attr("still_url"));
		$(this).attr("state", "still");
	}

});

//Display the gif buttons
function renderButtons() {

	$("#lotrButtons").empty()

	for(var i = 0; i < topics.length; i++){
		var b = $("<button>");

		b.addClass("character");

		b.addClass("btn-success");

		b.attr("char-name", topics[i]);

		b.text(topics[i]);

		$("#lotrButtons").append(b).append(" ");
		
		
	}
}

//Extract the value of text field and create a new button
$("#submitChar").on("click", function() {
	event.preventDefault();

	var character = $("#char-input").val().trim();

	topics.push(character);

	renderButtons();

	$("#char-input").val("");
});

//Allow dynamic buttons to be clicked
$(document).on("click", ".character", displayCharacterGifs);


renderButtons();