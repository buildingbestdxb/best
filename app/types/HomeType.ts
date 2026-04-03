
export type HomeType = {
    data:{
        pageHeading: string;
    about: {
        title: string;
        content: string;
        image: string;
        altTag: string;
        cards: {
            logo: string;
            title: string;
            number: string;
            logoAlt: string;
        }[];
        seals: {
            logo: string;
        }[];
    };
    bannerSection:{
        items:[{
            mainTitle:string,
            subTitle:string,
            video:string,
            poster:string,
            logo:string,
            logoAlt:string,
            image:string,
            imageAlt:string,
            style:string,
            cardText:string
        }]
    },
    sectorHeading: string;
    sectorDescription: string;
    qualityHeading: string;
    qualityDescription: string;
    mission: string;
    vision: string;
    location: string;
    contact: string;
    }[]
};
