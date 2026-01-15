import type {TemplateToken} from './templateToken.ts';

export function parseHintTemplate(text: string): TemplateToken[] {
    const tokens: TemplateToken[] = [];
    let textBuffer = '';
    let i = 0;

    while (i < text.length) {
        const char = text[i];

        if (char === ';') {
            if (textBuffer) {
                tokens.push({type: 'text', value: textBuffer});
                textBuffer = '';
            }
            tokens.push({type: 'separator', value: ''});
            i++;
        }
        else if (char === '+') {
            if (textBuffer) {
                tokens.push({type: 'text', value: textBuffer});
                textBuffer = '';
            }
            tokens.push({type: 'plus', value: '+'});
            i++;
        } else if (char === '[') {
            const closingIndex = text.indexOf(']', i);
            if (closingIndex !== -1) {
                if (textBuffer) {
                    tokens.push({type: 'text', value: textBuffer});
                    textBuffer = '';
                }
                const inner = text.slice(i + 1, closingIndex);

                if (inner === 'LMB' || inner === 'RMB' || inner === 'MMB' || inner === 'LOCK') {
                    tokens.push({type: 'icon', value: inner});
                } else {
                    tokens.push({type: 'key', value: inner});
                }
                i = closingIndex + 1;
            } else {
                textBuffer += char;
                i++;
            }
        } else {
            textBuffer += char;
            i++;
        }
    }

    if (textBuffer) {
        tokens.push({type: 'text', value: textBuffer});
    }

    return tokens;
}
