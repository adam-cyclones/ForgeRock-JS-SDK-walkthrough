export default {
    data() {
        return {
            authenticated: false
        }
    },
    created() {
        this.configure()
    },
    methods: {
        configure() {
            console.log('hello from mixin!')
        },
        * walkTree() {
            
        }
    }
}