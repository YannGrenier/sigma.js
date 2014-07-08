;(function(undefined) {
  'use strict';

  if (typeof sigma === 'undefined')
    throw 'sigma is not declared';

  // Initialize package:
  sigma.utils.pkg('sigma.plugins');
  
  /**
   * Sigma MultiSelect
   * =============================
   *
   * @author Sébastien Heymann <seb@linkurio.us> (Linkurious)
   * @version 0.1
   */

  function refresh(s) {
    // Do not refresh edgequadtree:
    var k,
        c;
    for (k in s.cameras) {
      c = s.cameras[k];
      c.edgequadtree._enabled = false;
    }

    // Do refresh:
    s.refresh();

    // Allow to refresh edgequadtree:
    var k,
        c;
    for (k in s.cameras) {
      c = s.cameras[k];
      c.edgequadtree._enabled = true;
    }
  };

  /**
   * @param  {sigma} s The related sigma instance.
   */
  sigma.plugins.multiselect = function(s) {
    s.bind('clickNodes', function(event) {
      //console.log(event.type, event.data.captor);

      // Deactivate all edges:
      s.graph.activateEdges(
        s.graph.activeEdges().map(function(e) {
          return e.id;
        })
      , false);

      if (!event.data.captor.ctrlKey && !event.data.captor.metaKey) {
        // Deactivate all nodes:
        s.graph.activateNodes(
          s.graph.activeNodes().map(function(n) {
            return n.id;
          })
        , false);
      }
      // Activate the target nodes:
      s.graph.activateNodes(
        event.data.node.map(function(n) {
          return n.id;
        })
      );

      refresh(s);
      
    });

    s.bind('clickEdges', function(event) {
      //console.log(event.type, event.data.captor);

      // Deactivate all nodes:
      s.graph.activateNodes(
        s.graph.activeNodes().map(function(n) {
          return n.id;
        })
      , false);

      if (!event.data.captor.ctrlKey && !event.data.captor.metaKey) {
        // Deactivate all edges:
        s.graph.activateEdges(
          s.graph.activeEdges().map(function(e) {
            return e.id;
          })
        , false);
      }

      // Activate the target edges:
      s.graph.activateEdges(
        event.data.edge.map(function(e) {
          return e.id;
        })
      );
      
      refresh(s);
    });
  };

}).call(this);
