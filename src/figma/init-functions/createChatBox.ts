/* Function to create the chat box
------------------------------------------------------------ */
export function createChatBox() {


    // Checking the existence of the chat box
    let chatBox = figma.currentPage.findOne(node => node.name === 'Chat-box');
    if (chatBox) {
        figma.notify("'Chat-box' already exists");
        return;
    }
    
    
    // Configuration of the chat box
    chatBox = figma.createFrame();
    chatBox.name = 'Chat-box';

    chatBox.x = 0;
    chatBox.y = 350;
    chatBox.itemSpacing = 10;                           // gap
    chatBox.resize(393, 657.63);
    chatBox.fills = [figma.util.solidPaint('#F2F2F2')];

    chatBox.paddingTop = 25;
    chatBox.paddingLeft = 16;
    chatBox.paddingRight = 16;
    chatBox.paddingBottom = 25;
    
    chatBox.layoutMode = 'VERTICAL';
    chatBox.layoutSizingVertical = 'FIXED';
    chatBox.layoutSizingHorizontal = 'FIXED';
    chatBox.primaryAxisAlignItems = 'MIN';
    chatBox.counterAxisAlignItems = 'CENTER';

    chatBox.clipsContent = true;
    chatBox.overflowDirection = 'VERTICAL';
}