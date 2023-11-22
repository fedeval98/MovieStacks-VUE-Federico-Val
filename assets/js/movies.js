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