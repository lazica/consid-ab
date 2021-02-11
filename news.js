var propertyUtil 		= require('PropertyUtil'),
    nodeIteratorUtil = require('NodeIteratorUtil'),
    nodeTreeUtil 		= require('NodeTreeUtil'),
    nodeTypeUtil		= require('NodeTypeUtil'),
    dateUtil			= require('DateUtil'),
    imageRenderer		= require('ImageRenderer'),
    linkRenderer		= require('LinkRenderer'),
    scriptUtil			= require('ScriptUtil');

var node					= scriptVariables.node,
    numberOfNews		= scriptVariables.numberOfNews,
    maxLength			= scriptVariables.maxLength,
    article				= null,
    errorMessage		= '';


if (nodeTypeUtil.isArchive(node)){
	articles = node.getNodes();
} else {
   errorMessage = 'Peka ut ett arkiv och försök igen.';
}