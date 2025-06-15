// /* Imports
// ------------------------------------------------------------ */
import { sendBox } from '../boxes/sendBox';
import { searchBox } from '../boxes/searchBox';


// /* Function to hide a message
// ------------------------------------------------------------ */
export async function hideNodes(msg) {


    // General data
    const chatBox = figma.currentPage.findOne(searchBox.chatBox) as FrameNode;



    let botHiddenIconNum = 1;
    let userHiddenIconNum = 1;
    let botHiddenAnswerNum = 1;
    let userHiddenQuestionNum = 1;

    let botIconNum = 1;
    let userIconNum = 1;
    let botAnswerNum = 1;
    let userQuestionNum = 1;

    let nodeType;



    chatBox.children.forEach(node => {

        // rinomina i nodi nascosti
        if (node.name.includes('bot-hidden-icon')) {
            node.name = node.name.substring(0, node.name.lastIndexOf('-') + 1) + botHiddenIconNum;
            botHiddenIconNum++;
        }
        if (node.name.includes('user-hidden-icon')) {
            node.name = node.name.substring(0, node.name.lastIndexOf('-') + 1) + userHiddenIconNum;
            userHiddenIconNum++;
        }
        if (node.name.includes('bot-hidden-answer')) {
            node.name = node.name.substring(0, node.name.lastIndexOf('-') + 1) + botHiddenAnswerNum;
            botHiddenAnswerNum++;
        }
        if (node.name.includes('user-hidden-question')) {
            node.name = node.name.substring(0, node.name.lastIndexOf('-') + 1) + userHiddenQuestionNum;
            userHiddenQuestionNum++;
        }


        // nascondi il nodo
        if (msg.targets.includes(node.name)) {
            node.visible = false;
            nodeType = node.name.substring(0, node.name.lastIndexOf('-'));

            if (nodeType.includes('bot-icon')) {
                node.name = 'bot-hidden-icon-' + botHiddenIconNum;
                botHiddenIconNum++;
            }
            if (nodeType.includes('user-icon')) {
                node.name = 'user-hidden-icon-' + userHiddenIconNum;
                userHiddenIconNum++;
            }
            if (nodeType.includes('bot-answer')) {
                node.name = 'bot-hidden-answer-' + botHiddenAnswerNum;
                botHiddenAnswerNum++;
            }
            if (nodeType.includes('user-question')) {
                node.name = 'user-hidden-question-' + userHiddenQuestionNum;
                userHiddenQuestionNum++;
            }
        }


        // aggiusta tutti i nodi non nascosti
        if (node.name.includes('bot-icon')) {
            node.name = node.name.substring(0, node.name.lastIndexOf('-') + 1) + botIconNum;
            botIconNum++;
        }
        if (node.name.includes('user-icon')) {
            node.name = node.name.substring(0, node.name.lastIndexOf('-') + 1) + userIconNum;
            userIconNum++;
        }
        if (node.name.includes('bot-answer')) {
            node.name = node.name.substring(0, node.name.lastIndexOf('-') + 1) + botAnswerNum;
            botAnswerNum++;
        }
        if (node.name.includes('user-question')) {
            node.name = node.name.substring(0, node.name.lastIndexOf('-') + 1) + userQuestionNum;
            userQuestionNum++;
        }

    });
    

    // Send to WizardApp every selectable chatbox node and answer node 
    sendBox.sendAll();








    
    // Target nodes
//     const target = figma.currentPage.findOne(node => (
//         node.name === msg.target
//     )) as InstanceNode;
//     if (!target) return;
//     const targetNum = target.name.split('-').pop();
    
    
//     // Decrease the number of all subsequent answers, hide the answer and fix the hidden answer numbers
//     let newTargetNum = 1;
//     let number;
//     chatBox.children.forEach(node => {
//         number = Number(node.name.split('-').pop());

//         if (node.name.includes('bot-hidden-answer')) {
//             node.name = 'bot-hidden-answer-'.concat(String(newTargetNum
//             ));
//             newTargetNum++;
//         }

//         else if (node.name.includes('bot-answer') && number > targetNum) {
//             number = String(number - 1);
//             node.name = 'bot-answer-'.concat(number);
//         }

//         else if (node.name === target.name) {
//             target.visible = false;
//             target.name = 'bot-hidden-answer-'.concat(String(newTargetNum
//             ));
//             newTargetNum++;
//         }
//     });


//     // If not followed by visible messages from it, the bot icon and the next user icon is hidden
//     let newBotHiddenIconNum = 1;
//     let newUserHiddenIconNum = 1;
//     for (let i = 0; i < chatBox.children.length; i++) {
//         const node = chatBox.children[i];
        
//         if (node.name.includes('bot-icon')) {
//             let hideIt = true;

//             for (let j = i+1; j < chatBox.children.length; j++) {
//                 const nextNode = chatBox.children[j];
    
//                 if (nextNode.name.includes('user-icon')) {
//                     nextNode.visible = false;
//                     nextNode.name = 'user-hidden-icon-'.concat(String(newUserHiddenIconNum));
//                     break;
//                 }
    
//                 if (!nextNode.name.includes('hidden')) {
//                     hideIt = false
//                     break;
//                 }
//             }
            
//             if (hideIt) {
//                 node.visible = false;
//                 node.name = 'bot-hidden-icon-'.concat(String(newBotHiddenIconNum));
//             } else {
//                 node.name = 'bot-icon-' + newBotHiddenIconNum;
//                 newBotHiddenIconNum++;
//             }
//         }
        
//         if (node.name.includes('user-icon') && !node.name.includes('hidden')) {
//             node.name = 'user-icon-' + newUserHiddenIconNum;
//             newUserHiddenIconNum++;
//         }
//     }


//     // Send to WizardApp every selectable answer
//     let answers: string[] = [];
//     figma.currentPage.findAll(searchBox.answers).forEach(node => answers.push(node.name));
//     figma.ui.postMessage({
//         type: 'answers',
//         payload: answers
//     });
}