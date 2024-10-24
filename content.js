document.addEventListener('contextmenu', function(event) {
    window.contextMenuX = event.clientX;
    window.contextMenuY = event.clientY;
  });  

// chrome.runtime.onMessage.addListener((message) => {
//     if (message.type === "context-click") {
//       const { x, y } = message;
  
//       // Find the element at the clicked coordinates
//       const element = document.elementFromPoint(x, y);
//       if (!element) return;
  
//       const computedStyles = window.getComputedStyle(element);
//       const className = element.className || 'No class name';
  
//       let stylesArray = [];
//       for (let property of computedStyles) {
//         stylesArray.push({ name: property, value: computedStyles.getPropertyValue(property) });
//       }
  
//       // Remove existing modal
//       const existingModal = document.getElementById('elementInspectorModal');
//       if (existingModal) {
//         existingModal.remove();
//       }
  
//       // Create and display the modal
//       const modalHtml = `
//         <div id="elementInspectorModal" class="modal">
//           <div class="modal-content">
//             <span class="close-button">&times;</span>
//             <h2>Element Details</h2>
//             <p><strong>Class Name:</strong> ${className}</p>
//             <table id="cssStylesTable">
//               <thead>
//                 <tr>
//                   <th>Property</th>
//                   <th>Value</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 ${stylesArray.map(style => `
//                   <tr>
//                     <td class="property-name">${style.name}</td>
//                     <td class="property-value">${style.value}</td>
//                   </tr>`).join('')}
//               </tbody>
//             </table>
//             <button id="copyButton" class="clipboard-button">
//               <img src="https://cdn-icons-png.flaticon.com/512/60/60525.png" alt="Clipboard" width="16" height="16" />
//               Copy to Clipboard
//             </button>
//           </div>
//         </div>`;
  
//       // Inject modal HTML
//       document.body.insertAdjacentHTML('beforeend', modalHtml);
  
//       // Show modal
//       const modal = document.getElementById('elementInspectorModal');
//       modal.style.display = 'block';
  
//       // Close modal on clicking close button
//       const closeButton = modal.querySelector('.close-button');
//       closeButton.addEventListener('click', () => {
//         modal.remove();
//       });
  
//       // Copy to clipboard on button click
//       const copyButton = document.getElementById('copyButton');
//       copyButton.addEventListener('click', () => {
//         const cssStyles = stylesArray.map(style => `${style.name}: ${style.value};`).join('\n');
//         navigator.clipboard.writeText(cssStyles).then(() => {
//           alert('CSS rules copied to clipboard!');
//         });
//       });
//     }
//   });
  