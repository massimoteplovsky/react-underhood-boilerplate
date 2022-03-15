import OwnReact from '../src';
import List from './List/List';
import { randomInteger, shuffleArray } from '../src/service/helpers';

const letters = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя';
const lettersList = letters.split('');

const root = document.getElementById('root');

setInterval(() => {
  let startPosition = randomInteger(0, lettersList.length);
  let endPosition = randomInteger(0, lettersList.length);
  if (startPosition > endPosition) {
    [startPosition, endPosition] = [endPosition, startPosition];
  }

  const shuffledLettersRange = shuffleArray(
    lettersList.slice(startPosition, endPosition)
  );

  const newLettersList = [...lettersList];
  newLettersList.splice(
    startPosition,
    endPosition - startPosition,
    ...shuffledLettersRange
  );

  OwnReact.render(<List letters={newLettersList} />, root);
}, 5000);

OwnReact.render(<List letters={lettersList} />, root);
