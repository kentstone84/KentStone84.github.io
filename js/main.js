/*
=================================
STONE LEATHERWORKS
MAIN SITE SCRIPT
=================================
*/

// Current Year

document.addEventListener("DOMContentLoaded", () => {

    const yearElement =
        document.querySelector("#year");

    if(yearElement){

        yearElement.textContent =
            new Date().getFullYear();
    }
});


/*
=================================
SMOOTH SCROLL
=================================
*/

document
.querySelectorAll('a[href^="#"]')
.forEach(anchor => {

    anchor.addEventListener(
        "click",
        function(e){

            e.preventDefault();

            document
            .querySelector(
                this.getAttribute("href")
            )
            .scrollIntoView({

                behavior:"smooth"
            });
        }
    );
});


/*
=================================
NAVBAR SHADOW
=================================
*/

window.addEventListener("scroll", () => {

    const header =
        document.querySelector("header");

    if(!header) return;

    if(window.scrollY > 20){

        header.style.boxShadow =
            "0 5px 20px rgba(0,0,0,.4)";
    }
    else{

        header.style.boxShadow =
            "none";
    }
});


/*
=================================
FADE IN ELEMENTS
=================================
*/

const observer =
new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            entry.target.classList.add("show");
        }
    });

},{
    threshold:.15
});

document
.querySelectorAll(
    ".card,.product-card,.gallery-item"
)
.forEach(el => {

    el.classList.add("hidden");

    observer.observe(el);
});


/*
=================================
MOBILE MENU TOGGLE
=================================
*/

const menuButton =
document.querySelector(".mobile-menu");

const navLinks =
document.querySelector(".nav-links");

if(menuButton){

    menuButton.addEventListener(
        "click",
        () => {

            navLinks.classList.toggle(
                "mobile-open"
            );
        }
    );
}
