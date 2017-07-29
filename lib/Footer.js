class Footer extends React.Component {
  remainingCount(){
    if(this.props.gameState !== "recall")
      return null;
    else
      return(
        <div className="remaining-count">
          Remaining: {this.props.activeCellCount - this.props.correctGuesses.length}
        </div>
      )
  }

  handleClick(){
    return this.props.resetGame;
  }

  playAgain(){
    if(["lost", "won"].indexOf(this.props.gameState) >= 0)
      return(
        <input type="button" className="playButton" onClick={this.handleClick()} value="Play again"/>
      )
    else
      return null;
  }

  render(){
    return(
      <div className="footer">
        <div className="hint">{ this.props.hints[this.props.gameState] }</div>
        {this.remainingCount()}
        {this.playAgain()}
      </div>
    )    
  }
}

Footer.defaultProps = {
  hints: {
    ready: "Get Ready..",
    memorize: "Memorize",
    recall: "Recall",
    won: "You won",
    lost: "Game over"
  }
}

export default Footer;