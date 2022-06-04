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
