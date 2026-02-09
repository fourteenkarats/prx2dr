// ---------------- GLOBAL ----------------
const toggleMenu = () => {
    const navLinks = document.querySelector(".nav-links");
    if(navLinks) navLinks.classList.toggle("active");
};

const openModal = (productName, price) => {
    const modal = document.getElementById("product-modal");
    const modalTitle = document.getElementById("modal-title");
    const modalPrice = document.getElementById("modal-price");
    if(modal && modalTitle && modalPrice){
        modalTitle.textContent = productName;
        modalPrice.textContent = price;
        modal.style.display = "flex";
    }
};

const closeModal = () => {
    const modal = document.getElementById("product-modal");
    if(modal) modal.style.display = "none";
};

// ---------------- SCROLL TO SECTIONS ----------------
document.querySelectorAll("header .nav-links a").forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = link.getAttribute("href")?.slice(1);
        const section = document.getElementById(targetId);
        if(section){
            section.scrollIntoView({behavior: "smooth"});
        }
    });
});

// ---------------- CART SIDEBAR ----------------
const cartSidebar = document.createElement("div");
cartSidebar.classList.add("cart-sidebar");
cartSidebar.innerHTML = `
    <div class="cart-header">
        <h2>Your Cart</h2>
        <button class="close-cart-btn">&times;</button>
    </div>
    <div class="cart-items"></div>
    <div class="cart-footer">
        <p class="cart-total">Total: $0.00</p>
        <button class="btn" id="checkout-btn">Submit Request</button>
    </div>
`;
document.body.appendChild(cartSidebar);

const cartIcon = document.querySelector(".cart");
const closeCartBtn = cartSidebar.querySelector(".close-cart-btn");
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const updateCartUI = () => {
    const cartItemsContainer = cartSidebar.querySelector(".cart-items");
    const cartTotal = cartSidebar.querySelector(".cart-total");
    if(!cartItemsContainer || !cartTotal) return;

    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `
            <h4>${item.name}</h4>
            <p>Price: ${item.price}</p>
            <div class="qty-controls">
                <button class="qty-btn" data-index="${index}" data-delta="-1">-</button>
                <span>${item.qty}</span>
                <button class="qty-btn" data-index="${index}" data-delta="1">+</button>
                <button class="remove-btn" data-index="${index}">Remove</button>
            </div>
        `;
        cartItemsContainer.appendChild(cartItem);
        total += parseFloat(item.price.replace('$','')) * item.qty;
    });

    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
    localStorage.setItem("cart", JSON.stringify(cart));

    // Add listeners
    cartItemsContainer.querySelectorAll(".qty-btn").forEach(btn => {
        btn.addEventListener("click", () => changeQty(btn.dataset.index, parseInt(btn.dataset.delta)));
    });
    cartItemsContainer.querySelectorAll(".remove-btn").forEach(btn => {
        btn.addEventListener("click", () => removeFromCart(btn.dataset.index));
    });
};

// Open / Close cart
if(cartIcon) cartIcon.addEventListener("click", () => cartSidebar.classList.add("open"));
if(closeCartBtn) closeCartBtn.addEventListener("click", () => cartSidebar.classList.remove("open"));

// Cart functions
const addToCart = (name, price) => {
    const existing = cart.find(item => item.name === name);
    if(existing) existing.qty++;
    else cart.push({name, price, qty:1});
    updateCartUI();
    cartSidebar.classList.add("open");
};

const removeFromCart = (index) => {
    index = parseInt(index);
    cart.splice(index,1);
    updateCartUI();
};

const changeQty = (index, delta) => {
    index = parseInt(index);
    delta = parseInt(delta);
    cart[index].qty += delta;
    if(cart[index].qty <= 0) cart.splice(index,1);
    updateCartUI();
};

