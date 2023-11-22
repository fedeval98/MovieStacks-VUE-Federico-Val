//Key de la API por headers
const requestOptions = {
  headers:{
    "x-api-key": '0ff70d54-dc0b-4262-9c3d-776cb0f34dbd'
  }
}
const {createApp} = Vue

const options = {
  data(){
    return{
      id: null,
      movie:[],
    }// aca termina el return
  }, // aca termina el data
  beforeCreate(){
    const search = location.search
    const params = new URLSearchParams(search)
    this.id = params.get('id')
    fetch ("https://moviestack.onrender.com/api/movies/"+this.id, requestOptions)
      .then(response => response.json())
      .then (data => {
        this.movie = data
      })
      .catch(error => console.log(`Error:${error}`))
  }, // aca termina el beforeCreate


//computed sirve para definir propiedades calculadas
//utilizando propiedades reactivas
  computed:{
    formatDate(){
      // se formatea la fecha de las peliculas usando un formato
      // en este caso utiliza el formato de fecha/hora local
      // dado que se usa .toLocaleDateString y se establece
      // la configuracion regional "es-ES" y se le da el formato
      // options (dia:numerico, mes:texto, año:numerico)
      // ejemplo (11 julio de 1998)
      const options = {day:'numeric', month:'long', year:'numeric'}
      const release = new Date(this.movie.release_date)
      return release.toLocaleDateString("es-ES",options)
    },
    formatRevenue(){
      return this.dotsNumbers(this.movie.revenue)
    },
    formatBudget(){
      return this.dotsNumbers(this.movie.budget)
    },
    formatVoteAverage(){
      return (this.movie.vote_average * 10).toFixed(1)
    }
  },// fin de computed

//el methods similar al functions, se arman las funciones para ejecutar mas tarde
  methods:{
    dotsNumbers(number){
      // se verifica que los datos sean distinto de undefined y null
      // luego se usa el metodo toLocaleString que convierte
      // un string segun la region establecida, se le da
      // el stylo de moneda y se selecciona USD como moneda
      if(number !== undefined && number !== null){
        return number.toLocaleString("en-US",{
          style: "currency",
          currency: "USD",
          minimumFractingDigits: 0,
        })
      }
    }
  }, //fin de method
} // aca termina el options
const app = createApp(options)
app.mount ('#app')