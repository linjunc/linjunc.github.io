<template>
  <div class="about-page">
    <div className="about-slogan-container">
      <div className="about-slogan">
        <div className="slogan-first-line slogan-text">一切源于</div>
        <Keyword />
      </div>
      <div className="about-phrase">
        {lovePhrase.map((phrase, index) => (
        <div key="{index}" className="about-phrase-item">{phrase}</div>
        ))}
      </div>
    </div>
    <Introduce />
  </div>
</template>

<script>
import Keyword from "./KeyWord.vue";
import Introduce from "./Introduce.vue";
export default {
  components: { Keyword, Introduce },
};
</script>

<style>
.about-page {
  width: 120rem;
  min-height: 100vh;
  margin: 20px auto;
  border-radius: 20px;
  padding: 2rem 4rem;
  /* background-color: rgba(var(--semi-blue-5), 0.1); */
  /* border: 1px solid ${customBorder};
    box-shadow: 0px 0px 2px ${headerShadow}; */
  display: flex;
  flex-direction: column;
}

.about-slogan-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.about-slogan {
  margin-left: 4rem;
}
.slogan-text {
  font-size: 10rem;
  font-weight: 700;
  line-height: 1.5;
}
.about-phrase {
  transition: all 0.3s;
}
.about-phrase-item {
  line-height: 2.5;
  font-weight: 600;
}
</style>
