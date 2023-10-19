## routeTo(targetPage, options = {}) explanation 
- routeTo handles routing and animation logic for our web applications. This function takes a targetPage and an optional options object as parameters.
- Destructures options Object: firstLoad, hashChange, and isPreview are destructured from the options object.
- Parsing targetPage:
  1. If targetPage is an empty string, pageId is set to 'check_details'.
  2. If targetPage contains a slash (/), it splits targetPage into parts. The first part is the pageId, and the second part (if any) is further split into subPageId1.
Query parameters are parsed from the search parameters of the URL, if available.
- Handling check_details Page:
  1. If the pageId is 'check_details', it checks for query parameters. If there are query parameters, it updates the search input value and renders query results.
- Animating Navigation:
  1. Animates the transition of the navigation menu based on the current and previous active elements.
  2. Handles the indicator animation to show the active menu item.
  3. If the current page is not found in the navigation menu, it hides the navigation bar.
- Showing/Hiding Pages:
  1. Hides all pages, then shows the target page and animates its opacity to make it visible.
- Updating pagesData.lastPage:
  1. Updates the lastPage property of pagesData to keep track of the last visited page.

