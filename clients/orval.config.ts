import {defineConfig} from 'orval';

export default defineConfig({
    ghCharities: {
        input: '../backend/swagger/swagger.json',
        output: {
            target: './generated/client.ts',
            schemas: './generated/model',
            client: 'axios',
            mode: 'tags-split',
            override: {
                mutator: {
                    path: './custom-instance.ts',
                    name: 'customInstance',
                }
            }
        }
    },
});
