/* Functions for searching components in figma
------------------------------------------------------------ */
export const searchBox = {


    /* Function to search for Figma's canvas group
    -------------------------------------------------------- */
    searchResponseGroup: function (node: SceneNode): boolean {
        return (node.name.includes('response-group')? true:false);
    },


    /* Function to search for Figma's canvas text node
    -------------------------------------------------------- */
    searchTextNodes: function (node: SceneNode): boolean {
        return (node.name.includes('bot-response')? true:false);  
    },
}