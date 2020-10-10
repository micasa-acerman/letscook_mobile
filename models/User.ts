export default interface User {
    'id': number,
    'name':string,
    'link': string,
    'description':string,
    'first_name':string,
    'last_name':string,
    'email':string,
    'nickname':string,
    'slug':string,
    'roles':Array<string>,
    'avatar_urls':{
        '24':string,
        '48':string,
        '96':string
    },
    'simple_local_avatar':{
        'media_id':number,
        'full':string,
        '96':string,
        '64':string,
        '26':string,
        '32':string
    }
}