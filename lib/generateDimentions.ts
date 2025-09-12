const dimentions = {
    home:{
        banner:"1920x980",
        videoPoster:"1920x980",
        bannerIcon:"40x40",
        about_main:"500x460",
        about_seals:"40x40",
        about_card_logo:"40x40",
    },
    about:{
        banner:"1920x700",
        main:"500x460",
        seals:"40x40",
        card_logo:"40x40",   
        strength_and_vision_main:"500x460",
        strength_and_vision_clients:"100x140",
        history:"300x400",
    },
    news:{
        banner:"1920x700",
        cover:"300x180",
        gallery:"350x180"
    },
    projects:{
        banner:"1920x700",
        indi_project_banner:"1920x700",
        indi_project_thumbnail:"1500x900",
        indi_project_logo:"30x30",
        indi_project_gallery:"250x150"
    },
    sectors:{
        icon:"40x40",
        banner:"1920x700",
        image:"400x600",
    },
    contact:{
        banner:"1920x700",
    },
    careers:{
        banner:"1920x700",
    },
    accreditation:{
        banner:"1920x700",
        certificate_thumbnail:"1920x2700",
    }
}

type Dimensions = typeof dimentions;
type Pages = keyof Dimensions;
type SectionTypes<T extends Pages> = keyof Dimensions[T];

export const generateDimentions = <P extends Pages, T extends SectionTypes<P>>(page:P,type:T) => {
    return "Recommended dimentions : "+dimentions[page][type] + " | Size : < 5MB";
}
