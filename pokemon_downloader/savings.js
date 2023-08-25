import fetch from 'node-fetch';
import fs from 'fs/promises';
import path from "path";

const createFolder = async (folderName) => {
    
    const folderPath = path.join(process.cwd(), folderName)
    try {
        // folder exists
        await fs.access(folderPath)
    } catch {

        // folder doesn't exist
        fs.mkdir(folderPath)
    }
};

const saveImageFile = async (filePath, arrayBuffer) => {
    await fs.writeFile(filePath, Buffer.from(arrayBuffer));
    console.log(`Saved: ${filePath}`)
};

const savePokemonStats = async (folderName, pokemonStatsObject) => {
    for (const stat of pokemonStatsObject) {

        // write to the file 
        await fs.appendFile(`${folderName}/stats.txt`, `${stat.stat.name}: ${stat.base_stat}\n`)
    }

    const filePath = path.join(
        process.cwd(),
        folderName,
        'stats.txt'
    )
    console.log(`Saved: ${filePath}`)
};

const savePokemonSprites = async (folderName, pokemonSpritesObject) => {
    // push pending promises to this array
    let spritePromises = [];
    let spriteNames = [];

    // make object into iterable
    // do a fetch for evey item that has a link
    for (const [sprite, url] of Object.entries(pokemonSpritesObject)) {
        if (typeof pokemonSpritesObject[sprite] === 'string') {
            
            // fetching one by one:
            // const response = await fetch(pokemonSpritesObject[sprite]);
            // const arrayB = await response.arrayBuffer();
            // save file
            // await saveImageFile(`${folderName}/${sprite}.png`, arrayB)

            //const url = pokemonSpritesObject[sprite];
            spritePromises.push(fetch(url).then((res) => res.arrayBuffer()))
            spriteNames.push(sprite)
        }
    }


    spritePromises = await Promise.all(spritePromises);

    for (let i = 0; i < spritePromises.length; i++) {
        const filePath = path.join(
            process.cwd(),
            folderName,
            `${spriteNames[i]}.png`
        )
        await saveImageFile(filePath, spritePromises[i]);
    }
            
};

const savePokemonArtwork = async (folderName, pokemonSpritesObject) => {
    
    const image = await fetch(pokemonSpritesObject['front_default']);
    const arrayB = await image.arrayBuffer();

    const filePath = path.join(
        process.cwd(),
        folderName,
        'official-artwork.png'
    )
    
    // save file
    await saveImageFile(filePath, arrayB)
};

const parseOptions = async (pokemonObject, optionsObject) => {
    await createFolder(pokemonObject.name);

    // console.log('TESTING: ', Object.entries(pokemonObject.sprites.other['official-artwork']))
    
    if (optionsObject.toDownload.includes('Stats')) {
        await savePokemonStats(pokemonObject.name, pokemonObject.stats);
    };

    if (optionsObject.toDownload.includes('Sprites')) {
        await savePokemonSprites(pokemonObject.name, pokemonObject.sprites)
    };

    if (optionsObject.toDownload.includes('Artwork')) {
        await savePokemonArtwork(pokemonObject.name, pokemonObject.sprites.other['official-artwork'])
    };
};

export { parseOptions };