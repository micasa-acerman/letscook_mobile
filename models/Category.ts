export default interface Category{
  id: number,
  count: number,
  description: string,
  link: string,
  name: string,
  slug: string,
  taxonomy: string,
  parent: number,
  category_image?: {
      id:number,
      title: string,
      filename:string,
      filesize: number,
      url:string,
      link:string,
      alt:string,
      author:string
      date:string,
      modified:string,
      type:string,
      mime_type:string,
      icon:string,
      width:number,
      height:number,
      sizes:{
          thumbnail:string,
          medium:string,
          medium_large:string,
          large:string
      }
  }
}