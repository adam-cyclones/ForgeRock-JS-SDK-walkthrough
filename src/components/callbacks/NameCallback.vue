<template>
    <div>
        <label :for='id'><slot></slot></label>
        <input required :id='id' type="text"/>
    </div>
</template>

<script>
export default {
    name: 'UsernameCallback',
    props: {
        id: String
    }
}
</script>