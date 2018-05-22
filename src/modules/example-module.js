import '../styles/example-module-style';

export default class ExampleModule {
  constructor(el) {
    el.module = this;
    console.log('on');
  }
  unload() {
    // module teardown
    console.log('off');
  }
}