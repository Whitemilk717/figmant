/* Imports
------------------------------------------------------------ */
import { searchBox } from "../../boxes/searchBox";


/* Function to go to a different destination frame
------------------------------------------------------------ */
export async function goToDestinationFrame(msg) {


    // Search of the selected frame
    const frame = searchBox.frameNamed(msg.destinationFrame);


    // Creation of the navigation reaction
    const reaction: Reaction = {
        trigger: {
            type: 'AFTER_TIMEOUT',
            timeout: 1
        },
        actions: [{
            type: 'NODE',
            destinationId: frame.id,
            navigation: 'NAVIGATE',
            transition: null
        }]
    }


    // Registration of the reaction [TEST]
    const chatBox = figma.currentPage.findOne(node => node.name === 'Figmant-chat-box') as FrameNode;   // using Figmant-chat-box as a test
    await chatBox.setReactionsAsync([reaction]);
}