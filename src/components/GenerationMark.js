import { Mark } from 'tiptap'
import { toggleMark } from 'tiptap-commands'
import uuid from 'uuid'

export default class GenerationMark extends Mark {
    get name() {
        return 'generation'
    }

    get schema() {
        return {
            attrs: { 
                blockId: { default: uuid.v4() },
                suggestion: { default: "1" },
            },
            parseDOM: [
                { tag: 'span.generation-tag',
                getAttrs: dom => ({
                        blockId: dom.getAttribute('data-block-id') || uuid.v4(),
                        suggestion: dom.getAttribute('data-suggestion') || "1"
                    })
                },
            ],
            toDOM: mark => ['span',
                            {class: 'generation-tag',
                            'data-block-id': mark.attrs.blockId,
                            'data-suggestion': mark.attrs.suggestion },
                            0],
        }
    }

    commands({ type }) {
        return attrs => toggleMark(type, attrs);
    }
}
