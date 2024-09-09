const watchCtnElm = document.getElementById("watch-ctn")

const searchParams = new URLSearchParams(window.location.search);
const videoId = searchParams.get('v')

const init = () => {
    console.log(videoId)
    watchCtnElm.innerHTML = `
        <iframe 
        src="https://www.youtube-nocookie.com/embed/${videoId}" 
        title="YouTube video player" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        referrerpolicy="strict-origin-when-cross-origin" 
        allowfullscreen>
        </iframe>
    `
}
init();