function singIn() {
    document.querySelector(".signin").style.display = "none";
    document.querySelector(".news").style.display = "none";
    document.querySelector(".show-more").style.display = "none";
    document.querySelector(".popylar-add").style.display = "none";
    document.querySelector("form").style.display = "block";
    document.querySelector('.detailNew').style.display = "none";
    document.querySelector(".slide-show").style.display = "none";

}
let check = false;
function showCheckUser() {
    request.getUserName().then(
        name => {
            let arr = document.querySelectorAll(".delete-new");
            for (let i = 0; i < arr.length; i++) {
                arr[i].style.display = "block";
            }
            document.querySelector(".sign-out").style.display="block";
            document.querySelector(".slide-show").style.display = "block";
            document.querySelector(".signin").innerHTML = "Hi, " + name + "!";
            document.querySelector(".add-news").style.visibility = "visible";
            document.querySelector(".news").style.display = "block";
            document.querySelector("form").style.display = "none";
            document.querySelector(".show-more").style.display = "block";
            document.querySelector(".popylar-add").style.display = "block";
            document.querySelector(".signin").style.display = "block";
        }
    );
}

function checkUser() {
    let username = document.querySelector("#login").value;
    let password = document.querySelector("#password").value;
    request.logIn({username,password}).then(
        ready=>{
            check = true;
            currentUser = username;
            showCheckUser();
        },
        notReady=>{
            alert("Неправильный логин или пароль");
        }
    );
}
function signOut() {
    request.logOut().then(
        out=>{
            currentUser='';
            document.querySelector(".sign-out").style.display="none";
            document.querySelector(".add-news").style.display="none";
            check=false;
            singIn();
        }
    )

}