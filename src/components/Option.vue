<template>
    <div @change="chekedProductTable">
        <input 
            type='checkbox' 
            :value="headerProduct.id"
            :id="headerProduct.code"
            v-model="headerProduct.toggle"
        >
        <label :for='headerProduct.code'>
            {{headerProduct.label}}
        </label>
    </div>
</template>

<script>
export default {
    name: 'Option',
    props: {
        headerProduct: Object,
        chekedProduct: Function,
    },
    methods: {
        chekedProductTable () {
            this.chekedProduct(this.headerProduct.code, this.headerProduct.toggle)
        }
    }
}
</script>
