/* Function to edit a wizard answer
------------------------------------------------------------ */
export function editAnswer(message): void {


    // Search of the selected answer
    let answer = figma.currentPage.findOne(node => (
        node.name === message.target
    )) as InstanceNode;


    // Edit the answer
    if (answer) {
        const text = answer.children[0] as TextNode;
        text.characters = message.payload;              // Text content replacement
    }
}