import { Mark } from 'tiptap'
import { toggleMark } from 'tiptap-commands'
import uuid from 'uuid'

export default class WaitingMark extends Mark {
    get name() {
        return 'waiting'
    }

    get schema() {
        return {
            attrs: { 
                blockId: { default: uuid.v4() }
            },
            parseDOM: [
                { tag: 'span.waiting-tag',
                getAttrs: dom => ({
                        blockId: dom.getAttribute('data-block-id') || uuid.v4()
                    })
                },
            ],
            toDOM: mark => ['span',
                            {class: 'waiting-tag',
                            'data-block-id': mark.attrs.blockId,
                            contenteditable: 'false' },
                            0],
        }
    }

    commands({ type }) {
        return attrs => toggleMark(type, attrs);
    }
}
