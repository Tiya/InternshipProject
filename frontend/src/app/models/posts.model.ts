export class PostsModel{
 
    constructor(
       public _id: any,
        public postTitle: string,
        public postCategory: string,
        public postDescription: string,       
        public postImagePath: string,  
    ){}
 }