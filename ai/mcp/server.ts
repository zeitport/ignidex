import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { createId } from '#utils/createId.ts';

const server = new McpServer({
    name: 'ignidex-mcp',
    version: '0.1.0',
});

server.registerTool('createId', {
    description: 'Generates a unique identifier string (nanoid/#id)',
}, async () => {
    const id = createId();
    return {
        content: [
            {
                type: 'text',
                text: id,
            },
        ],
    };
});

async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error('Ignidex MCP server running on stdio');
}

main().catch(console.error);
