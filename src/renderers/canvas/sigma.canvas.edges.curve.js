;(function() {
  'use strict';

  sigma.utils.pkg('sigma.canvas.edges');

  /**
   * This edge renderer will display edges as curves.
   *
   * @param  {object}                   edge         The edge object.
   * @param  {object}                   source node  The edge source node.
   * @param  {object}                   target node  The edge target node.
   * @param  {CanvasRenderingContext2D} context      The canvas context.
   * @param  {configurable}             settings     The settings function.
   */
  sigma.canvas.edges.curve = function(edge, source, target, context, settings) {
    var color = edge.active ? 
          edge.active_color || settings('defaultEdgeActiveColor') : 
          edge.color,
        prefix = settings('prefix') || '',
        size = edge[prefix + 'size'] || 1,
        edgeColor = settings('edgeColor'),
        defaultNodeColor = settings('defaultNodeColor'),
        defaultEdgeColor = settings('defaultEdgeColor'),
        sSize = source[prefix + 'size'],
        sX = source[prefix + 'x'],
        sY = source[prefix + 'y'],
        tX = target[prefix + 'x'],
        tY = target[prefix + 'y'],
        cp = sigma.utils.getCP(source, target, prefix);

    if (!color)
      switch (edgeColor) {
        case 'source':
          color = source.color || defaultNodeColor;
          break;
        case 'target':
          color = target.color || defaultNodeColor;
          break;
        default:
          color = defaultEdgeColor;
          break;
      }

    if (edge.active) {
      color = settings('edgeActiveColor') === 'edge' ?
        (color || defaultEdgeColor) :
        settings('defaultEdgeActiveColor');
    }
    else if (edge.hover) {
      if (settings('edgeHoverColor') === 'edge') {
        color = edge.hover_color || color;
      } else {
        color = edge.hover_color || settings('defaultEdgeHoverColor') || color;
      }
      size *= settings('edgeHoverSizeRatio');
    }

    context.strokeStyle = color;
    context.lineWidth = edge[prefix + 'size'] || 1;
    context.beginPath();
    context.moveTo(sX, sY);
    if (source.id === target.id) {
      cp.x = sX - sSize * 7;
      cp.y = sY;
      var cp2 = {};
      cp2.x = sX;
      cp2.y = sY + sSize * 7;
      context.bezierCurveTo(cp2.x, cp2.y, cp.x, cp.y, tX, tY);
    } else {
      context.quadraticCurveTo(cp.x, cp.y, tX, tY);
    }
    context.stroke();
  };
})();
