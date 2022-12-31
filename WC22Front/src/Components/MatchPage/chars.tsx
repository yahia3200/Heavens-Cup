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
    nen: 'Enhancer' | 'Transmuter' | 'Conjurer' | 'Specialist' | 'Emitter' | 'Manipulator';
    hunterpedia: string;
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
        hunterpedia: "https://hunterxhunter.fandom.com/wiki/Gon_Freecss",
    }],
    ["Killua", {
        name: "Killua Zoldyck",
        image: "/src/assets/Chars/Killua.png",
        "hue-rotate": "290deg",
        nen: "Transmuter",
        hunterpedia: "https://hunterxhunter.fandom.com/wiki/Killua_Zoldyck",
    }],
    ["Kurapika", {
        name: "Kurapika Kurta",
        image: "/src/assets/Chars/Kurapika.png",
        "hue-rotate": "80deg",
        nen: "Conjurer",
        hunterpedia: "https://hunterxhunter.fandom.com/wiki/Kurapika_Kurta",
    }],
    ["Hisoka", {
        name: "Hisoka Morow",
        image: "/src/assets/Chars/Hisoka.png",
        "hue-rotate": "40deg",
        nen: "Transmuter",
        hunterpedia: "https://hunterxhunter.fandom.com/wiki/Hisoka_Morow",
    }],
    ["Neferpitou", {
        name: "Neferpitou",
        image: "/src/assets/Chars/Neferpitou.png",
        "hue-rotate": "20deg",
        nen: "Specialist",
        hunterpedia: "https://hunterxhunter.fandom.com/wiki/Neferpitou",
    }],
    ["Isaac", {
        name: "Isaac Netero",
        image: "/src/assets/Chars/Netero.png",
        "hue-rotate": "140deg",
        nen: "Enhancer",
        hunterpedia: "https://hunterxhunter.fandom.com/wiki/Isaac_Netero",
    }],
    ["King", {
        name: "King Meruem",
        image: "/src/assets/Chars/Meruem.png",
        "hue-rotate": "0deg",
        nen: "Emitter",
        hunterpedia: "https://hunterxhunter.fandom.com/wiki/Meruem",
    }],
    ["Ging", {
        name: "Ging Freecss",
        image: "/src/assets/Chars/Ging.png",
        "hue-rotate": "60deg",
        nen: "Specialist",
        hunterpedia: "https://hunterxhunter.fandom.com/wiki/Ging_Freecss",
    }],
    ["Kite", {
        name: "Kite",
        image: "/src/assets/Chars/Kite.png",
        "hue-rotate": "340deg",
        nen: 'Conjurer',
        hunterpedia: "https://hunterxhunter.fandom.com/wiki/Kite",
    }],
    ["Chrollo", {
        name: "Chrollo Lucilfer",
        image: "/src/assets/Chars/Chrollo.png",
        "hue-rotate": "350deg",
        nen: "Specialist",
        hunterpedia: "https://hunterxhunter.fandom.com/wiki/Chrollo_Lucilfer",
    }],
    ["Feitan", {
        name: "Fetian Portor",
        image: "/src/assets/Chars/Feitan.png",
        "hue-rotate": "340deg",
        nen: "Transmuter",
        hunterpedia: "https://hunterxhunter.fandom.com/wiki/Feitan_Portor",
    }],
    ["Illumi", {
        name: "Illumi Zoldyck",
        image: "/src/assets/Chars/Illumi.png",
        "hue-rotate": "240deg",
        nen: "Manipulator",
        hunterpedia: "https://hunterxhunter.fandom.com/wiki/Illumi_Zoldyck",
    }],
    ["Leorio", {
        name: "Leorio Paradinight",
        image: "/src/assets/Chars/Leorio.png",
        "hue-rotate": "330deg",
        nen: "Emitter",
        hunterpedia: "https://hunterxhunter.fandom.com/wiki/Leorio_Paradinight",
    }],
    ["Biscuit", {
        name: "Biscuit Krueger",
        image: "/src/assets/Chars/Biscuit.png",
        "hue-rotate": "50deg",
        nen: "Transmuter",
        hunterpedia: "https://hunterxhunter.fandom.com/wiki/Biscuit_Krueger",
    }],
    ["Menthuthuyoupi", {
        name: "Menthuthuyoupi",
        image: "/src/assets/Chars/Menthuthuyoupi.png",
        "hue-rotate": "50deg",
        nen: "Transmuter",
        hunterpedia: "https://hunterxhunter.fandom.com/wiki/Menthuthuyoupi",
    }],
    ["Shaiapouf", {
        name: "Shaiapouf",
        image: "/src/assets/Chars/Shaiapouf.png",
        "hue-rotate": "10deg",
        nen: "Manipulator",
        hunterpedia: "https://hunterxhunter.fandom.com/wiki/Shaiapouf",
    }],
])

// length of chars array = 39