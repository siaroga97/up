function mySelect() {
    let s = new Set();
    let tags = new Set();
    requestServer.getArticles(0, 0).then((articles) => {
        articles.forEach((value) => {
            value.tags.forEach((elem) => {
                tags.add(elem);
            });
            s.add(value.author);
        });
        const tagsSelect = document.querySelector('#tags-select');
        tagsSelect.innerHTML = '<option>' + 'Тэги' + '</option>';
        tags.forEach((item) => {
            tagsSelect.innerHTML += '<option>' + item + '</option>';
        });
        const select = document.querySelector('#nameAutor');
        select.innerHTML = '<option>' + 'Имя' + '</option>';
        s.forEach((item) => {
            select.innerHTML += '<option>' + item + '</option>';
        });
    });
}

function find() {
    let config = {};
    const dateFind = document.querySelector('#date-input').value;
    if (dateFind !== '') {
        config.createdAt = new Date(dateFind);
    }
    const author = document.querySelector('#nameAutor').value;
    if (author !== 'Имя') {
        config.author = author;
    }
    const tagFind = document.querySelector('#tags-select').value;
    if (tagFind !== 'Тэги') {
        config.tags = [tagFind];
    }
    renderArticles(0, 0, config);

    document.querySelector('.show-more').style.display = 'none';
}

function returnMainPage() {
    document.querySelector('.slide-show').style.display = 'block';
    document.querySelector('.news').style.display = 'block';
    document.querySelector('.show-more').style.display = 'block';
    document.querySelector('.popylar-add').style.display = 'block';
    document.querySelector('.detailNew').style.display = 'none';
    document.querySelector('.slide-show').style.display = 'block';
    document.querySelector('form').style.display = 'none';
    document.querySelector('.edit-add-new').style.display = 'none';
    const singIn = document.querySelector('.signin');
    if (currentUser) {
        singIn.innerHTML = 'Hi, ' + currentUser + '!';
        singIn.style.display = 'block';
    } else {
        singIn.innerHTML = 'войти';
        singIn.style.display = 'block';
    }
    startApp();
}
let countNews = 5;
function showMore() {
    countNews += 5;
    renderArticles(0, countNews);
}
