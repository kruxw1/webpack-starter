import ModuleController from 'module-controller';

/**
 * Handle DOM mutations
 */
export default class MutationController {

  /**
   * @param el the DOM element to observe
   * @constructor
   */
  constructor(el) {
    // Options for the observer (which mutations to observe)
    let config = {
      attributes: true,
      attributeFilter: ['data-module'],
      childList: true,
      subtree: true
    };

    // Create an observer instance
    let observer = new MutationObserver(this.mutationCallback);
    observer.moduleController = new ModuleController();
    // Start observing the target node for configured mutations
    observer.observe(el, config);
  }

  /**
   * Execute when mutations are observed
   * @param mutationsList Array[MutationRecord]
   */
  mutationCallback(mutationsList) {
    let moduleController = this.moduleController;
    for (var mutation of mutationsList) {
      if (mutation.type === 'childList') {
        // mutation.addedNodes;
        // mutation.removedNodes;
        mutation.addedNodes.forEach(function (el) { });
        mutation.removedNodes.forEach(function (el) {
          console.log(el.module);
        });
      }
      else if (mutation.type === 'attributes' && mutation.attributeName === 'data-module') {
        // mutation.attributeName
        // mutation.target

        // running unload() function is allowed in modules
        // whether adding, modifying or removing -- unload() if available
        moduleController.tryUnloadModule(mutation.target);
        this.disconnect();

        if (mutation.target.hasAttribute(mutation.attributeName)) {
          // initialize a new instance of the module
          moduleController.parseModule(mutation.target);
        }
      }
    }
  }

}
