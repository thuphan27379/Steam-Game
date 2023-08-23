// requirement 2. click on gallery to see game detail, on right
// getdata https://steam-api-mass.onrender.com/single-game/appid
// lay data.name
//     data.price
//     data.header_image
//     data.description
//     data.developer

//function get data detail DONE
async function gameDetail(appid) {
  // console.log(appid);
  let url = `https://steam-api-mass.onrender.com/single-game/${appid}`;
  try {
    let res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

window.gameDetail = gameDetail;

// render game detail to html DONE
async function renderDetail(appid) {
  let gameObject = await gameDetail(appid);
  let details = gameObject.data;
  // console.log(details.data);
  let html = `
          <div class="show_detail">
              <div class="title">${details.name}</div>
              <div class="price">Price: ${details.price}</div>
          </div>
          <div class="img_detail">
              <img src="${details.header_image}"
                  alt="${details.name}">
              <div class="game_details">
                  <div class="game_description">Description: ${details.description}</div>
                  <div class="game_informations">
                      <p>Developer: ${details.developer}</p>
                  </div>
          </div>
      </div>`;

  let detailList = document.querySelector(".showing_game");
  detailList.innerHTML = html;
}

window.renderDetail = renderDetail;

/* requirement 1. list of games, gallery on right DONE
// get data from https://steam-api-mass.onrender.com/games
// lay data.header_image va data.name*/

// Get data from the API
async function getDataOfGallery() {
  let url = `https://steam-api-mass.onrender.com/games?limit=20`;
  try {
    let res = await fetch(url);
    return await res.json();
    // console.log(res);
  } catch (error) {
    console.log(error);
  }
} //DONE

// Render the gallery to HTML DONE
async function renderListOfGallery() {
  let galleries = await getDataOfGallery();
  let html = "";
  galleries.data.forEach((game) => {
    // lồng function renderDetail
    let htmlSegment = `
      <div class="game_wrapper" id="game_wrapper">                
        <div class="cover" onclick="renderDetail('${game.appid}')">
          <img src="${game.header_image}" data-id="${game.appid}">
          <div class="game_info">
            <p>${game.name}</p>
          </div>
        </div>
      </div>`;
    html += htmlSegment;
  });

  let galleriesList = document.querySelector(".showing_game");
  galleriesList.innerHTML = html;
}

renderListOfGallery(); //DONE

/*requirement 3.4.5. Search input, Search by name, on left
see the results, on right
getdata https://steam-api-mass.onrender.com/games
*/
const searchInput = document.getElementById("searchInput"); //get value of search by name
const searchIcon = document.getElementById("store_search_link"); //click icon to render search result
searchIcon.addEventListener("click", () => renderListOfResult());

function getSearch() {
  //function lay value input va tim
  let search = "";
  search = searchInput.value;
  console.log(search);
  let queryString = "";

  if (search) {
    queryString += `${search}`;
  }
  console.log(queryString);
  return queryString;
}

// get data of search input value
async function getDataOfResult() {
  const queryString = getSearch();
  let url = `https://steam-api-mass.onrender.com/games?q=${queryString}&limit=20`;
  try {
    let res = await fetch(url);
    // console.log(res);
    let result = await res.json();
    return result.data;
  } catch (error) {
    console.log(error);
  }
}

// render result of search by name to html
async function renderListOfResult() {
  let searchByName = await getDataOfResult();
  let html = "";
  // console.log(searchByName);
  searchByName.forEach((byName) => {
    let htmlSegment = `    
    <div class="showing_game">            
      <div class="game_wrapper">
          <img src="${byName.header_image}"
              data-id="${byName.appid}">
          <div class="game_info">
              <p>${byName.name}</p>
          </div>
      </div>
  </div>
  </div>`;
    html += htmlSegment;
  });
  let searchByNameList = document.querySelector(".showing_game");
  searchByNameList.innerHTML = html;
}

//
/*requirement 6. list of all genres and tags (category on left) DONE
https://steam-api-mass.onrender.com/steamspy-tags lay data.name de render
https://steam-api-mass.onrender.com/genres lay data.name de render
*/
// get data for list of tags
async function getDataOfTags() {
  let url = `https://steam-api-mass.onrender.com/steamspy-tags?limit=20`;
  try {
    let res = await fetch(url);
    return await res.json();
    // console.log(res);
  } catch (error) {
    console.log(error);
  }
}

// render list of tags to html, function show games by tag
async function renderListOfTags(tag) {
  let tags = await getDataOfTags(tag);
  console.log(tags.data);
  let html = "";
  tags.data.forEach((tag) => {
    let htmlSegment = `<a id="tag_item" href="" onclick="renderGameByTag('${tag.name}')">${tag.name}</a>`;
    html += htmlSegment;
  });
  let tagsList = document.querySelector("#list_of_tag");
  tagsList.innerHTML = html;
}

renderListOfTags(); //DONE

// get data for list of genres
async function getDataOfGenres() {
  let url = `https://steam-api-mass.onrender.com/genres?limit=20`;
  try {
    let res = await fetch(url);
    return await res.json();
    // console.log(res);
  } catch (error) {
    console.log(error);
  }
}

// render list of genres to html, function show games by genre
async function renderListOfGenres() {
  let genres = await getDataOfGenres();
  let html = "";
  genres.data.forEach((genre) => {
    let htmlSegment = `<a id="genre_item" href="" onclick="renderGameByGenre('${genre.name}')">${genre.name}</a>`;
    html += htmlSegment;

    let genresList = document.querySelector("#list_of_genre");
    genresList.innerHTML = html;
  });
}

renderListOfGenres(); //DONE

//
// requirement 7. see all games that match the genre and tag that clicked.
// getdata https://steam-api-mass.onrender.com/games?steamspy-tags="tag clicked"
// https://steam-api-mass.onrender.com/games?genres="genre clicked"
// click on the tag item of category on left, then show the game with that tag
// render on the right, gallery css

// const searchByTag = document.getElementById("tag_item"); //get value of search by name
// console.log(searchByTag);
// searchByTag.addEventListener("click", () => renderGameByTag());

// get tag name
async function getTagName() {
  let tagName = await getDataOfTags(); //list of tags
  tagName = tagName.data.name;
  // console.log(tagName);
}

// get data for games by tag
async function getGameByTag(tagName) {
  // console.log()
  let tagname = await getTagName();
  let url = `https://steam-api-mass.onrender.com/games?steamspy_tags=${tagname}&limit=20`;
  try {
    let res = await fetch(url);
    // console.log(res);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

window.getGameByTag = getGameByTag;

// Render games by tag to the gallery
async function renderGameByTag() {
  let galleries = await getGameByTag();
  let html = "";
  galleries.data.forEach((game) => {
    let htmlSegment = `
      <div class="game_wrapper" id="game_wrapper">                
        <div class="cover" onclick="renderDetail('${game.appid}')">
          <img src="${game.header_image}" data-id="${game.appid}">
          <div class="game_info">
            <p>${game.name}</p>
          </div>
        </div>
      </div>`;
    html += htmlSegment;
  });

  let galleriesList = document.querySelector(".showing_game");
  galleriesList.innerHTML = html;
}

window.renderGameByTag = renderGameByTag;

// games by genre
// get genre name
async function getGenreName() {
  let genreName = await getDataOfGenres();
  genreName = genreName.data.name;
  // console.log(genreName);
}

// get data for games by genre
async function getGameByGenre(genreName) {
  // console.log()
  let genrename = await getGenreName();
  let url = `https://steam-api-mass.onrender.com/games?genres=${genrename}&limit=20`;
  try {
    let res = await fetch(url);
    // console.log(res);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

window.getGameByGenre = getGameByGenre;

// Render games by genre to the gallery
async function renderGameByGenre() {
  let galleries = await getGameByGenre();
  let html = "";
  galleries.data.forEach((game) => {
    let htmlSegment = `
      <div class="game_wrapper" id="game_wrapper">                
        <div class="cover" onclick="renderDetail('${game.appid}')">
          <img src="${game.header_image}" data-id="${game.appid}">
          <div class="game_info">
            <p>${game.name}</p>
          </div>
        </div>
      </div>`;
    html += htmlSegment;
  });

  let galleriesList = document.querySelector(".showing_game");
  galleriesList.innerHTML = html;
}

window.renderGameByGenre = renderGameByGenre;
//
// function for Ip screen?
// Responsive_RequestMobileView()