const products = [
  {
    name: "Drone Model A",
    price: 1200,
    category: "Industrial",
    type: "Quadcopter",
    image: "images/droneA.jpg",
    description: "High payload industrial drone with GPS and long flight time.",
    specs: ["Payload: 5kg", "Flight time: 40 min", "HD Camera", "GPS Navigation"]
  },
  {
    name: "Drone Model B",
    price: 1500,
    category: "Industrial",
    type: "Hexacopter",
    image: "images/droneB.jpg",
    description: "Thermal camera drone for inspection and surveillance tasks.",
    specs: ["Thermal Camera", "Flight time: 35 min", "Sturdy Frame", "GPS Assisted Flight"]
  },
  {
    name: "Drone Model C",
    price: 900,
    category: "Commercial",
    type: "Quadcopter",
    image: "images/droneC.jpg",
    description: "Compact drone for aerial photography and small deliveries.",
    specs: ["Payload: 1kg", "Flight time: 25 min", "HD Camera", "Lightweight"]
  },
  {
    name: "Drone Model D",
    price: 2000,
    category: "Industrial",
    type: "Octocopter",
    image: "images/droneD.jpg",
    description: "Heavy-duty octocopter for large payloads and professional use.",
    specs: ["Payload: 10kg", "Flight time: 50 min", "Multiple Cameras", "Stabilized Gimbal"]
  },
  {
    name: "Drone Model E",
    price: 800,
    category: "Commercial",
    type: "Quadcopter",
    image: "images/droneE.jpg",
    description: "Affordable drone for beginners and small industrial tasks.",
    specs: ["Payload: 0.5kg", "Flight time: 20 min", "Basic Camera", "Easy to Fly"]
  },
  {
    name: "Drone Model F",
    price: 1700,
    category: "Industrial",
    type: "Hexacopter",
    image: "images/droneF.jpg",
    description: "Hexacopter for inspection, mapping, and moderate payloads.",
    specs: ["Payload: 4kg", "Flight time: 40 min", "GPS Navigation", "HD Camera"]
  },
  {
    name: "Drone Model G",
    price: 1100,
    category: "Commercial",
    type: "Quadcopter",
    image: "images/droneG.jpg",
    description: "Reliable drone for commercial delivery and photography.",
    specs: ["Payload: 1.5kg", "Flight time: 30 min", "Camera: 4K", "Compact Design"]
  },
  {
    name: "Drone Model H",
    price: 2500,
    category: "Industrial",
    type: "Octocopter",
    image: "images/droneH.jpg",
    description: "Professional octocopter for large-scale industrial applications.",
    specs: ["Payload: 12kg", "Flight time: 55 min", "Multiple Cameras", "Advanced GPS"]
  },
  {
    name: "Drone Model I",
    price: 1300,
    category: "Commercial",
    type: "Hexacopter",
    image: "images/droneI.jpg",
    description: "Commercial drone for inspection and aerial monitoring.",
    specs: ["Payload: 3kg", "Flight time: 35 min", "Camera: HD", "GPS Assisted"]
  },
  {
    name: "Drone Model J",
    price: 1000,
    category: "Commercial",
    type: "Quadcopter",
    image: "images/droneJ.jpg",
    description: "Versatile quadcopter for small industrial and commercial tasks.",
    specs: ["Payload: 2kg", "Flight time: 28 min", "Camera: HD", "Easy Operation"]
  }
];
const displayProducts = (arr) => {
    const container = document.querySelector(".product-grid");
    if(!container) return;
    container.innerHTML = "";

    arr.forEach(product => {
        const card = document.createElement("div");
        card.classList.add("product-card");
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="price">$${product.price}</p>
            <button class="btn-small view-details-btn">View Details</button>
            <button class="btn-small add-to-cart-btn">Add to Cart</button>
        `;
        container.appendChild(card);

        // Add event listeners
        card.querySelector(".view-details-btn").addEventListener("click", () => openDroneDetail(product));
        card.querySelector(".add-to-cart-btn").addEventListener("click", () => addToCart(product.name, `$${product.price}`));
    });
};

// ---------------- FILTERS ----------------
const filterCards = document.querySelectorAll(".filter-card");
const typeFilter = document.getElementById("typeFilter");
const priceFilter = document.getElementById("priceFilter");
const priceValue = document.getElementById("priceValue");
const sortPrice = document.getElementById("sortPrice");

const applyFilters = () => {
    let filtered = [...products];
    const selectedCategories = filterCards ? Array.from(filterCards).filter(c => c.classList.contains("active")).map(c => c.dataset.category) : [];
    const type = typeFilter ? typeFilter.value : "all";
    const maxPrice = priceFilter ? parseInt(priceFilter.value) : Infinity;

    if(selectedCategories.length) filtered = filtered.filter(p => selectedCategories.includes(p.category));
    if(type !== "all") filtered = filtered.filter(p => p.type === type);
    filtered = filtered.filter(p => p.price <= maxPrice);

    if(sortPrice){
        if(sortPrice.value === "asc") filtered.sort((a,b) => a.price - b.price);
        if(sortPrice.value === "desc") filtered.sort((a,b) => b.price - a.price);
    }

    displayProducts(filtered);
};

if(filterCards){
    filterCards.forEach(card => {
        card.addEventListener("click", () => {
            card.classList.toggle("active");
            applyFilters();
        });
    });
}
if(typeFilter) typeFilter.addEventListener("change", applyFilters);
if(priceFilter){
    priceFilter.addEventListener("input", () => {
        if(priceValue) priceValue.textContent = `$${priceFilter.value}`;
        applyFilters();
    });
}
if(sortPrice) sortPrice.addEventListener("change", applyFilters);

// ---------------- SCROLL ANIMATION ----------------
const scrollElements = document.querySelectorAll(".product-card, .hero-content, .products h2, .services-grid, .testimonial-cards, .faq-item");
const elementInView = (el, offset = 100) => el.getBoundingClientRect().top <= (window.innerHeight || document.documentElement.clientHeight) - offset;
const displayScrollElement = (element) => element.classList.add("scrolled");
const handleScrollAnimation = () => scrollElements.forEach(el => elementInView(el,150) && displayScrollElement(el));
if(scrollElements.length) window.addEventListener("scroll", handleScrollAnimation);

// ---------------- HOVER SOUND ----------------
const hoverSound = new Audio("https://cdn.pixabay.com/download/audio/2022/03/15/audio_67c775d390.mp3?filename=click-124467.mp3");
document.querySelectorAll(".btn, .btn-small").forEach(btn => {
    btn.addEventListener("mouseenter", () => {
        hoverSound.volume = 0.2;
        hoverSound.play();
    });
});

// ---------------- PARALLAX HERO ----------------
document.addEventListener("mousemove", (e) => {
    const hero = document.querySelector(".hero");
    if(hero){
        const moveX = (e.clientX / window.innerWidth) * 10;
        const moveY = (e.clientY / window.innerHeight) * 10;
        hero.style.backgroundPosition = `${50 + moveX}% ${50 + moveY}%`;
    }
});

// ---------------- BURGER MENU ----------------
const burger = document.querySelector(".burger");
if(burger) burger.addEventListener("click", toggleMenu);

// ---------------- FAQ TOGGLE ----------------
document.querySelectorAll(".faq-item").forEach(item => {
    item.addEventListener("click", () => {
        const p = item.querySelector("p");
        if(p) p.style.display = p.style.display === "block" ? "none" : "block";
    });
});

// ---------------- SINGLE DRONE ----------------
const droneDetailSection = document.getElementById("drone-detail");
const openDroneDetail = (drone) => {
    if(!droneDetailSection) return;
    droneDetailSection.style.display = "block";
    document.querySelector(".products")?.scrollIntoView({behavior: "smooth"});

    const droneName = document.getElementById("drone-name");
    const droneImg = document.getElementById("drone-img");
    const droneDesc = document.getElementById("drone-description");
    const specsUl = document.getElementById("drone-specs");

    if(droneName) droneName.textContent = drone.name;
    if(droneImg) droneImg.src = drone.image;
    if(droneDesc) droneDesc.textContent = drone.description;
    if(specsUl){
        specsUl.innerHTML = "";
        drone.specs.forEach(spec => {
            const li = document.createElement("li");
            li.textContent = spec;
            specsUl.appendChild(li);
        });
    }
};

const closeDroneDetail = () => {
    if(droneDetailSection) droneDetailSection.style.display = "none";
};

const sendInquiry = () => alert("Your B2B inquiry has been sent!");

// ---------------- MODAL QUOTE BUTTON ----------------
const requestQuoteBtn = document.getElementById("request-quote");
if(requestQuoteBtn){
    requestQuoteBtn.addEventListener("click", () => {
        sendInquiry();
        closeModal();
    });
}

// ---------------- INITIAL DISPLAY ----------------
displayProducts(products);
updateCartUI();
