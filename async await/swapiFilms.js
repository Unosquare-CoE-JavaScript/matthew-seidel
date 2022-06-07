 "use strict"

const moviePlanets = function (movie) {
    let url = "https://swapi.co/api/films/" + movie;
    fetch(url).then(function (data) {
        data.planets.forEach(function (planet) {
            fetch(planet).then(function (data) {
                console.log(data.name);
            });
        });
    }).catch(function (error) {
        console.log(error);
    });
}

moviePlanets(1);