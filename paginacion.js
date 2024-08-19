const products = [
    { name: 'Chevrolet Onix Joy', description: 'Generación 2019, variedad de colores. Motor 1.0, ideal para ciudad', price: 'USD 13500', quantitySold: '14', imgSrc: 'img/chevrolet-onix-joy-blanco.png' },
    { name: 'Fiat Way', description: 'La version de fiat que brinda confort y a un precio accesible.', price: 'USD 14500', quantitySold: '52', imgSrc: 'img/fiat-way-verde.png' },
    { name: 'Susuki Celerio', description: 'Un auto que se ha ganado la buena fama por su economía.', price: 'USD 12500', quantitySold: '25', imgSrc: 'img/susuki-celerio-azul.png' },
    { name: 'Auto 4', description: 'Descripción del auto 4.', price: '$35,000', quantitySold: '250', imgSrc: 'ruta/a/la/imagen4.jpg' },
    { name: 'Auto 5', description: 'Descripción del auto 5.', price: '$40,000', quantitySold: '300', imgSrc: 'ruta/a/la/imagen5.jpg' },
    { name: 'Auto 6', description: 'Descripción del auto 6.', price: '$45,000', quantitySold: '350', imgSrc: 'ruta/a/la/imagen6.jpg' },
    // Agrega más productos según sea necesario
];

const itemsPerPage = 3;
let currentPage = 1;

function displayProducts(page) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedProducts = products.slice(start, end);

    paginatedProducts.forEach(product => {
        const productItem = document.createElement('article');
        productItem.classList.add('product-item');

        productItem.innerHTML = `
            <img src="${product.imgSrc}" alt="${product.name}">
            <div class="product-details">
                <h2>${product.name}</h2>
                <p class="description">${product.description}</p>
                <p class="price">Precio: ${product.price}</p>
                <p class="quantity-sold">Cantidad Vendida: ${product.quantitySold}</p>
            </div>
        `;

        productList.appendChild(productItem);
    });

    document.getElementById('page-number').textContent = `Página ${currentPage}`;
    document.getElementById('prev-button').disabled = currentPage === 1;
    document.getElementById('next-button').disabled = currentPage * itemsPerPage >= products.length;
}

document.getElementById('prev-button').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        displayProducts(currentPage);
    }
});

document.getElementById('next-button').addEventListener('click', () => {
    if (currentPage * itemsPerPage < products.length) {
        currentPage++;
        displayProducts(currentPage);
    }
});

// Inicializar con la primera página
displayProducts(currentPage);
