 var gifs = ["cat", "dog", "bird"];
 
 

    $("#add-gif").on("click", function(event) {
        
        event.preventDefault();
        var gif = $("#gif-input").val().trim();
        if (gif !== '') {
            gifs.push(gif);
        }
        renderButtons();
    });

    renderButtons();
 
 $(".gif").on("click", function() {
        console.log("working");
     
      var value = $(this).attr("data-value");
        console.log($(this).attr("data-value"));
    
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        value + "&api_key=dc6zaTOxFJmzC&limit=5";

  
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

            // Creating and storing an image tag
            var gifImage = $("<img>");
            // Setting the src attribute of the image to a property pulled off the result item
            gifImage.attr("src", results[i].images.fixed_height.url);

            // Appending the paragraph and image tag to the gifDiv
            gifDiv.append(p);
            gifDiv.append(gifImage);

            // Prependng the gifDiv to the HTML page in the "#gifs-appear-here" div
            $("#gif-holder").prepend(gifDiv);
          }
        });
    });
    

      
      function renderButtons() {

        $("#button-holder").empty();

        
        for (var j = 0; j < gifs.length; j++) {
          var a = $("<button>");
          a.addClass("gif");
          a.attr("data-value", gifs[j]);
          a.text(gifs[j]);
          $("#button-holder").append(a);
          console.log(a);
        }
      }

    $(document).on("click", ".gif-btn", displayGifInfo);

      // Calling the renderButtons function to display the intial buttons
      renderButtons();

      