function sortCulture() {
    renderArticles(0,articleModel.getSize(),{author:'Имя',tag:'Культура',time:new Date('')});
    document.querySelector(".show-more").style.display = "none";
}
function sortPolitics() {
    renderArticles(0,articleModel.getSize(),{author:'Имя',tag:'Политика',time:new Date('')});
    document.querySelector(".show-more").style.display = "none";
}
function sortFinance(){
    renderArticles(0,articleModel.getSize(),{author:'Имя',tag:'Финансы',time:new Date('')});
    document.querySelector(".show-more").style.display = "none";
}
function sortSport() {
    renderArticles(0,articleModel.getSize(),{author:'Имя',tag:'Спорт',time:new Date('')});
    document.querySelector(".show-more").style.display = "none";
}
