import fs from 'fs/promises';
import path from 'path';


class FileWriter {

    private baseDir: string = path.dirname(path.dirname(__dirname));
    private currentDir: string = ""

    async setWriteDir(dirName: string): Promise<void> {
        const dirPath = `${this.baseDir}/${dirName}`
        await fs.mkdir(dirPath, { recursive: true });
        this.currentDir = dirPath
    }

    async writeFile(fName: string, content: string): Promise<void> {
        await fs.writeFile(`${this.currentDir}/${fName}`, content, 'utf8');
    }

    async writeImage(fName: string, buffer: Buffer): Promise<void> {
        await fs.writeFile(`${this.currentDir}/${fName}`, buffer);
        console.log(`Wrote [${this.currentDir}/${fName}`);
    }
    
}

export default new FileWriter()