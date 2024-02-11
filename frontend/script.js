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

const categoryFilter = document.getElementById('categoryFiter')

const logoutBtn = document.getElementById('logoutBtn');

const allUsersContainer = document.getElementById('allUsersContainer');
const getAllUsersBtn = document.getElementById('getAllUsersBtn');

const allProductsContainer = document.getElementById('allProductsContainer');
const productContainer = document.getElementById('productContainer');

const cartContainer = document.getElementById('cartContainer');
const productsInCart = document.getElementById('productsInCart');
const orderBtn = document.getElementById('orderBtn');
const getOrdersBtn = document.getElementById('getOrdersBtn');
const allOrders = document.getElementById('allOrders');
const logoutSection = document.getElementById('logoutSection');
const loginPage = document.getElementById('loginPage');

function checkLoginState() {
	if (localStorage.getItem('loggedInUser')) {
		//Is logged in
        loginPage.innerText = ''
		console.log('logged in');
		const logoutBtn = document.createElement('button');
		logoutBtn.id = 'logoutBtn';
		logoutBtn.className = 'logoutBtn';
		logoutBtn.innerText = 'Sign out';
		loginPage.appendChild(logoutBtn);
        logoutBtn.addEventListener('click', logoutUser)

	} else {
		//Not logged in
        loginPage.innerText = ''
        const emailLable = document.createElement('label')
        emailLable.className = 'emailLable'
        emailLable.innerText = 'E-mail address'
        loginPage.appendChild(emailLable)

        const emailInput = document.createElement('input');
        emailInput.type = 'text'
		emailInput.id = 'emailInput';
		emailInput.className = 'emailInput';
        emailInput.placeholder = 'Email@example.com'
		emailLable.appendChild(emailInput);
        const passwordLabel = document.createElement('label')
        passwordLabel.className = 'emailLable'
        passwordLabel.innerText = 'Password'
        loginPage.appendChild(passwordLabel)

        const passwordInput = document.createElement('input');
        passwordInput.type = 'password'
		passwordInput.id = 'passwordInput';
		passwordInput.className = 'passwordInput';
		passwordLabel.appendChild(passwordInput);

        const loginBtn = document.createElement('button');
		loginBtn.id = 'loginBtn';
		loginBtn.className = 'loginBtn';
        loginBtn.innerText = 'Sign in'
		loginPage.appendChild(loginBtn);

        loginBtn.addEventListener('click', () => loginUser(emailInput, passwordInput));
	}
}
checkLoginState()

function logoutUser() {
	localStorage.removeItem('loggedInUser');
    checkLoginState()
}

signupBtn.addEventListener('click', signupUser);
logoutBtn.addEventListener('click', logoutUser);
getAllUsersBtn.addEventListener('click', getAllUser);
getOrdersBtn.addEventListener('click', getAllOrders);
const productIndex = [];
let Index = [];

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

