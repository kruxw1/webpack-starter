import 'styles/example-module';

export default class ExampleModule {
  constructor(el) {
    el.module = this;
  }
  unload() {
    // module teardown
  }
}