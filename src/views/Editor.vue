<template>
    <v-container class="background" fluid>
        <!-- Green bubble appearing above selected words to add them as an entity -->
        <editor-menu-bubble :editor="editor" :keep-in-bounds='false' v-slot="{ commands, isActive, menu }">
            <div
                class="menububble"
                :class="{ 'is-active': menu.isActive && canAddEntity }"
                :style="`left: ${menu.left}px; bottom: ${menu.bottom}px;`">

                <v-btn text class="menububble__button"
                color='white'
                @click="addEntity">
                <v-icon color='green'>mdi-plus-circle</v-icon>
                </v-btn>
            </div>
        </editor-menu-bubble>

        <!-- Editor main toolbar, for text formatting and AI buttons -->
        <v-row>
            <v-col cols=2>
            </v-col>
            <v-col cols=8 class="toolbar">

                <!-- Text formatting -->
                <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
                    <div>
                        <v-btn text icon class="btn"
                        :class="{ 'is-active': isActive.heading({ level: 1 }) }"
                        @click="commands.heading({level: 1})">
                            <b>H1</b>
                        </v-btn>

                        <v-btn text icon class="btn"
                        :class="{ 'is-active': isActive.bold() }"
                        @click="commands.bold">
                            <v-icon>mdi-format-bold</v-icon>
                        </v-btn>

                        <v-btn text icon class="btn"
                        :class="{ 'is-active': isActive.underline() }"
                        @click="commands.underline">
                            <v-icon>mdi-format-underline</v-icon>
                        </v-btn>
                    </div>
                </editor-menu-bar>

                <!-- Generate button -->
                <div class='ai-btns-container'>
                    <!-- "Empty" message -->
                    <div v-if='canGenerate == 0' class="ai-msg">Select some text to generate from it.</div>

                    <!-- "Too short" message -->
                    <div v-if='canGenerate == 1' class="ai-msg">Selected text is too short for generation.</div>

                    <!-- "Too long" message -->
                    <div v-if='canGenerate == 3' class="ai-msg">Selected text is too long for generation.</div>

                    <!-- "Generating" message -->
                    <div v-if='canGenerate == 4' class="ai-msg">Generation ongoing...</div>

                    <v-btn class="ai-btn" 
                    :loading='aiLoading'
                    :disabled='canGenerate != 2'
                    @click="generateText">
                        Generate
                    </v-btn>
                </div>

                <!-- Size selection -->
                <div class='size-btns-container'>
                    <v-btn-toggle mandatory class='size-toggle'>
                        <v-btn text class='size-toggle-btn'
                        @click="selectedSize='SMALL'">
                            SMALL
                        </v-btn>

                        <v-btn text class='size-toggle-btn'
                        @click="selectedSize='MEDIUM'">
                            MEDIUM
                        </v-btn>

                        <v-btn text class='size-toggle-btn'
                        @click="selectedSize='LARGE'">
                            LARGE
                        </v-btn>
                    </v-btn-toggle>
                </div>

                <!-- Genre selection -->
                <v-select
                :items="genres"
                :value="selectedGenre"
                label="Genre"
                class="genre-selection-dropdown"
                dense
                >
                </v-select>
            </v-col>
        </v-row>

        <v-row class="text-area-row">

            <!-- Entities table -->
            <v-col cols=2 class='entities-table-container'>

                <!-- Entities category buttons -->
                <v-btn-toggle mandatory class='entities-categ-toolbar'>
                    <v-btn text class='entities-categ-btn'
                    @click="ent_categ='PER'">
                        <v-icon>mdi-account</v-icon>
                    </v-btn>

                    <v-btn text class='entities-categ-btn'
                    @click="ent_categ='LOC'">
                        <v-icon>mdi-map-marker</v-icon>
                    </v-btn>

                    <v-btn text class='entities-categ-btn'
                    @click="ent_categ='ORG'">
                        <v-icon>mdi-account-group</v-icon>
                    </v-btn>

                    <v-btn text class='entities-categ-btn'
                    @click="ent_categ='MISC'">
                        <v-icon>mdi-help</v-icon>
                    </v-btn>
                </v-btn-toggle>

                <v-divider></v-divider>

                <!-- Entities list -->
                <div class="mx-auto entities-table" max-width="400" tile
                v-bar="{preventParentScroll: true, scrollThrottle: 30}">
                    <div>

                        <!-- No entity message -->
                        <div v-if='entitiesToDisplay.length == 0' class='no-entities-msg'>
                            Start writing to see<br/>entities appear here!
                        </div>

                        <!-- List, if some entities are there -->
                        <div v-for="entity in entitiesToDisplay" :key='entity' class='entity-entry'>

                            <!-- Entity entry -->
                            <v-btn text class='entity-btn'
                            v-text="entity.split(':', 2)[1]"
                            v-bind:class="{selected: isSelected(entity)}"
                            @click="toggleEntity(entity)"></v-btn>

                            <!-- Remove button -->
                            <v-btn class='entity-remove-btn' text color='white'
                            @click="removeEntity(entity)"><v-icon>mdi-minus-circle-outline</v-icon></v-btn>
                        </div>
                    </div>
                </div>

                <v-divider></v-divider>

                <!-- Selection buttons -->
                <div class='entities-toolbar'>

                    <!-- Add button -->
                    <v-btn text class='entities-toolbar-btn'
                    @click='addEntity'>
                        <v-icon :color='canAddEntity ? "green" : "grey"'>
                            mdi-plus-thick</v-icon>
                    </v-btn>

                    <!-- Unselect button -->
                    <v-btn text class='entities-toolbar-btn'
                    @click='unselectAll'>
                        <v-icon :color='selected.length == 0 ? "grey" : "black"'>
                            mdi-collapse-all-outline</v-icon>
                    </v-btn>

                    <!-- Reset button -->
                    <v-btn text class='entities-toolbar-btn'
                    @click='resetRemovedAdded'>
                        <v-icon :color='added_entities.length + removed_entities.length == 0 ? "grey" : "red"'>
                            mdi-undo-variant</v-icon>
                    </v-btn>
                </div>
            </v-col>

            <!-- Main text area -->
            <v-col cols=8 class="text-area"
            v-bar="{preventParentScroll: true, scrollThrottle: 30}">
                <div>
                    <editor-content class="editor-box" :editor="editor"/>
                    <v-divider></v-divider>
                </div>
            </v-col>

            <!-- Suggestions table -->
            <v-col cols=2 class='generations-table-container'>
                <div class="mx-auto generations-table" max-width="400" tile
                v-bar="{preventParentScroll: true, scrollThrottle: 30}">
                    <div>
                        <!-- No suggestions message -->
                        <div v-if='generationsToDisplay.length == 0' class='no-generations-msg'>
                            Text suggestions will<br/>appear there.
                        </div>

                        <!-- List, if some entities are there -->
                        <div v-for="generation in generationsToDisplay" :key='generation.begin' class='generation-entry'>
                            
                            <div class='generation-first-row'>
                                <!-- Entity entry -->
                                <v-btn text
                                :class='generation.active ? "generation-btn-active" : "generation-btn"'
                                v-text="generation.current"
                                @click="selectGeneration(generation)"></v-btn>

                                <!-- Validate button -->
                                <v-btn v-if='generation.active' class='generation-validate-btn' text color='white'
                                @click="validateGeneration(generation)"><v-icon>mdi-check-circle-outline</v-icon></v-btn>
                            </div>

                            <div v-if='generation.active' class='generation-items-container'>
                                <!-- Entities category buttons -->
                                <v-btn-toggle mandatory class='generation-items-toggle'
                                v-model="generation.active_suggestion">
                                    <v-btn v-for="(suggestion, index) in generation.suggestions" :key='index' 
                                    text class='suggestion-item'
                                    @click="selectSuggestion(generation, index)"
                                    v-text='index == 0 ? "R" : index.toString()'>
                                    </v-btn>
                                </v-btn-toggle>
                            </div>

                            <v-divider></v-divider>
                        </div>
                    </div>
                </div>
            </v-col>
        </v-row>

        <!-- Error notification: unable to connect to server -->
        <v-snackbar v-model="snackbar" color='red lighten-1'>
            Unable to connect to server...
            <v-btn color="white" text @click="snackbar = false">Close</v-btn>
        </v-snackbar>

        <!-- Error notification: text too long -->
        <v-snackbar v-model="snackbarLimit" color='red lighten-1'>
            Sorry but your text is above the character limit to be processed by our servers...
            <v-btn color="white" text @click="snackbarLimit = false">Close</v-btn>
        </v-snackbar>
    </v-container>
