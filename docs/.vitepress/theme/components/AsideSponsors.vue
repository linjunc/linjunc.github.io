<script setup lang="ts">
</script>

<template>
  <a class="wechat" target="_blank">
    <img width="22" height="22" src="https://www.github.com/linjunc.png" />
    <span>
      <p class="extra-info">About Me</p>
      <p class="heading">小丞同学</p>
      <p class="extra-info">A FrontEnd 𝑫𝒆𝒗𝒆𝒍𝒐𝒑𝒆𝒓</p>
    </span>
  </a>
</template>

<style>
.wechat {
  margin-top: 1rem;
  margin-bottom: 1rem;
  border-radius: 14px;
  padding-left: 2.5rem;
  padding-top: 0.4rem;
  padding-bottom: 0.4rem;
  position: relative;
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.1rem;
  filter: grayscale(100%);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  background-color: var(--vp-c-bg-alt);
  border: 2px solid var(--vp-c-bg-alt);
  transition: border-color 0.5s;
}
.wechat:hover {
  filter: grayscale(0%);
  border: 2px solid var(--vp-c-brand-light);
}
.wechat img {
  position: absolute;
  left: 1.5rem;
  transition: transform 0.5s;
}
.wechat:hover img {
  transform: scale(1.75);
}
.wechat:hover .heading {
  background-image: linear-gradient(
    120deg,
    #bd34fe 16%,
    var(--vp-c-brand-light),
    var(--vp-c-brand-light)
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.wechat .extra-info {
  color: var(--vp-c-text-1);
  opacity: 0;
  font-size: 0.7rem;
  padding-left: 0.1rem;
  transition: opacity 0.5s;
}
.wechat:hover .extra-info {
  opacity: 0.9;
}
</style>