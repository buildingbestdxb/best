export type IndiProjectType = {
    data:{
        bannerImage:string;
        bannerAlt:string;
        description:string;
        images:string[];
        location:string;
        name:string;
        status:string;
        specifications:{
            name:string;
            value:string;
            logo:string;
            _id:string;
        }[]
        type:string;
        _id:string;
    }
    
}