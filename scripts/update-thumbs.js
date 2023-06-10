// run this as a macro to sync thumbnail images into the thumbnails folder
const moduleId = 'pf2e-kingmaker-map-remake'
const thumbnailFolder = 'assets/thumbnails'

for (const pack of game.packs.filter(p => p.metadata.packageName === moduleId & p.metadata.type === 'Scene')) {
    for (const scene of pack.index.values()) {
        const blob = await fetch(scene.thumb)
            .then(r => r.blob())
        const {path} = await FilePicker.upload(
            'data',
            `modules/${moduleId}/${thumbnailFolder}/`,
            new File([blob], scene.thumb.split('/').pop(), {type: blob.type}),
            {},
            {notify: false}
        );
        await pack.getDocument(scene._id)
            .then(s => s.update({thumb: path}))
    }
}
