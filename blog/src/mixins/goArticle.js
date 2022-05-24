export default {
    methods: {
        goArticle(id) {
            this.$router.push({
                path: '/archive/article',
                query: {
                    id: id
                }
            })
        }
    }
}