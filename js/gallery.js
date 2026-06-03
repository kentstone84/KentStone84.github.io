/*
==========================================
GALLERY LIGHTBOX
==========================================
*/

let currentImage = 0;

const galleryImages =
document.querySelectorAll(
    ".gallery-item img"
);

const lightbox =
document.getElementById(
    "lightbox"
);

const lightboxImage =
document.getElementById(
    "lightboxImage"
);

function openLightbox(index){

    currentImage = index;

    lightbox.classList.add(
        "active"
    );

    lightboxImage.src =
    galleryImages[index].src;
}

function closeLightbox(){

    lightbox.classList.remove(
        "active"
    );
}

function nextImage(){

    currentImage++;

    if(
        currentImage >=
        galleryImages.length
    ){

        currentImage = 0;
    }

    lightboxImage.src =
    galleryImages[currentImage].src;
}

function previousImage(){

    currentImage--;

    if(currentImage < 0){

        currentImage =
        galleryImages.length - 1;
    }

    lightboxImage.src =
    galleryImages[currentImage].src;
}

galleryImages.forEach(
    (image,index) => {

        image.addEventListener(
            "click",
            () => {

                openLightbox(index);

            }
        );

    }
);

document.addEventListener(
    "keydown",
    event => {

        if(
            !lightbox.classList.contains(
                "active"
            )
        ){
            return;
        }

        if(event.key === "Escape"){

            closeLightbox();
        }

        if(event.key === "ArrowRight"){

            nextImage();
        }

        if(event.key === "ArrowLeft"){

            previousImage();
        }

    }
);

if(lightbox){

    lightbox.addEventListener(
        "click",
        closeLightbox
    );
}
