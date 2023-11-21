import { 
  introducirCard,
  crearTablaDetails,
  crearElementosDetails,
} from './module/functions.js'

//Key de la API por headers
const requestOptions = {
  headers:{
    "x-api-key": '0ff70d54-dc0b-4262-9c3d-776cb0f34dbd'
  }
}
let moviesData = {}
fetch ("https://moviestack.onrender.com/api/movies", requestOptions)
  .then(response => response.json())
  .then (data => {
    moviesData = data
    const movies = moviesData.movies

const search = location.search

const params = new URLSearchParams(search)

const id = params.get('id')

const movieid =  movies.find(movie => movie.id == id)

// Contenedor de las peliculas
const detailsContainer = document.getElementById("movieDetails")
const tabla1 = document.getElementById("datos1")
const tabla2 = document.getElementById("datos2")
// Tabla 1
const propiedadesTabla1 = ["original_language", "release_date", "runtime", "status"]
introducirCard(movieid, detailsContainer,crearElementosDetails)
crearTablaDetails(movieid, propiedadesTabla1, tabla1)


// Tabla 2
const propiedadesTabla2 = ["vote_average", "budget", "revenue"]
crearTablaDetails(movieid, propiedadesTabla2, tabla2)

})
.catch (error => console.log ("error:",error))