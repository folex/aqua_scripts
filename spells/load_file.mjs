import { existsSync, readFileSync } from 'fs';

export function plugins() {
    return {
        file: {
            load: (path) => {
                const data = readFileSync(path);
                return data.toString()
            }
        }
    };
}
