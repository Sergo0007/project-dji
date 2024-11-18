import { renderInitialProducts } from "./renderInitialProducts.js";

 

const showMoreProducts = (products,productContainer,firstProductIndex,lastProductIndex) => {

    const btnShowMore = document.querySelector('.js-btn-show-more');

    let productIncrement = 4;

    const hideButtonShowMore = () => {
        if (lastProductIndex >= products.length) {
            btnShowMore.classList.add('hidden');
            
        }
    };

    btnShowMore.addEventListener('click', () => {
        firstProductIndex = lastProductIndex;
        console.log(firstProductIndex);
        
        lastProductIndex += productIncrement;
        console.log(lastProductIndex);
        

        renderInitialProducts(products,productContainer,firstProductIndex,lastProductIndex);
        btnShowMore.scrollIntoView({
            behavior: 'smooth',
        });

        hideButtonShowMore();
    });

    hideButtonShowMore();

};

export {
    showMoreProducts
};