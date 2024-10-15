export enum SizeName {
    SM = 'SM',
    MD = 'MD',
    LG = 'LG',
    FULL = 'FULL',
}
export type SizeType = {
    [key in SizeName]?: string;
};


export enum SpaceBetweenName {
    TITLE_CONTENT1 = 'TITLE_CONTENT1', // say h1 and p
    TITLE_CONTENT2 = 'TITLE_CONTENT2', // say h2 and p
    TITLE_CONTENT3 = 'TITLE_CONTENT3', // say h3 and p
    TITLE_CONTENT4 = 'TITLE_CONTENT4', // say h4 and p
    SECTIONS = 'SECTIONS',
}
export type SpaceBetweenType = {
    [key in SpaceBetweenName]?: string;
};

