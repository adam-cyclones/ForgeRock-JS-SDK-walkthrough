import * as forgerock from "@forgerock/javascript-sdk";

export default {
    data() {
        return {
            frAuthenticated: false,
            frTreeContext: null,
            frTreeUIData: []
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
        async frRender() {
            for await (const stage of this._treeWalker()) {
                if (stage.type !== 'LoginFailure' || stage.type !== 'LoginSuccess') {
                    for (const { payload } of stage.callbacks) {
                        this.frTreeUIData = [...this.frTreeUIData, payload]
                    }
                }
            }
        },
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