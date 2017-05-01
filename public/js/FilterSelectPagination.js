function mySelect() {
    let s = articleModel.getSet();
    let select = document.querySelector("#nameAutor");
    select.innerHTML = "<option>" + 'Имя' + "</option>";
    s.forEach(function (item) {
        select.innerHTML += "<option>" + item + "</option>";
    })
}

function find() {
    let dateFing = document.querySelector("#date-input").value;
    let tagFind = document.querySelector("#tags-select").value;
    let autorFind = document.querySelector("#nameAutor").value;
    if ((autorFind === 'Имя') && (tagFind === 'Теги' && dateFing === '')) {
        renderArticles(0, articleModel.getSize());
    } else  renderArticles(0, articleModel.getSize(), {author: autorFind, tag: tagFind, time: new Date(dateFing)});
    document.querySelector(".show-more").style.display = "none";
}

function returnMainPage() {
    document.querySelector(".slide-show").style.display = "block";
    document.querySelector(".news").style.display = "block";
    document.querySelector(".show-more").style.display = "block";
    document.querySelector(".popylar-add").style.display = "block";
    document.querySelector('.detailNew').style.display = "none";
    document.querySelector(".slide-show").style.display = "block";
    document.querySelector("form").style.display = "none";
    document.querySelector(".edit-add-new").style.display = "none";
    let singIn = document.querySelector(".signin");
    if (currentUser) {
        singIn.innerHTML = "Hi, " + currentUser + "!";
        singIn.style.display = "block";
    } else {
        singIn.innerHTML = "войти";
        singIn.style.display = "block";
    }
    startApp();
}

function showMore() {
    countNews += 5;
    renderArticles(0, countNews);
}
