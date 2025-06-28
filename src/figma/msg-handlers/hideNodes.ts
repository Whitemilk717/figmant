/* Imports
------------------------------------------------------------ */
import { sendBox } from '../boxes/sendBox';
import { searchBox } from '../boxes/searchBox';


/* Function to hide a message
------------------------------------------------------------ */
export async function hideNodes(msg) {


    // General data
    const chatBox = figma.currentPage.findOne(searchBox.nodeNamed('Chat-box')) as FrameNode;

    let botHiddenIconNum = 1;
    let userHiddenIconNum = 1;
    let botHiddenAnswerNum = 1;
    let userHiddenQuestionNum = 1;

    let botIconNum = 1;
    let userIconNum = 1;
    let botAnswerNum = 1;
    let userQuestionNum = 1;

    let frameType;


    // Hide routine
    chatBox.children.forEach(node => {

        const frame = node as FrameNode;    // Casting to get access to the children property

        // Renaming hidden frames
        if (frame.name.includes('Bot-hidden-icon')) {
            frame.name = 'Bot-hidden-icon-' + botHiddenIconNum;
            frame.children[0].name = frame.name + ' / Image';
            botHiddenIconNum++;
        }
        if (frame.name.includes('User-hidden-icon')) {
            frame.name = 'User-hidden-icon-' + userHiddenIconNum;
            frame.children[0].name = frame.name + ' / Image';
            userHiddenIconNum++;
        }
        if (frame.name.includes('Bot-hidden-answer')) {
            frame.name = 'Bot-hidden-answer-' + botHiddenAnswerNum;
            frame.children[0].name = frame.name + ' / Text';
            botHiddenAnswerNum++;
        }
        if (frame.name.includes('User-hidden-question')) {
            frame.name = 'User-hidden-question-' + userHiddenQuestionNum;
            const scrollableBox = frame.children[0] as FrameNode;
            scrollableBox.name = frame.name + ' / Scrollable-box';
            scrollableBox.children[0].name = scrollableBox.name + ' / Text';
            userHiddenQuestionNum++;
        }


        // Hiding the target frame
        if (msg.targets.includes(frame.name)) {
            frame.visible = false;
            frameType = frame.name.substring(0, frame.name.lastIndexOf('-'));

            if (frameType === 'Bot-icon') {
                frame.name = 'Bot-hidden-icon-' + botHiddenIconNum;
                frame.children[0].name = frame.name + ' / Image';
                botHiddenIconNum++;
            }
            if (frameType === 'User-icon') {
                frame.name = 'User-hidden-icon-' + userHiddenIconNum;
                frame.children[0].name = frame.name + ' / Image';
                userHiddenIconNum++;
            }
            if (frameType === 'Bot-answer') {
                frame.name = 'Bot-hidden-answer-' + botHiddenAnswerNum;
                frame.children[0].name = frame.name + ' / Text';
                botHiddenAnswerNum++;
            }
            if (frameType === 'User-question') {
                frame.name = 'User-hidden-question-' + userHiddenQuestionNum;
                const scrollableBox = frame.children[0] as FrameNode;
                scrollableBox.name = frame.name + ' / Scrollable-box';
                scrollableBox.children[0].name = scrollableBox.name + ' / Text';
                userHiddenQuestionNum++;
            }
        }


        // Renaming not hidden frames
        if (frame.name.includes('Bot-icon')) {
            frame.name = 'Bot-icon-' + botIconNum;
            frame.children[0].name = frame.name + ' / Image';
            botIconNum++;
        }
        if (frame.name.includes('User-icon')) {
            frame.name = 'User-icon-' + userIconNum;
            frame.children[0].name = frame.name + ' / Image';
            userIconNum++;
        }
        if (frame.name.includes('Bot-answer')) {
            frame.name = 'Bot-answer-' + botAnswerNum;
            frame.children[0].name = frame.name + ' / Text';
            botAnswerNum++;
        }
        if (frame.name.includes('User-question')) {
            frame.name = 'User-question-' + userQuestionNum;
            const scrollableBox = frame.children[0] as FrameNode;
            scrollableBox.name = frame.name + ' / Scrollable-box';
            scrollableBox.children[0].name = scrollableBox.name + ' / Text';
            userQuestionNum++;
        }

    });
    

    // Send to WizardApp every selectable node
    sendBox.chatBoxNodes();
}