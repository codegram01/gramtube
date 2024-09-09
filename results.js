import youtube from "./src/youtube.js";

const searchQueryElm = document.getElementById("search-query")
const resultsElm = document.getElementById("results")
const nextCtn = document.getElementById("next-ctn")

const searchParams = new URLSearchParams(window.location.search);
const searchQuery = searchParams.get('search_query')

const init = () => {
    searchQueryElm.value = searchQuery

    youtube
    .GetListByKeyword(searchQuery, true, 10, [{ type: "video" }])
    .then((res) => {
        console.log(res)
        resultsElm.innerHTML = "";
        for(const item of res.items) {
            if(item.type == "video") {
                appendResult(item)
            }
        }
    })
    .catch((err) => {
        console.log(err);
    });
}
init();

function appendResult(result) {
    const resultElm = document.createElement("a")
    resultElm.href = `/watch?v=${result.id}`
    resultElm.className = "result"
    resultElm.innerHTML = `
        <div class="column-thumbnail">
            <img class="thumbnail" src="${getThumbnail(result)}" alt="">
        </div>
        <div class="column-text">
            <div class="result-title">${result.title}</div>
            <div class="result-channel">${result.channelTitle}</div>
        </div>
    `
    resultsElm.appendChild(resultElm)
}

function getThumbnail(result) {
    if(result.thumbnail && result.thumbnail.thumbnails) {
        const length = result.thumbnail.thumbnails.length
        return result.thumbnail.thumbnails[length - 1].url
    }
}

// current not work
function appendNext(nextPage) {
    const nextBtn = document.createElement("button")
    nextBtn.innerHTML = "Next Page"

    nextBtn.addEventListener("click", function(){
        youtube
        .NextPage(nextPage, true, 10)
        .then((res) => {
            for(const item of res.items) {
                if(item.type == "video") {
                    appendResult(item)
                }
            }
    
            appendNext(res.nextPage)
        })
        .catch((err) => {
          console.log(err);
        });
    })

    nextCtn.appendChild(nextBtn)
}