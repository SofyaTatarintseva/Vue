# test-site
Требования

Таблица имеет следующие колонки: Product, Саlories, Fat, Carbs, Protein, Iron.

Пользователь может выбирать колонку которую хочет видеть первой в таблице. По этой колонке можно будет отсортировать продукты.
Пользователь может определить количество продуктов в таблице (10, 15, 20)
Пользователь может выбирать колонки которые он хочет видеть. По умолчанию все колонки видимы.
Пользователь может удалить продукт или продукты из таблицы. Перед удалением нужно попросить пользователя подтвердить действие.
В приложении к тестовому заданию есть два файла: 'products.json' и

'request.js'. Перед инициализацией таблицы, необходимо загрузить продукты с помощью метода 'getProducts' и сохранить их в хранилище Vuex. Внимание! Метод 'getProducts' может вернуть ошибку с вероятностью 1/3. В этом случае ошибку необходимо обработать. Компонент таблицы получает входные данные из хранилища.

При удалении продуктов нужно использовать метод 'deleteProducts'. Этот метод также может вернуть ошибку. Продукты из хранилища удаляются только в случае успешного завершения метода 'deleteProducts'.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
