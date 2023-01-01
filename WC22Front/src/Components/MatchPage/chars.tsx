import gonImage from "../../assets/Chars/Gon.png";
import killuaImage from "../../assets/Chars/Killua.png";
import kurapikaImage from "../../assets/Chars/Kurapika.png";
import hisokaImage from "../../assets/Chars/Hisoka.png";
import neferpitouImage from "../../assets/Chars/Neferpitou.png";
import neteroImage from "../../assets/Chars/Netero.png";
import meruemImage from "../../assets/Chars/Meruem.png";
import gingImage from "../../assets/Chars/Ging.png";
import kiteImage from "../../assets/Chars/Kite.png";
import chrolloImage from "../../assets/Chars/Chrollo.png";
import feitanImage from "../../assets/Chars/Feitan.png";
import illumiImage from "../../assets/Chars/Illumi.png";
import leorioImage from "../../assets/Chars/Leorio.png";
import biscuitImage from "../../assets/Chars/Biscuit.png";
import menthuthuyoupiImage from "../../assets/Chars/Menthuthuyoupi.png";
import shaiapoufImage from "../../assets/Chars/Shaiapouf.png";


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
        image: gonImage,
        "hue-rotate": "180deg",
        nen: "Enhancer",
        hunterpedia: "https://hunterxhunter.fandom.com/wiki/Gon_Freecss",
    }],
    ["Killua", {
        name: "Killua Zoldyck",
        image: killuaImage,
        "hue-rotate": "290deg",
        nen: "Transmuter",
        hunterpedia: "https://hunterxhunter.fandom.com/wiki/Killua_Zoldyck",
    }],
    ["Kurapika", {
        name: "Kurapika Kurta",
        image: kurapikaImage,
        "hue-rotate": "80deg",
        nen: "Conjurer",
        hunterpedia: "https://hunterxhunter.fandom.com/wiki/Kurapika_Kurta",
    }],
    ["Hisoka", {
        name: "Hisoka Morow",
        image: hisokaImage,
        "hue-rotate": "40deg",
        nen: "Transmuter",
        hunterpedia: "https://hunterxhunter.fandom.com/wiki/Hisoka_Morow",
    }],
    ["Neferpitou", {
        name: "Neferpitou",
        image: neferpitouImage,
        "hue-rotate": "20deg",
        nen: "Specialist",
        hunterpedia: "https://hunterxhunter.fandom.com/wiki/Neferpitou",
    }],
    ["Isaac", {
        name: "Isaac Netero",
        image: neteroImage,
        "hue-rotate": "140deg",
        nen: "Enhancer",
        hunterpedia: "https://hunterxhunter.fandom.com/wiki/Isaac_Netero",
    }],
    ["King", {
        name: "King Meruem",
        image: meruemImage,
        "hue-rotate": "0deg",
        nen: "Emitter",
        hunterpedia: "https://hunterxhunter.fandom.com/wiki/Meruem",
    }],
    ["Ging", {
        name: "Ging Freecss",
        image: gingImage,
        "hue-rotate": "60deg",
        nen: "Specialist",
        hunterpedia: "https://hunterxhunter.fandom.com/wiki/Ging_Freecss",
    }],
    ["Kite", {
        name: "Kite",
        image: kiteImage,
        "hue-rotate": "340deg",
        nen: 'Conjurer',
        hunterpedia: "https://hunterxhunter.fandom.com/wiki/Kite",
    }],
    ["Chrollo", {
        name: "Chrollo Lucilfer",
        image: chrolloImage,
        "hue-rotate": "350deg",
        nen: "Specialist",
        hunterpedia: "https://hunterxhunter.fandom.com/wiki/Chrollo_Lucilfer",
    }],
    ["Feitan", {
        name: "Fetian Portor",
        image: feitanImage,
        "hue-rotate": "340deg",
        nen: "Transmuter",
        hunterpedia: "https://hunterxhunter.fandom.com/wiki/Feitan_Portor",
    }],
    ["Illumi", {
        name: "Illumi Zoldyck",
        image: illumiImage,
        "hue-rotate": "240deg",
        nen: "Manipulator",
        hunterpedia: "https://hunterxhunter.fandom.com/wiki/Illumi_Zoldyck",
    }],
    ["Leorio", {
        name: "Leorio Paradinight",
        image: leorioImage,
        "hue-rotate": "330deg",
        nen: "Emitter",
        hunterpedia: "https://hunterxhunter.fandom.com/wiki/Leorio_Paradinight",
    }],
    ["Biscuit", {
        name: "Biscuit Krueger",
        image: biscuitImage,
        "hue-rotate": "50deg",
        nen: "Transmuter",
        hunterpedia: "https://hunterxhunter.fandom.com/wiki/Biscuit_Krueger",
    }],
    ["Menthuthuyoupi", {
        name: "Menthuthuyoupi",
        image: menthuthuyoupiImage,
        "hue-rotate": "50deg",
        nen: "Transmuter",
        hunterpedia: "https://hunterxhunter.fandom.com/wiki/Menthuthuyoupi",
    }],
    ["Shaiapouf", {
        name: "Shaiapouf",
        image: shaiapoufImage,
        "hue-rotate": "10deg",
        nen: "Manipulator",
        hunterpedia: "https://hunterxhunter.fandom.com/wiki/Shaiapouf",
    }],
])

// length of chars array = 39