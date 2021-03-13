export interface IFile{
    isFile: string;
    nestedFiles: string| IFile[];
    name: string;
    extension: string|boolean;
    content: string;
}

export default IFile;