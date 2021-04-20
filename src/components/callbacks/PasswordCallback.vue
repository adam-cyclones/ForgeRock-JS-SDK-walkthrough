<template>
    <div>
        <label :for='id'><slot></slot></label>
        <input required :id='id' type="password"/>
    </div>
</template>

<script>
export default {
    name: 'PasswordCallback',
    props: { 
        id: String
    }
}
</script>