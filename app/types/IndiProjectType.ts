export type IndiProjectType = {
    data:{
        bannerImage:string;
        description:string;
        images:string[];
        location:string;
        name:string;
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