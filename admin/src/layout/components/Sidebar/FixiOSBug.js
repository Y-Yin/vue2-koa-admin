export default {
  computed: {
    device() {
      return this.$store.state.app.device;
    },
  },
  mounted() {
    // 为了修复ios设备上的点击菜单将触发mouseleave bug
    // https://github.com/PanJiaChen/vue-element-admin/issues/1135
    this.fixBugIniOS();
  },
  methods: {
    fixBugIniOS() {
      const $subMenu = this.$refs.subMenu;
      if ($subMenu) {
        // 暂存
        const handleMouseleave = $subMenu.handleMouseleave;
        $subMenu.handleMouseleave = (e) => {
          if (this.device === "mobile") {
            return;
          }
          handleMouseleave(e);
        };
      }
    },
  },
};
