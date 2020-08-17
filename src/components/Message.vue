<template>
    <div>
        <div v-if='errorWindow'>
            {{ errorWindow }}
        </div>
        <div v-else-if='messageWindow'>
            {{ messageWindow }}
        </div>
    </div>
</template>



<script>
export default  {
    name: 'Message',
    props: {
        errorWindow: String,
        messageWindow: String,
    },
    mounted () {
        this.$store.dispatch('clearMessage');
    }
}
</script>
