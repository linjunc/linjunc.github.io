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
