export default interface Recipe {
    name:string,
    image_uri:string,
    ingredients: Array<string>,
    directions: Array<string>,
    category_id: number|string
}