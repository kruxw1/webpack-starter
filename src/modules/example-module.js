import './example-module';

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