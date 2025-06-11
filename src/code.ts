/* Imports 
------------------------------------------------------------ */
import { searchBox } from './tools/searchBox';
                       // './tools/searchBox';


/* ui.html rendering inside Figma popup
------------------------------------------------------------ */
figma.showUI(
    __html__,
    { 
        width: 360,
        height: 580,
        title: "Wizard control panel"
    }
);


/* Figma setup and sending of selectable text nodes
------------------------------------------------------------ */
figma.loadFontAsync({ family: "Inter", style: "Italic" });  // Makes a font available in the plugin for use

let textNodes: string[] = [];
figma.currentPage.findAll(searchBox.searchTextNodes).forEach(node =>
    textNodes.push(node.name)
);

figma.ui.postMessage({
    type: 'textNodes',
    payload: textNodes
});


/* Handler for messages received from React components
------------------------------------------------------------ */
figma.ui.onmessage = (message) => {

    if (message.type === 'changeText') {
        const responseGroups: SceneNode[] = figma.currentPage.findAll(searchBox.searchResponseGroup);
        
        const targetGroup = responseGroups.find(group => {
            if (group.type != 'GROUP') return false;
            return group.children.some(node => 
                node.type === 'TEXT' && node.name === message.textNodeName
            );
        })

        if (!targetGroup || targetGroup.type != 'GROUP') return;

        let botResponse: TextNode = targetGroup.children.find(node => node.type === 'TEXT') as TextNode;
        let botTextBox: RectangleNode = targetGroup.children.find(node => node.type === 'RECTANGLE') as RectangleNode;

        if (botResponse && botTextBox) {
            botResponse.autoRename = false;                                     // If false, the node name is not changed
            botResponse.characters = message.newCharacters;                     // Text node content replacement
            botTextBox.resize(botTextBox.width, botResponse.height + (23 * 2)); // Text block resizing + margin top and bottom
        }
    }   

    else if (message.type && message.type === 'closePlugin') {
        figma.closePlugin();
    }
}