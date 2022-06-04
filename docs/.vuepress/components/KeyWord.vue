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

<style>
span {
  font-size: 10rem;
  font-weight: 700;
  line-height: 1.5;
}

.slogan-keyword-0 {
  color: rgba(var(--semi-pink-5), 1);
}
.slogan-keyword-1 {
  color: rgba(var(--semi-red-5), 1);
}
.slogan-keyword-2 {
  color: rgba(var(--semi-lime-5), 1);
}
.slogan-keyword-3 {
  color: rgba(var(--semi-orange-5), 1);
}
.slogan-keyword-4 {
  color: rgba(var(--semi-yellow-5), 1);
}
</style>
