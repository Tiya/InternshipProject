export class PostsModel{
 
    constructor(
       public _id: any,
        public postTitle: string,
        public postCategory: string,
        public postDescription: string,   
        public postDate: string, 
        public postAuthor: string,   
        public postImagePath: string,  
    ){}
 }