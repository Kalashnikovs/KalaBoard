import { Response } from 'express';

export class ViewManager {
    private static variables: Map<string, object> = new Map();
    private static viewconf: Map<string, string> = new Map();

    static set(key: string, value: string): void {
        this.viewconf.set(key, value);
    }

    static unset(key: string): void {
        this.viewconf.delete(key);
    }

    static get(key: string): string {
        const val = this.viewconf.get(key);
        if (!val) throw new Error('ViewManager: ' + key + ' NOT FOUND');
        return val;
    }

    static setVariables(key: string, value: object) {
        this.variables.set(key, value);
    }

    static getVariables(key: string) {
        const val = this.variables.get(key);
        if (!val) throw new Error('ViewManager: ' + key + ' NOT FOUND');
        return val;
    }

    static render(res: Response, path: string): void {
        const localVariables = this.getVariables('global');
        Object.assign(localVariables, this.getVariables('routes'));
        Object.assign(localVariables, this.getVariables(res.req.originalUrl));
        res.render(this.get('theme') + '/' + path, localVariables);
    }
}
