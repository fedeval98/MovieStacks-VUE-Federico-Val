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
      likes:[],
      favMovies:[],
      favFiltered:[],
    } //aca termina el return del data
  }, //aca termina el data

  beforeCreate(){
    fetch ("https://moviestack.onrender.com/api/movies", requestOptions)
      .then(response => response.json())
      .then (data => { 
        this.movies = data.movies
        this.movieFilter = this.movies
        this.genres = [...new Set(this.movies.map(movie => movie.genres).flat())]
        this.favMovies = JSON.parse(localStorage.getItem('likes'))
        this.favFiltered = this.movies.filter(movie =>this.favMovies.some(favMovie => favMovie.id === movie.id))
        console.log(this.favFiltered)
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
    }, //aca termina el filter
    
    getFavImg(movie){
      let localStorageMovie = JSON.parse(localStorage.getItem('likes')) || []
      const movieLiked = localStorageMovie.some( item => item.id === movie.id)
      return movieLiked ? '../img/like_fill.png' 
                        : '../img/like.png'
    }, //aca termina getFavImg

    removeFavImg(movie){
      let localStorageMovie = JSON.parse(localStorage.getItem('likes')) || []
      const movieLiked = localStorageMovie.some( item => item.id === movie.id)
      const imgRef = this.$refs['img_'+movie.id]
      console.log(imgRef)
        if (movieLiked){
        localStorageMovie = localStorageMovie.filter(item => item.id !== movie.id)
        imgRef.src = '../img/like.png'
        this.$forceUpdate()
        }
      localStorage.setItem('likes', JSON.stringify(localStorageMovie))
      this.favMovies = JSON.parse(localStorage.getItem('likes'))
      this.favFiltered = this.movies.filter(movie =>this.favMovies.some(favMovie => favMovie.id === movie.id))
      console.log(this.favFiltered)
    }, //aca termina el changeFavImg

}, // aca termina el methods

} //aca termina el options
const app = createApp(options)
app.mount ('#app')
