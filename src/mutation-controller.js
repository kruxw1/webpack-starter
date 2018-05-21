import ModuleController from './module-controller';

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
    let config = this.config = {
      attributes: true,
      attributeFilter: ['data-module'],
      childList: true,
      subtree: true
    };

    this.el = el;

    // Create an observer instance
    let observer = this.observer = new MutationObserver(this.mutationCallback);
    observer.moduleController = new ModuleController();
    observer.mutationController = this;
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
      if (mutation.type === 'attributes' && mutation.attributeName === 'data-module') {
        // running unload() function is allowed in modules
        // whether adding, modifying or removing -- unload() if available
        moduleController.tryUnloadModule(mutation.target);
        this.mutationController.cycleObserver();

        if (mutation.target.hasAttribute(mutation.attributeName)) {
          // initialize a new instance of the module
          moduleController.parseModule(mutation.target);
        }
      }
    }
  }

  /**
   * Refresh MutationObserver instance connection
   */
  cycleObserver() {
    this.observer.disconnect();
    this.observer.observe(this.el, this.config);
  }

}
