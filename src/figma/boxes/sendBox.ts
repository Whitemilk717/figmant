/* Imports 
------------------------------------------------------------ */
import { searchBox } from "./searchBox";


/* Functions to send messages to the WizardApp
------------------------------------------------------------ */
export const sendBox = {


    // preview length and the corresponding setter
    previewLength: 0,

    setPreviewLength: function (previewLength: number): void {
        this.previewLength = previewLength;
    },


    // Function to send every selectable node and answer to the WizardApp
    sendAll: function () {
        let nodes = [];
        let answers = [];
        let infos;
        const chatBox = figma.currentPage.findOne(searchBox.nodeNamed('Chat-box')) as FrameNode;

        chatBox.children.forEach(node => {
            if (node.name.includes('hidden')) return;

            if (node.name.includes('answer')){
                const frame = node as FrameNode;                                        // cast
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
                const frame = node as FrameNode;                                        // cast
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
            nodes: nodes,
            answers: answers
        });
    }
}