// Instrukcijos
// Base URL = https://sophisticated-humane-dandelion.glitch.me
// {
//     id: 1,
//     image: "https://pagrindinis.barbora.lt/api/images/GetInventoryImage?id=d0fb9982-06el-469d-ae79-e7efd69c59a1",
//     title: "Germano Sūris",
//     price: 2.99
// }

// { id: 2,
//     image: "https://pagrindinis.barbora.lt/api/images/GetInventoryImage?id=d0fb9982-06el-469d-ae79-e7efd69c59a1",
//     title: "Dvaro pienas",
//     price: 1.99}
// <!-- image"https://www.zpienas.lt/assets/media/gouda-suriukas_productBigThumbnail.png" -->

// image: "http://pienozvaigzdes.lt/resized/705/736/img/p/1/0/9/0/1090.jpg",
// title: "Dvaro pienas",
// price: 1.99

// 1. Pirmame puslapyje pasirašykite GET, kuris atsisiųs visus produktus ir atvaizduos vieną šalia kito po keturis eilutėje su nuotraukomis.
// 2. Kitame puslapyje pasirašykite formą, kuri pridės produktą. Pridėjus, išmes alert'ą, kad sėkmingai pridėtas ir nukreips (redirect) į pirminį produktų atvaizdavimo puslapį.
// 3. Padarykite, kad paspaudus delete mygtuką - back-end'ui būtų išsiunčiamas Fetch Delete Request (baseURL + /:id). T.y. į url turėsite paduoti produkto ID parametrą (pvz.: DELETE baseURL/1 ištrins pirmą įrašą).
// 4. Padarykite, kad ištrynus produktą - puslapis persikrautų. Taip nėra labai efektyvu - pagalvokite, kokiais kitais būdais galima būtų pasiekti šį rezultatą? Hint: gavus success message iš back-end'o filtruoti duomenis ir ištrinti su front-end'u irgi.

document.getElementById('addProductForm').addEventListener('submit', function (event) {
    event.preventDefault();
  
    const formData = {
      title: document.getElementById('productName').value,
      image: document.getElementById('productImage').value,
      price: parseFloat(document.getElementById('productPrice').value),
    };
  
    // Siunčia POST užklausą pridėjimui
    fetch('https://sophisticated-humane-dandelion.glitch.me', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
      alert('Produktas sėkmingai pridėtas!');
      // Atnaujina  sąrašą
      updateProductList(data);
    })
    .catch(error => console.error('Klaida pridedant produktą:', error));
  });
  
  // Gauna produktus ir atvaizduoja juos
  fetch('https://sophisticated-humane-dandelion.glitch.me')
    .then(response => response.json())
    .then(data => updateProductList(data))
    .catch(error => console.error('Klaida gavus produktus:', error));
  
  // Atvaizduoja produktų sąrašą
  function updateProductList(products) {
    const productsContainer = document.getElementById('productsContainer');
    productsContainer.innerHTML = '';
  
    products.forEach(product => {
      const productElement = document.createElement('div');
      productElement.className = 'product';
      productElement.innerHTML = `
        <img src="${product.image}" alt="${product.title}" style="max-width: 100px;">
        <h3>${product.title}</h3>
        <p>€${product.price.toFixed(2)}</p>
        <button onclick="deleteProduct(${product.id})">Ištrinti</button>
      `;
      productsContainer.appendChild(productElement);
    });
  }
  
  // Ištrina produktą
  function deleteProduct(productId) {
    fetch(`https://sophisticated-humane-dandelion.glitch.me/${productId}`, {
      method: 'DELETE',
    })
    .then(response => {
      if (response.ok) {
        console.log('Produktas sėkmingai ištrintas!');

        // Atnaujina produktų sąrašą
        fetch('https://sophisticated-humane-dandelion.glitch.me')
          .then(response => response.json())
          .then(data => updateProductList(data))
          .catch(error => console.error('Klaida gavus produktus:', error));
      } else {
        console.error('Nepavyko ištrinti produkto');
      }
    })
    .catch(error => console.error('Klaida ištrinant produktą:', error));
  }