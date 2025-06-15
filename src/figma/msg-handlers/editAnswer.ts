/* Imports
------------------------------------------------------------ */
import { sendBox } from '../boxes/sendBox';


/* Function to edit a wizard answer
------------------------------------------------------------ */
export function editAnswer(msg): void {


    // Search of the selected answer
    let answer = figma.currentPage.findOne(node => (
        node.name === msg.target
    )) as InstanceNode;


    // Edit the answer
    if (answer) {
        const text = answer.children[0] as TextNode;
        text.characters = msg.payload;              // Text content replacement
    }


    // Send to WizardApp every selectable chatbox node and answer node 
    sendBox.sendAll();
}