var signupNameInput = document.getElementById('signupNameInput');
var signupEmailInput = document.getElementById('signupEmailInput');
var signupPasswordInput = document.getElementById('signupPasswordInput');
var signInEmailInput = document.getElementById('signInEmailInput');
var signInPasswordInput = document.getElementById('signInPasswordInput');
var home = document.querySelector('#Welcome-rectangle');

var infoList;

var i;

if (localStorage.getItem('infoList')) {
    infoList = JSON.parse(localStorage.getItem('infoList'));
}
else {
    infoList = [];
}

if (signupNameInput) {
    function addUserInfo() {
        var userInfo = {
            userName: signupNameInput.value,
            userEmail: signupEmailInput.value,
            passWord: signupPasswordInput.value
        };

        function checkEmailExists(email) {
            for (var i = 0; i < infoList.length; i++) {
                if (infoList[i].userEmail === email) {
                    document.querySelector('#alertmessage').innerHTML = 'Email Already Exists';
                    return true;
                }
            }
            return false;
        }

        if (signupNameInput.classList.contains('is-valid') && signupEmailInput.classList.contains('is-valid') && signupPasswordInput.classList.contains('is-valid')) {

            if (checkEmailExists(userInfo.userEmail)) {
                document.querySelector('#alertmessage').innerHTML = 'Email already exists';
            } else {
                infoList.push(userInfo);
                localStorage.setItem('infoList', JSON.stringify(infoList));
                console.log(infoList);
                signupNameInput.classList.remove('is-valid');
                signupEmailInput.classList.remove('is-valid');
                signupPasswordInput.classList.remove('is-valid');
                document.querySelector('#alertmessage').classList.add('d-none');

                window.location.href = 'main.html';

                clearForm();
            }

        } else {
            document.querySelector('#alertmessage').innerHTML = 'All Inputs Are Requierd'
        }
    }


    function clearForm() {
        signupNameInput.value = '';
        signupEmailInput.value = '';
        signupPasswordInput.value = '';
    }

    document.querySelector('#btn').addEventListener('click', function (e) {
        addUserInfo(e.target)
    });

    function ValidatorforSignup(element) {
        var rgx = {
            signupNameInput: /^[a-zA-Z ]{3,}$/,
            signupEmailInput: /^[a-zA-Z0-9._%+-]+@[(gmail)]+\.[a-zA-Z]{3,}$/,
            signupPasswordInput: /^(?=.*[a-z])(?=.*\d)[a-z\d]{8,}$/,
        };

        if (rgx[element.id].test(element.value)) {
            element.classList.add('is-valid');
            element.classList.remove('is-invalid');
            element.nextElementSibling.classList.add('d-none');
        } else {
            element.classList.remove('is-valid');
            element.classList.add('is-invalid');
            element.nextElementSibling.classList.remove('d-none');
        }
    }

    signupNameInput.addEventListener('input', function (e) {
        ValidatorforSignup(e.target)
    });
    signupEmailInput.addEventListener('input', function (e) {
        ValidatorforSignup(e.target)
    });
    signupPasswordInput.addEventListener('input', function (e) {
        ValidatorforSignup(e.target)
    });


} else if (signInEmailInput) {

    function movetoHome() {

        if (signInEmailInput.classList.contains('is-valid') && signInPasswordInput.classList.contains('is-valid')) {

            var userInput = {
                userEmail: signInEmailInput.value,
                passWord: signInPasswordInput.value
            }


            for (let i = 0; i < infoList.length; i++) {
                if (userInput.userEmail == infoList[i].userEmail && userInput.passWord == infoList[i].passWord) {
                    window.location.href = 'home.html';
                    clearForm();
                }
            }

            document.querySelector('#alertmessage1').innerHTML = 'Wrong Email Or Password';
        } else {
            document.querySelector('#alertmessage1').innerHTML = 'All Inputs Are Required';
        }
    }

    function clearForm() {
        signInEmailInput.value = '';
        signInPasswordInput.value = '';
    }

    document.querySelector('#btn1').addEventListener('click', function (e) {
        movetoHome(e.target);
    });


    function ValidatorforSignin(element) {
        var rgx = {
            signInEmailInput: /^[a-zA-Z0-9._%+-]+@[(gmail)]+\.[a-zA-Z]{3,}$/,
            signInPasswordInput: /^(?=.*[a-z])(?=.*\d)[a-z\d]{8,}$/
        };

        if (rgx[element.id].test(element.value)) {
            element.classList.add('is-valid');
            element.classList.remove('is-invalid');
            element.nextElementSibling.classList.add('d-none');
        } else {
            element.classList.remove('is-valid');
            element.classList.add('is-invalid');
            element.nextElementSibling.classList.remove('d-none');
        }
    }

    signInEmailInput.addEventListener('input', function (e) {
        ValidatorforSignin(e.target)
    });

    signInPasswordInput.addEventListener('input', function (e) {
        ValidatorforSignin(e.target)
    });


}else if (home) {
    home.innerHTML = `welcome ${infoList[infoList.length - 1].userName}`;
}
