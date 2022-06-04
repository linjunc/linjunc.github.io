<template>
  <div>
    <span className="{`slogan-keyword-${index}`}"> {aboutKeyword[index]} </span>
  </div>
</template>

<script>
export default {
  name: "KeyWord",
  props: {
    url: String,
    type: String,
  },
  data() {
    return {};
  },
};
</script>