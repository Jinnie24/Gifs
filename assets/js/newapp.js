var buttons = ["lol", "power", "gotcha"];
showButtons(buttons);
function showButtons(list){
    $("#button-holder").empty();
    for (var i = 0; i < list.length; i++) {
        var newButPar = $("<div>");
        var newButton = $("<button>");
        newButton.attr("data-value", list[i]);
        newButton.addClass("btn btn-success");
        newButton.addClass("gifButton")
        newButton.text(list[i]);
        $(newButPar).append(newButton);
        $(newButPar).prepend("<br>");
        $("#button-holder").append(newButPar);
    }
}

$("#add-gif").on("click", function(event) {    
    event.preventDefault();
    var gifName = $("#gif-input").val().trim();
    $("#gif-input").html("");
    if (buttons.includes(gifName)) {
        alert("This button isalready exists. Please create a new button");
    }
    if (gifName !== '' && !buttons.includes(gifName)) {
        buttons.push(gifName);
    }
    
    showButtons(buttons);
});

$("#button-holder").on("click", ".gifButton", function(event) {
    event.preventDefault();
    console.log("this works");
    var value = $(this).attr("data-value");
    console.log($(this).attr("data-value"));
    
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        value + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
      })
        .then(function(response) {
            console.log(queryURL);
            console.log(response);
        
            var results = response.data;
            for (var i = 0; i < results.length; i++) {
                var gifDiv = $("<div>");
                var p = $("<p>").text("Rating: " + results[i].rating);
                var gifImage = $("<img>");
                gifImage.addClass("gifImage");
                gifImage.attr("src", results[i].images.fixed_height.url);
                gifImage.attr("data-state", "animate")
                gifDiv.append(p);
                gifDiv.append(gifImage);
                $("#gif-holder").prepend(gifDiv);
            }
        });

        
});