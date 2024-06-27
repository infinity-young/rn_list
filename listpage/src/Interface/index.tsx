export type HeadConfig = {
    id?: number;
};
export type HeadData = {
    headerUrl?: string;
    id: number;
    title: string;
    recommendation: string;
};
export type ListConfig = {
    start?: number;
    limit?: number;
    id?: number;
};
export type NameList = {
    title?: string;
};
export type ListData = {
    areaName?: string;
    distance?: string;
    frontImg?: string;
    honeyBombTags?: Array<NameList>;
    lowestPrice?: number;
    markNum?: string;
    poiId?: string;
    poiName?: string;
    recommendBooth?: string;
    score?: number;
    uri?: string;
};
export type ListType = {
    code?: number;
    data?: Array<ListData>;
    message?: string;
};
export type HeadType = {
    code?: number;
    data?: HeadData;
    message?: string;
};
export type PageProps = {
    head?: HeadType;
    list?: ListType;
    pageState?: number;
    moreList?: boolean;
    listState: ListState;
};
export enum PageState {
    LOADING = 0,
    FALIED = 1,
    SUCCESS = 2,
    EMPTY = 3
}
export type reInitProps = {
    head?: HeadConfig;
    list?: ListConfig;
};
export type stateType = {
    list?: ListType;
    head?: HeadType;
    pageState?: number;
    moreList: boolean;
};
export enum ListState {
    LOADING = 0,
    FALIED = 1,
    SUCCESS = 2,
    EMPTY = 3
}
