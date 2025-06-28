/* Imports 
------------------------------------------------------------ */
import { searchBox } from "./searchBox";


/* Functions to send messages to the WizardApp
------------------------------------------------------------ */
export const sendBox = {


    // Preview length of chat box nodes and the corresponding setter
    previewLength: 0,

    setPreviewLength: function (previewLength: number): void {
        this.previewLength = previewLength;
    },


    // Function to send every selectable chat box node and answer to the WizardApp
    chatBoxNodes: function () {
        let nodes = [];
        let answers = [];
        let infos;
        const chatBox = figma.currentPage.findOne(searchBox.nodeNamed('Chat-box')) as FrameNode;

        chatBox.children.forEach(node => {
            if (node.name.includes('hidden')) return;

            if (node.name.includes('answer')){
                const frame = node as FrameNode;                                        // Cast
                const text = frame.children[0] as TextNode;
                infos = {
                    name: node.name,
                    preview: text.characters.slice(0, this.previewLength),
                    fullText: text.characters.length < this.previewLength? true:false
                }
                answers.push(infos);
                nodes.push(infos);
                return;
            }

            if (node.name.includes('question')){
                const frame = node as FrameNode;                                        // Cast
                const scrollableBox = frame.children[0] as FrameNode;
                const text = scrollableBox.children[0] as TextNode;
                infos = {
                    name: node.name,
                    preview: text.characters.slice(0, this.previewLength),
                    fullText: text.characters.length < this.previewLength? true:false
                }
                nodes.push(infos);
                return;
            }

            nodes.push({ name: node.name });
        });

        figma.ui.postMessage({
            type: 'chat',
            nodes: nodes,
            answers: answers
        });
    },


    // Function to send every selectable component set to the WizardApp
    compSets: function () {
        const nodes = figma.currentPage.findAll(node => node.type === 'COMPONENT_SET') as ComponentSetNode[];   // A component set contains the variants of a component
        const compSets = [];                                                                                    // Array containing every component set with its infos
    
        nodes.forEach(node => {
            const set = {
                name: node.name,
                properties: []
            }
            
            for (const [name, values] of Object.entries(node.componentPropertyDefinitions)) {
                set.properties.push({ name: name, values: values.variantOptions });
            }
            
            compSets.push(set);
        })
    
        figma.ui.postMessage({
            type: 'variants',
            compSets: compSets
        });
    },


    // Function to send every selectable frame to the WizardApp
    frames: function () {
        const nodes = figma.currentPage.findAll(node => node.type === 'FRAME') as FrameNode[];   // A component set contains the variants of a component
        const frames = [];

        nodes.forEach(node =>
            frames.push(node.name)
        );
        
        figma.ui.postMessage({
            type: 'frames',
            frames: frames
        });

    }
}