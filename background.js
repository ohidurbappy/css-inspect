// chrome.runtime.onInstalled.addListener(() => {
//   chrome.contextMenus.create({
//     id: "inspectElement",
//     title: "Inspect Element",
//     contexts: ["all"],
//   });
// });

// chrome.contextMenus.onClicked.addListener((info, tab) => {
//   chrome.scripting.executeScript({
//     target: { tabId: tab.id },
//     function: handleContextClick,
//   });
// });

// function handleContextClick() {
//   const element = document.elementFromPoint(
//     window.contextMenuX,
//     window.contextMenuY
//   );
//   const computedStyles = window.getComputedStyle(element);
//   const className = element.className || "No class name";

//   let styleText = "";
//   for (let property of computedStyles) {
//     styleText += `${property}: ${computedStyles.getPropertyValue(property)};\n`;
//   }

//   const modalHtml = `
//       <div id="elementInspectorModal" class="modal">
//         <div class="modal-content">
//           <span class="close-button">&times;</span>
//           <h2>Element Details</h2>
//           <p><strong>Class Name:</strong> ${className}</p>
//           <pre>${styleText}</pre>
//           <button id="copyButton" class="clipboard-button">
//         <img src="https://cdn-icons-png.flaticon.com/512/60/60525.png" alt="Clipboard" width="16" height="16" />
//         Copy to Clipboard
//       </button>
//         </div>
//       </div>`;

//   const existingModal = document.getElementById("elementInspectorModal");
//   if (existingModal) {
//     existingModal.remove();
//   }

//   document.body.insertAdjacentHTML("beforeend", modalHtml);

//   const modal = document.getElementById("elementInspectorModal");
//   modal.style.display = "block";

//   const closeButton = modal.querySelector(".close-button");
//   closeButton.addEventListener("click", () => {
//     modal.remove();
//   });


//   const copyButton = document.getElementById('copyButton');
//     copyButton.addEventListener('click', () => {
//         navigator.clipboard.writeText(styleText);
//     });
    


// }


chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: "inspectElement",
      title: "Inspect Element",
      contexts: ["all"],
    });
  });
  
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: handleContextClick,
    });
  });
  
  function handleContextClick() {
    const element = document.elementFromPoint(
      window.contextMenuX,
      window.contextMenuY
    );
  
    const computedStyles = window.getComputedStyle(element);
    const className = element.className || "No class name";
  
    // Get inline styles
    const inlineStyles = element.style;
    const modifiedProperties = new Set();
  
    // Add inline style properties to the set
    for (let property of inlineStyles) {
      modifiedProperties.add(property);
    }
  
    // Check class styles
    const classList = element.classList;
    for (let cls of classList) {
      const styleSheet = [...document.styleSheets].find(sheet => {
        try {
          return sheet.cssRules && [...sheet.cssRules].some(rule => rule.selectorText && rule.selectorText.includes(cls));
        } catch (e) {
          return false; // Prevent cross-origin issues
        }
      });
  
      if (styleSheet) {
        for (let rule of styleSheet.cssRules) {
          if (rule.selectorText && rule.selectorText.includes(cls)) {
            for (let property of rule.style) {
              modifiedProperties.add(property);
            }
          }
        }
      }
    }
  
    // Constructing styleText only with modified properties
    let styleText = "";
    modifiedProperties.forEach(property => {
      const value = computedStyles.getPropertyValue(property);
      styleText += `${property}: ${value};\n`;
    });

    // let stylesArray = [];
    // for (let property of modifiedProperties) {
    //   stylesArray.push({ name: property, value: computedStyles.getPropertyValue(property) });
    // }

    


  
    const modalHtml = `
        <div id="elementInspectorModal" class="modal">
          <div class="modal-content">
            <span class="close-button">&times;</span>
            <h2>Element Details</h2>
            <p><strong>Class Name:</strong> ${className}</p>
            <pre>${styleText}</pre>
            <button id="copyButton" class="clipboard-button">
              <img src="https://cdn-icons-png.flaticon.com/512/60/60525.png" alt="Clipboard" width="16" height="16" />
              Copy to Clipboard
            </button>
          </div>
        </div>`;
  
    const existingModal = document.getElementById("elementInspectorModal");
    if (existingModal) {
      existingModal.remove();
    }
  
    document.body.insertAdjacentHTML("beforeend", modalHtml);
  
    const modal = document.getElementById("elementInspectorModal");
    modal.style.display = "block";
  
    const closeButton = modal.querySelector(".close-button");
    closeButton.addEventListener("click", () => {
      modal.remove();
    });
  
    const copyButton = document.getElementById('copyButton');
    copyButton.addEventListener('click', () => {
      navigator.clipboard.writeText(styleText);
    });
  }
  