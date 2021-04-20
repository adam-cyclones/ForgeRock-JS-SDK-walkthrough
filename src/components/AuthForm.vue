<template>
    <form @submit.prevent="handleSubmit" ref="form" @change='simpleValidate' novalidate>
        <fieldset>
            <legend>Login</legend>
            <component
                :key="callback.payload._id"
                v-for='callback in frTreeUIData'
                :is="callback.component"
                :id="formatValidID(callback.payload._id)">
                {{callback.payload.output[0].value}}
            </component>
            <hr />
            <button :disabled='!valid' @click='handleNext' type="button">Next</button>
        </fieldset>
    </form>
</template>

<script>
export default {
    name: 'AuthForm',
    props: {
        frTreeUIData: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            valid: false
        }
    },
    methods: {
        handleSubmit() {
            const { form } = this.$refs;
            if (form.checkValidity()) {
                this.$emit('submit');
            }
        },
        formatValidID(id) {
            return `callback-${id}`;
        },
        handleNext() {
            this.$emit('next');
        },
        simpleValidate() {
            this.valid = this.$refs.form.checkValidity();
        }
    }
}
</script>
