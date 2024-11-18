  import { renderProductCards } from "./productCards.js";


const filter = (products,productContainer) => {

    const seriesFilterEl = document.querySelector('.js-filter-series');
    const seriesFilterItemsEl = document.querySelectorAll('.js-series-item');
    const btnShowMore = document.querySelector('.js-btn-show-more');

    const inputSearch = document.querySelector('.js-input-search');
    const priceFilterSelect = document.querySelector('.js-filter-price-select');
    const priceInputs = document.querySelectorAll('.js-filter-price-input');

     let currentSeriesFilter = null;
     let currentPriceFilterSelect = 'default';
     let currentPriceFilterInputs = {min: 0, max: Infinity};

    const filterProducts = (filterSeries, filterInputSearch,priceRange) => {
        let filteredProducts = products.filter((product) => {
            if (filterSeries && product.series !== filterSeries) {
                return false;
            }
            if (filterInputSearch && !product.model.toLowerCase().includes(filterInputSearch.toLowerCase())) {
                return false;
            }
            const price = parseInt(product.prices[0].replace(/\s/g, ''),10);

            if (price < priceRange.min || price > priceRange.max) {
                return false;
            }
            return true;

        });
        // console.log(filteredProducts);
        // if (currentPriceFilterSelect === 'asc') {
        //     filteredProducts.sort((a,b) => a.prices[0] - b.prices[0]); если  не нужно переобразвания из строки в число
        // }else if(currentPriceFilterSelect === 'desc'){
        //        filterProducts.sort((a,b) => b.prices[0] - a.prices[0]);
              
        // };

         
        if (currentPriceFilterSelect === 'asc') {
            filteredProducts.sort((a,b) => {
                const priceA = parseInt(a.prices[0].replace(/\s/g, ''),10); 
                const priceB = parseInt(b.prices[0].replace(/\s/g, ''),10); 
                return priceA - priceB;
            });
        }else if(currentPriceFilterSelect === 'desc'){
               filteredProducts.sort((a,b) => {
               const priceA = parseInt(a.prices[0].replace(/\s/g, ''),10); 
               const priceB = parseInt(b.prices[0].replace(/\s/g, ''),10); 
               return priceB - priceA;
            });  
        };
         return filteredProducts;
    };

    const applyFilters = () => {
        const filteredProducts = filterProducts(currentSeriesFilter, inputSearch.value,currentPriceFilterInputs);
        renderProductCards(filteredProducts, productContainer);
        btnShowMore.classList.add('hidden');
    };

    const handleSearchInput = () => {
      inputSearch.addEventListener("input", applyFilters );
        // console.log(inputSearch.value);
    };

    const handleSeriesFilterClick = () => {
        seriesFilterEl.addEventListener('click', (event) => {
            if (!event.target.matches('.js-series-item')) {
                return;
            }
            seriesFilterItemsEl.forEach((item) => {
                item.classList.remove('active');
            });
            event.target.classList.add('active');

            if (event.target.dataset.value !== 'all') {
                currentSeriesFilter = event.target.dataset.value;
            }else{
                currentSeriesFilter = null;
            }
            // console.log(currentSeriesFilter);
            
        //    const filteredProducts = filterProducts(currentSeriesFilter);
            // console.log(filteredProducts);
           
            // renderProductCards(filteredProducts, productContainer);
            // btnShowMore.classList.add('hidden');
            applyFilters();
        });
        
    };

    const handlePriceFilterChange = () => {
        priceFilterSelect.addEventListener('change', () => {
            // console.log(priceFilterSelect.value);
            currentPriceFilterSelect = priceFilterSelect.value;
            // console.log('currentPriceFilterSelect: ',currentPriceFilterSelect);
            // filterProducts(currentSeriesFilter, inputSearch.value);
            applyFilters();
            
            
        })
    };
    const handlePriceInputChange = () => {
        // console.log(1);
        const minPrice = parseInt(priceInputs[0].value, 10) || 0;
        const maxPrice = parseInt(priceInputs[1].value, 10) || Infinity;

        currentPriceFilterInputs = {min: minPrice, max: maxPrice};
        applyFilters();
        
    }

    priceInputs.forEach((input) => {
        // input.addEventListener('input' , () => {
        //     console.log(1)
        // });
        input.addEventListener('input', handlePriceInputChange);
    });
    handleSeriesFilterClick();
    handleSearchInput();
    handlePriceFilterChange();
};
 

export {
    filter
};