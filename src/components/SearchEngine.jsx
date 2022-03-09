import React, { Component } from "react";
import PropTypes from "prop-types";
import singapore_logo from './singapore-lion.png';
import Highlighter from "react-highlight-words";
import Highlight from "react-highlight-words";
export class SearchEngine extends Component {

  handleIN = () => {
    var value_data = this.state.userInput;
    if (value_data !== "") {
      fetch('https://gist.githubusercontent.com/yuhong90/b5544baebde4bfe9fe2d12e8e5502cbf/raw/44deafab00fc808ed7fa0e59a8bc959d255b9785/queryResult.json')
        .then(response => response.json())
        .then(json => {
          this.setState({
            articles: json.ResultItems,
            value_data: value_data
          })
        })
    }
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
    });
  }

  static propTypes = {
    suggestions: PropTypes.instanceOf(Array)
  };
  static defaultProperty = {
    suggestions: []
  };
  constructor(props) {
    super(props);

    this.state = {
      articles: [],
      value_data: '',
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: "",
    };
  }

  onChange = e => {
    const { suggestions } = this.props;
    const userInput = e.currentTarget.value;

    const filteredSuggestions = suggestions.filter(
      suggestion =>
        suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      userInput: e.currentTarget.value,

    });

  };

  onClick = e => {
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.currentTarget.innerText
    });
  };
  onKeyDown = e => {
    const { activeSuggestion, filteredSuggestions } = this.state;

    if (e.keyCode === 13) {
      this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
        userInput: filteredSuggestions[activeSuggestion]
      });
    } else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion - 1 });
    } else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion + 1 });
    }
  };

  render() {

    const {
       onChange,
       onClick,
       onKeyDown,
      state: {
        activeSuggestion,
        filteredSuggestions,
        showSuggestions,
        userInput
      }
    } = this;
    let suggestionsListComponent;
    if (userInput.length >= 2) {
      if (showSuggestions && userInput) {
        if (filteredSuggestions.length) {
          suggestionsListComponent = (
            <ul className="suggestions">
              {filteredSuggestions.map((suggestion, index) => {
                // let className;

                if (index === activeSuggestion) {
                  // className = "";
                }

                return (
                  <li key={suggestion} onClick={onClick}>
                    {                  
                    <Highlight
                  highlightClassName="HighlightClass"
                  searchWords={[this.state.userInput]}
                  autoEscape={true}
                  textToHighlight={suggestion}
                />                    
                    }

                  </li>
                );
              })}
            </ul>
          );
        }
        else {
          suggestionsListComponent = (
            <div class="no-suggestions">
              No suggestions
            </div>
          );
        }
      }

    }

    var Title =[];
    var Description =[];
    var Link=[];
    let index=0;
    
    this.state.articles.forEach(element => {
      if(element.DocumentExcerpt.Text.includes(this.state.userInput)){
        var i = index++;
        Title[i] =element.DocumentTitle.Text;
        Description[Title[i]] =element.DocumentExcerpt.Text;
        Link[Title[i]] =element.DocumentURI;
       // console.log(Title)
            
      }
      
    });

    var show = '';
    if (Title.length !== 0) {
      show = "Showing " + Title.length + " results";
    } else {
      show = "";
    }

    return (
      <React.Fragment>

        {/* Search component - Top Fragment */}
        <div className="nav"> <span className="navtxt"><img className="nav_img" src={singapore_logo} alt="singapore-lion"></img>An Official Website of the  <strong className="pl-3"> Singapore Government</strong></span></div>
        <div className="top">
          <div className="box">
            <input
              type="search"
               onChange={onChange}
               onKeyDown={onKeyDown}
              value={userInput}
            />
            <button onClick={this.handleIN} className="button">Submit</button>
          </div>
          {suggestionsListComponent}
        </div>
        
        <div>
        </div>


        {/* List component - Body Fragment */}
        <div className='content'>
          <div className='Result'>{show}</div>          
          {
          Title.map(row =>  
            <div className='ResultItems'>
              <div className='DocumentTitle'>{row}</div>
              <div className='DocumentExcerpt'>
              <Highlighter
                  highlightClassName="HighlightClass"
                  searchWords={[this.state.userInput]}
                  autoEscape={true}
                  textToHighlight={Description[row]}
                />
              </div>
              <div><a href={Link[row]} target="_blank" rel="noreferrer" className='DocumentURI'>{Link[row]}</a></div>
              </div>
          )}

        </div>
      </React.Fragment>
    );
  }
  
}

export default SearchEngine;
