(function run(){
    burgerMenu();
    btnExpandElement();
    portfolio();
    heightCorrection();
    intersectionObserverGallery();
})();

function btnExpandElement(){
    const btn = document.querySelectorAll(".card-btn");
    const cardExpanded = document.querySelectorAll(".content-box");
    const cardShrinked = document.querySelectorAll(".card-shrinked");

    //click on each element will expand content box with an animation
    btn.forEach((button,index) => button.addEventListener("click",()=>{
        let delay = .2;
        
  
        //you can only have 1 active card at the time
        cardExpanded.forEach((card,i) =>{
            if(card.classList.contains("active") && card !== cardExpanded[index]){
                card.classList.remove("active");
                cardShrinked[i].classList.toggle("shadowy");
            }
        })

        console.log(cardExpanded);
        const boxItem = cardExpanded[index].querySelectorAll(".box-item");

        //each .box-item will appear after a delay
        boxItem.forEach(item =>{
            item.style.animation=`card-animate 1s ease-in-out forwards ${delay}s`;
            delay += .35;
        });
        cardExpanded[index].classList.toggle("active");
        cardShrinked[index].classList.toggle("shadowy");
        
    }))
};

function portfolio(){
    const galleryItem = Array.from(document.querySelectorAll(".gallery-item"));
    const modal = document.querySelector(".modal");
    const modalImage = document.querySelector(".modal .main-image");
    let imageCollection = [];
    let index = 0;
    
        

        galleryItem.forEach(item => {
            //each item will get the first image from its image collection            
            item.querySelector(".main-image").src = item.querySelector(".image-collection").children[0].src;


            //clicking on any gallery-item will invoke modal window and set its properties
            item.addEventListener("click",()=>{
                //setting active image-collection
                imageCollection = Array.from(item.querySelector(".image-collection").children);
                //reset
                modal.style.display="block";
                index = 0;
                modalImage.src = imageCollection[index].src;
                modal.querySelector(".number").textContent = `${index+1} / ${imageCollection.length}` 
                modal.querySelector(".image-headline").textContent =  item.querySelector(".image-collection").dataset.headline; 
                         
            });
            
        });

        modal.addEventListener("click",(e)=>{
            //clicking outside the image will cancel the modal
            if(e.target.nodeName !== "IMG"){
                modal.style.display="none";
            }
            //incrementing array to change img source
            if(e.target.classList.contains("right-arrow") && index < imageCollection.length-1){
                index++;
                modal.querySelector(".number").textContent = `${index+1} / ${imageCollection.length}`
                modalImage.src = imageCollection[index].src;
            }
            if(e.target.classList.contains("left-arrow") && index > 0){
                index--;
                modal.querySelector(".number").textContent = `${index+1} / ${imageCollection.length}`
                modalImage.src = imageCollection[index].src;
            }
        });
        
}

function heightCorrection(){
    const galleryItem = document.querySelectorAll(".gallery-item");
    const contact = document.querySelector(".contact-layout");
    //initial values
    resize();

    window.addEventListener("resize",resize);

    function resize(){
        galleryItem.forEach(item =>{
            //offset multiplied by A4 aspect ratio
            item.style.height = item.offsetWidth * 1.4142857 + "px";
        });

        contact.style.minHeight = (contact.offsetWidth / 1.875) +"px";
    }
    
}

function burgerMenu(){
    const hamburger = document.querySelector(".hamburger");
    const mobileNav = document.querySelector(".mobile-navigation");
    const mobileModal = document.querySelector(".mobile-modal");

    mobileModal.addEventListener("click",function modalActive(e){
        if(!(e.target === mobileNav)){
            mobileNav.classList.remove("btn-toggle");
            mobileModal.style.width = 0;
            changeColor("var(--third-col)");
            animateBurger(false);
        }
    })

    hamburger.addEventListener("click",(e)=>{
        console.log(mobileNav.classList.contains("btn-toggle"));
        if(mobileNav.classList.contains("btn-toggle")){
            mobileNav.classList.remove("btn-toggle");
            changeColor("var(--third-col)");
            mobileModal.style.width = 0;
            animateBurger(false);
        }
        else{
            mobileNav.classList.add("btn-toggle");
            mobileModal.style.width = 100 + "vw";
            changeColor("black");
            animateBurger();
        }
    });
    
    function changeColor(color = "purple"){
            for(let line of hamburger.children){
                line.style.backgroundColor = color;
            }
    }
    
    function animateOptions(){
        const navAnimate = Array.from(document.querySelectorAll(".mobile-navigation .text-area p"));
        navAnimate.forEach((pageOption,index) =>{
            pageOption.style = `animation: flyInRight .5s ease-in-out forwards ${(index+1)/6}s `;
        })
    }

    animateOptions();

    function animateBurger(animate = true){
        if(animate){
        hamburger.children[0].style.transform= `translate(-4px,8px) rotate(45deg)`;
        hamburger.children[1].style.transform= `translate(-7px,14px)`;
        hamburger.children[1].style.backgroundColor = "var(--third-col)";
        hamburger.children[2].style.transform= `translate(-4px,-8px) rotate(-45deg)`;
        }
        else{
            for(line of hamburger.children){
                line.style.transform = "";
            }
        }
    }
}

function intersectionObserverGallery(){
    let options ={
        root:null,
        rootMargin: "-30px 0px",
        threshold:0.05
    };

    let observer = new IntersectionObserver(beTouching,options);
    
    const gallery = document.querySelector(".gallery");
    observer.observe(gallery);

    function beTouching(entries){
        entries.forEach(entry =>{
            if(entry.isIntersecting){
                document.querySelector(".portfolio .design-element").classList.add("de-active");
            }
        })
    }
    
};

