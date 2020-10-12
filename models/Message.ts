
export default interface Message {
    id:string,
    sender_id:string,
    receiver_id:string,
    message:string,
    created?:string   
}