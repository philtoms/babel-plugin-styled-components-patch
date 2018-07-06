const plugin = require('./');

const quasi = selector => ({
    value: {
      raw: selector,
      cooked: selector
    }
});

describe('plugin', () => {

  const path = test => ({
    node: {
      tag: {
        object: {
          loc: {
            identifierName: 'styled'
          }
        }
      },
      quasi: { quasis: [test] }
    },
  });

  it('should wrap selector with &&', () => {
    const test = quasi('.x');
    plugin().visitor.TaggedTemplateExpression(path(test))
    expect(test).toEqual( {value: {cooked: '&& {.x}', raw: '&& {.x}'}});
  });

  it('should wrap style block with &&', () => {
    const test = quasi('.x {padding: 0;}');
    plugin().visitor.TaggedTemplateExpression(path(test))
    expect(test).toEqual( {value: {cooked: '&& {.x {padding: 0;}}', raw: '&& {.x {padding: 0;}}'}});
  });
});
