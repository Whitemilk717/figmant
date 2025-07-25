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
        const chatBox = searchBox.nodeNamed('Figmant-chat-box') as FrameNode;

        chatBox.children.forEach(node => {
            if (node.name.includes('hidden')) return;

            else if (node.name.includes('answer')){
                const frame = node as FrameNode;                                        // Cast
                const text = frame.children[0] as TextNode;
                infos = {
                    name: node.name,
                    preview: text.characters.slice(0, this.previewLength),
                    fullText: text.characters.length < this.previewLength? true:false
                }
                answers.push(infos);
                nodes.push(infos);
            }

            else if (node.name.includes('question')){
                const frame = node as FrameNode;                                        // Cast
                const scrollableBox = frame.children[0] as FrameNode;
                const text = scrollableBox.children[0] as TextNode;
                infos = {
                    name: node.name,
                    preview: text.characters.slice(0, this.previewLength),
                    fullText: text.characters.length < this.previewLength? true:false
                }
                nodes.push(infos);
            }
            
            else if (node.name.includes('icon')) nodes.push({ name: node.name });
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
            type: 'componentSets',
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

    },


    // Function to send every selectable created variant to the WizardApp
    createdVariants: async function () {
        const instances = figma.currentPage.findAll(n => n.type === 'INSTANCE') as InstanceNode[];
        const variants = [];
        
        for(const instance of instances) {
            const frame = instance.parent.name;
            const mainComponent = await instance.getMainComponentAsync();

            if (
                !instance.name.includes('-hidden-') &&
                frame &&
                mainComponent &&
                mainComponent.parent &&
                mainComponent.parent.type === 'COMPONENT_SET'
            ) {
                const variant = { 
                    set: mainComponent.parent.name,
                    frame: frame,
                    variant: instance.name,
                    properties: []
                };

                for (const [name, values] of Object.entries(mainComponent.parent.componentPropertyDefinitions)) {
                    variant.properties.push({ name: name, values: values.variantOptions });
                }

                variants.push(variant);
            }
        };
    
        figma.ui.postMessage({
            type: 'createdVariants',
            variants: variants
        });
    },


    // Function to send a log msg to the local server
    logMsg: async function (body) {
        const date = new Date();

        try {
            if (body === 'startSession') {
                const dd = date.getDate();
                const mm = date.getMonth() + 1;     // return 0-11
                const yyyy = date.getFullYear();

                await fetch('http://localhost:3000/', {
                    method: 'POST',
                    body: `==============================================================================================================================\n================================================= New WoZ session [${dd}/${mm}/${yyyy}] ================================================\n==============================================================================================================================`
                });
            }
            
            else {
                const h = date.getHours();
                const m = date.getMinutes();
                const s = date.getSeconds();
                const ms = date.getMilliseconds();

                if (body === 'stopSession') {
                    await fetch('http://localhost:3000/', {
                        method: 'POST',
                        body: `[${h}h   :   ${m}m   :  ${s}s    :   ${ms}ms]    Session ended\n\n`
                    });
                }

                else {
                    await fetch('http://localhost:3000/', {
                        method: 'POST',
                        body: `[${h}h   :   ${m}m   :  ${s}s    :   ${ms}ms]    ${body}`
                    });
                }

            }
        } catch (e) {
            console.log('Error writing log file. Please check if local server is running');
        }
    }
}