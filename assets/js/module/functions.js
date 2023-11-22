
//Crear option del select utilizando parametro genre
function crearOption (genre){
  const option = document.createElement("option")
  option.value = genre
  option.textContent = genre
  return option
}
//Bucle para iterar cada genero (genreList) y darle su (contenedor) option
export function crearOptions(genresList, contenedor) {
  for (const genre of genresList) {
      const option = crearOption(genre)
      contenedor.appendChild(option)
  }
}


// Inicio de busqueda por input
export function filtrarPorTituloCaseInsensitive(arrayMovie, titulo) {
  const filtroTitulo = arrayMovie.filter(movie =>
    movie.title.toLowerCase().includes(titulo.toLowerCase())
  );
  return filtroTitulo;
}

//.toLowerCase() lo que hace es transformar a minusculas el texto 
// Al aplicarlo en movie.title hacemos que el titulo de la pelicula 
// Se transforme a minusculas

// Función para limpiar el contenido de un contenedor
export function limpiarContenedor(contenedor) {
  contenedor.innerHTML = ""
}

// // Función para introducir películas en el contenedor
export function introducirPeliculasEnContenedor(moviesFiltradas, contenedor) {
  introducirCard(moviesFiltradas, contenedor, crearElementosDelCard)
}

// Desestructurando el array movies para obtener los generos
// Luego armar un nuevo array
// Luego eliminar repetidos
export function destructureMovies (arrayMovie){
  const genresRepeat = arrayMovie.map (genre => genre.genres)
  const genresDestructured =[]
  for(let i = 0; i < genresRepeat.length; i++){
    genresDestructured.push(...genresRepeat[i])
  }
return genresDestructured
}

// Funcion para filtrar la lista de generos y que no se repitan los generos
export function genresList(genres){
  return [...new Set(genres)]
}
// Funcion para filtrar peliculas por genero
function filterMoviesByGenre (moviesArray, genre){
  return moviesArray.filter(movie => movie.genres.includes(genre))
}
// Funcion para controlar que se muestre las peliculas
// Segun el genero seleccionado
export function manejarCambioSelect(moviesArray, option, input, contenedor) {
  const selectGenre = option.value
  const selectNombre = input.value.trim().toLowerCase()

  // Filtrar por género si se selecciona un género
  const resultadoPorGenero = selectGenre !== ""
    ? filterMoviesByGenre(moviesArray, selectGenre)
    : [...moviesArray]

  // Filtrar por nombre si hay una búsqueda
  const resultadoPorNombre = selectNombre !== ""
    ? filtrarPorTituloCaseInsensitive(moviesArray, selectNombre)
    : [...moviesArray]

  // Obtener la intersección de ambos resultados
  const resultadoFiltrado = resultadoPorGenero.filter(movie =>
    resultadoPorNombre.includes(movie)
  )

  limpiarContenedor(contenedor)
  if (resultadoFiltrado.length > 0) {
    introducirPeliculasEnContenedor(resultadoFiltrado, contenedor)
  } else {
    // Mostrar mensaje cuando no hay resultados
    const mensajeNoResultados = document.createElement("p")
    mensajeNoResultados.textContent = "No se encontraron resultados"
    contenedor.appendChild(mensajeNoResultados)
  }

}

//Crear pagina de Details
function generosDetails(movie){
  const genresDetails = document.createElement("p")
  genresDetails.textContent = movie.genres
  return genresDetails
}

export function crearElementosDetails (movie){
  const articleDetails = document.createElement("article")
  const picture = document.createElement ("picture")
  const div = document.createElement("div")
  const img = crearImg(movie)
  const h3 = crearH3(movie)
  const h4 = crearH4(movie)
  const p = crearP(movie)
  const pD = generosDetails(movie) 
  picture.appendChild(img)
  articleDetails.appendChild(picture)
  div.appendChild(h3)
  div.appendChild(h4)
  div.appendChild(pD)
  div.appendChild(p)
  articleDetails.appendChild(div)
  
  darClaseElementosDetails(articleDetails, picture, div, img, h3, h4, p, pD)

  return articleDetails
}

