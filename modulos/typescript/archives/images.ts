const Archives=require('./archives').default
class Images extends Archives {

    public constructor(name: string, content: string = '', path: string) {
        super(`${name}.png`, content, path);
        const contentwithoutPrefix = content.split(",")[1]
        this.content = Buffer.from(contentwithoutPrefix, 'base64');
    }

    public toBase64(): string {
        const prefix = 'data:image/png;base64,';
        return prefix + this.content.toString('base64');
    }
    
}

export default Images;