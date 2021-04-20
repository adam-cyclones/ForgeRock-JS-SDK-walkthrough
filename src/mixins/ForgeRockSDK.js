import * as forgerock from "@forgerock/javascript-sdk";
import NameCallback from '../components/callbacks/NameCallback.vue';
import PasswordCallback from '../components/callbacks/PasswordCallback.vue';

export default {
    data() {
        return {
            frAuthenticated: false,
            frTreeContext: this._treeWalker(),
        }
    },
    created() {
        this.configure();
    },
    methods: {
        async configure() {
            // for demo hosted github page
            const redirectUri = location.origin.includes('github') ?
                'https://adam-cyclones.github.io/ForgeRock-JS-SDK-walkthrough/index.html' :
                'https://adam-sdk.app:8088';

            forgerock.Config.set({
                clientId: 'AdamSDKAppClient',
                redirectUri, // e.g. 'https://sdkapp.example.com:8443/_callback'
                scope: 'openid profile me.read', // e.g. 'openid profile me.read'
                serverConfig: {
                    baseUrl: 'https://openam-forgerock-adamcrockett.forgeblocks.com/am/', // e.g. 'https://openam.example.com:9443/openam/'
                    timeout: '9000' // 90000 or less
                },
                realmPath: 'alpha', // e.g. 'root'
                tree: 'AdamSDKAppLogin1.0.0', // e.g. 'Login'
            });
            // start a new tree context
            this.frTreeContext = await this._treeWalker();
            console.log(await this.frTreeContext.next())
        },
        /**
         * @private
         * @description Walks the tree, call next to continue from last itteration
        */
        async * _treeWalker() {
            let prevStage = undefined;
            let stage = await forgerock.FRAuth.next(prevStage);
            while (stage.type !== 'LoginFailure' || stage.type !== 'LoginSuccess') {
                prevStage = await forgerock.FRAuth.next(prevStage);
                yield prevStage;
            }
            return stage;
        },
        /**
         * @description renders the current stage within this tree if it has callbacks to render
         */
        async frRender() {
            const stage = (await this.frTreeContext.next()).value;

            if (stage.type !== 'LoginFailure' || stage.type !== 'LoginSuccess' && stage.callbacks) {
                    for (const { payload } of stage.callbacks) {
                    const uiData = {}
                    uiData.payload = payload;
                    uiData.component = null;

                    // assign known callbacks to render thier respective Vue Component
                    switch (payload.type) {
                        case "NameCallback":
                            uiData.component = NameCallback;
                            break;
                        case "PasswordCallback":
                            uiData.component = PasswordCallback;
                            break;
                        default:
                            console.warn(`unhandled callback, cannot render ${payload.type}`)
                            break;
                    }
                    this.frTreeUIData = [...this.frTreeUIData, uiData];
                }
            }
        },
        /**
         * @description handles populating callback data
         */
        async frAuthenticate() {
            for await (const stage of this._treeWalker()) {
                if (stage.type === 'LoginFailure' || stage.type === 'LoginSuccess') {
                    console.log(stage)
                    break;
                } else {
                    for (const callback of stage.callbacks) {
                        if (callback.payload.type === 'NameCallback') {
                            callback.setInputValue(elUsername)
                        }
                        if (callback.payload.type === 'PasswordCallback') {
                            callback.setInputValue(elPassword)
                        }
                        // console.log(callback.setInputValue('hey'))
                    }
                }
            }
        }
    }
}