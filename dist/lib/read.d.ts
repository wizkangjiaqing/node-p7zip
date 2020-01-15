export declare class Archive {
    path: string;
    type: string;
    physicalSize: number;
    headersSize: number;
    method: string;
    solid: string;
    blocks: number;
    directories: Entry[];
    files: Entry[];
    constructor();
}
export declare class Entry {
    attr: string;
    date: Date | null;
    name: string;
    size: number;
    compressed: number;
    constructor();
}
export declare function read(archive: string, switches?: string | string[]): Promise<Archive>;
