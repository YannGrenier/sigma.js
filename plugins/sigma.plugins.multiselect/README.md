sigma.plugins.multiselect
==================

Plugin developed by [Sébastien Heymann](sheymann) for [Linkurious](https://github.com/Linkurious).

---
## General
This plugin enables you to:
- click on nodes and edges to activate them (i.e. to "select" them);
- press Ctrl or Meta key while clicking to add nodes or edges to the selection.

See the following [example code](../../examples/multi-select.html) for full usage.

To use, include all .js files under this folder. Then initialize it as follows:

````javascript
sigma.plugins.multiselect(sigInst);
````

## Status

Unstable, do not use in production.

## Dependencies

- [Always dispatch event data](https://github.com/Linkurious/sigma.js/tree/always-dispatch-event-data)
- [Active state](https://github.com/Linkurious/sigma.js/tree/active-state)
- [Edge quadtree integration, edge events, edge hovering](https://github.com/Linkurious/sigma.js/tree/events.edges)

## Limitations
Both nodes and edges cannot be selected at the same time.
