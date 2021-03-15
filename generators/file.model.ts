export interface IFile{
    id: number;
    isFile: string;
    nestedFiles: IFile[];
    name: string;
    extension: string;
    content: string;
}

export default IFile;