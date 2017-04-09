declare module "hogan.js" {
    export interface Template {
        render(data: object): string;
    }
    export function compile(templateString: string): Template;
}