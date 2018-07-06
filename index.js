module.exports = function () {
  return {
    visitor: {
      TaggedTemplateExpression(path) {
        if (
          path.node.tag.object &&
          path.node.tag.object.loc.identifierName === 'styled'
        ) {
          const { node: { quasi: { quasis } } } = path;
          const head = quasis[0];
          if (head && head.value.raw.indexOf('&&') === -1) {
            head.value.raw = `&& {${head.value.raw}`;
            head.value.cooked = head.value.raw;
            const tail = quasis[quasis.length - 1];
            tail.value.raw += '}';
            tail.value.cooked += '}';
          }
        }
      },
    },
  };
};
