<template>
    <div class="product-header header-row">
        <div class="header-row_items">
            <input 
                type="checkbox" 
                class='productTable_checked'
                @change="checkedAllProductsFromDelete"
                :checked='checkedAllProducts'
            >
            <div
                v-for="headerProduct of headerProducts" 
                :key="headerProduct.id"
                v-show="headerProduct.toggle"
                :data-sort="headerProduct.sort"
                class='product-header_description'
            > 
                <p> {{headerProduct.label}} </p>
                <img 
                    src='../assets/Arrow-Up.svg'
                    :alt='altImage'
                    :class="{'arrow-down': !sortingByUp}"
                    v-if='headerProduct.sort'
                    @click='sortDown'
                >
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SortingProducts',
    props: {
        headerProducts: Array,
        sortingByUp: Boolean,
        checkedAllProducts: Boolean,
    },
    data () {
        return {
            iscurrentSort: true,
            altImage: "arrow-up",
        }
    },
    methods: {
        sortDown () {
            this.iscurrentSort = !this.sortingByUp;
            this.iscurrentSort ? this.altImage = "arrow-up" : this.altImage = "arrow-down"
            this.$store.dispatch('sortingByProducts',  this.iscurrentSort);
        },
        checkedAllProductsFromDelete () {
            this.$store.dispatch('checkedAllProducts', event.target.checked);   
        },   
    },
    
}
</script>

<style scoped>
.product-header {
    background: #FFFFFF;
}
.product-header_description {
    font-weight: 600;
    width: 10%;
    padding: 0 10px 0 10px;
    display: flex;
    justify-content: center;
    align-items: center;
}
div.product-header_description:nth-of-type(1) {
    width: 25%;
}
div[data-sort='true'] {
    color: #00A11E;
}
.arrow-down {
    transform: rotate(180deg);
}
img {
    cursor: pointer;
}
</style>