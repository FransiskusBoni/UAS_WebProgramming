document.addEventListener("DOMContentLoaded", () => {
    const cartCountElement = document.getElementById("cart-count");
    let cartCount = localStorage.getItem("cartCount") ? parseInt(localStorage.getItem("cartCount")) : 0;
    
    if (cartCountElement){
        cartCountElement.innerText = cartCount;
    }

    document.body.addEventListener("click", function(e) {
        if (e.target && e.target.classList.contains("btn-secondary") && e.target.innerText === "Tambah ke Keranjang") {
            cartCount++;
            localStorage.setItem("cartCount", cartCount);
            if (cartCountElement) cartCountElement.innerText = cartCount;
            alert("Produk berhasil ditambahkan ke keranjang");
        }
    });

    const searchInput = document.getElementById("search-input");
    if (searchInput){
        searchInput.addEventListener("keyup", function(){
            let filter = searchInput.value.toLowerCase();
            let cards = document.querySelectorAll(".card");
            
            cards.forEach(card => {
                let title = card.querySelector("h4").innerText.toLowerCase();
                if (title.indexOf(filter) > -1){
                    card.style.display = "flex";
                } else{
                    card.style.display = "none";
                }
            });
        });
    }

    const priceInput = document.getElementById("price-input");
    if (priceInput){
        priceInput.addEventListener("input", function(e){
            let numericValue = e.target.value.replace(/\D/g, "");
            if (numericValue){
                let formatted = new Intl.NumberFormat('id-ID').format(numericValue);
                e.target.value = `Rp ${formatted}`;
            } else{
                e.target.value = "";
            }
        });
    }

    const addProductForm = document.getElementById("add-product-form");
    if (addProductForm) {
        addProductForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            const nameInput = document.getElementById("product-name").value;
            const priceVal = document.getElementById("price-input").value;

            let products = JSON.parse(localStorage.getItem("storeProducts")) || [];
            
            products.push({
                name: nameInput,
                price: priceVal,
                image: "placeholder.jpg"
            });

            localStorage.setItem("storeProducts", JSON.stringify(products));

            alert(`Sukses! ${nameInput} berhasil masuk ke sistem listing. Silakan cek halaman Produk.`);
            addProductForm.reset();
        });
    }

    const forms = document.querySelectorAll("form:not(#add-product-form)");
    forms.forEach(form =>{
        form.addEventListener("submit", (e) =>{
            e.preventDefault();
            alert("Berhasil login!");
            form.reset();
        });
    });

    const productContainer = document.getElementById("product-container");
    if (productContainer) {
        let products = JSON.parse(localStorage.getItem("storeProducts")) || [];
        
        products.forEach(product => {
            const newCard = document.createElement("div");
            newCard.className = "card";
            newCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <div class="card-info">
                  <h4>${product.name}</h4>
                  <p class="price">${product.price}</p>
                  <button class="btn-secondary">Tambah ke Keranjang</button>
                </div>
            `;
            productContainer.appendChild(newCard);
        });
    }
});