export interface Page {
    id: number;
    title: string;
    headers: string[];
    headerIds: string[];
    content: string;
    link: string;
    breadCrumb: string[];
    category: string;
}