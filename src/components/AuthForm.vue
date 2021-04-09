<template>
    <form @submit.prevent="handleSubmit" ref="form" novalidate>
        <fieldset>
            <legend>Login</legend>
            <div>
                <label for="username">* Username</label>
                <input required id="username" type="text" />
            </div>
            <div>
                <label for="password">* Password</label>
                <input required id="password" type="password" />
            </div>
            <hr />
            <button type="submit">Authenticate</button>
        </fieldset>
    </form>
</template>

<script>
export default {
    name: 'AuthForm',
    methods: {
        handleSubmit() {
            const { form } = this.$refs;
            if (form.checkValidity()) {
                this.$emit('submit');
            }
        }
    }
}
</script>
