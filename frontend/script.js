const signupName = document.getElementById('signupName');
const signupEmail = document.getElementById('signupEmail');
const signupPassword = document.getElementById('signupPassword');
const signupBtn = document.getElementById('signupBtn');

const productName = document.getElementById('productName');
const productDescription = document.getElementById('productDescription');
const productPrice = document.getElementById('productPrice');
const productStock = document.getElementById('productStock');
const productCategory = document.getElementById('productCategory');
const productKey = document.getElementById('productKey');
const createProductBtn = document.getElementById('createProductBtn');

const emailInput = document.getElementById('emailInput');
const passwordInput = document.getElementById('passwordInput');
const loginBtn = document.getElementById('loginBtn');
const logoutBtn = document.getElementById('logoutBtn');

const allUsersContainer = document.getElementById('allUsersContainer');
const getAllUsersBtn = document.getElementById('getAllUsersBtn');

const allProductsContainer = document.getElementById('allProductsContainer');
const productContainer = document.getElementById('productContainer');

const cartContainer = document.getElementById('cartContainer');
const productsInCart = document.getElementById('productsInCart');
const orderBtn = document.getElementById('orderBtn');
const getOrdersBtn = document.getElementById('getOrdersBtn')
const allOrders = document.getElementById('allOrders')
if (localStorage.getItem('loggedInUser')) {
	//Is logged in
	console.log('logged in');
} else {
	//Not logged in
	console.log('logged out');
}

signupBtn.addEventListener('click', signupUser);
loginBtn.addEventListener('click', loginUser);
logoutBtn.addEventListener('click', logoutUser);
getAllUsersBtn.addEventListener('click', getAllUser);
getOrdersBtn.addEventListener('click', getAllOrders)
const productIndex = [];
let cartIndex = [];

function signupUser() {
	let sendUser = {
		name: signupName.value,
		email: signupEmail.value,
		password: signupPassword.value,
	};

	fetch('http://localhost:3000/api/users/add', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(sendUser),
	})
		.then((res) => res.json())
		.then((user) => {
			console.log('Post user', user);
		});
}

function loginUser() {
	let sendUser = {
		email: emailInput.value,
		password: passwordInput.value,
	};

	fetch('http://localhost:3000/api/users/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(sendUser),
	})
		.then((res) => res.json())
		.then((user) => {
			console.log('Post user', user);
			if (user.id) {
				localStorage.setItem('loggedInUser', user.id);
			} else {
				console.log('STOP wrong user data');
			}
		});
}

function logoutUser() {
	localStorage.removeItem('loggedInUser');
}

//PRODUKTER

function createProduct() {
	let sendProduct = {
		name: productName.value,
		description: productDescription.value,
		price: productPrice.value,
		lager: productStock.value,
		category: productCategory.value,
		token: productKey.value,
	};

	fetch('http://localhost:3000/api/products/add', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(sendProduct),
	})
		.then((res) => res.json())
		.then((createdProduct) => {
			console.log('Post user', createdProduct);
		});
}

function getAllUser() {
	fetch('http://localhost:3000/api/users', {
		method: 'GET',
	})
		.then((res) => res.json())
		.then((users) => {
			allUsersContainer.innerText = '';

            const userSelect = document.createElement('select');
            allUsersContainer.appendChild(userSelect);
            const userDefault = document.createElement('option');

            userDefault.value = 'Select user';
            userDefault.text = 'Select user';
            userSelect.appendChild(userDefault);

            const showUser = document.createElement('button')
            showUser.innerText = 'Display user info'
            allUsersContainer.appendChild(showUser)

            for (let user of users) {
                const userOption = document.createElement('option');
                userOption.value = user._id;
                userOption.text = user.name;
                userSelect.appendChild(userOption);
                localStorage.setItem(user._id, JSON.stringify(user));
            }

            showUser.addEventListener('click', () => {
                const selectedUserId = userSelect.value;
                const selectedUser = JSON.parse(localStorage.getItem(selectedUserId));
                console.log('Selected user:', selectedUser);
            });

			
		});
}

