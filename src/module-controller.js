import MutationController from "./mutation-controller";

/**
 * Detect and instantiate modules [data-module]
 */
export default class ModuleController {

  /**
   * @param initialize whether the document should be scanned
   * @constructor
   */
  constructor(initialize) {
    if (initialize) {
      // initialize with a dom scan
      this.scanDom();
      // listen for modules to load/unload
      new MutationController(document.body);
    }
  }

  /**
   * Change a string to pascal casing
   * - module filenames must be lowercase and hyphenated
   * - module classnames must use pascal case
   * @param str the string targeted for transformation
   * @return the string in pascal case
   */
  hyphensToPascalCase(str) {
    var arr = str.split(/[_-]/);
    var newStr = '';
    for (var i = 0; i < arr.length; i++) {
      newStr += arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }
    return newStr;
  }

  /**
   * Require, then create new instance of a module
   * @param el the DOM element [data-module]
   */
  parseModule(el) {
    if (!el)
      return false;
    let moduleName = el.getAttribute('data-module');
    let className = this.hyphensToPascalCase(moduleName);
    let moduleClass = require('./modules/' + moduleName).default;
    new moduleClass(el);
  }

  tryUnloadModule(el) {
    if (
      el.hasOwnProperty('module') &&
      typeof (el.module.unload) === 'function'
    ) {
      el.module.unload();
    }
  }

  /**
   * Scan for [data-module] elements
   * @param el the DOM element [data-module]
   */
  scanDom(el) {
    let moduleController = this;
    let moduleElements;
    if (typeof (el) === 'undefined') {
      moduleElements = document.querySelectorAll('[data-module]');
    } else {
      moduleElements = el.querySelectorAll('[data-module]');
      if (el.hasAttribute('data-module')) {
        moduleController.parseModule(el);
      }
    }
    moduleElements.forEach(function (el) {
      moduleController.parseModule(el);
    });
  }

}
