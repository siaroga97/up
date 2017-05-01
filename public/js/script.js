let articleModel = (function () {
    let articles = [{}
    ];

    function chektags(tag, index) {
        let check = false;
        articles[index].tags.forEach(function (item) {
            if (item === tag) {
                check = true;
            }
        });
        return check;
    }

    function checkDate(time, index) {
        let check = false;
        if (articles[index].createdAt - time < 0) {
            check = true;
        }
        return check;
    }

    function getArticles(skip, top, filterConfig) {
        skip = skip || 0;
        top = top || 5;

        articles.sort(function (a, b) {
            return b.createdAt - a.createdAt
        });
        let newAr = [];
        if (!filterConfig) {
            newAr = articles.slice(skip, skip + top);
        } else {
            for (let i = 0; i < articles.length; i++) {
                if ((articles[i].author === filterConfig.author || filterConfig.author === "Имя") &&
                    (chektags(filterConfig.tag, i) || filterConfig.tag === "Теги") &&
                    (filterConfig.time || checkDate(filterConfig.time, i))) {
                    newAr.push(articles[i]);
                }
            }
        }
        return newAr;
    }

    function getArticle(id) {
        let result = null;
        articles.forEach(function (item, i) {
            if (item.id === id) {
                result = item;
            }
        });
        if (result) {
            return result;
        }

        return false;
    }

    function validateArticle(article) {
        if (typeof(article.id) == "string"
            && typeof(article.title) == "string" && article.title.length > 0 && article.title.length < 100
            && typeof(article.summary) == "string" && article.summary.length > 0 && article.summary.length < 200
            && typeof(article.createdAt) == "object"
            && typeof(article.author) == "string"
            && article.tags && article.tags.length
            && typeof(article.content) == "string" && article.content.length > 0) {
            return true;
        } else  return false;

    }

    function addArticle(article) {
        if (validateArticle(article)) {
            articles.push(article);
            return true;
        } else  return false;
    }

    function editArticle(id, article) {
        let index = -1;

        articles.forEach(function (item, i) {
            if (item.id === id) {
                index = i;
            }
        });
        if (index > -1 && validateArticle(articles[index])) {

            if (article.summary) {
                articles[index].summary = article.summary;
            }
            if (article.title) {
                articles[index].title = article.title;
            }
            if (article.content) {
                articles[index].content = article.content;
            }
            if (article.img !== '') {
                articles[index].img = article.img;
            }
            return true;
        }
        else  return false;

    }


    function removeArticle(id) {
        let index = -1;
        articles.forEach(function (item, i) {
            if (item.id === id) {
                index = i;
            }
        });
        if (index > -1) {
            articles.splice(index, 1);
        }

    }

    function addTag(id, teg) {
        let flag = 0;
        for (let i = 0; i < tags.length; i++) {
            if (tags[i] === teg) {
                flag = 1;
            }
        }

        if (flag > 0) {
            let index = -1;
            articles.forEach(function (item, i) {
                if (item.id === id) {
                    index = i;
                }
            });
            if (i > -1) {
                articles[i].tags.push(teg);
                return true;
            }
        } else     return false;
    }

    function removeTag(id, teg) {
        let index = -1;
        articles.forEach(function (item, i) {
            if (item.id === id) {
                index = i;
            }
        });

        if (index > -1) {
            for (let j = 0; j < tags.length; j++) {
                if (articles[i].tags[j] === teg) {
                    delete articles[i].tags[j];
                    articles[i].tags.length--;
                    return true;
                }
            }
        }

        return false;

    }

    function getSize() {
        return articles.length;
    }

    function getSet() {
        let s = new Set();
        articles.forEach(function (value) {
            s.add(value.author);
        });
        return s;
    }

    function replaceArticles() {
        return new Promise(resolve => request.getArray().then(
            array => {
                articles = array;
                resolve();
            }));
    }

    return {
        getSet: getSet,
        getSize: getSize,
        replaceArticles: replaceArticles,
        getArticles: getArticles,
        getArticle: getArticle,
        validateArticle: validateArticle,
        addArticle: addArticle,
        editArticle: editArticle,
        removeArticle: removeArticle,
        addTag: addTag,
        removeTag: removeTag,
        articles: articles
    };
}())

let countNews = 5;
let currentUser;
let tags = [
    "Культура", "Политика", "Финансы", "Спорт"
];








