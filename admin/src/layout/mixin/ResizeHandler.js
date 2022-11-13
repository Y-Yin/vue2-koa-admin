// 通用混入
import store from "@/store";

const { body } = document;
const WIDTH = 992; // 参考Bootstrap的响应式设计

export default {
  watch: {
    // 当router 变化的时候, 如果设备为移动端，则关闭侧边栏
    $route(route) {
      if (this.device === "mobile" && this.sidebar.opened) {
        store.dispatch("app/closeSideBar", { withoutAnimation: false });
      }
    },
  },
  // dom节点挂载前注入resize事件
  beforeMount() {
    window.addEventListener("resize", this.$_resizeHandler);
  },
  // 页面离开删除resize事件
  beforeDestroy() {
    window.removeEventListener("resize", this.$_resizeHandler);
  },
  mounted() {
    const isMobile = this.$_isMobile();
    if (isMobile) {
      store.dispatch("app/toggleDevice", "mobile");
      store.dispatch("app/closeSideBar", { withoutAnimation: true });
    }
  },
  methods: {
    $_isMobile() {
      // getBoundingClientRect用于获得页面中某个元素的左，上，右和下分别相对浏览器视窗的位置
      const rect = body.getBoundingClientRect();
      // 当body的宽度小于WIDTH的时候 , 视为移动端
      return rect.width - 1 < WIDTH;
    },
    $_resizeHandler() {
      if (!document.hidden) {
        const isMobile = this.$_isMobile();
        store.dispatch("app/toggleDevice", isMobile ? "mobile" : "desktop");

        if (isMobile) {
          store.dispatch("app/closeSideBar", { withoutAnimation: true });
        }
      }
    },
  },
};
