export default interface Dialog {
    user_id:string,
    display_name:string,
    last_message_date:string,
    avatar:{
        full:string,
        '96':string,
        media_id:number
    },
    message:string
}