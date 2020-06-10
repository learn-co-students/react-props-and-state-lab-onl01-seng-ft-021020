import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  onChangeType = (e) => {
    this.setState({
      filters: {
        type: e.target.value
      }
    }, () => console.log(this.state))
  }

  onFindPetsClick = () => {
    let url = '/api/pets'
    if (this.state.filters.type !== 'all') url = url + `?type=${this.state.filters.type}`
    fetch(url)
      .then(resp => resp.json())
      .then(data => this.setState({ pets: data }, () => console.log(this.state)))
  }

  onAdoptPet = (id) => {
    let idx = this.state.pets.findIndex(pet => pet.id === id);
    let newPets = this.state.pets.slice()
    newPets[idx].isAdopted = true
    this.setState({
      pets: newPets
    })
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.onChangeType} onFindPetsClick={this.onFindPetsClick} />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
