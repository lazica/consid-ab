// Get Utils
var utils = request.getAttribute('sitevision.utils');
var portletContextUtil = utils.getPortletContextUtil();
var resourceLocatorUtil = utils.getResourceLocatorUtil();
var linkRenderer = utils.getLinkRenderer();
var nodeIteratorUtil = utils.getNodeIteratorUtil(),
    currentPage = portletContextUtil.getCurrentPage(),
    propertyUtil = require("PropertyUtil");

//var pageNode = scriptVariables.pageNode;
var pageNode = propertyUtil.getNode(currentPage, "submenuRootnode");

// Function for generating menu
function generateMenu(page) {
    var activeClass,
        i = 0,
        subPages = nodeIteratorUtil.getMenuItemsIncludingFolders(page);
    if (subPages.hasNext()) {

        out.println("<ul class='gc-submenu__list'>");
        while (subPages.hasNext() && i < 500) {
            var child = subPages.next();
            if (linkRenderer.isValidTarget(child)) {
                if (child === currentPage) {
                    activeClass = "active currentpage";
                } else {
                    activeClass = "notActive";
                }
                linkRenderer.update(child);
                out.println("<li class='sv-inline gc-submenu__item " + activeClass + "'>");
                out.println("<div class='item_wrapper'>");
                out.println(linkRenderer.render());


                // Get children to child
                var subPagesToChild = nodeIteratorUtil.getMenuItemsIncludingFolders(child);
                if (subPagesToChild.hasNext()) {
                    out.print("<button class='gc-submenu__toggle'></button>");
                    out.println("</div><!-- /item_wrapper -->");
                    generateMenu(child);
                } else {
                    out.println("</div><!-- /item_wrapper -->");
                }

                out.println("</li>");
                i++;
            } else {
                generateMenu(child);
            }
        }
        out.println("</ul>");
    }

}
if (pageNode) {
    // Start function

    out.println('<!--sv-no-index--><div class="gc-submenu">');

    out.print("<div class='gc-submenu__currentpage'>");
    linkRenderer.update(pageNode);
    out.print("<p class='sv-font-blockrubrik'>" + linkRenderer.render() + "</p>");
    out.print("</div>");

    generateMenu(pageNode);

    out.println('</div><!--/sv-no-index-->');

}