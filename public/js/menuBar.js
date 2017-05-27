function sortCulture() {
    returnMainPage();
    renderArticles(0, 0, { tags: ['Культура'] });
    document.querySelector('.show-more').style.display = 'none';
}
function sortPolitics() {
    returnMainPage();
    renderArticles(0, 0, { tags: ['Политика'] });
    document.querySelector('.show-more').style.display = 'none';
}
function sortFinance() {
    returnMainPage();
    renderArticles(0, 0, { tags: ['Финансы'] });
    document.querySelector('.show-more').style.display = 'none';
}
function sortSport() {
    returnMainPage();
    renderArticles(0, 0, { tags: ['Спорт'] });
    document.querySelector('.show-more').style.display = 'none';
}
