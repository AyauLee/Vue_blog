export default {
    data() {
        return {
            currScroll: 0,
            showed: {},
        };
    },
    mounted() {
        window.addEventListener("scroll", () => {
            this.currScroll =
                document.documentElement.scrollTop || document.body.scrollTop; //表示当前滚动的位置
        });
    },
    methods: {
        handleScroll(ref, showStr, num = 200) {
            //当前滚动位置到达ref的时候，显示div（100作为调整用）
            // if (this.currScroll >= this.$refs.test.offsetTop - 100)
            if (this.currScroll >= ref.offsetTop - num || this.showed[showStr]) {
                if (!this.showed[showStr]) this.showed[showStr] = 1
                return true;
            } else {
                return false;
            }
        },
    },
};