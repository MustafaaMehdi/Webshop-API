
const productName = document.getElementById('productName');
const productDescription = document.getElementById('productDescription');
const productPrice = document.getElementById('productPrice');
const productStock = document.getElementById('productStock');
const productCategory = document.getElementById('productCategory');
const productKey = document.getElementById('productKey');
const createProductBtn = document.getElementById('createProductBtn');

const categoryFilter = document.getElementById('categoryFiter')

// const logoutBtn = document.getElementById('logoutBtn');


const allProductsContainer = document.getElementById('allProductsContainer');
const productContainer = document.getElementById('productContainer');

const cartContainer = document.getElementById('cartContainer');
const productsInCart = document.getElementById('productsInCart');
const orderBtn = document.getElementById('orderBtn');
const allOrders = document.getElementById('allOrders');
// const logoutSection = document.getElementById('logoutSection');
const loginPage = document.getElementById('loginPage');

function checkLoginState() {
	if (localStorage.getItem('loggedInUser')) {
		//Is logged in
        loginPage.innerText = ''
		console.log('logged in');

        const loginUserPage = document.createElement('div') 
        loginUserPage.id = 'loginUserPage'
        loginUserPage.className = 'loginUserPage'
        loginPage.appendChild(loginUserPage)
        const welcomeUserHeadin = document.createElement('h2')
        getUserOrders()
        welcomeUserHeadin.innerText = `Welcome ${localStorage.getItem('loggedInUserName')}`
        loginUserPage.appendChild(welcomeUserHeadin)
		const logoutBtn = document.createElement('button');
		logoutBtn.id = 'logoutBtn';
		logoutBtn.className = 'logoutBtn';
		logoutBtn.innerText = 'Sign out';
		loginUserPage.appendChild(logoutBtn);
        logoutBtn.addEventListener('click', logoutUser)



        adminTool()
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

        const signUpBtn = document.createElement('button');
		signUpBtn.id = 'signUpBtn';
		signUpBtn.className = 'signUpBtn';
        signUpBtn.innerText = 'Sign up'
		loginPage.appendChild(signUpBtn);

        signUpBtn.addEventListener('click', signUpUser);


        loginBtn.addEventListener('click', () => loginUser(emailInput, passwordInput));
	}
}
checkLoginState()

function adminTool() {
    const adminToolContainer = document.createElement('div')
    loginPage.appendChild(adminToolContainer)

    const adminToolsHeading = document.createElement('h2')
    adminToolsHeading.innerText = 'Admin Tools'
    adminToolContainer.appendChild(adminToolsHeading)

    const getAllUsersBtn = document.createElement('button')
    getAllUsersBtn.innerText = 'Get all users'
    adminToolContainer.appendChild(getAllUsersBtn)
    
    const addNewProductBtn = document.createElement('button')
    addNewProductBtn.innerText = 'Add new product'
    adminToolContainer.appendChild(addNewProductBtn)

    const allUsersContainer = document.createElement('div')
     allUsersContainer.className = 'allUsersContainer'
     adminToolContainer.appendChild(allUsersContainer)

  



    getAllUsersBtn.addEventListener('click', () => getAllUser(allUsersContainer));
    addNewProductBtn.addEventListener('click',()=> addNewProduct(adminToolContainer));
}

function addNewProduct(adminToolContainer) {
    const newProductContainer = document.createElement('div')
    newProductContainer.className = 'newProductContainer'
    adminToolContainer.appendChild(newProductContainer)

    const productNameLable = document.createElement('label')
    productNameLable.innerText = 'Product name'
    adminToolContainer.appendChild(productNameLable)

    const productNameInput = document.createElement('input')
    productNameLable.appendChild(productNameInput)

    
    const productDescriptionLable = document.createElement('label')
    productDescriptionLable.innerText = 'Product name'
    adminToolContainer.appendChild(productDescriptionLable)

    const productDescriptionInput = document.createElement('input')
    productDescriptionLable.appendChild(productDescriptionInput)

    const productPriceLable = document.createElement('label')
    productPriceLable.innerText = 'Product Price'
    adminToolContainer.appendChild(productPriceLable)

    const productPriceInput = document.createElement('input')
    productPriceLable.appendChild(productPriceInput)

    const productStockLable = document.createElement('label')
    productStockLable.innerText = 'Product Stock'
    adminToolContainer.appendChild(productStockLable)

    const productStockInput = document.createElement('input')
    productStockLable.appendChild(productStockInput)

    const productCategoryLable = document.createElement('label')
    productCategoryLable.innerText = 'Product Category'
    adminToolContainer.appendChild(productCategoryLable)

    const productCategoryInput = document.createElement('input')
    productCategoryLable.appendChild(productCategoryInput)

    const productKeyLable = document.createElement('label')
    productKeyLable.innerText = 'Product Key'
    adminToolContainer.appendChild(productKeyLable)

    const productKeyInput = document.createElement('input')
    productKeyLable.appendChild(productKeyInput)

    const addProductBtn = document.createElement('button')
    addProductBtn.innerText = 'Add product'

    addProductBtn.addEventListener('click', createProduct)
}


