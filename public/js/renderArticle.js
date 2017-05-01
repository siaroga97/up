let articleRenderer = (function () {
    let ARTICLE_TEMPLATE;
    let ARTICLE_LIST_NODE;

    function init() {
        ARTICLE_TEMPLATE = document.querySelector('#template-article-list-item');
        ARTICLE_LIST_NODE = document.querySelector('.news');
    }

    function insertArticlesInDOM(articles) {

        let articlesNodes = renderArticles(articles);
        articlesNodes.forEach(function (node) {
            ARTICLE_LIST_NODE.appendChild(node);
        });
    }

    function removeArticlesFromDom() {
        ARTICLE_LIST_NODE.innerHTML = '';
    }

    function renderArticles(articles) {

        return articles.map(function (article) {
            return renderArticle(article);
        });
    }

    function renderArticle(article) {
        let template = ARTICLE_TEMPLATE;
        template.content.querySelector('.article-list-item').dataset.id = article.id;
        template.content.querySelector('.article-list-item-title').textContent = article.title;
        template.content.querySelector('.article-list-item-summary').textContent = article.summary;
        template.content.querySelector('.tags-array').textContent = article.tags;
        template.content.querySelector('.article-list-item-author').textContent = article.author;
        template.content.querySelector('.article-list-item-date').textContent = formatDate(article.createdAt);
        template.content.querySelector('.article-list-item-img').setAttribute("src", article.img);
        if (check) {
            template.content.querySelector('.delete-new').style.display = "block";
        }

        return template.content.querySelector('.article-list-item').cloneNode(true);
    }


    function formatDate(d) {
        return d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear() + ' ' +
            d.getHours() + ':' + d.getMinutes();
    }

    return {
        init: init,
        formatDate: formatDate,
        insertArticlesInDOM: insertArticlesInDOM,
        removeArticlesFromDom: removeArticlesFromDom
    };
}());

document.addEventListener('DOMContentLoaded', startApp);

function startApp() {
    articleModel.replaceArticles().then(
        () => {
            showCheckUser();
            articleRenderer.init();
            slideShow.fillSlideShow();
            slideShow.showSlides();
            mySelect();
            renderArticles(0, countNews);
        }
    );
}

function renderArticles(skip, top, filterConfig) {

    let articles = articleModel.getArticles(skip, top, filterConfig);
    if (articleModel.getSize() <= countNews) {
        document.querySelector(".show-more").style.display = "none";
    }
    articleRenderer.removeArticlesFromDom();
    let arr = document.querySelectorAll(".delete-new");
    for (let i = 0; i < arr.length; i++) {
        arr[i].style.display = "block";
    }

    articleRenderer.insertArticlesInDOM(articles);
}