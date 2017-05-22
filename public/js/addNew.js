function addNew() {
    document.querySelector('.slide-show').style.display = 'none';
    document.querySelector('.edit-add-new').style.display = 'block';
    document.querySelector('.news').style.display = 'none';
    document.querySelector('.show-more').style.display = 'none';
    document.querySelector('.popylar-add').style.display = 'none';
    document.querySelector('.detailNew').style.display = 'none';
    document.querySelector('.save-button').style.display = 'none';
    document.querySelector('.add-button').style.display = 'block';
}
function saveAdd() {
    const article = {
        title: document.querySelector('#title-text').value,
        summary: document.querySelector('#summury-text').value,
        createdAt: new Date(),
        author: currentUser,
        img: document.querySelector('#img-add').value,
        content: document.querySelector('#content-text').value,
        tags: document.querySelector('#tags-text').value.split(','),
    };
    if (articleModel.validateArticle(article)) {
        requestServer.addArticle(article).then(() => {
            document.querySelector('.news').style.display = 'block';
            document.querySelector('.show-more').style.display = 'block';
            document.querySelector('.popylar-add').style.display = 'block';
            document.querySelector('.edit-add-new').style.display = 'none';
            document.querySelector('#title-text').value = '';
            document.querySelector('#summury-text').value = '';
            document.querySelector('#img-add').value = '';
            document.querySelector('#tags-text').value = '';
            document.querySelector('#content-text').value = '';
            document.querySelector('.slide-show').style.display = 'block';
            startApp();
        });
    } else alert('Введены неверные данные');
}
