
/*
==========================================
LOAD PRODUCTS FROM JSON
==========================================
*/

async function loadProducts(){

    try{

        const response =
        await fetch(
            "data/products.json"
        );

        const products =
        await response.json();

        displayProducts(products);

        setupSearch(products);

        setupFilters(products);

    }
    catch(error){

        console.error(
            "Unable to load products",
            error
        );
    }
}

function displayProducts(products){

    const container =
    document.getElementById(
        "productContainer"
    );

    if(!container) return;

    container.innerHTML = "";

    products.forEach(product => {

        const card =
        document.createElement("div");

        card.className =
        "product-card";

        card.innerHTML = `
            <img
            src="${product.image}"
            alt="${product.name}">

            <div class="product-info">

                <h3>${product.name}</h3>

                <p>
                    ${product.description}
                </p>

                <div class="product-price">
                    ${product.price}
                </div>

            </div>
        `;

        container.appendChild(card);

    });

}

function setupSearch(products){

    const search =
    document.getElementById(
        "searchBox"
    );

    if(!search) return;

    search.addEventListener(
        "input",
        e => {

            const term =
            e.target.value.toLowerCase();

            const filtered =
            products.filter(product => {

                return (
                    product.name
                    .toLowerCase()
                    .includes(term)
                );

            });

            displayProducts(filtered);

        }
    );
}

function setupFilters(products){

    const buttons =
    document.querySelectorAll(
        "[data-filter]"
    );

    buttons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const category =
                button.dataset.filter;

                if(category === "all"){

                    displayProducts(products);

                    return;
                }

                const filtered =
                products.filter(product => {

                    return (
                        product.category
                        === category
                    );

                });

                displayProducts(filtered);

            }
        );

    });

}

document.addEventListener(
    "DOMContentLoaded",
    loadProducts
);
