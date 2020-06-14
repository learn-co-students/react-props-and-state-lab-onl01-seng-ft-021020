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

  onChangeType = event =>{
    this.setState({
      ...this.state,
        filters:{
          type: event.target.value
        }
    })
    // console.log(event.target.value)
  }

  onFindPetsClick =() =>{
    let url = '/api/pets'
    if (this.state.filters.type !== 'all'){
      url = url + `?type=${this.state.filters.type}`
    }
    fetch(url)
    .then(resp =>resp.json())
    .then(pets => this.setState({pets:pets}))
  }
  onAdoptPet = id =>{
    const pets = this.state.pets.map(p => {
      return p.id === id? { ...p, isAdopted: true } : p
    })
    this.setState({ pets: pets })
  }

  render() {
    console.log(this.state)
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters 
              onChangeType={this.onChangeType}
              onFindPetsClick={this.onFindPetsClick}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser
              onAdoptPet={this.onAdoptPet}
              pets={this.state.pets} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
