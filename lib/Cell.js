class Cell extends React.Component {
  active(){
    return this.props.activeCells.indexOf(this.props.id) >= 0;
  }

  guessState(){
    if(this.props.correctGuesses.indexOf(this.props.id) >= 0)
      return true;
    else if(this.props.wrongGuesses.indexOf(this.props.id) >= 0)
      return false;
  }

  handleClick(){
    if(this.guessState() === undefined && this.props.gameState === "recall"){
      this.props.recordGuess({
        cellId: this.props.id,
        userGuessIsCorrect: this.active()
      })
    }
  }

  render(){
    let className = "cell";
    
    //Show correct and wrong cells
    if(this.guessState() == true)
      className += " correct";
    else if(this.guessState() == false)
      className += " wrong";
    else if(this.props.showActiveCells && this.active())  //Check whenever to show active cells
      className += " active";
    
    return(
      <div className={className} onClick={this.handleClick.bind(this)}>
      </div>
    )
  }
}

export default Cell;