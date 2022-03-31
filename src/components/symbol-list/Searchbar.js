import React, { Component } from 'react'

class Searchbar extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         searchTerm: ""
      }

      this.handleChange = this.handleChange.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        let copiedTempState = { ...this.state }
        copiedTempState.searchTerm = event.target.value
        this.setState(copiedTempState)
    }

    handleSubmit(event){
        event.preventDefault()
        this.props.searchSymbol(this.state.searchTerm)
    }

  render() {
    return (
      <div>
          <form onSubmit={this.handleSubmit} >
              <input type="text" name="search" onChange={this.handleChange}/>
              <button type='submit'>Search</button>
          </form>
      </div>
    )
  }
}

export default Searchbar