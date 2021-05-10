var lib = localStorage.getItem("lib");
lib = (lib) ? JSON.parse(lib) : [];
const btn = document.querySelector(".book-btn");
const form = document.querySelector(".book-form");
const submit = document.querySelector("#book-submit");
const container = document.querySelector(".book-container");


window.onload = function(){
    for(let i=0;i<lib.length;i++)
        createBook(lib[i]);
}


function Book(title,author,pages,read)
{
    this.id= title+author;
    this.title = title
    this.author = author
    this.pages = (pages)?pages:"0";
    this.read = read
}

form.style.display = "none";

btn.addEventListener("click",()=>{
    form.style.display = "grid";   
    container.style.opacity = ".2"; 
})


submit.addEventListener("click",(e)=>{
    if(form[0].value!="" && form[1].value!=0)
    {
        e.preventDefault();
        const book = new Book(form[0].value,form[1].value,form[2].value,form[3].checked);
        displayBook(book);
        form.reset();
        form.style.display = "none";
        container.style.opacity="1";
    }
})

function displayBook(item)
{
    container.innerHTML = ""
    lib.push(item)
    localStorage.setItem("lib",JSON.stringify(lib))
    lib.map((book)=>{
        createBook(book);
    });
}

function createBook(books)
{
    const book = document.createElement("div")        
    const title= document.createElement("h3")
    const author= document.createElement("h4")
    const pages = document.createElement("h4")
    const read = document.createElement("button")
    const remove = document.createElement("button")

        title.classList.add("title")
        author.classList.add("author")
        pages.classList.add("pages")
        read.classList.add("read")
        book.classList.add("book")
        remove.classList.add("remove")

        title.innerHTML = books.title
        author.innerHTML = books.author
        pages.innerHTML = books.pages
        read.innerHTML = "read"
        remove.innerHTML = "remove"
        read.value = books.read

        if(read.value=="true")
            read.style.backgroundColor = "#00CC99";
        else
            read.style.backgroundColor = "#DD1155";

        book.appendChild(title);
        book.appendChild(author);
        book.appendChild(pages);
        book.appendChild(read);
        book.appendChild(remove);
        container.appendChild(book);
       
        read.addEventListener("click",(e)=>{
            let value = e.target.value;
            if(value=="true")
                read.style.backgroundColor = "#DD1155"
            
            if(value=="false")
                read.style.backgroundColor = "#00CC99"
            e.target.value = (value=="true")?"false":"true"
            console.log(e.target.value);
        })

        remove.addEventListener("click",()=>{
            console.log(book)
            container.removeChild(book)
            const index = lib.indexOf(books);
            console.log(index);
            lib.splice(index,1); 
            localStorage.setItem("lib",JSON.stringify(lib));

        })

        container.appendChild(book);
}

