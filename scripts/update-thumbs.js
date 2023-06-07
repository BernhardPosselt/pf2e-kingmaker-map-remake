let module_id = 'pf2e-kingmaker-map-remake'
let thumbs_folder = 'assets/thumbnails'

// If the thumbnail folder doesn't exist yet, create it
if (! await FilePicker.browse('data', `modules/${module_id}/`).then(r => r.dirs.includes(`modules/${module_id}/${thumbs_folder}`))) { await FilePicker.createDirectory('data', `modules/${module_id}/${thumbs_folder}/`) }
for (const pack of game.packs.filter(p => p.metadata.packageName === module_id & p.metadata.type === 'Scene')) {
    for (const scene of pack.index.values()) {
        let blob = await fetch(scene.thumb).then(r => r.blob())
        let {path} = await FilePicker.upload(
            "data",
            `modules/${module_id}/${thumbs_folder}/`,
            new File([blob], scene.thumb.split('/').pop(), {type: blob.type}),
            {},
            {notify:false}
        );
        await pack.getDocument(scene._id).then(s => s.update({thumb: path}))
    }
}
