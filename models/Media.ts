export default interface Media {
    id:number,
    date:string,
    date_gmt:string,
    slug:string,
    statush:string,
    type:string,
    author:number,
    description: {
        "raw":string,
        "renderer":string,
    },
    meta:string,
    caption:{
        "raw":string,
        "renderer":string
    },
    alt_text:string,
    media_type:string,
    mime_type:string,
    media_details:{
        width: number,
        height: number,
        file:string
    }
}