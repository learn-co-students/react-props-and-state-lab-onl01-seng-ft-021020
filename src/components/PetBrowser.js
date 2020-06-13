import React from 'react'

import Pet from './Pet'




class PetBrowser extends React.Component {

//why do i need paranthesis instead of brackets????
  genCards= () => ( 
    this.props.pets.map(pet => {
      return <Pet pet={pet} onAdoptPet={this.props.onAdoptPet} />
    })
  )


  render() {
    return <div className="ui cards">{this.genCards()}</div>
  }


}

export default PetBrowser
