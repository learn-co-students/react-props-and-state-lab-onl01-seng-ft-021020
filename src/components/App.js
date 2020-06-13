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


  onChangeType = event => {
    
    event.persist()
    this.setState(previousState => {
      
      return{
        filters: {type: event.target.value}
      }
    })
  
  }

  onFindPetsClick =  event => {
    if(this.state.filters.type === 'all'){
      
        fetch('/api/pets')
        .then(response => response.json())
        .then(data => {
          
          this.setState({
            pets: data
          })   
        })
        
      } else {
     
        fetch(`/api/pets?type=${this.state.filters.type}`)
        
        .then(response => response.json())
        .then(data => {
          
          this.setState({
            pets: data
          })
        })
        
      }
   
  }

  onAdoptPet = (petID) => {
    let updatedPets = this.state.pets
    let petIndex = this.state.pets.findIndex(pet => pet.id === petID)
    updatedPets[petIndex].isAdopted = true;
    this.setState({
      pets: updatedPets
    });
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
              <Filters onChangeType={this.onChangeType} onFindPetsClick={this.onFindPetsClick}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
