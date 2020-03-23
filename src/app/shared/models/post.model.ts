export interface Post {
    uid_post?: string;
    description?: string;
    likes?: number;
    comments?: Array<any>;
    created_at?: Date;
    user?: Object;
}