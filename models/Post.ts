export default interface Post {
    "id":string,
    "date":string,
    "modified":string,
    "slug":string,
    "status":string,
    "type":string,
    "title":any,
    "content":any,
    "categories":Array<number>,
    "_embedded": any
  }