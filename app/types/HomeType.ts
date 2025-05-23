
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
