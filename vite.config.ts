import {defineConfig} from 'vite';

export default defineConfig({
    resolve: {
        alias: {
            '@': '/src'
        }
    },
    plugins: [],
    server: {
        host: false,
        port: 3000,
        hmr: {
            host: 'localhost'
        }
    }
});
