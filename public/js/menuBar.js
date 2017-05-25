function sortCulture() {
    renderArticles(0, 0, { tags: ['Культура'] });
    document.querySelector('.show-more').style.display = 'none';
}
function sortPolitics() {
    renderArticles(0, 0, { tags: ['Политика'] });
    document.querySelector('.show-more').style.display = 'none';
}
function sortFinance() {
    renderArticles(0, 0, { tags: ['Финансы']});
    document.querySelector('.show-more').style.display = 'none';
}
function sortSport() {
    renderArticles(0, 0, { tags: ['Спорт'] });
    document.querySelector('.show-more').style.display = 'none';
}
