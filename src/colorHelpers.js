import chroma from 'chroma-js';

const levels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

function generatePalette(starterPalette) {
    let newPalette = {
        paletteName: starterPalette.paletteName,
        id: starterPalette.id,
        emoji: starterPalette.emoji,
        colors: {}
    };
    for (let level of levels) {
        newPalette.colors[level] = [];
    }
    for (let color of starterPalette.colors) {
        let scale = getScale(color.color, 10).reverse() // Call getScale passing in the current color and 10 steps to generate the scale for this color
        for (let i in scale) {
            newPalette.colors[levels[i]].push({
                name: `${color.name} ${levels[i]}`, // name is the color.name with the scale weight (ie current level) after it
                id: color.name.toLowerCase().replace(/ /g, "-"), // takes the name and replaces spaces with dashes
                hex: scale[i], // scale is an array of hex values, so just need the current value
                rgb: chroma(scale[i]).css(), // chroma takes in a hex and .css() returns the rgb of it
                rgba: chroma(scale[i]).css()
                    .replace("rgb", "rgba")
                    .replace(")", ",1.0)") // takes the rgb above and adjusts to rgba with replace()
            });
        }
    }
    return newPalette
};

// Function to generate the start, mid, and end points for the generateScale function
//Returns an array with: [darkened color, hexColor, white]
function getRange(hexColor) {
    const endColor = "#fff"
    return [
        chroma(hexColor).darken(1.4).hex(),
        hexColor,
        endColor
    ]
};

// Function takes in a hex value and the number of steps to return
function getScale(hexColor, numberOfColors) {
    return chroma
        .scale(getRange(hexColor)) // generate scale from the original hexColor with getRange (which returns 3 hexes for the range: start, mid, end)
        .mode("lab") // lighten shades
        .colors(numberOfColors) // number of steps/colors to generate
};

export { generatePalette };