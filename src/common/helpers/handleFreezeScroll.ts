const handleFreezeScroll = (prop: boolean) => {
  if (prop) {
    document.body.classList.add("mask-open");
  } else {
    document.body.classList.remove("mask-open");
  }
};

export default handleFreezeScroll;
