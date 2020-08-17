<template>
    <div 
        class="product-content header-row" 
        @mouseover='isActive = true' 
        @mouseout='isActive = false' 
       
    >
        <div  
            @click='checkedProduct'
            class='header-row_items product-content_description'
        > 
            <input 
                @click.stop
                type="checkbox" 
                class='productTable_checked'
                name='product-content_checkbox' 
                :data-value='product.id'
                :checked='checkedAllProducts'
                @change='changeInput'
            >
            <span 
                v-show="headerProducts[0].toggle" 
                data-name="product"
            >
                {{ product.product }}
            </span>
            <span 
                v-show="headerProducts[1].toggle" 
                data-name='calories'
            >
                {{ product.calories }}
            </span>
            <span
                v-show="headerProducts[2].toggle"
                data-name='fat'
            >
                {{ product.fat }}
            </span>
            <span 
                v-show="headerProducts[3].toggle" 
                data-name='carbs'
            >
                {{ product.carbs }}
            </span>
            <span
                v-show="headerProducts[4].toggle"
                data-name='protein'
            >
                {{ product.protein }}
            </span>
            <span
                v-show="headerProducts[5].toggle"
                data-name='iron'
            >
                {{ product.iron }}
            </span>
        </div>
        <div 
            @click='confirmDelete'
            class='product-content_delete'
            v-show="isActive"
            :data-value='product.id'
        >
            <img src='../assets/Delete-icon.svg' alt='delete'>
            <span>delete</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Products',
    props: {
        product: Object,
        headerProducts: Array,
        checkedAllProducts: Boolean,
    },
    data () {
        return {
            isActive: false,
        }
    },
    methods: {
        checkedProduct () {
            let inputCheckbox = this.$el.querySelector('input');
            inputCheckbox.checked = !inputCheckbox.checked;
            this.$store.dispatch('checkedProductFromDelete', {id: inputCheckbox.dataset.value, status: inputCheckbox.checked});
        },
        changeInput () {
            let inputCheckbox = this.$el.querySelector('input');
            this.$store.dispatch('checkedProductFromDelete', {id: inputCheckbox.dataset.value, status: inputCheckbox.checked});
        },
        confirmDelete () {
            let inputForDelete = this.$el.querySelector('input');
            let labelProduct = this.$el.querySelector('span[data-name="product"]').innerHTML;
            this.$emit('checked-target', {id: inputForDelete.dataset.value, label: labelProduct});
        }
    },

}
</script>

<style scoped>
.product-content {
    text-align: center;
    cursor: pointer;
    position: relative;
}
.product-content:nth-of-type(2n+1) {
    background: #FFFFFF; 
}
.product-content:active {
    background: rgba(0, 161, 30, 0.07);
}
.product-content:hover {
    background: rgba(0, 161, 30, 0.07);
}
.product-content_delete {
    position: absolute;
    right: 3%;
}
span[data-name] {
    width: 10%;
    padding: 0 10px 0 10px;
}
span[data-name="product"] {
    width: 25%;
}
.product-content_description {
    height: 100%;
} 
</style>