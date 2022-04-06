import OwnReact from "../src";
import ListItem from "./ListItem";
import Input from "./Input";
import { changeArrayItemsOrder } from "../src/service/helpers";

const LETTERS = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя";

class List extends OwnReact.Component {
  constructor(props) {
    super(props);
    this.state = {
      lettersList: LETTERS.split("")
    };
    this.handleChangeLettersOrder = this.handleChangeLettersOrder.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChangeLettersOrder() {
    const { lettersList } = this.state;
    this.setState({
      lettersList: changeArrayItemsOrder(lettersList)
    });
  }

  handleChange(e) {
    const { lettersList } = this.state;
    const userString = e.target.value.replace(/([^а-яё])/gi, "").toLowerCase();
    const newLettersList = [...new Set([...userString, ...lettersList])];
    this.setState({ lettersList: newLettersList });
  }

  render() {
    const { lettersList } = this.state;
    return (
      <div className="container">
        <div className="list-container">
          {lettersList.map(letter => (
            <ListItem letter={letter} />
          ))}
        </div>
        <div className="commands">
          <Input handleChange={this.handleChange} />
          <button type="button" onClick={this.handleChangeLettersOrder}>
            Перетряхнуть алфавит
          </button>
        </div>
      </div>
    );
  }
}

export default List;
