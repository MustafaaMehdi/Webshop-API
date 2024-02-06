
const signupName = document.getElementById('signupName')
const signupEmail = document.getElementById('signupEmail');
const signupPassword = document.getElementById('signupPassword')
const signupBtn = document.getElementById('signupBtn')

const emailInput = document.getElementById('emailInput');
const passwordInput = document.getElementById('passwordInput');
const loginBtn = document.getElementById('loginBtn');
const logoutBtn = document.getElementById('logoutBtn');

const allUsersContainer = document.getElementById('allUsersContainer')
const getAllUsersBtn = document.getElementById('getAllUsersBtn')


if (localStorage.getItem('user')) {
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
			// if (data.id) {
			// 	localStorage.setItem('loggedInUser', data.id);
			// } else {
			// 	console.log('STOP wrong user data');
			// }
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