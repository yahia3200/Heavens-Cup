export const chars = [
    "Gon Freecss",
    "Killua Zoldyck",
    "Kurapika",
    "Leorio Paradinight",

    "Isaac Netero",
    "Pariston Hill",
    "Ging Freecss",
    "Kite",

    "Morel",
    "Knov",
    "Knuckle Bine",
    "Shoot",

    "Biscuit Krueger",
    "Hisoka Morow",

    "Wing",
    "Zushi",

    "Pitou",
    "Meruem",
    "Pouf",
    "Youpi",

    "Ikalgo",
    "Meleron",

    "Chrollo Lucilfer",
    "Shalnark",
    "Shizuku",
    "Feitan",
    "Phinks",
    "Bonolenov",
    "Uvogin",
    "Nobunaga Hazama",
    "Machi Komacine",
    "Franklin",

    "Genthru",
    "Razor",

    "Illumi Zoldyck",
    "Zeno Zoldyck",
    "Kalluto Zoldyck",
    "Silva Zoldyck",

    "Gotoh",
]

interface CharData {
    name: string;
    image: string;
    "hue-rotate": string;
    nen?: 'Enhancer' | 'Transmuter' | 'Conjurer' | 'Specialist' | 'Emitter' | 'Manipulator';
}

// create enum with nen types to be used as indices for the colors array
export enum NenTypes {
    Enhancer = 0,
    Transmuter = 1,
    Conjurer = 2,
    Specialist = 3,
    Emitter = 4,
    Manipulator = 5,
}

export const nenColors = [
    "hsl(30, 100%, 45%)",
    "hsl(300, 100%, 45%)",
    "hsl(350, 100%, 45%)",
    "hsl(190, 100%, 45%)",
    "hsl(50, 100%, 40%)",
    "hsl(100, 100%, 45%)",
]

export const charsData = new Map<string, CharData>([
    ["Gon", {
        name: "Gon Freecss",
        image: "/src/assets/Chars/Gon.png",
        "hue-rotate": "180deg",
        nen: "Enhancer",
    }],
    ["Killua", {
        name: "Killua Zoldyck",
        image: "/src/assets/Chars/Killua.png",
        "hue-rotate": "290deg",
        nen: "Transmuter",
    }],
    ["Kurapika", {
        name: "Kurapika Kurta",
        image: "/src/assets/Chars/Kurapika.png",
        "hue-rotate": "80deg",
        nen: "Conjurer",
    }],
    ["Hisoka", {
        name: "Hisoka Morow",
        image: "/src/assets/Chars/Hisoka.png",
        "hue-rotate": "40deg",
        nen: "Transmuter",
    }],
])

// length of chars array = 39