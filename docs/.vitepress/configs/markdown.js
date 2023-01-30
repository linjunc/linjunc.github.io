import mdItCustomAttrs from 'markdown-it-custom-attrs'
export const markdown = {
    // options for markdown-it-toc-done-right
    toc: { level: [1, 2, 3] },

    config: (md) => {
        // use more markdown-it plugins!
        md.use(mdItCustomAttrs, 'image', {
            'data-fancybox': "gallery"
        })
    }
}