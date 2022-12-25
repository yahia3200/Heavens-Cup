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
}

export const charsData = new Map<string, CharData>([
    ["Gon", {
        name: "Gon Freecss",
        image: "/src/assets/Chars/Gon.png",
        "hue-rotate": "180deg",
    }],
    ["Killua", {
        name: "Killua Zoldyck",
        image: "/src/assets/Chars/Killua.png",
        "hue-rotate": "320deg",
    }],
    ["Kurapika", {
        name: "Kurapika Kurta",
        image: "/src/assets/Chars/Kurapika.png",
        "hue-rotate": "80deg",
    }],
    ["Leorio", {
        name: "Leorio Paradinight",
        image: "/src/assets/Chars/Leorio.png",
        "hue-rotate": "0deg",
    }],
    ["Hisoka", {
        name: "Hisoka Morow",
        image: "/src/assets/Chars/Hisoka.png",
        "hue-rotate": "40deg",
    }],
])

// length of chars array = 39