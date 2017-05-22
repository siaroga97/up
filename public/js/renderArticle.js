const articleRenderer = (function () {
    let ARTICLE_TEMPLATE;
    let ARTICLE_LIST_NODE;

    function init() {
        ARTICLE_TEMPLATE = document.querySelector('#template-article-list-item');
        ARTICLE_LIST_NODE = document.querySelector('.news');
    }

    function formatDate(d) {
        return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;
    }

    function renderArticle(article) {
        const template = ARTICLE_TEMPLATE;
        template.content.querySelector('.article-list-item').dataset.id = article._id;
        template.content.querySelector('.article-list-item-title').textContent = article.title;
        template.content.querySelector('.article-list-item-summary').textContent = article.summary;
        template.content.querySelector('.tags-array').textContent = article.tags;
        template.content.querySelector('.article-list-item-author').textContent = article.author;
        template.content.querySelector('.article-list-item-date').textContent = formatDate(article.createdAt);
        template.content.querySelector('.article-list-item-img').setAttribute('src', article.img);
        if (check) {
            template.content.querySelector('.delete-new').style.display = 'block';
        }

        return template.content.querySelector('.article-list-item').cloneNode(true);
    }

    function renderArt(articles) {
        return articles.map((article) => {
            return renderArticle(article);
        });
    }

    function insertArticlesInDOM(articles) {
        const articlesNodes = renderArt(articles);
        articlesNodes.forEach((node) => {
            ARTICLE_LIST_NODE.appendChild(node);
        });
    }

    function removeArticlesFromDom() {
        ARTICLE_LIST_NODE.innerHTML = '';
    }

    return {
        init,
        formatDate,
        insertArticlesInDOM,
        removeArticlesFromDom,
    };
}());
function renderArticles(skip, top, filterConfig) {
    requestServer.getArticles(skip, top, filterConfig).then((articles) => {
        if (articles.length < countNews) {
            document.querySelector('.show-more').style.display = 'none';
        }
        articleRenderer.removeArticlesFromDom();
        const arr = document.querySelectorAll('.delete-new');
        for (let i = 0; i < arr.length; i += 1) {
            arr[i].style.display = 'block';
        }
        articleRenderer.insertArticlesInDOM(articles);
    });
}

function startApp() {
    slideShow.fillSlideShow();
    showCheckUser();
    articleRenderer.init();
    mySelect();
    renderArticles(0, countNews);

    slideShow.showSlides();
}

document.addEventListener('DOMContentLoaded', startApp);
