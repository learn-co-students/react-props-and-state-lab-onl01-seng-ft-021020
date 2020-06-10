import React from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      pets: [],
      filters: {
        type: "all",
      },
    };
  }

  changeType = (type) => {
    this.setState({
      filters: {
        type,
      },
    });
  };

  fetchData = () => {
    let type = this.state.filters.type;
    let url = "/api/pets";
    if (type !== "all") {
      url = url + "?type=" + type;
    }
    fetch(url)
      .then((res) => res.json())
      .then((json) => this.setState({ pets: json }));
  };

  AdoptPet = (id)=>{
    let p =this.state.pets.find(pet=> pet.id === id)
    p.isAdopted = true
    // this.setState({
    //   ...this.
    //   pets: [
    //     ...this.state.pets,
    //     p
    //   ]
    // })
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
              <Filters
                onChangeType={this.changeType}
                onFindPetsClick={this.fetchData}
              />
            </div>
            <div className="twelve wide column">
              <PetBrowser onAdoptPet={(id) => this.AdoptPet(id)} pets={this.state.pets}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