function getAllProducts() {
	fetch('http://localhost:3000/api/products', {
		method: 'GET',
	})
		.then((res) => res.json())
		.then((products) => {
            productContainer.innerText = ''
			products.map((product) => {
				const productArticle = document.createElement('article');
				productArticle.className = 'productArticle';
				productArticle.id = 'productArticle';
				productContainer.appendChild(productArticle);

				const articleTitle = document.createElement('h3');
				articleTitle.className = 'articleTitle';
				productArticle.appendChild(articleTitle);
				articleTitle.innerHTML = product.name;

				const articlePrice = document.createElement('p');
				articlePrice.className = 'articlePrice';
				productArticle.appendChild(articlePrice);
				articlePrice.innerText = product.price + ' Sek';

				const articleBtn = document.createElement('div');
				articleBtn.className = 'articleBtn';
				productArticle.appendChild(articleBtn);

				const removeFromCartBtn = document.createElement('button');
				removeFromCartBtn.id = `${product._id}`;
				removeFromCartBtn.className = 'removeFromCartBtn';
				removeFromCartBtn.innerText = '-';
				articleBtn.appendChild(removeFromCartBtn);

                const addToCartBtn = document.createElement('button');
				addToCartBtn.id = `${product._id}`;
				addToCartBtn.innerText = '+';
				addToCartBtn.className = 'addToCartBtn';
				articleBtn.appendChild(addToCartBtn);

				const articleAmount = document.createElement('p');
				articleAmount.id = `${product._id}1`;
				articleAmount.className = 'articleAmount';
				articleAmount.innerText = 0;
				articleBtn.appendChild(articleAmount);

                const productStock = document.createElement('span')
                productStock.id = `${product.lager}2`
                productStock.innerText = `In stock ${product.lager}`
                articleBtn.appendChild(productStock)



				removeFromCartBtn.addEventListener('click', () =>
					removeFromCart(product, articleAmount, productStock)
				);
				addToCartBtn.addEventListener('click', () =>
					addToCart(product, articleAmount, productStock)
				);
			});
		});
}
getAllProducts();


function removeFromCart(product, articleAmount) {
	const productAdded = cartIndex.find((article) => article._id === product._id);
	if (productAdded) {
		if (productAdded.quantity === 1) {
			const productRemoved = cartIndex.findIndex(
				(article) => article._id === product._id
			);
			cartIndex.splice(productRemoved, 1);
			articleAmount.innerText = 0;
		} else {
			productAdded.quantity -= 1;
			console.log(productAdded);
			articleAmount.innerText = productAdded.quantity;
		}
	} else if (!productAdded) {
		console.log('Product not in cart');
	}
	console.log(cartIndex);

	productsInCart.innerText = '';
	printCart();
}

function addToCart(product, articleAmount) {
	const productAdded = cartIndex.find((article) => article._id === product._id);
	if (productAdded) {
        productStock.lager -= 1;
		productAdded.quantity += 1;
        productStock.innerText = productStock.lager
		console.log(productAdded);
		articleAmount.innerText = productAdded.quantity;
	} else if (!productAdded) {
		cartIndex.push({
			_id: product._id,
			name: product.name,
			price: product.price,
			quantity: 1,

		});
		console.log(cartIndex);
		articleAmount.innerText = 1;
	}

	productsInCart.innerText = '';
	printCart();
}

function printCart() {
	cartIndex.forEach((product) => {
		if (product.quantity >= 1) {
			articleInCart = document.createElement('article');
			articleInCart.innerText = '';
			articleInCart.className = 'articleInCart';
			productsInCart.appendChild(articleInCart);

			articleInCartTitle = document.createElement('p');
			articleInCartTitle.innerText = product.name;
			articleInCart.appendChild(articleInCartTitle);

			articleInCartAmount = document.createElement('p');
			articleInCartAmount.innerText = product.quantity;
			articleInCart.appendChild(articleInCartAmount);
		}
	});
}

orderBtn.addEventListener('click', sendOrder)

function sendOrder() {
    const loggedInUserId = localStorage.getItem('loggedInUser');

    if (!loggedInUserId) {
        console.log('User not logged in');
        return
    }
    if (cartIndex.length < 1) {
        console.log('No products in cart');
        return
    }
    let ordersInCart = {
        user: loggedInUserId,
        products: cartIndex.map((product) =>({
            productId: product._id,
            quantity: product.quantity
        }))
    }

	fetch('http://localhost:3000/api/orders/add', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(ordersInCart),
	})
		.then((res) => res.json())
		.then((order) => {
			console.log('Order added!', order);
		});
        cartIndex = [];
        getAllProducts();
        productsInCart.innerText = ''
}



function getAllOrders() {
	fetch('http://localhost:3000/api/orders/all/secretKey1', {
		method: 'GET',
	})
		.then((res) => res.json())
		.then((orders) => {

            const orderSelect = document.createElement('select');
            allOrders.appendChild(orderSelect);
            const ordersDefault = document.createElement('option');

            ordersDefault.value = 'Select order';
            ordersDefault.text = 'Select order';
            orderSelect.appendChild(ordersDefault);

            const showOrder = document.createElement('button')
            showOrder.innerText = 'Display user info'
            allOrders.appendChild(showOrder)

            for (let order of orders) {
                const orderOption = document.createElement('option');
                orderOption.value = order._id;
                orderOption.text = order._id;
                orderSelect.appendChild(orderOption);
                localStorage.setItem(order._id, JSON.stringify(order));
            }

            showOrder.addEventListener('click', () => {
                const selectedOrderId = orderSelect.value;
                const selectedOrder = JSON.parse(localStorage.getItem(selectedOrderId));
                console.log('Selected user:', selectedOrder._id);
            });		});
}