import React from "react";
import SearchEngine from "./components/SearchEngine";

class App extends React.Component {

  //Constructor
  constructor(props) {
    super(props);

    this.state = {
      items: []
    };
  }

  componentDidMount() {
    fetch(
      "https://gist.githubusercontent.com/yuhong90/b5544baebde4bfe9fe2d12e8e5502cbf/raw/e026dab444155edf2f52122aefbb80347c68de86/suggestion.json"
    )
      .then((res) => res.json(""))
      .then((json) => {
        this.setState({
          items: json.suggestions
        });
      });
  }
  render() {
    const { items } = this.state;

    return (
      <div className="App">
      <SearchEngine
        suggestions={items}
      />
    </div>
    )

  }
}

export default App;