function loginUser(emailInput, passwordInput) {
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
				// localStorage.setItem('cart', JSON.stringify());
                checkLoginState()
			} else {
				console.log('STOP wrong user data');
			}
		});
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

			const showUser = document.createElement('button');
			showUser.innerText = 'Display user info';
			allUsersContainer.appendChild(showUser);

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
            
			productContainer.innerText = '';
			products.map((product) => {
                const cart = JSON.parse(localStorage.getItem('cart')) || []; 
                const productAdded = cart.find((article) => article._id === product._id);


				const productArticle = document.createElement('article');
				productArticle.className = 'productArticle';
				productArticle.id = 'productArticle';
				productContainer.appendChild(productArticle);

				const articleImage = document.createElement('img');
				articleImage.class = 'articleImage';
				articleImage.id = 'articleImage';
				articleImage.setAttribute('src', 'Assets/exampleImg.webp');
				articleImage.setAttribute('width', '300');
				articleImage.setAttribute('height', '300');
				articleImage.setAttribute('alt', `Description of ${product.name}`);
				productArticle.appendChild(articleImage);

				const articleTitle = document.createElement('h3');
				articleTitle.className = 'articleTitle';
				productArticle.appendChild(articleTitle);
				articleTitle.innerHTML = product.name;

                const articleCategory = document.createElement('p');
				articleCategory.className = 'articleTitle';
				productArticle.appendChild(articleCategory);
				articleCategory.innerHTML = `Category: ${product.category}`;

				const articlePrice = document.createElement('p');
				articlePrice.className = 'articlePrice';
				productArticle.appendChild(articlePrice);
				articlePrice.innerText = `${product.price} Sek`;

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

				articleBtn.appendChild(articleAmount);
                

				const productStock = document.createElement('span');
				productStock.id = `${product.lager}2`;

				articleBtn.appendChild(productStock);

                if (productAdded) {
                    articleAmount.innerText = `In cart ${productAdded.quantity}`;
                    productStock.innerText = `In stock ${
                        product.lager - productAdded.quantity
                    }`;
                } else { 
                    articleAmount.innerText = 'In cart: 0';
                    productStock.innerText = `In stock ${product.lager}`;
                }

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

function getallCategories() {
    fetch('http://localhost:3000/api/categories', {
		method: 'GET',
	})
		.then((res) => res.json())
		.then((categories) => {
			categoryFilter.innerText = '';
			const categorySelect = document.createElement('select');
			categoryFilter.appendChild(categorySelect);
			const categoryDefault = document.createElement('option');

			categoryDefault.value = 'Select category';
			categoryDefault.text = 'Select category';
			categorySelect.appendChild(categoryDefault);

			const showCategoryProductsBtn = document.createElement('button');
			showCategoryProductsBtn.innerText = 'Display products in category';
            showCategoryProductsBtn.setAttribute('disabled', '')
			categoryFilter.appendChild(showCategoryProductsBtn);

            localStorage.setItem('categories', JSON.stringify([]));

			for (let category of categories) {
				const categoryOption = document.createElement('option');
				categoryOption.value = category._id;
				categoryOption.text = category.name;
				categorySelect.appendChild(categoryOption);
				localStorage.setItem('allOrders', JSON.stringify(category));
			}

            
            categorySelect.addEventListener('change', () =>
					activateShowCategory(categorySelect, showCategoryProductsBtn)
				);
            showCategoryProductsBtn.addEventListener('click', () =>
					showCategory(categorySelect)
				);
		});
}
getallCategories()

function activateShowCategory(categorySelect, showCategoryProductsBtn) {
    if (categorySelect.value !== 'Select category') {
        showCategoryProductsBtn.removeAttribute('disabled');
    } else {
        showCategoryProductsBtn.setAttribute('disabled', '');
    }
}

function showCategory(categorySelect) {
    const existingMessage = document.getElementById('categoryErrorMessage');
    if (existingMessage) {
        existingMessage.remove();
    }
    const categoryMessage = document.createElement('span');
    categoryMessage.id = 'categoryErrorMessage';

        fetch(`http://localhost:3000/api/products/category/${categorySelect.value}`, {
            method: 'GET',
        })
            .then((res => {

                if (res.status !== 200) {
                    categoryMessage.innerText = 'No products in this category'
                    categoryFiter.appendChild(categoryMessage)

                    throw new Error('No products in this category');
                }
                return res.json()
            }))
            .then((filteredProducts) => {

                productContainer.innerText = '';
                filteredProducts.map((product) => {
                    const productArticle = document.createElement('article');
                    productArticle.className = 'productArticle';
                    productArticle.id = 'productArticle';
                    productContainer.appendChild(productArticle);
    
    
                    const articleImage = document.createElement('img');
                    articleImage.class = 'articleImage';
                    articleImage.id = 'articleImage';
                    articleImage.setAttribute('src', 'Assets/exampleImg.webp');
                    articleImage.setAttribute('width', '300');
                    articleImage.setAttribute('height', '300');
                    articleImage.setAttribute('alt', `Description of ${product.name}`);
                    productArticle.appendChild(articleImage);
    
                    const articleTitle = document.createElement('h3');
                    articleTitle.className = 'articleTitle';
                    productArticle.appendChild(articleTitle);
                    articleTitle.innerHTML = product.name;
    
                    const articleCategory = document.createElement('p');
                    articleCategory.className = 'articleTitle';
                    productArticle.appendChild(articleCategory);
                    articleCategory.innerHTML = `Category: ${product.category}`;
    
                    const articlePrice = document.createElement('p');
                    articlePrice.className = 'articlePrice';
                    productArticle.appendChild(articlePrice);
                    articlePrice.innerText = `${product.price} Sek`;
    
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
                    articleAmount.innerText = 'In cart: 0';
                    articleBtn.appendChild(articleAmount);
    
                    const productStock = document.createElement('span');
                    productStock.id = `${product.lager}2`;
                    productStock.innerText = `In stock ${product.lager}`;
                    articleBtn.appendChild(productStock);        
                    removeFromCartBtn.addEventListener('click', () =>
                        removeFromCart(product, articleAmount, productStock)
                    );
                    addToCartBtn.addEventListener('click', () =>
                        addToCart(product, articleAmount, productStock)
                    );

                });
                
                const resetProducts = document.createElement('button')
                resetProducts.id = 'resetProducts';
                resetProducts.className = 'resetProducts';
                resetProducts.innerText = 'Reset';
                categoryFiter.appendChild(resetProducts);

                resetProducts.addEventListener('click', getAllProducts)
            });
    }


function removeFromCart(product, articleAmount, productStock) {
	const cart = JSON.parse(localStorage.getItem('cart')) || [];
	const productAdded = cart.find((article) => article._id === product._id);
	if (productAdded) {
		if (productAdded.quantity === 1) {
			const productRemovedIndex = cart.findIndex(
				(article) => article._id === product._id
			);
			cart.splice(productRemovedIndex, 1);
			articleAmount.innerText = `In cart 0`;
			productStock.innerText = `In stock ${product.lager}`;
			console.log(productAdded);
		} else {
			productAdded.quantity -= 1;
			articleAmount.innerText = `In cart ${productAdded.quantity}`;
			productStock.innerText = `In stock ${
				product.lager - productAdded.quantity
			}`;
		}
	} else {
		console.log('Product not in cart');
	}
	console.log(cart);
	localStorage.setItem('cart', JSON.stringify(cart));

	productsInCart.innerText = '';
	printCart();
}

function addToCart(product, articleAmount, productStock) {
	const cart = JSON.parse(localStorage.getItem('cart')) || [];
	const productAdded = cart.find((article) => article._id === product._id);

	if (productAdded) {
        if (product.lager - productAdded.quantity <= 0) {
            productStock.innerText = `Product out of stock`;
        return;
    }
		productStock.lager -= 1;
		productAdded.quantity += 1;
		console.log(productAdded);
		articleAmount.innerText = `In cart ${productAdded.quantity}`;
		productStock.innerText = `In stock ${
			product.lager - productAdded.quantity
		}`;
	} else {
		cart.push({
			_id: product._id,
			name: product.name,
			price: product.price,
			quantity: 1,
		});
		console.log(cart);
		articleAmount.innerText = `In cart 1`
		productStock.innerText = `In stock ${product.lager - 1}`;
	}
	localStorage.setItem('cart', JSON.stringify(cart));

	productsInCart.innerText = '';
	printCart();
}

function printCart() {
	const cart = JSON.parse(localStorage.getItem('cart')) || [];

	cart.forEach((product) => {
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

printCart()

orderBtn.addEventListener('click', sendOrder);

function sendOrder() {
	const loggedInUserId = localStorage.getItem('loggedInUser');
	const cart = JSON.parse(localStorage.getItem('cart')) || [];

	if (!loggedInUserId) {
		console.log('Please log in to complete the order');
		return;
	}
	if (cart.length < 1) {
		console.log('No products in the cart');
		return;
	}

	let ordersInCart = {
		user: loggedInUserId,
		products: cart.map((product) => ({
			productId: product._id,
			quantity: product.quantity,
		})),
	};

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

	localStorage.removeItem('cart');
	productsInCart.innerText = '';
	getAllProducts();
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

			const showOrder = document.createElement('button');
			showOrder.innerText = 'Display user info';
			allOrders.appendChild(showOrder);

            localStorage.setItem('allOrders', JSON.stringify([]));

			for (let order of orders) {
				const orderOption = document.createElement('option');
				orderOption.value = order._id;
				orderOption.text = order._id;
				orderSelect.appendChild(orderOption);
				localStorage.setItem('allOrders', JSON.stringify(orders));
			}

			showOrder.addEventListener('click', () => {
                const selectedOrderId = orderSelect.value;
                const selectedOrder = JSON.parse(localStorage.getItem('allOrders')).find(order => order._id === selectedOrderId);
                if (selectedOrder) {
                    console.log('Selected user ID:', (selectedOrder.products));
                } else {
                    console.log('Order not found');
                }
			});
		});
}
