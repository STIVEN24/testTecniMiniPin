export interface Post {
    id?: string;
    description?: string;
    likes?: number;
    comments?: Array<any>;
    created_at?: Date;
    user?: Object;
}