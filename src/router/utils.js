import store from "@/store/index";

const redirectIfVdom2fsIsNotSeted = (to, from, next) => {
  if (!store.getters["vdom2fs/pathIsValid"]) {
    next({ name: "Setup" });
    return;
  }
  next();
};

const redirecrIfVdom2fsIsCorrect = (to, from, next) => {
  if (store.getters["vdom2fs/pathIsValid"]) {
    next({ name: "Home" });
    return;
  }
  next();
};

export { redirecrIfVdom2fsIsCorrect, redirectIfVdom2fsIsNotSeted };
