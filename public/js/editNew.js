function editNew(element) {
    requestServer.getArticle(element.dataset.id).then((article) => {
        document.querySelector('.edit-add-new').dataset.id = article._id;
        document.querySelector('.edit-add-new').style.display = 'block';
        document.querySelector('.news').style.display = 'none';
        document.querySelector('.show-more').style.display = 'none';
        document.querySelector('.popylar-add').style.display = 'none';
        document.querySelector('.detailNew').style.display = 'none';
        document.querySelector('#title-text').value = article.title;
        document.querySelector('#summury-text').value = article.summary;
        document.querySelector('#tags-text').value = article.tags;
        document.querySelector('#content-text').value = article.content;
        document.querySelector('.save-button').style.display = 'block';
        document.querySelector('.add-button').style.display = 'none';
    });
}
function saveEdit(element) {
    const article = {
        _id: element.dataset.id,
        title: document.querySelector('#title-text').value,
        summary: document.querySelector('#summury-text').value,
        author: currentUser,
        img: document.querySelector('#img-add').value,
        content: document.querySelector('#content-text').value,
        tags: document.querySelector('#tags-text').value.split(','),
    };
    requestServer.editArticles(article).then(() => {
        document.querySelector('.news').style.display = 'block';
        document.querySelector('.show-more').style.display = 'block';
        document.querySelector('.popylar-add').style.display = 'block';
        document.querySelector('.edit-add-new').style.display = 'none';
        document.querySelector('.slide-show').style.display = 'block';
        document.querySelector('#title-text').value = '';
        document.querySelector('#summury-text').value = '';
        document.querySelector('#img-add').value = '';
        document.querySelector('#tags-text').value = '';
        document.querySelector('#content-text').value = '';
        startApp();
    });
}
