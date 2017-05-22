const articleModel = (function () {
    function validateArticle(article) {
        if (typeof (article.title) === 'string' && article.title.length > 0 && article.title.length < 100
            && typeof (article.summary) === 'string' && article.summary.length > 0 && article.summary.length < 200
            && typeof (article.createdAt) === 'object'
            && typeof (article.author) === 'string'
            && article.tags && article.tags.length
            && typeof (article.content) === 'string' && article.content.length > 0) {
            return true;
        }
        return false;
    }

    return {
        validateArticle
    };
}());
let currentUser;