function signUpUser() {
       loginPage.innerText = ''
       const signUpHeading = document.createElement('H2')
       signUpHeading.className = 'signUpHeading'
       signUpHeading.innerText = 'Sign up'
       loginPage.appendChild(signUpHeading)

        const nameLable = document.createElement('label')
        nameLable.className = 'nameLable'
        nameLable.innerText = 'Full name'
        loginPage.appendChild(nameLable)

        const nameInput = document.createElement('input');
        nameInput.type = 'text'
		nameInput.id = 'nameInput';
		nameInput.className = 'nameInput';
        nameInput.placeholder = 'John Doe'
		nameLable.appendChild(nameInput);

        const emailLable = document.createElement('lable')
        emailLable.className = 'emailLable'
        emailLable.innerText = 'E-mail address'
        loginPage.appendChild(emailLable)

        const emailInput = document.createElement('input');
        emailInput.type = 'text'
		emailInput.id = 'emailInput';
		emailInput.className = 'emailInput';
        emailInput.placeholder = 'johndoe@mail.com'
		emailLable.appendChild(emailInput);

        const passwordLable = document.createElement('label')
        passwordLable.className = 'passwordLable'
        passwordLable.innerText = 'Password'
        loginPage.appendChild(passwordLable)

        const passwordInput = document.createElement('input');
        passwordInput.type = 'password'
		passwordInput.id = 'emailInput';
		passwordInput.className = 'emailInput';
        passwordInput.placeholder = 'Password'
		passwordLable.appendChild(passwordInput); 
        
        const registerBtn = document.createElement('button');
        registerBtn.type = 'text'
		registerBtn.id = 'registerBtn';
		registerBtn.className = 'registerBtn';
        registerBtn.innerText = 'Register'
		loginPage.appendChild(registerBtn);

        const backToLoginBtn = document.createElement('button');
        backToLoginBtn.type = 'text'
        backToLoginBtn.id = 'backToLoginBtn';
        backToLoginBtn.className = 'backToLoginBtn';
        backToLoginBtn.innerText = 'Back to login page'
        loginPage.appendChild(backToLoginBtn);

        backToLoginBtn.addEventListener('click', checkLoginState)

        registerBtn.addEventListener('click', () => registerAccount(nameInput, emailInput, passwordInput))
}

function logoutUser() {
	localStorage.removeItem('loggedInUser');
    localStorage.removeItem('loggedInUserName');

    checkLoginState()
}

// logoutBtn.addEventListener('click', logoutUser);

// const productIndex = [];
// let Index = [];

