import App from '../samples/App';

test('jsx works', () => {
  expect(App).toEqual({
    type: 'h1',
    props: {
      prop1: 'prop value',
      children: [
        {
          type: 'TEXT ELEMENT',
          props: {
            nodeValue: 'Hello, World!',
          },
        },
      ],
    },
  });
});
