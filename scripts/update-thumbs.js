const module_id = 'pf2e-kingmaker-map-remake'
const thumbs_folder = 'assets/thumbnails'

for (const pack of game.packs.filter(p => p.metadata.packageName === module_id & p.metadata.type === 'Scene')) {
    for (const scene of pack.index.values()) {
        const blob = await fetch(scene.thumb)
            .then(r => r.blob())
        const {path} = await FilePicker.upload(
            "data",
            `modules/${module_id}/${thumbs_folder}/`,
            new File([blob], scene.thumb.split('/').pop(), {type: blob.type}),
            {},
            {notify: false}
        );
        await pack.getDocument(scene._id)
            .then(s => s.update({thumb: path}))
    }
}
