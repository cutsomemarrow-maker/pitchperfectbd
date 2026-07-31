let cart = [];

function changeQty(id, change){
    let quantity = document.getElementById(id);
    let value = parseInt(quantity.innerHTML);
    value = value + change;
    if(value < 0){
        value = 0;
    }
    quantity.innerHTML = value;
}

function addToCart(name, price, sizeId, qtyId){
    let size = document.getElementById(sizeId).value;
    let qty = parseInt(document.getElementById(qtyId).innerHTML);

    if(qty < 1){
        alert("Please select a quantity of at least 1 before adding to cart.");
        return;
    }

    cart.push({
        name: name,
        price: price,
        size: size,
        qty: qty
    });

    // reset that product's quantity back to 0 after adding
    document.getElementById(qtyId).innerHTML = 0;

    updateCart();
}

function updateCart(){
    let list = document.getElementById("cartItems");
    list.innerHTML = "";
    let total = 0;

    cart.forEach(function(item, index){
        let itemPrice = item.price * item.qty;
        total += itemPrice;

        let li = document.createElement("li");
        li.innerHTML = `
            <strong>${item.name}</strong>
            <br>
            Size: ${item.size}
            <br>
            Quantity: ${item.qty}
            <br>
            Price: ৳${itemPrice}
            <br>
            <button onclick="removeItem(${index})">Remove</button>
        `;
        list.appendChild(li);
    });

    document.getElementById("total").innerHTML = total;
    document.getElementById("billName").innerHTML =
        document.getElementById("name").value || "-";
    document.getElementById("billPhone").innerHTML =
        document.getElementById("phone").value || "-";
    document.getElementById("billAddress").innerHTML =
        document.getElementById("address").value || "-";
}

function removeItem(index){
    cart.splice(index, 1);
    updateCart();
}

document.querySelectorAll("input,textarea").forEach(function(element){
    element.addEventListener("input", updateCart);
});

function searchProducts(){
    let input = document.getElementById("searchInput").value.toLowerCase().trim();
    let allProducts = document.querySelectorAll("#productsList .product");

    allProducts.forEach(function(product){
        let nameElement = product.querySelector("h3");
        let name = nameElement.textContent.toLowerCase();

        if(name.includes(input)){
            product.style.display = "flex";
        } else {
            product.style.display = "none";
        }
    });
}

function orderMessenger(){
    let message = "🛒 New Order - PitchPerfectBD%0A%0A";

    message += "Customer Name: " + document.getElementById("name").value + "%0A";
    message += "Phone: " + document.getElementById("phone").value + "%0A";
    message += "Address: " + document.getElementById("address").value + "%0A%0A";
    message += "Order Details:%0A";

    let total = 0;
    cart.forEach(function(item){
        let price = item.price * item.qty;
        total += price;
        message += item.name + " | Size: " + item.size + " | Qty: " + item.qty + " | Price: ৳" + price + "%0A";
    });

    message += "%0ATotal Product Price: ৳" + total;
    message += "%0A%0A🚚 Delivery Charge Advance Required:%0A";
    message += "Inside Chittagong: ৳80%0A";
    message += "Outside Chittagong: ৳130";

    window.open("https://m.me/PitchperfectBD?text=" + message, "_blank");
}
