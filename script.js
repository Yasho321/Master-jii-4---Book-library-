
const url="https://api.freeapi.app/api/v1/public/books";
async function display(url) {
    const response= await fetch(url);
    const data= await response.json();
    let container=document.querySelector(".books");
    const elems= data.data.data.forEach(element => {

        const title=element.volumeInfo.title;
        const authors=element.volumeInfo.authors;
        let author=authors.join(", ");
        
        const publisher=element.volumeInfo.publisher;
        const publishedDate=element.volumeInfo.publishedDate;
        const thumbnail=element.volumeInfo.imageLinks.thumbnail;
        const desc=element.volumeInfo.infoLink;
        
       let html=createElement(title,author,publisher,publishedDate,thumbnail,desc);
       container.appendChild(html);
        
    });

    document.getElementById("search-btn").addEventListener("click",()=>{
        search();
    });

    document.getElementById("sort-btn").addEventListener("click",(e)=>{
        const sortbtns=document.querySelector(".sortbtn");
        sortbtns.style.visibility="visible";
        sortbtns.style.top = e.pageY+"px";
        sortbtns.style.left = e.pageX+"px";
        document.querySelectorAll(".sortbtns").forEach((elem)=>{
            elem.addEventListener("click",()=>{
                console.log(elem.id);
                
                sort(elem.id);
                sortbtns.style.visibility="hidden";
            })
        })

    });
    document.getElementById("view-btn").addEventListener("click",(e)=>{
        const viewsbtns=document.querySelector(".views");
        viewsbtns.style.visibility="visible";
        viewsbtns.style.top = e.pageY+"px";
        viewsbtns.style.left = e.pageX+"px";
        document.querySelectorAll(".viewbtns").forEach((elem)=>{
            elem.addEventListener("click",(e)=>{
                view(elem.id);
                viewsbtns.style.visibility="hidden";
            })
        })
    })

    document.querySelectorAll(".bookelement").forEach((elem)=>{
        elem.addEventListener("click",(e)=>{
            displaydesc(elem);
        })
    })
    
    
  
    

    
}
display(url);
function createElement(title, authors, publisher, publishedDate, thumbnail,desc) {
    const bookElement = document.createElement('div');
    bookElement.innerHTML = `<img src="${thumbnail}" class="thumbnail"> <h2 class="title">${title}</h2> <div class="author">${authors}</div><div class="publisher">${publisher}</div><div class="publishedDate">${publishedDate}</div> <div class="description">${desc}</div>`;
    bookElement.classList.add("bookelement");
    return bookElement;
    
}
function search() {
    const searchInput = document.getElementById("search");
    const searchValue = searchInput.value.toLowerCase();
    const books = document.querySelectorAll(".bookelement");
    books.forEach(book => {
        const title = book.querySelector(".title").textContent.toLowerCase();
        const authors = book.querySelector(".author").textContent.toLowerCase();
        const publisher = book.querySelector(".publisher").textContent.toLowerCase();
        const publishedDate = book.querySelector(".publishedDate").textContent.toLowerCase();

        if (title.includes(searchValue) || authors.includes(searchValue) || publisher.includes(searchValue)){
            book.style.display = "block";
        }else{
            book.style.display = "none";
        }
    })
    
}
function sort(x){
        
        
         let container=document.querySelector(".books");

        const books=document.querySelectorAll(".bookelement");
        let booksArray=[];
        
        books.forEach(book => {
            const title=book.querySelector(".title").textContent;
            const author=book.querySelector(".author").textContent;
            const publisher=book.querySelector(".publisher").textContent;
            const publishedDate=book.querySelector(".publishedDate").textContent;
            
            const thumbnail= book.querySelector(".thumbnail").src;
            const newBook = {title,author,publisher,publishedDate,thumbnail};
           

            booksArray.push(newBook);
            

        })
        if (x ===`title`) {
            console.log(booksArray);
            
            
            booksArray.sort((a, b) => a[x].localeCompare(b[x]));
        }else {
            booksArray.sort((a, b) => {
                const dateA = new Date(a.publishedDate);
                const dateB = new Date(b.publishedDate);
                
                
                
                return dateA - dateB;
            });
            
            
            // Sort by string fields (title, author, publisher) using localeCompare
            
        }
        container.innerHTML="";
        booksArray.forEach(book => {
            const bookElement = createElement(book.title, book.author, book.publisher, book.publishedDate, book.thumbnail);
            container.appendChild(bookElement);
        })

                
        
   
    
}
function view(id) {
    if(id==="list"){
        let container=document.querySelector(".books");
        container.classList.remove("grid");
        container.classList.add("list");

    }else{
        let container=document.querySelector(".books");
        container.classList.remove("grid");
        container.classList.add("grid");
    }

    
}
function displaydesc(elem) {
   
       let url= elem.querySelector(".description").textContent;
       window.open(url,"_blank");

   
    
}
document.querySelectorAll(".pgbtn").forEach((elem)=>{
    elem.addEventListener("click",(e)=>{
        const active=document.querySelector(".active");
        active.classList.remove("active");
        const url2=url+`?page=${elem.id}`;
        
        const container=document.querySelector(".books");
        container.innerHTML="";
        display(url2);
        
        elem.classList.add("active");
    })
})
