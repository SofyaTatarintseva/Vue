<template>
  <div id="app">
    <div class="tableProduct">
      <h1>Table UI</h1>
      <hr>
      <NavProducts
        :headerProducts="headerProducts"
        :productCount="productCount"
        :headerProductCount="headerProductCount"
        :productDeleteLength='productDeleteLength'
        @checked-products='modalWindow'
      />
      <SortingProducts 
        :headerProducts="headerProducts"
        :sortingByUp="sortingByUp"
        :checkedAllProducts='checkedAllProducts'
      />
      <hr>
      <Products 
        :product="product"
        :headerProducts="headerProducts"
        :checkedAllProducts='checkedAllProducts'
        v-for="product in visibleProduct"
        :key="product.id"
        @checked-target='modalWindow'
      />
    </div>
    <Modal 
      v-if='showModal'
      @show-modal='showModal = !showModal'
      :elementForDelete='elementForDelete'
    />
    <transition :duration="1000" name='fade'>
      <Message 
        :errorWindow='errorWindow'
        :messageWindow='messageWindow'
        v-if='messageWindow || errorWindow'
        class='info-window'
        :class="{'error-info': errorWindow, 'message-info': messageWindow}"
      />
    </transition>
  </div>
</template>

<script>
import NavProducts from '@/components/NavProducts.vue'
import SortingProducts from '@/components/SortingProducts.vue'
import Products from '@/components/Products.vue'
import Modal from '@/components/Modal.vue'
import Message from '@/components/Message.vue'

import { mapGetters } from 'vuex'

export default {
  name: 'App',
  computed: mapGetters(['productCount', 'visibleProduct', 'sortingByUp', 'checkedAllProducts', 'errorWindow', 'messageWindow',
  'headerProductCount', 'headerProducts', 'productDeleteLength', 'checkedAllProducts', 'updateDeleteProduct',]),
  data () {
    return {
      showModal: false,
      elementForDelete: null,
    }
  },
  methods: {
    modalWindow (dataProduct) {
      this.showModal = true;
      this.elementForDelete = dataProduct;
    },
  },
  components: {
    NavProducts, SortingProducts, Products, Modal, Message
  },
  async mounted () {
    this.$store.dispatch('getProduct');
  }
  
}

</script>

<style >

* {
  margin: 0;
  padding: 0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: clamp(12px, 2vw, 14px);
}
#app {
  background: #F2F2F2;
  display: flex;
  justify-content: center;
  min-height: 100vh;
  color: #2c3e50;
}
.tableProduct {
  display: flex;
  flex-direction: column;
  width: 90%;
  margin-top: 20px;
}
h1 {
  font-family: Source Sans Pro;
  font-size: clamp(14px, 10vw, 32px);
  line-height: 40px;
}
hr:nth-of-type(1) {
  margin-bottom: 16px;
}
hr:nth-of-type(2) {
  width: 80%;
}
.sel {
  border-radius: 4px;
  cursor: pointer;
  margin: 0 5px 0 5px;
  border: 1px solid #D5DAE0;
  font-size: clamp(12px, 2vw, 14px);
  padding: 0px 10px 0px 10px;
  height: 100%;
  background: #F2F2F2;
  color: #5B5E77;
}
.sel:hover, .btn:hover {
  color: #2c3e50;
  border: 1px solid #8385889f;
}
.btn {
  box-sizing: border-box;
  border-radius: 4px;
  padding: 0px 10px 0px 10px;
  cursor: pointer;
  margin: 0 5px 0 5px;
  border: 1px solid #D5DAE0;
  font-size: clamp(12px, 2vw, 14px);
  height: 100%;
}
.btn-active {
  color: #FFFFFF;
  background: #00A11E;
}
.btn-not_active {
  color: #5B5E77;
  background: #F2F2F2;
}
.info-window {
  position: absolute;
  height: 40px;
  width: 400px;
  color: #ffffff;
  filter: opacity(0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  right: 2%;
  top: 2%;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.16);
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
.error-info {
  background: black;
}
.message-info {
  background: #00A11E;
}
.productTable_checked {
  width: 5%;
  height: 15px;
}
.header-row {
  display: flex;
  width: 80%; 
  min-height: 50px;
  align-items: center;
}
.header-row_items {
  display: flex;
  width: 100%;
  text-align: center;
  align-items: center;
}
@media (max-width: 1265px) {
  .header-sorting{
    margin-bottom: 10px;
  }
}
@media  (max-width: 1199px) {
  .header-row {
    width: 100%;
  }
  .header-row_items{
    width: 80%;
  }
  hr:nth-of-type(2) {
    width: 100%;
  }
}
@media (max-width: 767px) {
  .product-header_description {
    flex-direction: column;
  }
  .tableProduct {
    width: 100%;
  }
  .header-sorting, .header-panel {
    flex-direction: column;;
  }
  .btn, .sel {
    width: max-content;
    height: max-content;
  }
  .header-row_items p{
    font-size: clamp(7px, 2vw, 14px);
  }
  .header-panel button.btn_delete {
    margin: 0 5px 0;
  }
}

</style>
