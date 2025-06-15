/* Function to create the components frame
------------------------------------------------------------ */
export async function createComponentsFrame() {

    
    // Creation and configuration of the base frame
    let frame = figma.currentPage.findOne(node => node.name === 'Components-frame');
    if (frame) {
        figma.notify("'Components-frame' already exists");
        return;
    } 
    frame = figma.createFrame();
    setFrame(frame);
    

    // Loading of the default font name
    const defaultFontName = { family: 'Inter', style: 'Italic' };
    await figma.loadFontAsync(defaultFontName);


    // Creation and configuration of the user icon component
    const userIconComp = figma.createComponent();
    setIcon(userIconComp, 'user-icon', '#D9D9D9');
    frame.appendChild(userIconComp);


    // Creation of the user question component
    const userQuestionComp = figma.createComponent();
    setMsg(userQuestionComp, 'user-question', '#D9D9D9', defaultFontName, 'Question');
    frame.appendChild(userQuestionComp);


    // Creation the bot icon component
    const botIconComp = figma.createComponent();
    setIcon(botIconComp, 'bot-icon', '#9EFFCA');
    frame.appendChild(botIconComp);
    

    // Creation the bot answer component
    const botAnswerComp = figma.createComponent();
    setMsg(botAnswerComp, 'bot-answer', '#9EFFCA', defaultFontName, 'Answer')
    frame.appendChild(botAnswerComp);
}





/* Function to set the component frame
------------------------------------------------------------ */
function setFrame(frame: FrameNode) {
    frame.name = 'Components-frame';

    frame.x = 0;
    frame.y = 0;
    frame.itemSpacing = 10;
    
    frame.paddingTop = 10;
    frame.paddingLeft = 10;
    frame.paddingRight = 10;
    frame.paddingBottom = 10;
    
    frame.layoutMode = 'VERTICAL';
    frame.layoutSizingVertical = 'HUG';
    frame.layoutSizingHorizontal = 'HUG';
    frame.counterAxisAlignItems = 'CENTER';
    frame.primaryAxisAlignItems = 'CENTER';
}


/* Function to set the icon component frame
------------------------------------------------------------ */
function setIcon(icon, name, color) {
    icon.name = name;
    icon.resize(40, 40);
    icon.cornerRadius = 50;
    icon.lockAspectRatio();
    icon.fills = [figma.util.solidPaint(color)];
}


/* Function to set the ansewr/question component frame
------------------------------------------------------------ */
function setMsg(msg, name, color, fontName, characters) {
    const text = figma.createText();

    msg.name = name;
    msg.resize(380, 45);
    msg.cornerRadius = 10;
    msg.fills = [figma.util.solidPaint(color)];

    msg.paddingTop = 10;
    msg.paddingLeft = 10;
    msg.paddingRight = 10;
    msg.paddingBottom = 10;

    msg.layoutMode = 'VERTICAL';
    msg.primaryAxisSizingMode = 'FIXED';
    msg.counterAxisAlignItems = 'CENTER';
    msg.primaryAxisAlignItems = 'CENTER';

    text.name = name + '-text';
    text.fontName = fontName;
    text.fontSize = 19;
    text.characters = characters;
    msg.appendChild(text);
}