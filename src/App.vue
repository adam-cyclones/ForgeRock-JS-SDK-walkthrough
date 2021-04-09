
<template>
    <div>
        <AuthStateHeader :authenticated='authenticated'/>
        <main>
            <p id="messages"></p>
            <div class="toggle hide">
                <AuthForm/>
            </div>
            <div class="toggle">
            <section>
                <p id="given-name"></p>
                <p id="family-name"></p>
            </section>
            </div>
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
    }
}
</script>