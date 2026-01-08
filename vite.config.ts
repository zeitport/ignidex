import {defineConfig} from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {alias: {'@': '/src'}},
    plugins: [],
    server: {
        host: true,
        port: 3000,
        open: '/?load=http://localhost:3000/store/test.json'
    }
});
