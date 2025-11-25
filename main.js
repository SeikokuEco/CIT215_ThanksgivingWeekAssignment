$(document).ready(function () {

    $("#searchBtn").on("click", function () {
        let term = $("#searchTerm").val().trim();

        if (term === "") {
            alert("Please enter a search term.");
            return;
        }

        $.ajax({
            url: "https://itunes.apple.com/search",
            method: "GET",
            dataType: "jsonp", // IMPORTANT: iTunes requires JSONP
            data: {
                term: term,
                entity: "musicTrack",
                limit: 20 // can change to return more than 20 songs
            },

            success: function (response) {
                $("#results").empty();

                if (response.results.length === 0) {
                    $("#results").html("<p>No results found.</p>");
                    return;
                }

                response.results.forEach(track => {
                    let card = `
                        <div class="card">
                            <img src="${track.artworkUrl100}">
                            <h3>${track.trackName}</h3>
                            <p><strong>Artist:</strong> ${track.artistName}</p>
                            <p><strong>Album:</strong> ${track.collectionName}</p>
                            <audio controls>
                                <source src="${track.previewUrl}" type="audio/mpeg">
                            </audio>
                        </div>
                    `;
                    $("#results").append(card);
                });
            },

            error: function () {
                alert("Error fetching music data.");
            }
        });
    });

});
