import React from "react";

interface GameBannerProps {
    title: string;
    bannerURL: string;
    adsCounter: number;
}

const GameBanner = (props: GameBannerProps) => {

    return (
        <a href="" className="relative rounded-lg overflow-hidden">
            <img src={props.bannerURL} alt=""></img>
            <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0">
                <strong className="font-bold text-white block">{props.title}</strong>
                <span className="text-zinc-300 text-sm block mt-1">{props.adsCounter} Anuncios</span>
            </div>
        </a>
    )
}
export default GameBanner;