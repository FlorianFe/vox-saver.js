declare const unparseVoxChunk: (id: string, data: unknown) => {
    numColorNames: number;
    colorNames: string[];
} | {
    renderAttributes: any;
    cameraId?: undefined;
    cameraAttributes?: undefined;
    size?: undefined;
    indexAssociations?: undefined;
} | {
    cameraId: any;
    cameraAttributes: any;
    renderAttributes?: undefined;
    size?: undefined;
    indexAssociations?: undefined;
} | {
    size: any;
    indexAssociations: any;
    renderAttributes?: undefined;
    cameraId?: undefined;
    cameraAttributes?: undefined;
} | {
    renderAttributes?: undefined;
    cameraId?: undefined;
    cameraAttributes?: undefined;
    size?: undefined;
    indexAssociations?: undefined;
};
export = unparseVoxChunk;
