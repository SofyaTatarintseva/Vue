import products from './products.json';

export default {
  actions: {
    //имитирует запрос на сервера. При успешном выполнении выполняется мутация и данные заносятся в state. При не упешном появляется alert.
    async getProduct ({commit}) {
      getProducts ()
        .then(products => commit ('updateProduct', products))
        .catch(error => commit('errorWindow', error.error))
    },
    //Имитурует запрос на сервер. Проверяет было ли удаление вызвано основной кнопкой delete, либо иконкой. При успешном в мутации удаляет элемент/-ы. При не успешном alert.
    async deleteProduct ({commit}, id) {
      deleteProducts()
        .then( function (message) {
          id ? commit ('deleteProduct', {message, id}) : commit ('deleteProducts', message);
        })
        .catch(error => commit('errorWindow', error.error))
    },
    //возвращает boolean, для сортировки массива
    sortingByProducts ({commit}, value) {
      commit('sortingByProducts', value)
    },
    //возвращает boolean для случая всех выбранных продуктов
    checkedAllProducts ({commit}, checked) {
      commit('checkedAllProducts', checked)
    },
    //возвращает массив id выбранных продуктов
    checkedProductFromDelete ({commit}, {id, status}) {
      commit ('checkedProductFromDelete', {id, status})
    },
    //возвращает количество показываемых продуктов на странице
    updatePage ({commit}, page) {
      commit ('updatePage', page)
    },
    //возвращает позицию с которой нужно показывать массив (при клике вправо-влево)
    updatePageBegin ({commit}, startPage) {
      commit ('updatePageBegin', startPage)
    },
    //возвращает значение boolean для drop-down select для категорий (если выбраны все)
    updateProductSort ({commit}, selectItems) {
      commit ('updateProductSort', selectItems)
    },
    //возвращает {} с data и checked в drop-down select по категориям
    updateItemsProucts ({commit}, selectItem) {
      commit ('updateItemsProucts', selectItem)
    },
    //возвращает название выбранной категории для сортировки 
    itemsFromSorting ({commit}, value) {
      commit ('itemsFromSorting', value)
    },
    //запускает очистку данные для сообщения и ошибки с задержкой
    clearMessage ({commit}) {
      setTimeout(function () {
        commit('clearMessage')
    }, 2000);
    }
  },
  mutations: {
    //обновляет полученные данные из json
    updateProduct (state, products) {
      state.productsRows = products;
    },
    //обновляет количество показываемых продуктов
    updatePage (state, page) {
      state.numberRowsPerPage = page;
    },
    //обновляет позицию с которой начинается показ массива всех продуктов
    updatePageBegin (state, pageBegin) {
      state.currentPositionRows = pageBegin;
    },
    //обновляет категории для сортировки (если выбраны все/ не выбраны все)
    updateProductSort (state, selectItems) {
      state.headerProducts.map(item => item.toggle = selectItems);
    },
    //обновляет категории для сортировки (если выбран один/ не выбран один)
    updateItemsProucts (state, selectItem) {
      state.headerProducts.find(item => item.code == selectItem.data).toggle = selectItem.checked; 
    },
    //обновляет категории для сортировки
    itemsFromSorting (state, value) {
      state.headerProducts.map(item => item.sort = false);
      state.headerProducts.find(item => item.code == value).sort = true;
      state.caseForSort = value;
      state.sortingByUp = true;
    }, 
    //обновляет state с продуктами для удаления по id
    checkedProductFromDelete (state, {id, status}) {
      let existenceId = state.productRowsForDelete.includes(id);
      if(!existenceId && status) {
        state.productRowsForDelete.push(id)
      }
      else {
        state.productRowsForDelete = state.productRowsForDelete.filter(item => item !== id);
      }
    },
    //обновляет state с продуктами для удаления по основной кпокпе delete
    deleteProducts (state, message) {
      state.messageWindow = (`Products is ${message.message}`);
      state.productRowsForDelete.forEach(element => {
        let indexDeleteProducts = state.productsRows.findIndex(item => item.id == element);
        state.productsRows.splice(indexDeleteProducts, 1);
      });
      state.productRowsForDelete = [];
      state.checkedAllProductsForDelete = false;
    },
    //обновляет state с продуктом для удаления по иконке delete
    deleteProduct (state, {message, id}) {
      state.messageWindow = (`Product is ${message.message}`);
      let indexDeleteProduct = state.productsRows.findIndex(item => item.id == id);
      state.productsRows.splice(indexDeleteProduct, 1);
      state.productRowsForDelete = state.productRowsForDelete.filter(item => item !== id);
    },
    //обновляет state с продуктами для удаления всех показанных на странице
    checkedAllProducts (state, allProductsFromDelete) {
      if (allProductsFromDelete === true) {
        state.checkedAllProductsForDelete = allProductsFromDelete;
        let arrProductDeleteAll = (state.productsRows.slice(state.currentPositionRows, +state.numberRowsPerPage+state.currentPositionRows)).map(element => element.id);
        state.productRowsForDelete = arrProductDeleteAll;
      }
      else {
        state.checkedAllProductsForDelete = allProductsFromDelete;
        state.productRowsForDelete = [];
      }
    },
    //обновляет данные для сортировки по убыванию или возсрастанию
    sortingByProducts (state, valueSorting) {
      state.sortingByUp = valueSorting;
    },
    //обновляет данные с ошибкой
    errorWindow (state, error) {
      state.errorWindow = (`${error}. Please try again`);
    },
    //очищает данные с ошибкой и сообщением
    clearMessage (state) {
      state.messageWindow = '';
      state.errorWindow = '';
    },    
  },
  state: {
    productsRows: [], 
    numberRowsPerPage: 10,
    headerProducts: [
      {id: '1', code:"product", label: 'Product (100gr serving)', toggle: true, sort: false},
      {id: '2', code:"calories", label: 'Calories', toggle: true, sort: false},
      {id: '3', code:"fat", label: 'Fat (g)', toggle: true, sort: false},
      {id: '4', code:"carbs", label: 'Carbs (g)', toggle: true, sort: false},
      {id: '5', code:"protein", label: 'Protein (g)', toggle: true, sort: false},
      {id: '6', code:"iron", label: 'Iron (%)', toggle: true, sort: false}
    ], 
    currentPositionRows: 0,
    caseForSort: '', 
    productRowsForDelete: [],
    checkedAllProductsForDelete: false,
    sortingByUp : true,
    messageWindow: '',
    errorWindow: '',
  },
  getters: {
    numberRowsPerPage (state) {
      return state.numberRowsPerPage;
    },
    currentPositionRows (state) {
      return state.currentPositionRows +1;
    },
    sortingByUp (state) {
      return state.sortingByUp;
    },
    productCount (state) {
      return state.productsRows.length;
    },
    visibleProduct (state) {
      let arrVisible = state.productsRows.slice(state.currentPositionRows, +state.numberRowsPerPage+state.currentPositionRows);
      switch(state.caseForSort){
        case 'product': return state.sortingByUp ? arrVisible.sort(sortByProduct) : arrVisible.sort(sortByProduct).reverse();
        case 'calories': return state.sortingByUp ? arrVisible.sort(sortByCalories) : arrVisible.sort(sortByCalories).reverse();
        case 'fat': return state.sortingByUp ? arrVisible.sort(sortByFat) : arrVisible.sort(sortByFat).reverse();
        case 'carbs': return state.sortingByUp ? arrVisible.sort(sortByCarbs) : arrVisible.sort(sortByCarbs).reverse();
        case 'protein': return state.sortingByUp ? arrVisible.sort(sortByProtein) : arrVisible.sort(sortByProtein).reverse();
        case 'iron': return state.sortingByUp ? arrVisible.sort(sortByIron) : arrVisible.sort(sortByProtein).reverse();
        default: return arrVisible;
      }
    },
    headerProducts (state) {
      return state.headerProducts;
    },
    headerProductCount (state) {
      return state.headerProducts.filter(item => item.toggle === true).length;
    },
    productDeleteLength (state) {
      return state.productRowsForDelete.length;
    },
    checkedAllProducts (state) {
      return state.checkedAllProductsForDelete;
    },
    errorWindow (state) {
      return state.errorWindow;
    },
    messageWindow (state) {
      return state.messageWindow;
    }
  },

}

