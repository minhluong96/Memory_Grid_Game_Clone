import _ from "lodash"
import Row from "./Row"
import Cell from "./Cell"
import Footer from "./Footer"

class Game extends React.Component {
  constructor(props){
    super(props);
    this.state = { 
      gameState: 'ready',
      correctGuesses: [],
      wrongGuesses: []
    }

    this.matrix = [];
    for(let r = 0; r < this.props.rows; r++){
      let row = [];
      for(let c = 0; c < this.props.columns; c++){
        row.push(`${r}${c}`);
      }
      this.matrix.push(row);
    }

    let flatMatrix = _.flatten(this.matrix)
    this.activeCells = _.sampleSize(flatMatrix, this.props.activeCellCount)
  }

  componentDidMount(){
    setTimeout(() => this.setState({ gameState: 'memorize' }, () => (
      setTimeout(() => this.setState({ gameState: 'recall' }), 2000)
    )), 2000);
  }

  recordGuess({ cellId, userGuessIsCorrect }){
    let { wrongGuesses, correctGuesses, gameState } = this.state;
    if(userGuessIsCorrect){
      correctGuesses.push(cellId);
      if(correctGuesses.length === this.props.activeCellCount)
        gameState = 'won';
    }
    else{
      wrongGuesses.push(cellId);
      if(wrongGuesses.length > this.props.wrongAttemptsAllowed)
        gameState = 'lost';
    }
    this.setState({ wrongGuesses, correctGuesses, gameState })
  }

  render(){
    return(
      <div>
        <div className="grid">
        {
          this.matrix.map((row, rowId) => (
            <Row key={rowId}>
            {
              row.map(cellId => (
                <Cell key={cellId} id={cellId}
                      activeCells={this.activeCells}
                      {...this.state}
                      recordGuess={this.recordGuess.bind(this)}/>
              ))
            }
            </Row>
          ))
        }
        </div>
        <Footer {...this.state}
                activeCellCount={this.props.activeCellCount}/>
      </div>
    )
  }
}

Game.defaultProps = {
  wrongAttemptsAllowed: 2
}

export default Game;