/* Imports
------------------------------------------------------------ */
import { sendBox } from '../../boxes/sendBox'; 
import { searchBox } from '../../boxes/searchBox';


/* Function to create an answer node
------------------------------------------------------------ */
export async function createAnswer(msg) {


    // Data
    const iconComp = searchBox.nodeNamed('Bot-icon') as ComponentNode;
    const answerComp = searchBox.nodeNamed('Bot-answer') as ComponentNode;
    const chatBox = searchBox.nodeNamed('Figmant-chat-box') as FrameNode;
    let nextNumber;


    // If it's the first msg, add the icon
    if (msg.iconFlag) {
        const newIcon = iconComp.createInstance();
        nextNumber = String(searchBox.nextCompNum(chatBox, 'Bot-icon'));
        newIcon.name = newIcon.name.concat('-', nextNumber);
        chatBox.appendChild(newIcon);

        newIcon.children[0].name = newIcon.name + ' / Image';
    }


    // Add the new answer and edit its characters
    const newAnswer = answerComp.createInstance();
    nextNumber = String(searchBox.nextCompNum(chatBox, 'Bot-answer'));
    newAnswer.name = newAnswer.name.concat('-', nextNumber);

    newAnswer.children[0].name = newAnswer.name + ' / Text';

    const newText = newAnswer.children[0] as TextNode;
    newText.characters = msg.payload;
    chatBox.appendChild(newAnswer);


    // Send to WizardApp every selectable chatbox node and answer node 
    sendBox.chatBoxNodes();
}