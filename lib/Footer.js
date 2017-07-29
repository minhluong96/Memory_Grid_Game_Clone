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

  render(){
    return(
      <div className="footer">
        <div className="hint">{ this.props.hints[this.props.gameState] }</div>
        {this.remainingCount()}
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