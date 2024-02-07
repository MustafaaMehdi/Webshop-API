
const signupName = document.getElementById('signupName')
const signupEmail = document.getElementById('signupEmail');
const signupPassword = document.getElementById('signupPassword')
const signupBtn = document.getElementById('signupBtn')

const productName = document.getElementById('productName')
const productDescription = document.getElementById('productDescription')
const productPrice = document.getElementById('productPrice')
const productStock = document.getElementById('productStock')
const productCategory = document.getElementById('productCategory')
const productKey = document.getElementById('productKey')
const createProductBtn = document.getElementById('createProductBtn')

const emailInput = document.getElementById('emailInput');
const passwordInput = document.getElementById('passwordInput');
const loginBtn = document.getElementById('loginBtn');
const logoutBtn = document.getElementById('logoutBtn');

const allUsersContainer = document.getElementById('allUsersContainer')
const getAllUsersBtn = document.getElementById('getAllUsersBtn')

const allProductsContainer = document.getElementById('allProductsContainer')
const getAllProductsBtn = document.getElementById('getAllProductsBtn')

const cartContainer = document.getElementById('cartContainer')
const productsInCart = document.getElementById('productsInCart')
const orderBtn = document.getElementById('orderBtn')


if (localStorage.getItem('loggedInUser')) {
	//Is logged in
	console.log('logged in');
} else {
	//Not logged in
	console.log('logged out');
}

signupBtn.addEventListener('click', signupUser)
loginBtn.addEventListener('click', loginUser);
logoutBtn.addEventListener('click', logoutUser);
getAllUsersBtn.addEventListener('click', getAllUser)
getAllProductsBtn.addEventListener('click', getAllProducts)
createProductBtn.addEventListener('click', createProduct)

let cartIndex = []

function signupUser() {
    let sendUser = { 
        name: signupName.value,
        email: signupEmail.value, 
        password: signupPassword.value 
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
        password: passwordInput.value 
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
        token: productKey.value

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
			// if (data.id) {
			// 	localStorage.setItem('loggedInUser', data.id);
			// } else {
			// 	console.log('STOP wrong user data');
			// }
		});
}


function getAllUser() {
    fetch('http://localhost:3000/api/users', {
        method: 'GET'
    })
    .then((res) => res.json())
    .then((users) => {
        allUsersContainer.innerText=""
        for (let user of users) {
            allUsersContainer.innerHTML += `<div>${user.name} <button id="${user._id}">See user</button></div>`;
        }

        for (let user of users) {
            let button = document.getElementById(user._id);
            button.addEventListener('click', () => {
                let specificId = {
                    id: user._id
                };

                fetch(`http://localhost:3000/api/users`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(specificId),                })
                .then((res) => res.json())
                .then((specificUser) => {
                    console.log('Specific user:', specificUser);
                });
            });
        }
        
    });
}

function getAllProducts() {
    fetch('http://localhost:3000/api/products', {
        method: 'GET'
    })
    .then((res) => res.json())
    .then((products) => {
        allProductsContainer.innerText=""
        for (let product of products) {
            allProductsContainer.innerHTML += `<div>${product.name} <button id="articleDescription${product._id}">See Description</button><button id="articleAdd${product._id}">Add product to cart</button></div>`;
        }

        for (let product of products) {
            let button = document.getElementById(`articleDescription${product._id}`);
            button.addEventListener('click', (e) => {
                let filteredID = e.target.id.replace('articleDescription', '')
                fetch(`http://localhost:3000/api/products/${filteredID}`, {
                    method: 'GET',
         })
                .then((res) => res.json())
                .then((specificProduct) => {
                    console.log('Specific product:', specificProduct.product.name, specificProduct.product.description);
                });
            });
        }
        for (let product of products) {
            let addButton = document.getElementById(`articleAdd${product._id}`);
            addButton.addEventListener('click', (e) => {
                let filteredID = e.target.id.replace('articleAdd', '')
                fetch(`http://localhost:3000/api/products/${filteredID}`, {
                    method: 'GET',
         })
                .then((res) => res.json())
                .then((product) => {
                    console.log('Specific product:', product.product.name, product.product.description);
            const productInCart = cartIndex.find(item => item._id === product.product._id);

            if (productInCart) {
                productInCart.quantity += 1;
            } else {
                cartIndex.push({
                    _id: product.product._id,
                    quantity: 1
                });
            }
                    
                    productsInCart.innerHTML += `<h3>${product.product.name}</h3>`
                });
            });
        }
        
    });
}