/*
==========================================
South American LEATHERWORKS
MAIN.JS
==========================================
*/

document.addEventListener("DOMContentLoaded", () => {

    const year = document.getElementById("year");

    if(year){
        year.textContent = new Date().getFullYear();
    }

});


/*
==========================================
HEADER SHADOW
==========================================
*/

window.addEventListener("scroll", () => {

    const header = document.querySelector("header");

    if(!header) return;

    if(window.scrollY > 25){

        header.style.boxShadow =
            "0 8px 25px rgba(0,0,0,.4)";
    }
    else{

        header.style.boxShadow =
            "none";
    }

});


/*
==========================================
FADE IN ELEMENTS
==========================================
*/

const observer = new IntersectionObserver(

    entries => {

        entries.forEach(entry => {

            if(entry.isIntersecting){

                entry.target.classList.add("show");
            }

        });

    },

    {
        threshold:0.15
    }

);

document.querySelectorAll(
    ".card,.product-card,.gallery-item"
)
.forEach(item => {

    item.classList.add("hidden");

    observer.observe(item);

});


/*
==========================================
MOBILE MENU
==========================================
*/

const mobileMenu =
document.querySelector(".mobile-menu");

const navLinks =
document.querySelector(".nav-links");

if(mobileMenu){

    mobileMenu.addEventListener(
        "click",
        () => {

            navLinks.classList.toggle(
                "mobile-open"
            );

        }
    );
}


/*
==========================================
SCROLL TO TOP
==========================================
*/

const scrollButton =
document.getElementById("scrollTop");

if(scrollButton){

    window.addEventListener("scroll", () => {

        if(window.scrollY > 500){

            scrollButton.style.display =
                "block";
        }
        else{

            scrollButton.style.display =
                "none";
        }

    });

    scrollButton.addEventListener(
        "click",
        () => {

            window.scrollTo({

                top:0,
                behavior:"smooth"

            });

        }
    );
}
