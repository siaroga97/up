function deleteNews(element) {
    requestServer.deleteArticle(element.dataset.id).then(() => {
        document.querySelector('.news').style.display = 'block';
        document.querySelector('.show-more').style.display = 'block';
        document.querySelector('.popylar-add').style.display = 'block';
        document.querySelector('.detailNew').style.display = 'none';
        startApp();
    });
}
