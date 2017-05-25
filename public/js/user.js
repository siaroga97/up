function singIn() {
    document.querySelector('.signin').style.display = 'none';
    document.querySelector('.news').style.display = 'none';
    document.querySelector('.show-more').style.display = 'none';
    document.querySelector('.popylar-add').style.display = 'none';
    document.querySelector('form').style.display = 'block';
    document.querySelector('.detailNew').style.display = 'none';
    document.querySelector('.slide-show').style.display = 'none';
}
let check = false;
function showCheckUser() {
    requestServer.getUserName().then(
        name => {
            const arr = document.querySelectorAll('.delete-new');
            for (let i = 0; i < arr.length; i += 1) {
                arr[i].style.display = 'block';
            }
            check = true;
            currentUser = name;
            document.querySelector('.sign-out').style.display = 'block';
            document.querySelector('.slide-show').style.display = 'block';
            document.querySelector('.signin').innerHTML = 'Hi, ' + name + '!';
            document.querySelector('.add-news').style.visibility = 'visible';
            document.querySelector('.news').style.display = 'block';
            document.querySelector('form').style.display = 'none';
            document.querySelector('.show-more').style.display = 'block';
            document.querySelector('.popylar-add').style.display = 'block';
            document.querySelector('.signin').style.display = 'block';
        });
}

function checkUser() {
    const username = document.querySelector('#login').value;
    const password = document.querySelector('#password').value;
    requestServer.logIn({ username, password }).then(
        ready => {
            check = true;
            currentUser = username;
            showCheckUser();
        },
        notReady => {
            alert('Неправильный логин или пароль');
        });
}
function signOut() {
    requestServer.logOut().then(
        out => {
            currentUser = '';
            document.querySelector('.sign-out').style.display = 'none';
            document.querySelector('.add-news').style.display = 'none';
            check = false;
            singIn();
        });
}
