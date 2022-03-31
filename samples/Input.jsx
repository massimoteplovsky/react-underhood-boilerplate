import OwnReact from "../src";

const Input = ({ handleChange }) => {
  return (
    <input type="text" placeholder="Введите символы" onInput={handleChange} />
  );
};

export default Input;
