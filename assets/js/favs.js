//Key de la API por headers
const requestOptions = {
  headers:{
    "x-api-key": '0ff70d54-dc0b-4262-9c3d-776cb0f34dbd'
  }
}
const {createApp} = Vue

const options = {
  data (){
    return{
      movies: [],
      genres: [],
      search: "",
      select: "none",
      movieFilter:[],
    } //aca termina el return del data
  }, //aca termina el data

  beforeCreate(){
    fetch ("https://moviestack.onrender.com/api/movies", requestOptions)
      .then(response => response.json())
      .then (data => { 
        this.movies = data.movies
        this.movieFilter = this.movies
        this.genres = [...new Set(this.movies.map(movie => movie.genres).flat())]
      }) 
      .catch(error => console.log(`Error:${error}`))
  }, //aca termina el beforeCreate

  methods:{
    saveSearch(event){
      this.search = event.target.value
      this.filter()
    },// aca termina el input

    saveSelect(event){
      this.select = event.target.value
      this.filter()
    },// aca termina el select

    filter(){
      this.movieFilter = this.movies.filter (movie => movie.title.toLowerCase().includes(this.search.toLowerCase()) && (this.select === 'none' || movie.genres.includes(this.select)))
      console.log(this.movieFilter)
    }, //aca termina el filter
    clearFilter(){
      this.movieFilter = this.movies
      this.search = ""
      this.select = "none"
      this.$forceUpdate()
    },
  }


} //aca termina el options
const app = createApp(options)
app.mount ('#app')


/* //Captura de elementos del HTML
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
  limpiarContenedor,
}from '../js/module/functions.js'
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

    let favMovies = JSON.parse(localStorage.getItem('likes'))
    
    console.log (Object.keys(localStorage).length)
    if(favMovies.length == 0 || Object.keys(localStorage).length === 0){
      moviesContenedor.className = ""
      moviesContenedor.classList.add ("text-center", "items-center","w-full")
      moviesContenedor.innerHTML = "NO FAVORITE MOVIES FOUND"
    } else if (Object.keys(localStorage).length !== 0 || favMovies.length !== 0){

      let favMoviesFiltered = movies.filter(movie =>favMovies.some(favMovie => favMovie.id === movie.id))
      
      introducirCard(favMoviesFiltered, moviesContenedor, crearElementosDelCard)

      const listOfGenres = genresList(destructureMovies(favMoviesFiltered))
      
      crearOptions(listOfGenres, selectGenres)

    moviesContenedor.addEventListener ('click', (event)=>{
      const target = event.target

      if (target.classList.contains("picture")){
        favMovies = JSON.parse(localStorage.getItem('likes'))
        favMoviesFiltered = movies.filter(movie =>favMovies.some(favMovie => favMovie.id === movie.id))
        limpiarContenedor(moviesContenedor)
        introducirCard(favMoviesFiltered, moviesContenedor, crearElementosDelCard)
        const listOfGenres = genresList(destructureMovies(favMoviesFiltered))
        crearOptions(listOfGenres, selectGenres)
      }
      if (favMovies.length == 0 || Object.keys(localStorage).length === 0){
        moviesContenedor.className = ""
        moviesContenedor.classList.add ("text-center", "items-center","w-full")
        moviesContenedor.innerHTML = "NO FAVORITE MOVIES FOUND"
      }
    })

      selectGenres.addEventListener('change', () => {
        manejarCambioSelect(favMoviesFiltered, selectGenres, searchInput, moviesContenedor)
      })
      
      searchInput.addEventListener('keyup', () => {
          manejarCambioSelect(favMoviesFiltered, selectGenres, searchInput, moviesContenedor)
        })
      
      buttonClear.addEventListener('click',()=>{
        selectGenres.value = ""
        searchInput.value = ""
        manejarCambioSelect(favMoviesFiltered, selectGenres, searchInput, moviesContenedor)
      })
    }
    
  })
  .catch (error => console.log ("error:",error)) */