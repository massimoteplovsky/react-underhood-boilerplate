import OwnReact from "../../src/index";
import ListItem from "./ListItem";

const List = ({ letters }) => {
  return (
    <div className="list-container">
      {letters.map(letter => (
        <ListItem letter={letter} />
      ))}
    </div>
  );
};

export default List;
