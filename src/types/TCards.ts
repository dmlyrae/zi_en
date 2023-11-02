export type TExample = {
    sentence: string; 
    translate: string;
}
export type TCard = {
    id?: string;
    source: string;
    link?: string;
    translate: string;
    examples?: Array<TExample>;
    image?: string;
    note?: string;
    learnLevel?: number;
    tags?: string[];
    variants?: string[];
}

export type TCardJson = {
    menuId: number;
    items: TCard[];
}