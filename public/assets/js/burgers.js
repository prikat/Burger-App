// attach handlers when DOM is fully loaded
$(function(){
    // click event for "Devour it" and "Regurgitate?" buttons
    $(".change-devoured").on("click", function(event) {
        // set id to id of button that is clicked
        var id = $(this).data("id");
        var newDevour = $(this).data("newdevour");
        newDevour = !newDevour;
        // set devour state of burgeobject to new devour state
        var newDevourSate = {
            devoured: newDevour
        };
        // ajax call to update devour state of burger
        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: newDevourSate
        }).then(
            function() {
                console.log("changed devour state to ", newDevour);
                // reload page to update list of burgers
                location.reload();
            }
        );
    });
    // event listener for submit button
    $(".create-form").on("submit", function(event) {
        event.preventDefault();
        // set new burger object with burger name and devoured state from user input
        var newBurger = {
            burger_name: $("#burger").val().trim(),
            devoured: $("[name=devoured]:checked").val().trim()
        };
        // send post request
        $.ajax("/api/burgers", {
            type: "POST",
            data: newBurger
        }).then(function() {
            console.log("created new burger");
            // reload page to udpate list of burgers with new entry
            location.reload();
        });
    });
});