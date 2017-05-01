let request = (function () {

    function getArray() {
        return new Promise(function (resolve, reject) {

            let request = new XMLHttpRequest();
            request.open('GET', '/articles');

            request.onload = function () {
                if (request.status === 200) {
                    resolve(JSON.parse(request.responseText, (key, value) => {
                        if (key === 'createdAt') return new Date(value);
                        return value;
                    }));
                }
            };
            request.onerror = function () {
                reject(new Error("Error"));
            };
            request.send();
        })

    }

    function editArticles(article) {

        return new Promise(function (resolve, reject) {
            let request = new XMLHttpRequest();
            request.open('PATCH', '/articles');
            request.setRequestHeader('content-type', 'application/json');
            request.onload = function () {
                if (request.status === 200) {
                    resolve();
                }
            };
            request.onerror = function () {
                reject(new Error("Error"));
            };
            request.send(JSON.stringify(article));

        });

    }

    function addArticle(article) {
        return new Promise(function (resolve, reject) {
            let request = new XMLHttpRequest();
            request.open('POST', '/articles');
            request.setRequestHeader('content-type', 'application/json');

            request.onload = function () {
                if (request.status === 200) {
                    resolve();
                }
            };
            request.onerror = function () {
                reject(new Error("Error"));
            };
            request.send(JSON.stringify(article));
        });

    }

    function deleteArticle(id) {
        return new Promise(function (resolve, reject) {
            let request = new XMLHttpRequest();
            request.open('DELETE', '/articles/' + id);
            request.onload = function () {
                if (request.status === 200) {
                    resolve();
                }
            };
            request.onerror = function () {
                reject(new Error("Error"));
            };
            request.send();

        });
    }
    function logIn(user){
        return new Promise(function (resolve,reject) {
            let request=new XMLHttpRequest();
            request.open('POST','/login');
            request.setRequestHeader('content-type', 'application/json');
            request.onload = function () {
                if (request.status === 200) {
                    resolve();
                }else reject();
            };
            request.onerror = function () {
                reject(new Error("Error"));
            };
            request.send(JSON.stringify(user));
        });
    }
    function logOut() {
        return new Promise(function (resolve,reject) {
            let request=new XMLHttpRequest();
            request.open('GET','/logout');
            request.onload = function () {
                if (request.status === 200) {
                    resolve();
                }
            };
            request.onerror = function () {
                reject(new Error("Error"));
            };
            request.send();
        });
    }
    function getUserName() {
        return new Promise(function (resolve,reject) {
            let request=new XMLHttpRequest();
            request.open('GET','/username');
            request.onload = function () {
                if (request.status === 200) {
                    resolve(request.responseText);
                }
            };
            request.onerror = function () {
                reject(new Error("Error"));
            };
            request.send();
        });
    }
    return {
        getUserName,
        logOut,
        logIn,
        deleteArticle: deleteArticle,
        addArticle: addArticle,
        editArticles: editArticles,
        getArray: getArray

    };
}());
