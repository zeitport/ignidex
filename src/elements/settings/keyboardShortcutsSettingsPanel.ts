import {html, LitElement, css} from 'lit';
import {customElement} from 'lit/decorators.js';
import {getKeyboardShortcuts} from '../../keyboard/keyboardShortcuts.ts';
import './settingsSection.ts';
import './settingsHeader.ts';

@customElement('cc-keyboard-shortcuts-settings-panel')
export class KeyboardShortcutsSettingsPanel extends LitElement {
    static styles = css`
        :host {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
            user-select: none;
        }

        .shortcuts-list {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
        }

        .shortcut-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.5rem 0;
        }

        .shortcut-row:last-child {
            border-bottom: none;
        }

        .shortcut-description {
            flex: 1;
        }

        .shortcut-keys {
            display: flex;
            gap: 0.25rem;
            font-family: monospace;
        }

        .key {
            background-color: var(--input-bg);
            border: 1px solid var(--input-border-color);
            border-radius: 4px;
            padding: 0.25rem 0.5rem;
            font-size: 0.85rem;
            min-width: 1.5rem;
            text-align: center;
        }

        .key-separator {
            display: flex;
            align-items: center;
            color: var(--text-secondary);
            font-size: 0.75rem;
        }
    `;

    render() {
        const shortcuts = getKeyboardShortcuts();

        return html`
            <cc-settings-header>Keyboard Shortcuts</cc-settings-header>

            <cc-settings-section>
                <span slot="label">Available Shortcuts</span>
                <span slot="description">Overview of all keyboard shortcuts.</span>
                <div class="shortcuts-list">
                    ${shortcuts.map(shortcut => html`
                        <div class="shortcut-row">
                            <span class="shortcut-description">${shortcut.description}</span>
                            <div class="shortcut-keys">
                                ${this.renderKeySequence(shortcut.keySequence)}
                            </div>
                        </div>
                    `)}
                </div>
            </cc-settings-section>
        `;
    }

    private renderKeySequence(sequence: string[]) {
        return sequence.map((combo, index) => {
            const parts = combo.split('+').map(segment => segment.trim());
            return html`
                ${index > 0 ? html`<span class="key-separator">,</span>` : ''}
                ${parts.map((part, partIndex) => html`
                    ${partIndex > 0 ? html`<span class="key-separator">+</span>` : ''}
                    <span class="key">${this.formatKeyName(part)}</span>
                `)}
            `;
        });
    }

    private formatKeyName(key: string): string {
        const keyMap: Record<string, string> = {
            'CTRL': 'Ctrl',
            'ALT': 'Alt',
            'SHIFT': 'Shift',
            'META': 'Meta',
            'ARROWLEFT': '\u2190',
            'ARROWRIGHT': '\u2192',
            'ARROWUP': '\u2191',
            'ARROWDOWN': '\u2193',
            'ESCAPE': 'Esc'
        };
        const upperKey = key.toUpperCase();
        return keyMap[upperKey] ?? key;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'cc-keyboard-shortcuts-settings-panel': KeyboardShortcutsSettingsPanel;
    }
}
