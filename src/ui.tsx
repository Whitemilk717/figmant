/* Imports
------------------------------------------------------------ */
import * as React from 'react';
import { WizardApp } from './react/WizardApp'
import { createRoot } from 'react-dom/client';


/* WizardApp.tsx rendering inside Figma ui popup
------------------------------------------------------------ */
document.addEventListener('DOMContentLoaded', function() {      // When ui.html is loaded on the DOM
    const domNode = document.getElementById('root');    
    if (domNode) {
        const root = createRoot(domNode);                       // Initialize React with the HTML node domNode as root
        root.render(<WizardApp />);                             // Mount the React WizardApp component inside the root node
    }
});