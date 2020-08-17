<template>
    <div class='modal-window'>
        <div class='modal-window_delete'> 
            <div class='info'>Are you sure you want to <strong>delete {{ elementForDelete.label ? elementForDelete.label : elementForDelete.count + ' items' }}?</strong></div>
            <div class='btn-group'>
                <button 
                    @click='cancel' 
                    class='btn-not_active btn'
                >
                    Cancel
                </button>
                <button 
                    @click='confirm' 
                    class='btn-active btn'
                >
                    Confirm
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Modal', 
    props: {
        elementForDelete: Object,
    },
    methods: {
        cancel () {
            this.$emit('show-modal');
        },
        confirm () {
            this.$emit('show-modal');
            this.elementForDelete.id ? this.$store.dispatch('deleteProduct', this.elementForDelete.id) : this.$store.dispatch('deleteProduct');
        }
    }
}
</script>

<style scoped>
.modal-window {
    display: flex;
    background-color: #f9f9f9bf;
    z-index: 999;
    position: fixed;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
}
.modal-window_delete {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #ffffff;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.16);
    border-radius: 4px; 
    width: 350px;
    height: 100px;
}
.info {
    text-align: center;
    margin-bottom: 5px;
}
.btn-group {
    min-height: 30%;
}
</style>