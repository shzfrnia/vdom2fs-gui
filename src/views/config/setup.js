import store from "@/store/index";

const parsingMessage = {
  title: "Message",
  message: "Parsing application...",
  duration: 0,
  type: "info",
};

const parsingSuccessMessage = {
  title: "Success",
  message: "Application was parsed",
  duration: 2000,
  type: "success",
};

export const parseExportedApp = async (exportedApp, callback) => {
  const notificationPromise = store.dispatch("notify", parsingMessage);
  await store.dispatch("vdom2fs/parseApplication", exportedApp);
  notificationPromise.then((notification) => {
    setTimeout(notification.close, 200);
    store.dispatch("notify", parsingSuccessMessage);
  });
  if (callback) {
    callback.call();
  }
};

const fetchingApplicationMessage = {
  title: "Message",
  message: "Fetching application...",
  duration: 0,
  type: "info",
};

const fetchingApplicationSuccessMessage = {
  title: "Success",
  message: "Application was exported",
  duration: 2000,
  type: "success",
};

export const exportApplication = async (config, callback) => {
  const notificationPromise = store.dispatch(
    "notify",
    fetchingApplicationMessage
  );
  await store.dispatch("vdom2fs/exportApplication", config);
  notificationPromise.then((notification) => {
    setTimeout(notification.close, 200);
    store.dispatch("notify", fetchingApplicationSuccessMessage);
  });
  if (callback) {
    callback.call();
  }
};

export const openFolderOfExportedApp = (exportedApp) => {
  store.dispatch("vdom2fs/openExportedAppFolder", exportedApp);
};

export const removeExportedApp = (exportedApp, callback) => {
  store.dispatch("vdom2fs/removeExportedApp", exportedApp);
  if (callback) {
    callback.call();
  }
};

export default () => {
  return {
    parseExportedApp,
    openFolderOfExportedApp,
    removeExportedApp,
    exportApplication,
  };
};
