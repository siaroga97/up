#
1 Установить базу данных c названием sergey в качестве текущей.

2 Импортировать данные в базу данных.
mongoimport --db sergey --collection articles --file ../export-files/articles.json
mongoimport --db sergey --collection users --file ../export-files/users.json

3 Установка необходимых пакетов.Выполнить npm install 
4 Запустить сервер командой node app.js 

users Sergey 123
Mr.Snow 333