function darClaseElementosDetails(articleDetails, picture, div, img, h3, h4, p, pD){
  articleDetails.classList.add("flex", "flex-col","text-white","gap-2","m-2","md:flex-row","mt-10","lg:text-2xl")
  div.classList.add("flex", "flex-col","gap-4","md:w-1/3","lg:justify-around")
  picture.classList.add("md:w-2/3","lg:grow")
  img.classList.add("mb-3","object-cover","lg:w-full")
  h3.classList.add("mb-1", "font-bold", "text-2xl","uppercase","lg:text-4xl")
  h4.classList.add("mb-3")
  p.classList.add("mb-3")
  pD.classList.add("italic")
}

//Creacion de la tabla
export function crearTablaDetails(moviesArray, propiedades, tablaId) {
    const row = crearFila(moviesArray, propiedades)
    tablaId.appendChild(row)
}

// Función para crear una fila de la tabla y darle clases
function crearFila(movie, propiedades) {
  const row = document.createElement("tr")

  for (const propiedad of propiedades) {
    const cell = document.createElement("td")
    const strong = document.createElement("strong")
    const text = document.createElement("p")
    row.classList.add("flex","flex-col","gap-4","lg:text-2xl","justify-center")
    cell.classList.add("border-b-2", "flex", "gap-2", "justify-between","items-center","p-2","md:p-4")
    strong.textContent = `${propiedad.charAt(0).toUpperCase() + propiedad.slice(1).replace(/_/g,' ')}: `
    text.textContent = movie[propiedad]
    addSymbol(text,strong)

    // Agregar los nodos al elemento td
    cell.appendChild(strong)
    cell.appendChild(text)
    row.appendChild(cell)
  }

  return row
}

function addSymbol (text,strong){
  if (strong.textContent.toLowerCase() == `budget: `){
    text.textContent = `${text.textContent.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} USD`
  }else if (strong.textContent.toLowerCase() == `runtime: `){
    text.textContent = `${text.textContent} minutes`  
  }else if (strong.textContent.toLowerCase() ==`vote average: `){
    const numero = Number(text.textContent)
    const porcentaje = `${((numero*10).toFixed(2))}%`
    console.log(porcentaje)
    text.textContent = porcentaje
    return text
  } else if(strong.textContent.toLowerCase() ==`revenue: `){
    text.textContent = `${text.textContent.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} USD`
  }
}

//.toString() es para convertir a texto un numero
//.replace() es un metodo de los strings para reemplazar algo dentro
//No se que es (/\B(?=(\d{3})+(?!\d))/g, ".") lo saque de buscar como transformar numeros planos a numeros con puntos

export function sortArray(arrayMovies){
  const moviesSorted = arrayMovies
  moviesSorted.sort(function(a,b){
  const titleA = a.title
  const titleB = b.title
  if (titleA > titleB){
    return 1
  }
  if (titleA < titleB){
    return -1
  }
  return 0
  })
return moviesSorted
}

//Creando el evento para cambiar imagen y capturar el id de la pelicula en local storage

function changeImg (picture, fav, movie, article){
  let localStorageMovie = JSON.parse(localStorage.getItem('likes')) || []
  if (localStorageMovie.some( item => item.id === movie.id)){
    fav.src = '../img/like_fill.png'
  } else{
    fav.src = '../img/like.png'
  }

  picture.addEventListener('click', () => {
    localStorageMovie = JSON.parse(localStorage.getItem('likes')) || []
    const movieLiked = localStorageMovie.some( item => item.id === movie.id)
      if(!movieLiked){
        localStorageMovie.push({id: article.dataset.id})
        fav.src = '../img/like_fill.png'
      } else {
        if (movieLiked){
          localStorageMovie = localStorageMovie.filter(item => item.id !== movie.id)
          fav.src = '../img/like.png'
        }
    }
    localStorage.setItem('likes', JSON.stringify(localStorageMovie))
  })
}
