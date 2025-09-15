export type LeaderShipType = {
    metaTitle: string;
    metaDescription: string;
    bannerImage: string;
    bannerImageAlt: string;
    pageTitle: string;
    messageSection:{
        items:{
            title:string;
            image:string;
            imageAlt:string;
            name:string;
            designation:string;
            message?:string;
        }[]
    }
}
