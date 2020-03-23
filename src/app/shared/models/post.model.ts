export interface Post {
    description?: string;
    likes?: number;
    comments?: Array<any>;
    created_at?: Date;
    user?: Object;
}