/** True = 65%, False = 35% */
const rejectByChance = () => {
  return Math.random() <= 0.35;
};

/** Emulate get request */
export const getProducts = () => new Promise((resolve, reject) => {
  if (rejectByChance()) {
    return reject({
      error: 'Server error'
    } 
    );
  }
  const delay = parseInt(Math.random() * 1000);
  setTimeout(() => {
    resolve(products);
  }, delay);
});

/** Emulate delete request */
  export const deleteProducts = () => new Promise((resolve, reject) => {
  if (rejectByChance()) {
    return reject({
      error: 'Server error'
    });
  }
  const delay = parseInt(Math.random() * 1000);
  setTimeout(() => {
    resolve({ message: 'deleted' });
  }, delay);
});
const sortByProduct = function (d1, d2) {return (d1.product.toLowerCase() > d2.product.toLowerCase()) ? 1 : -1;};
const sortByCalories = function (d1, d2) { return (d1.calories > d2.calories) ? 1 : -1; };
const sortByFat = function (d1, d2) { return (d1.fat > d2.fat) ? 1 : -1; };
const sortByCarbs = function (d1, d2) { return (d1.carbs > d2.carbs) ? 1 : -1; };
const sortByProtein = function (d1, d2) { return (d1.protein > d2.protein) ? 1 : -1; };
const sortByIron = function (d1, d2) { return (d1.iron > d2.iron) ? 1 : -1; };
