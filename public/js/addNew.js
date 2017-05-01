function addNew() {
    document.querySelector(".slide-show").style.display = "none";
    document.querySelector(".edit-add-new").style.display = "block";
    document.querySelector(".news").style.display = "none";
    document.querySelector(".show-more").style.display = "none";
    document.querySelector(".popylar-add").style.display = "none";
    document.querySelector('.detailNew').style.display = "none";
    document.querySelector(".save-button").style.display = "none";
    document.querySelector(".add-button").style.display = "block";
}
function saveAdd() {
    let artickle = {
        id: String(new Date()),
        title: document.querySelector("#title-text").value,
        summary: document.querySelector("#summury-text").value,
        createdAt: new Date(),
        author: currentUser,
        img: document.querySelector("#img-add").value,
        content: document.querySelector("#content-text").value,
        tags: document.querySelector("#tags-text").value.split(",")
    }
    if (articleModel.validateArticle(artickle)) {
        request.addArticle(artickle).then(function () {
            document.querySelector(".news").style.display = "block";
            document.querySelector(".show-more").style.display = "block";
            document.querySelector(".popylar-add").style.display = "block";
            document.querySelector(".edit-add-new").style.display = "none";
            document.querySelector("#title-text").value = "";
            document.querySelector("#summury-text").value = "";
            document.querySelector("#img-add").value = "";
            document.querySelector("#tags-text").value = "";
            document.querySelector("#content-text").value = "";
            document.querySelector(".slide-show").style.display = "block";
            articleModel.replaceArticles();
            startApp();
        })
    } else  alert("Введены неверные данные");

}