/*
 * Chris Creason - IMH Test Project
 * 2/8/22
 * Data Class for Wordpress Post
*/
export interface WpPost {
    id: number,
    slug: string,
    status: string,
    title: string,
    dateCreated: any,
    renderedContent: string,
    link: string
}
