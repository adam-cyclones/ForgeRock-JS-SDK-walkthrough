
<template>
    <div>
        <auth-state-header :authenticated='frAuthenticated' ></auth-state-header>
        <main>
            <p id="messages"></p>
            <auth-form @submit="handleSubmit" ></auth-form>
            
            <section>
                <p id="given-name"></p>
                <p id="family-name"></p>
            </section>
        </main>
    </div>
</template>

<script>
import ForgeRockSDK from "./mixins/ForgeRockSDK";
import AuthStateHeader from "./components/AuthStateHeader";
import AuthForm from "./components/AuthForm";

export default {
    name: 'AppRoot',
    mixins: [
        ForgeRockSDK
    ],
    components: {
        AuthStateHeader,
        AuthForm
    },
    mounted() {
        this.frRender();
    },
    methods: {
        handleNext() {
            this.frRender();
        }
    }
}
</script>