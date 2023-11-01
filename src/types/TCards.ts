export type TCard = {
    id?: string;
    source: string;
    translate: string;
    examples?: string[];
    learnLevel?: number;
}

export type TCardJson = {
    menuId: number;
    items: TCard[];
}