</template>



<script>
// Imports
import { Editor,
        EditorContent,
        EditorMenuBar,
        EditorMenuBubble,
        TextSelection
        } from 'tiptap';
import { Heading, 
        Bold, 
        Underline,
        History
        } from 'tiptap-extensions';
import GenerationMark from './../components/GenerationMark';
import WaitingMark from './../components/WaitingMark';
import config from './../config';
import axios from 'axios';
import uuid from 'uuid';

// Scripted elements
export default {
    components: {
        EditorContent,
        EditorMenuBar,
        EditorMenuBubble
    },

    // Properties
    data() {
        return {
            editor: new Editor({
                content: localStorage["ai_text_editor_content"] ||
                    `<p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p>`,
                extensions:[
                    new Heading({levels: [1,2,3]}),
                    new Bold(),
                    new Underline(),
                    new History(),
                    new GenerationMark(),
                    new WaitingMark()
                ],
                onInit: () => {
                    setTimeout(this.extractEntities, 100);
                },
                onUpdate: () => {
                    this.updateGenerations();
                    this.saveEditorContent();
                    this.saveGenerations();
                    this.textHasChanged = true;
                },
                onPaste: () => {
                    setTimeout(this.extractEntities, 100);
                }
            }),
            entities: [],
            ent_categ: 'PER',
            selected: [],
            selectedSize: 'SMALL',
            genres: ['adventure', 'biography/history', 'children', 'fantasy', 'romance', 'science-fiction', 'thriller'],
            selectedGenre: '',
            removed_entities: [],
            added_entities: [],
            generations: [],
            aiLoading: false,
            generationOngoing: false,
            textHasChanged: false,
            snackbar: false,
            snackbarLimit: false,
            backend: config.BACKEND,
            generation_ip: "",
            ner_ip: ""
        }
    },

    // Dynamic values for HTML template
    computed: {
        // List of entities to display (detected + added - removed)
        entitiesToDisplay() {
            return this.entities.concat(this.added_entities)
                                .filter(elt => this.ent_categ == elt.split(':')[0])
                                .filter(elt => !this.removed_entities.includes(elt))
                                .sort((a, b) => a.toLowerCase() < b.toLowerCase() ? -1 : 1);
        },

        // List of generations to display (block not deleted or validated)
        generationsToDisplay() {
            return this.generations.filter(gen => {
                let id = gen.id;
                let found = false;
                this.editor.state.doc.descendants(node => {
                    for (var i = 0; i < node.marks.length; i++) {
                        const mark = node.marks[i];
                        if (mark.type && mark.type.name === 'generation') {
                            const { blockId } = mark.attrs;
                            if (blockId && blockId === id) {
                                found = true;
                            }
                        }
                    }
                })
                return found;
            }).sort((a, b) => a.begin < b.begin ? -1 : 1);
        },

        // Can currently selected text be added as an entity?
        canAddEntity() {
            const { selection, state } = this.editor;
            const { from, to } = selection;
            const text = state.doc.textBetween(from, to, ' ').trim();
            return text != '' && text.length < 20;
        },

        // Can currently selected text be used to generate a paragraph?
        // 0 - empty
        // 1 - too small
        // 2 - can generate
        // 3 - too big
        // 4 - generation ongoing
        canGenerate() {
            if (this.generationOngoing) {
                return 4;
            }

            const { selection, state } = this.editor;
            const { from, to } = selection;
            const text = state.doc.textBetween(from, to, ' ').trim();

            if (text.length == 0) {
                return 0;
            } else if (text.length < 50) {
                return 1;
            } else if (text.length <= 200) {
                return 2;
            } else {
                return 3;
            }
        }
    },

    // Initialization
    created() {
        this.selectedGenre = this.genres[0];

        setInterval(() => {
            if (this.textHasChanged) {
                this.textHasChanged = false;
                this.extractEntities();
            }
        }, 5*1000);

        setInterval(() => {
            this.updateBackendIps();
        }, 20*1000);
        this.updateBackendIps();

        let str_rem = localStorage["ai_text_removed_entities"];
        if (str_rem != undefined)
            this.removed_entities = JSON.parse(str_rem);
        let str_add = localStorage["ai_text_added_entities"];
        if (str_add != undefined)
            this.added_entities = JSON.parse(str_add);
        let str_gen = localStorage["ai_text_generations"];
        if (str_gen != undefined)
            this.generations = JSON.parse(str_gen);

        this.generations = this.generations.filter(gen => {
            let id = gen.id;
            let found = false;
            this.editor.state.doc.descendants(node => {
                for (var i = 0; i < node.marks.length; i++) {
                    const mark = node.marks[i];
                    if (mark.type && mark.type.name === 'generation') {
                        const { blockId } = mark.attrs;
                        if (blockId && blockId === id) {
                            found = true;
                        }
                    }
                }
            })
            return found;
        })
    },

    // Methods
    methods:{

        // Save editor content to browser's local storage
        saveEditorContent() {
            localStorage["ai_text_editor_content"] = this.editor.getHTML()
        },

        // Asks the main backend for the IPs of the generation and NER backends
        updateBackendIps() {
            let me = this;

            let params = {
                    order: 'ipconfig'
            };

            axios({
                method: 'post',
                url: this.backend,
                timeout: 5 * 1000,
                data: params,
            })
            .then(function (response) {
                // Response received: success
                let ips = response.data.split('|');
                me.generation_ip = ips[0];
                me.ner_ip = ips[1];
            })
            .catch(function (error) {
                // No response received: error
                console.log(error);
                me.snackbar = true;
            });
        },

        // Launches text generation on server
        generateText() {
            if (this.generation_ip == "") {
                this.snackbar = true;
                return;
            }

            if (this.editor.state.doc.textContent.length > config.MAX_CHARS) {
                this.snackbarLimit = true;
                return;
            }

            this.aiLoading = true;
            this.generationOngoing = true;
            const { from, to } = this.editor.selection;

            // Cleaning entity names
            let persons = [];
            let locations = [];
            let organisations = [];
            let misc = [];
            for (var i = 0; i < this.selected.length; i++) {
                let tag = this.selected[i].split(':', 2)[0];
                let ent = this.selected[i].split(':', 2)[0];
                if (tag == 'PER') {
                    persons.push(ent);
                } else if (tag == 'LOC') {
                    locations.push(ent);
                } else if (tag == 'ORG') {
                    organisations.push(ent);
                } else {
                    misc.push(ent);
                }
            }

            let me = this;
            let sp2_txt = this.editor.state.doc.textBetween(from, to, ' ');

            let params = {
                    order: 'generate',
                    p1: this.editor.state.doc.textBetween(Math.max(0, from - 2000), from, ' ').trim(),
                    sp2: sp2_txt.trim(),
                    p3: this.editor.state.doc.textBetween(to, Math.min(to + 2000, this.editor.state.doc.nodeSize - 2), ' ').trim(),
                    persons: persons,
                    locations: locations,
                    organisations: organisations,
                    misc: misc,
                    genre: this.selectedGenre,
                    size: '[' + this.selectedSize.substring(0, 1) + ']'
            };

            let generation_id = uuid.v4();
            let generation = {
                begin: from,
                id: generation_id,
                current: sp2_txt,
                suggestions: [sp2_txt],
                active: false,
                active_suggestion: 0
            }
            this.generations.push(generation);
            this.saveGenerations();

            let tr = this.editor.state.tr;
            tr.addMark(from, to, this.editor.state.schema.mark('waiting',
                {blockId: generation_id}));
            this.editor.dispatchTransaction(tr);

            axios({
                method: 'post',
                url: this.generation_ip,
                timeout: 20 * 1000,
                data: params,
            })
            .then(function (response) {
                // Response received: success

                let texts = [];
                texts.push(sp2_txt);
                let new_texts = response.data.split("||");

                for (var i = 0; i < new_texts.length; i++) {
                    let current_text = new_texts[i].trim();
                    if (current_text != "") {
                        texts.push(new_texts[i].trim());
                    }
                }

                if (texts.length > 1) {
                    generation.suggestions = texts;
                    generation.active = true;

                    me.saveGenerations();
                    me.selectSuggestion(generation, 1);
                } else {
                    me.removeSelection(generation);
                    me.snackbar = true;
                }

                me.aiLoading = false;
                me.generationOngoing = false;
            })
            .catch(function (error) {
                // No response received: error
                console.log(error);

                me.removeSelection(generation)

                me.aiLoading = false;
                me.generationOngoing = false;
                me.snackbar = true;
            });
        },

        removeSelection(generation) {
                let deletefrom = null;
                let deleteto;

                this.editor.state.doc.descendants((node, pos) => {
                    for (var i = 0; i < node.marks.length; i++) {
                        const mark = node.marks[i];
                        if (mark.type && mark.type.name === 'waiting') {
                            const { blockId } = mark.attrs;
                            if (blockId && blockId === generation.id) {
                                if (deletefrom == null) {
                                    deletefrom = pos;
                                }
                                deleteto = pos + node.nodeSize;
                            }
                        }
                    }
                })

                if (deletefrom && deleteto) {
                    this.editor.dispatchTransaction(this.editor.state.tr.removeMark(deletefrom, deleteto));
                }
        },

        saveGenerations() {
            localStorage["ai_text_generations"] = JSON.stringify(this.generations);
        },

        selectGeneration(generation) {
            if (generation.active) {
                generation.active = false;
                this.saveGenerations();
            } else {
                generation.active = true;

                let id = generation.id;
                let from = null;

                this.editor.state.doc.descendants((node, pos) => {
                    for (var i = 0; i < node.marks.length; i++) {
                        const mark = node.marks[i];
                        if (mark.type && mark.type.name === 'generation') {
                            const { blockId } = mark.attrs;
                            if (blockId && blockId === id) {
                                if (from == null) {
                                    from = pos;
                                }
                            }
                        }
                    }
                })

                if (from) {
                    generation.begin = from;
                    this.editor.setSelection(from, from);
                    this.editor.focus();
                    this.saveGenerations();
                }
            }
        },

        // Selects a suggestion for a given generation, replacing its text in the editor
        selectSuggestion(generation, index) {
            let new_txt = generation.suggestions[index];
            let from = null;
            let to;

            this.editor.state.doc.descendants((node, pos) => {
                for (var i = 0; i < node.marks.length; i++) {
                    const mark = node.marks[i];
                    if (mark.type && (mark.type.name === 'generation' || mark.type.name === 'waiting')) {
                        const { blockId } = mark.attrs;
                        if (blockId && blockId === generation.id) {
                            if (from == null) {
                                from = pos;
                            }
                            to = pos + node.nodeSize;
                        }
                    }
                }
            })

            if (from && to) {
                let tr = this.editor.state.tr;
                tr.setSelection(TextSelection.create(this.editor.state.doc, from, to));
                tr.removeMark(from, to);
                tr.addMark(from, to, this.editor.state.schema.mark('generation',
                    {blockId: generation.id, suggestion: index.toString()}));
                tr.insertText(new_txt);
                this.editor.dispatchTransaction(tr);

                generation.active_suggestion = index;
                generation.current = new_txt;
                this.saveGenerations();
            }
        },

        // Validates a generation with its current active suggestion (can be undone)
        validateGeneration(generation) {
            let from = null;
            let to;

            this.editor.state.doc.descendants((node, pos) => {
                for (var i = 0; i < node.marks.length; i++) {
                    const mark = node.marks[i];
                    if (mark.type && mark.type.name === 'generation') {
                        const { blockId } = mark.attrs;
                        if (blockId && blockId === generation.id) {
                            if (from == null) {
                                from = pos;
                            }
                            to = pos + node.nodeSize;
                        }
                    }
                }
            })

            if (from && to) {
                let tr = this.editor.state.tr;
                tr.removeMark(from, to);
                this.editor.dispatchTransaction(tr);
            }
        },

        // Updates generations list to match what is actually in the text editor
        updateGenerations() {
            const dom = this.editor.state.doc;

            let new_txt = {};
            let new_ids = {};

            dom.descendants((node) => {
                for (var i = 0; i < node.marks.length; i++) {
                    const mark = node.marks[i];
                    if (mark.type && mark.type.name === 'generation') {
                        const { blockId, suggestion } = mark.attrs;

                        if (new_txt[blockId] != undefined) {
                            new_txt[blockId] += node.text;
                        } else {
                            new_txt[blockId] = node.text;
                        }
                        new_ids[blockId] = parseInt(suggestion);
                    }
                }
            })

            for (var j = 0; j < this.generations.length; j++) {
                let generation = this.generations[j];
                let txt = new_txt[generation.id];
                if (txt != undefined) {
                    let sugg_i = new_ids[generation.id];

                    generation.active_suggestion = sugg_i;
                    generation.suggestions[sugg_i] = txt;
                    generation.current = txt
                }
            }
        },

        // Launches entity extraction on server
        extractEntities() {
            if (this.ner_ip == "") {
                this.snackbar = true;
                return;
            }

            if (this.editor.state.doc.textContent.length > config.MAX_CHARS) {
                this.snackbarLimit = true;
                return;
            }

            this.aiLoading = true;
            let me = this;
            
            let params = {
                    order: 'extract_entities',
                    body: this.editor.getHTML()
            };

            axios
            .post(this.ner_ip, params)
            .then(function (response) {
                // Response received: success
                me.entities = response.data.split('</p><p>').filter(elt => elt != '')
                me.selected = me.selected.filter(elt => me.entities.includes(elt))
                me.aiLoading = false;
            })
            .catch(function (error) {
                // No response received: error
                console.log(error);
                me.aiLoading = false;
                me.snackbar = true;
            });
        },

        // Is entity currently selected?
        isSelected(entity) {
            return this.selected.includes(entity);
        },

        // Toggle entity selection
        toggleEntity(entity) {
            let i = this.selected.indexOf(entity);
            if (i >= 0) {
                this.selected.splice(i, 1);
            } else {
                this.selected.push(entity);
            }
        },

        // Unselect all entities
        unselectAll() {
            this.selected = []
        },

        // Reset user's added and removed entities lists
        resetRemovedAdded() {
            this.removed_entities = [];
            this.added_entities = [];
            this.selected = [];
            this.saveRemovedAdded();
        },

        // Add an entity to the removed list (or remove it from the added list)
        removeEntity(entity) {
            let i_added = this.added_entities.indexOf(entity);
            let i_ent = this.entities.indexOf(entity);
            let i_selected = this.selected.indexOf(entity);
            if (i_added >= 0) {
                this.added_entities.splice(i_added, 1);
            } else if (i_ent >= 0) {
                this.removed_entities.push(entity);
            }
            if (i_selected >= 0) {
                this.selected.splice(i_selected, 1);
            }
            this.saveRemovedAdded();
        },

        // Add an entity to the added list (or remove it from the removed list)
        addEntity() {
            const { selection, state } = this.editor;
            const { from, to } = selection;
            const text = state.doc.textBetween(from, to, ' ').trim();
            if (text != '' && text.length < 20) {
                let entry = this.ent_categ + ':' + text;
                let i_rem = this.removed_entities.indexOf(entry);
                let is_added = this.entities.concat(this.added_entities).includes(entry);

                if (i_rem >= 0) {
                    this.removed_entities.splice(i_rem, 1);
                } else if (!is_added) {
                    this.added_entities.push(entry);
                }
            }
            this.saveRemovedAdded();
        },

        // Save user's removed and added entities lists
        saveRemovedAdded() {
            localStorage["ai_text_removed_entities"] = JSON.stringify(this.removed_entities);
            localStorage["ai_text_added_entities"] = JSON.stringify(this.added_entities);
        },

        // Saving all data
        saveAll() {
            this.saveRemovedAdded();
            this.saveGenerations();
            this.saveEditorContent();
        },

        // Exiting
        beforeDestroy() {
            this.saveAll();
            this.editor.destroy();
        },
    },
};
</script>





<style lang="scss">
@import 'editor.scss';
</style>