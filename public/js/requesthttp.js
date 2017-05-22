const requestServer = (function () {
    function getArticles(skip, top, filterConfig) {

        return new Promise((resolve, reject) => {

            const request = new XMLHttpRequest();
            request.open('PUT', '/articles');
            request.setRequestHeader('content-type', 'application/json');
            request.onload = function () {
                if (request.status === 200) {
                    resolve(JSON.parse(request.responseText, (key, value) => {
                        if (key === 'createdAt') return new Date(value);
                        return value;
                    }));
                }
            };
            request.onerror = function () {
                reject(new Error('Error'));
            };
            request.send(JSON.stringify({skip, top, filterConfig}));
        });
    }

    function getSize() {
        return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();
            request.open('GET', '/articles');
            request.onload = function () {
                if (request.status === 200) {
                    resolve(request.responseText);
                }
            };
            request.onerror = function () {
                reject(new Error('Error'));
            };
            request.send();
        });
    }

    function getArticle(id) {
        return new Promise((resolve, rejecrt) => {
            const request = new XMLHttpRequest();
            request.open('GET', '/articles/' + id);
            request.onload = () => {
                if (request.status === 200) {
                    resolve(JSON.parse(request.responseText, (key, value) => {
                        if (key === 'createdAt') return new Date(value);
                        return value;
                    }));
                }
            };
            request.onerror = () => {
                reject(new Error('Error'));
            };
            request.send();
        });
    }

    function editArticles(article) {
        return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();
            request.open('PATCH', '/articles');
            request.setRequestHeader('content-type', 'application/json');
            request.onload = function () {
                if (request.status === 200) {
                    resolve();
                }
            };
            request.onerror = function () {
                reject(new Error('Error'));
            };
            request.send(JSON.stringify(article));
        });
    }

    function addArticle(article) {
        return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();
            request.open('POST', '/articles');
            request.setRequestHeader('content-type', 'application/json');

            request.onload = function () {
                if (request.status === 200) {
                    resolve();
                }
            };
            request.onerror = function () {
                reject(new Error('Error'));
            };
            request.send(JSON.stringify(article));
        });
    }

    function deleteArticle(id) {
        return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();
            request.open('DELETE', '/articles/' + id);
            request.onload = function () {
                if (request.status === 200) {
                    resolve();
                }
            };
            request.onerror = function () {
                reject(new Error('Error'));
            };
            request.send();
        });
    }

    function logIn(user) {
        return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();
            request.open('POST', '/login');
            request.setRequestHeader('content-type', 'application/json');
            request.onload = function () {
                if (request.status === 200) {
                    resolve();
                } else reject();
            };
            request.onerror = function () {
                reject(new Error('Error'));
            };
            request.send(JSON.stringify(user));
        });
    }

    function logOut() {
        return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();
            request.open('GET', '/logout');
            request.onload = function () {
                if (request.status === 200) {
                    resolve();
                }
            };
            request.onerror = function () {
                reject(new Error('Error'));
            };
            request.send();
        });
    }

    function getUserName() {
        return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();
            request.open('GET', '/username');
            request.onload = function () {
                if (request.status === 200) {
                    resolve(request.responseText);
                }
            };
            request.onerror = function () {
                reject(new Error('Error'));
            };
            request.send();
        });
    }

    return {
        getArticles,
        getSize,
        getArticle,
        getUserName,
        logOut,
        logIn,
        deleteArticle,
        addArticle,
        editArticles,
    };
}());
