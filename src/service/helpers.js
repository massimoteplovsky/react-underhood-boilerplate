export const shuffleArray = array => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const randomInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const changeArrayItemsOrder = arr => {
  let startPosition = randomInteger(0, arr.length);
  let endPosition = randomInteger(0, arr.length);
  if (startPosition > endPosition) {
    [startPosition, endPosition] = [endPosition, startPosition];
  }

  const shuffledArrayRange = shuffleArray(
    arr.slice(startPosition, endPosition)
  );

  const newArray = [...arr];
  newArray.splice(
    startPosition,
    endPosition - startPosition,
    ...shuffledArrayRange
  );

  return newArray;
};

export const shallowEqual = (objA, objB) => {
  if (Object.is(objA, objB)) {
    return true;
  }

  if (
    typeof objA !== "object" ||
    objA === null ||
    typeof objB !== "object" ||
    objB === null
  ) {
    return false;
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // Test for A's keys different from B.
  for (let i = 0; i < keysA.length; i++) {
    const currentKey = keysA[i];
    if (
      !hasOwnProperty.call(objB, currentKey) ||
      !Object.is(objA[currentKey], objB[currentKey])
    ) {
      return false;
    }
  }

  return true;
};
