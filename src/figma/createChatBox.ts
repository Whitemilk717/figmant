/* Function to create the chatBox chatbox
------------------------------------------------------------ */
export function createChatBox() {


    // Creation of the chatbox
    let chatbox = figma.currentPage.findOne(node => node.name === 'chat-box');
    if (chatbox) {
        figma.notify("'chat-box' already exists");
        return;
    }
    chatbox = figma.createFrame();
    

    // Configuration of the chatbox
    chatbox.name = 'chat-box';

    chatbox.x = 0;
    chatbox.y = 350;
    chatbox.itemSpacing = 10;                           // gap
    chatbox.resize(393, 657.63);
    chatbox.fills = [figma.util.solidPaint('#F2F2F2')];

    chatbox.paddingTop = 25;
    chatbox.paddingLeft = 16;
    chatbox.paddingRight = 16;
    chatbox.paddingBottom = 25;
    
    chatbox.layoutMode = 'VERTICAL';
    chatbox.layoutSizingVertical = 'FIXED';
    chatbox.layoutSizingHorizontal = 'FIXED';
    chatbox.primaryAxisAlignItems = 'MIN';
    chatbox.counterAxisAlignItems = 'CENTER';

    chatbox.clipsContent = true;
    chatbox.overflowDirection = 'VERTICAL';
}