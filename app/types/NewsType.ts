export type NewsType = {
    data:{
        title:string;
        description:string;
        images:string[]
        date:Date;
        tags:string[]
        type:string;
        _id:string;
        altTag:string;
        slug:string;
    }[]
    
}