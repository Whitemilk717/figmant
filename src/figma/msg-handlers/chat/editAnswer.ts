/* Imports
------------------------------------------------------------ */
import { sendBox } from "../../boxes/sendBox";


/* Function to edit a wizard answer
------------------------------------------------------------ */
export async function editAnswer(msg) {


    // Search of the selected answer
    let answer = figma.currentPage.findOne(node => (
        node.name === msg.target
    )) as InstanceNode;


    // Edit the answer
    const text = answer.children[0] as TextNode;
    const oldCharacters = text.characters;
    text.characters = msg.payload;                  // Text content replacement


    // Sending log message about answer editing
    await sendBox.logMsg(`Answer "${answer.name}" content in the frame "Figmant-chat-box" has been changed from "${oldCharacters}" to "${text.characters}"`);



    // Send to WizardApp every selectable chatbox node and answer node 
    sendBox.chatBoxNodes();
}