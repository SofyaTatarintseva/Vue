<template>
    <div class="header">
        <div class="header-sorting">
            <div class="header-sorting_label">Sorting by:</div>
            <div 
                v-for="headerProduct of headerProducts" 
                :key="headerProduct.id"
                v-show="headerProduct.toggle"
                class="header-sorting_product-sorting"
                :data-sort="headerProduct.code"
                @click="sortingCategories"
            >
                {{ headerProduct.label }}
            </div>
        </div>
        <div class="header-panel">
            <button 
                class='btn btn_delete'
                v-bind:class="[{ 'btn-active': !!productDeleteLength, 'btn-not_delete': !productDeleteLength }]"
                @click="deleteProducts"
            >
                Delete <span v-show="productDeleteLength" >({{ productDeleteLength }})</span>
            </button>
            <select 
                v-model="pages" 
                @change="pageLoad"
                class="sel"
            >
                <option value='10'>10 Per Page</option>
                <option value='15'>15 Per Page</option>
                <option value='20'>20 Per Page</option>
            </select>
            <div class="slide">
                <button 
                    @click="pageStartLeft" 
                    class="switch-page btn btn-not_active"
                >
                    <img alt='arrow-left' src="../assets/Left.svg" class="arrow">
                </button>
                <div class="show-pages">
                    {{ productCount === 0 ? productCount : startPage }} - {{ productCount > (+pages + startPage - 1)  ? (+pages + startPage - 1) : productCount}} of {{ productCount >= 0 ? productCount: 0 }}
                </div>
                <button 
                    @click="pageStartRight" 
                    class="switch-page btn btn-not_active"
                >
                    <img alt='arrow-right' src="../assets/Right.svg" class="arrow"> 
                </button>
            </div>
            <div class="drop-down_menu">
                <button 
                    @click="isVisible = !isVisible"
                    class="btn btn-not_active"
                > 
                    {{ headerProductCount }} columns selected 
                    <img alt='arrow-down' src='../assets/Group.svg' class="down">
                </button>
                <div v-show="isVisible" class="header-panel_show-columns">
                    <div>
                        <input 
                            id='selectAll' 
                            type="checkbox"
                            value='0' 
                            v-model="isSelectAll" 
                            @change="chekedAllProduct"
                        >
                        <label for='selectAll'>Select All</label>
                    </div>
                    <Option
                        v-for="headerProduct of headerProducts" 
                        :headerProduct="headerProduct"
                        :key="headerProduct.id"
                        :chekedProduct="chekedProduct"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Option from "@/components/Option.vue"

export default {
    name: 'NavProducts',
    props: {
        productCount: Number,
        headerProductCount: Number,
        headerProducts: Array,
        productDeleteLength: Number,
    },
    data () {
        return {
            pages: this.$store.getters.numberRowsPerPage,
            startPage: this.$store.getters.currentPositionRows,
            isVisible: false,
            isSelectAll: true,
            isSelectColumn: false,
        }
    },
    methods: {
        pageLoad () {
            this.$store.dispatch('updatePage', +this.pages)
        },
        pageStartLeft () {
            if (this.startPage > this.pages) {
                this.startPage = this.startPage - (+this.pages);
            }
            else {
                this.startPage = 1;
            }
            this.$store.dispatch('updatePageBegin', this.startPage -1)
        },
        pageStartRight () {
            if ((this.startPage + (+this.pages)) <= this.productCount) {
                this.startPage= this.startPage + (+this.pages);
                this.$store.dispatch('updatePageBegin', this.startPage -1)
            }
        },
        chekedAllProduct () {
            this.$store.dispatch('updateProductSort', this.isSelectAll)
        },
        chekedProduct (data, checked) {
            this.$store.dispatch('updateItemsProucts', {data: data, checked:checked});
        },
        sortingCategories (event) {
            let allCaterories = document.querySelectorAll('.select-column');
            allCaterories.forEach(item => item.classList.remove("select-column"));
            this.$store.dispatch('itemsFromSorting', event.target.dataset.sort);
            event.target.classList.add("select-column");
        },
        deleteProducts () {
            if (this.productDeleteLength) {
                this.$emit('checked-products', {count: this.productDeleteLength})
            }
        }
    },
    components: {
        Option
    },
    
}
</script>

<style scoped>
.header {
    display: flex;
    margin-bottom: 20px;
    justify-content: space-between;
    flex-wrap: wrap;
}
.arrow, .down {
    vertical-align: middle;
}
.header-sorting_product-sorting {
    padding: 0 10px 0 10px;
    cursor: pointer;
}
button.btn-not_delete {
    filter: opacity(0.5);
    padding: 0px 20px 0px 20px;
}
button.btn_delete {
    margin: 0 5px 0 0;
}
.header-sorting_label {
    font-weight: 600;
}
.header-sorting {
    min-width: 50%;
    display: flex;
}
.header-panel {
    display: flex;
}
.header-panel_show-columns {
    position: absolute;
    left: 10px;
    background: white;
    overflow: auto;
    height: 243px;
    width: 90%;
    z-index: 9;
}
.header-panel_show-columns div {
    padding: 14px 0 14px 0;
}
.select-column {
    background-color: #00A11E;
    color: #FFFFFF;
    border-radius: 2px;
}
button.switch-page {
    box-sizing: content-box;
    padding: 0px 5px 0px 5px;
}
.drop-down_menu {
    position: relative;
} 
.header-sorting_label, .header-sorting_product-sorting, .show-pages {
    display: flex;
    align-items: center;
}
.slide {
    display: flex;
    flex-direction: row;
}
</style>