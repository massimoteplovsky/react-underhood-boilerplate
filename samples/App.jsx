import OwnReact from "../src";
import List from "./List/List";
import { changeArrayItemsOrder } from "../src/service/helpers";


const LETTERS = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя";

class App extends OwnReact.Component {
  constructor(props) {
    super(props);
    this.state = {
      lettersList: LETTERS.split("")
    };
    this.handleChangeLettersOrder();
  }

  handleChangeLettersOrder() {
    setInterval(() => {
      this.setState({
        lettersList: changeArrayItemsOrder(this.state.lettersList)
      });
    }, 1000);
  }

  render() {
    const { lettersList } = this.state;
    return <List letters={lettersList} />;
  }
}

export default App;
