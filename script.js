const accessKey = "yG19osGlE-pWf8owp6RNFGRRE5Hd1P7hh3zh1AdNoV4";
 

const formEl = document.querySelector("form"); 
const inputEl = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");
const imageContainer = document.getElementById("image-container");
const showMoreBtn = document.getElementById("show-more-btn");
const loader =document.querySelector(".loader");


let inputData = "";
let page = 1;

async function searchImage() {
    inputData = inputEl.value.trim();
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;
    
    try {
        const response = await fetch(url);
        
       
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        const results = data.results;

        if (page === 1) {
            imageContainer.innerHTML = "";
        }

        loader.style.display="none"

        results.forEach(result => {
            const imageWrapper = document.createElement("div");
            imageWrapper.classList.add("search-result");
            
            const image = document.createElement("img");
            image.src = result.urls.small;
            image.alt = result.alt_description;
            
            const imageLink = document.createElement("a");
            imageLink.href = result.links.html;
            imageLink.target = "_blank";
            imageLink.textContent = result.alt_description || "View on Unsplash";

            imageWrapper.appendChild(image);
            imageWrapper.appendChild(imageLink);
            imageContainer.appendChild(imageWrapper);
        });

        page++;
        if (page > 1) {
            showMoreBtn.style.display = "block";
        }
    } catch (error) {
        console.error("An error occurred while fetching images:", error);
    }
}

formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1;
    imageContainer.innerHTML="";
    loader.style.display="block"
    setTimeout(()=>{
        searchImage();
    },2000)
});

showMoreBtn.addEventListener("click", () => {
    searchImage();
});
