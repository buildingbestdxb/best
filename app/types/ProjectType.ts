export type ProjectType = {
    data:{
        description:string;
        thumbnail:string;
        slug:string;
        images:string[];
        location:string;
        name:string;
        specifications:{
            name:string;
            value:string;
            _id:string;
        }[]
        type:string;
        status:string;
        _id:string;
    }[]
}