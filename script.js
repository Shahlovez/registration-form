const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");  
const love_btns = document.querySelectorAll('.heart');

// Show input error message
function showError(input, message){
    const formControl = input.parentElement;
    formControl.className = "form-control error";
    const small = formControl.querySelector("small");
    small.innerText = message; 
}

// Show success outline
function showSuccess(input){
    const formControl = input.parentElement;
    formControl.className = "form-control success";
}

// Check email is valid
function checkEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value.trim())) {
      showSuccess(input);
    } else {
      showError(input, 'Email is not valid');
    }
  }
// Check required fields 
function checkRequired(inputArr){
    let isRequired = false;
    inputArr.forEach(function(input){
        if(input.value.trim()=== ""){
            showError(input, `${getFieldName(input)} is required`);
            isRequired = true;
        } else {
            showSuccess(input);
        }
    });
     return isRequired;
}
// Check input length
function checkLength(input, min, max){
    if(input.value.length < min){
        showError(input, `${getFieldName(input)} must be at least ${min} characters`);
    } else if(input.value.length > max){
        showError(input, `${getFieldName(input)} must be les than ${max} characters`);
    } else{
        showSuccess(input);
    }
}
// Check passwords match
function checkPasswordsMatch(input1, input2){
    if(input1.value !== input2.value){
        showError(input2, "Passwords do not match");
    }
}

// Get fieldname 
function getFieldName(input){
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Event Listeners
form.addEventListener("submit", function(e){
    e.preventDefault();

   if(checkRequired([username, email, password, password2])){
        checkLength(username, 3, 15);
        checkLength(password, 6, 25);
        checkEmail(email);
        checkPasswordsMatch(password, password2);
 }
});


// --------- Heart-----------//

love_btns.forEach(love_btn => {
	love_btn.addEventListener('mousedown', (e) => {
		love_btn.style.background = '#fff';
		love_btn.style.color = '#E7273F';
		// love_btn.querySelector('.text').innerHTML = '<span class="grey-text"> Thank you!</span>';
      

		createHearts(love_btn.querySelector('.icon-container'));
	});

	form.addEventListener('submit', (e) => {
		love_btn.style.background = '#E7273F';
		love_btn.style.color = '#fff';
		love_btn.querySelector('.text').innerHTML = 'Submit!';
	});
})

function createHearts(container) {
	for(let i=0; i< 4; i++) {
		setTimeout(() => {
			const heart= document.createElement('span');
			heart.classList.add('love');
			heart.innerHTML = '<i class="fas fa-heart"></i>';
			// heart.style.left = Math.random() * 100 + '%';
			// heart.style.top = Math.random() * 100 + '%';
			// heart.style.fontSize = Math.random() * 10 + 15 + 'px';
			heart.style.animationDuration = Math.random() * 5 + 3 + 's';
			container.appendChild(heart);
           

			setTimeout(() => {
				heart.remove();
			}, 1000);
		}, i * 100)
	}
}

