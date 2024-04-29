import './App.css';
import React from 'react';
import { Component } from 'react';
import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';

/**
 * Main application component.
 */
class App extends Component {
  constructor() {
    super();
    this.state = {
      monsters: [],
      searchField: '',
    };
  }

  /**
   * Fetches user data from an API and updates the state with the fetched data.
   */
  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((users) => {
        this.setState(() => {
          return { monsters: users };
        });
      });
  }

  /**
   * Updates the searchField state based on the input value.
   * @param {Event} event - The input change event.
   */
  onSearchChange = (event) => {
    const searchField = event.target.value;

    this.setState(() => {
      return { searchField };
    });
  };

  render() {
    // to not needing to type this.state every time
    const { monsters, searchField } = this.state;
    const { onSearchChange } = this;
    const filteredMonsters = monsters.filter((monster) => {
      return monster.name.toLowerCase().includes(searchField);
    });

    return (
      <div className='App'>
        <h1 className='app-title'>Monsters Rolodex</h1>
        <SearchBox
          className='monster-search-box'
          onChangeHandler={onSearchChange}
          placeholder={'Search monsters'}
        />
        <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}
export default App;
