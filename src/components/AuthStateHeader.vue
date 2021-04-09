<template>
    <header>
        <p>adam-sdk.app</p>
        <button v-if="authenticated" id="logoutBtn" type="button" class="toggle">Logout</button>
    </header>
</template>

<script>
export default {
    name: 'AuthStateHeader',
    props: {
        authenticated: Boolean
    }
}
</script>