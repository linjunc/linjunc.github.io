<template>
    <div>
        <div
        className="introduce-content"
        dangerouslySetInnerHTML={{
            __html: marked(content).replace(/<pre>/g, "<pre id='hljs'>")
        }}
    ></div>
    </div>
</template>

<style>
div {
  padding: 0px 4rem;
  margin: 2rem 0px;
}
.introduce-content {
  line-height: 2;
  font-weight: 600;
}
</style>