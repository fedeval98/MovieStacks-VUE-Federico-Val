//Captura de elementos del HTML
const selectGenres = document.getElementById("selectgenres")
const moviesContenedor = document.getElementById("divMovies")
const searchInput = document.getElementById("searchInput")
const buttonClear = document.getElementById("clear")

//Importando las variables para ejecutar la funcion
import {
  introducirCard, 
  crearOptions, 
  crearElementosDelCard,
  destructureMovies,
  genresList,
  manejarCambioSelect,
  sortArray,

}from '../js/module/functions.js'
//Ejecucion de la funcion para darle valores por argumento a las cards y que las cree

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
    const movie = moviesData.movies

    const movies = sortArray(movie)

    introducirCard(movies, moviesContenedor, crearElementosDelCard)

    const listOfGenres = genresList(destructureMovies(movies))
    crearOptions(listOfGenres, selectGenres)

    selectGenres.addEventListener('change', () => {
      manejarCambioSelect(movies, selectGenres, searchInput, moviesContenedor)
    })
    searchInput.addEventListener('keyup', () => {
        manejarCambioSelect(movies, selectGenres, searchInput, moviesContenedor)
      })
    buttonClear.addEventListener('click',()=>{
      selectGenres.value = ""
      searchInput.value = ""
      manejarCambioSelect(movies, selectGenres, searchInput, moviesContenedor)
    })
  })
  .catch (error => console.log ("error:",error))