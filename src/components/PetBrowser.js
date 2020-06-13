import React from 'react'

import Pet from './Pet'

class PetBrowser extends React.Component {
    
    genCards = () => {
        return this.props.pets.map((pet) => {
            console.log(pet)
            return <Pet pet={pet} onAdoptPet={this.props.onAdoptPet} />
        })
    }
  
    render() {
        return <div className="ui cards">{this.genCards()}</div>
    }
}

export default PetBrowser
