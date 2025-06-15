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
        const chatBox = figma.currentPage.findOne(searchBox.chatBox) as FrameNode;

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
                const text = frame.children[0] as TextNode;
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




/* Functions to send messages to the WizardApp
------------------------------------------------------------ */
// export const sendBox = {
    

//     // preview length and the corresponding setter
//     previewLength: 0,

//     setPreviewLength: function (previewLength: number): void {
//         this.previewLength = previewLength;
//     },


//     // Function to send every selectable chatbox answer node
//     answers: function (): void {
//         let answers = [];
//         figma.currentPage
//             .findAll(searchBox.answers)
//             .forEach(node => {
//                 const frame = node as FrameNode;
//                 const text = frame.children[0] as TextNode;
//                 answers.push({
//                     name: frame.name,
//                     preview: text.characters.slice(0, this.previewLength),
//                     fullText: text.characters.length < this.previewLength? true:false
//                 })
//             });
        
//         figma.ui.postMessage({
//             type: 'answers',
//             payload: answers
//         });
//     },


//     // Function to send every selectable chatbox node
//     nodes: function (): void {
//         const chatBox = figma.currentPage.findOne(searchBox.chatBox) as FrameNode;
//         let selectableNodes = [];

//         chatBox.children.forEach(node => {
//             if (node.name.includes('icon')) {
//                 selectableNodes.push({ 
//                     name: node.name 
//                 })
//             } else {
//                 const frame = node as FrameNode;
//                 const text = frame.children[0] as TextNode;
//                 selectableNodes.push({
//                     name: frame.name,
//                     preview: text.characters.slice(0, this.previewLength),
//                     fullText: text.characters.length < this.previewLength? true:false
//                 })
//             }
//         });

//         figma.ui.postMessage({
//             type: 'nodes',
//             payload: selectableNodes
//         });
//     },
// }