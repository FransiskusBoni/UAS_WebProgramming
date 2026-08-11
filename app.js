document.addEventListener("DOMContentLoaded", () => {
    const cartCountElement = document.getElementById("cart-count");
    let cartCount = localStorage.getItem("cartCount") ? parseInt(localStorage.getItem("cartCount")) : 0;
    
    if (cartCountElement){
        cartCountElement.innerText = cartCount;
    }

    const buyButtons = document.querySelectorAll(".btn-secondary");
    buyButtons.forEach(button =>{
        button.addEventListener("click", () =>{
            cartCount++;
            localStorage.setItem("cartCount", cartCount);
            if (cartCountElement) cartCountElement.innerText = cartCount;
            alert("Produk berhasil ditambahkan ke keranjang");
        });
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

    const forms = document.querySelectorAll("form");
    forms.forEach(form =>{
        form.addEventListener("submit", (e) =>{
            e.preventDefault();
            alert("Formulir berhasil disubmit (Simulasi)!");
            form.reset();
        });
    });
});