function registerAccount(nameInput, emailInput, passwordInput) {
	let sendUser = {
		name: nameInput.value,
		email: emailInput.value,
		password: passwordInput.value
	};
    checkError = document.getElementById('nameError')
    if (checkError) {
        checkError.remove()
    }
    const nameError = document.createElement('span')
    nameError.id = 'nameError'
    console.log(nameInput.value);
    if (nameInput.value.trim() === '' || emailInput.value.trim() === ''|| passwordInput.value.trim() === '' ) {
        
        nameError.innerText = 'Please fill in all the details'
        loginPage.appendChild(nameError)
        return;
    }
	fetch('http://localhost:3000/api/users/add', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(sendUser),
	})
		.then((res) => {
            if (res.status === 409) {
                nameError.innerText = 'E-mail address already in use, please reset password'
                loginPage.appendChild(nameError)
                return;
            } else if (res.status === 500) {
                nameError.innerText = 'There was an error creating user, please try again'
                loginPage.appendChild(nameError)
            }
        })
		.then((user) => {
			registerBtn.remove()
            nameError.innerText = `Your account was created successfully ${nameInput.value}! You are all ready to login and enjoy our products`
                loginPage.appendChild(nameError)
                console.log('User is posted: ', user);
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
				localStorage.setItem('loggedInUserName', user.name);
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

function getAllUser(allUsersContainer) {
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

            const specificUserInfo = document.createElement('div')
            allUsersContainer.appendChild(specificUserInfo)

			for (let user of users) {
				const userOption = document.createElement('option');
				userOption.value = user._id;
				userOption.text = user.name;
				userSelect.appendChild(userOption);
				localStorage.setItem(user._id, JSON.stringify(user));
			}

			showUser.addEventListener('click', () => {
                specificUserInfo.innerText = ''
				const selectedUserId = userSelect.value;
				const selectedUser = JSON.parse(localStorage.getItem(selectedUserId));
				const userinfo = document.createElement('span')
                userinfo.innerText = `ID: ${selectedUserId} Name: ${selectedUser.email}`
                specificUserInfo.appendChild(userinfo)
                const userOrders = document.createElement('button')
                userOrders.innerText = 'Show users orders'
                specificUserInfo.appendChild(userOrders)
                userOrders.addEventListener('click', () => getUserOrders(selectedUserId))
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
                productStock.innerText = `In stock ${product.lager}`;


				articleBtn.appendChild(productStock);

                if (productAdded) {
                    articleAmount.innerText = `In cart ${productAdded.quantity}`;
                    productStock.innerText = `In stock ${
                        product.lager - productAdded.quantity
                    }`;
                } else { 
                    articleAmount.innerText = 'In cart: 0';
                    if (product.lager === 0) {
                        productStock.innerText = 'Out of Stock'
                        addToCartBtn.remove()
                        removeFromCartBtn.remove()
                        articleAmount.remove()
                } 
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

            const resetProductsBtn = document.createElement('button')
            resetProductsBtn.id = 'resetProductsBtn';
            resetProductsBtn.className = 'resetProductsBtn';
            resetProductsBtn.innerText = 'Reset';
            categoryFiter.appendChild(resetProductsBtn);

            resetProductsBtn.addEventListener('click', getAllProducts)

            
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
        if (product.lager === 0) {
            productStock.innerText = 'Out of Stock'
        return;
    }
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
            localStorage.removeItem('cart');
            productsInCart.innerText = '';
            getAllProducts();
		});


}

function getUserOrders(selectedUserId) {

    let userInfo = {
        user: localStorage.getItem('loggedInUser'),
        token: "1234key1234"
    };
    const userOrderContainer = document.getElementById('loginUserOrders')

    if (userOrderContainer) {
        userOrderContainer.remove()
    }

    if (selectedUserId) {
        userInfo.user = selectedUserId;
    }
    fetch('http://localhost:3000/api/orders/user', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(userInfo),
	})
		.then((res) => res.json())
		.then((orders) => {
            const loginUserOrders = document.createElement('div');
            loginUserOrders.id = 'loginUserOrders'
			loginUserPage.appendChild(loginUserOrders);
            loginUserOrders.innerText = ''


			const orderSelect = document.createElement('select');
			loginUserOrders.appendChild(orderSelect);
			const ordersDefault = document.createElement('option');

			ordersDefault.value = 'Select order';
			ordersDefault.text = 'Select order';
			orderSelect.appendChild(ordersDefault);

			const showOrder = document.createElement('button');
			showOrder.innerText = 'Display order info';
			loginUserOrders.appendChild(showOrder);

            localStorage.setItem('myOrders', JSON.stringify([]));

			for (let order of orders) {
				const orderOption = document.createElement('option');
				orderOption.value = order._id;
				orderOption.text = order._id;
				orderSelect.appendChild(orderOption);
				localStorage.setItem('myOrders', JSON.stringify(orders));
			}

			showOrder.addEventListener('click', () => {
                const orderInfo = document.getElementById('orderContainer')
                if (orderInfo) {
                    orderInfo.remove()
                }
                const selectedOrderId = orderSelect.value;
                const selectedOrder = JSON.parse(localStorage.getItem('myOrders')).find(order => order._id === selectedOrderId);
    
                if (selectedOrder) {
                    const orderContainer = document.createElement('div');
                    orderContainer.id = 'orderContainer'
                    loginUserOrders.appendChild(orderContainer);
    
                    const orderDetails = document.createElement('p');
                    orderDetails.innerText = `Order ID: ${selectedOrder._id} User ID: ${selectedOrder.user} Products:`;
                    orderContainer.appendChild(orderDetails);
                    const productsSummary = document.createElement('ul');
                    orderContainer.appendChild(productsSummary);
                    for (const product of selectedOrder.products) {
                        const orderArticles = document.createElement('li');
                        orderArticles.innerText = `Product ID: ${product.productId} Quantity: ${product.quantity}`;
                        productsSummary.appendChild(orderArticles);
                    }
                } else {
                    console.log('Order not found');
                }
			});
		});
}

// function getAllOrders() {
// 	fetch('http://localhost:3000/api/orders/all/secretKey1', {
// 		method: 'GET',
// 	})
// 		.then((res) => res.json())
// 		.then((orders) => {
// 			const orderSelect = document.createElement('select');
// 			allOrders.appendChild(orderSelect);
// 			const ordersDefault = document.createElement('option');

// 			ordersDefault.value = 'Select order';
// 			ordersDefault.text = 'Select order';
// 			orderSelect.appendChild(ordersDefault);

// 			const showOrder = document.createElement('button');
// 			showOrder.innerText = 'Display user info';
// 			allOrders.appendChild(showOrder);

//             localStorage.setItem('allOrders', JSON.stringify([]));

// 			for (let order of orders) {
// 				const orderOption = document.createElement('option');
// 				orderOption.value = order._id;
// 				orderOption.text = order._id;
// 				orderSelect.appendChild(orderOption);
// 				localStorage.setItem('allOrders', JSON.stringify(orders));
// 			}

// 			showOrder.addEventListener('click', () => {
//                 const selectedOrderId = orderSelect.value;
//                 const selectedOrder = JSON.parse(localStorage.getItem('allOrders')).find(order => order._id === selectedOrderId);
//                 if (selectedOrder) {
//                     console.log('Selected user ID:', (selectedOrder.products));
//                 } else {
//                     console.log('Order not found');
//                 }
// 			});
// 		});
// }
