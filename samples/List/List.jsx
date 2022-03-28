import OwnReact from "../../src/index";
import ListItem from "./ListItem";
import { changeArrayItemsOrder } from "../../src/service/helpers";

const LETTERS = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя";

class List extends OwnReact.Component {
  constructor(props) {
    super(props);
    this.state = {
      lettersList: LETTERS.split("")
    };
    this.handleChangeLettersOrder();
  }

  handleChangeLettersOrder() {
    setInterval(() => {
      const { lettersList } = this.state;
      this.setState({
        lettersList: changeArrayItemsOrder(lettersList)
      });
    }, 5000);
  }

  render() {
    const { lettersList } = this.state;
    return (
      <div className="list-container">
        {lettersList.map(letter => (
          <ListItem letter={letter} />
        ))}
      </div>
    );
  }
}

export default List;
