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
    this.setStateTime.bind(this)();
  }

  componentWillMount(){
    clearTimeout(this.memorizeTimer);
    clearTimeout(this.recallTimer);
  }

  startRecall(){
    this.setState({ gameState: 'recall' },() => {
      console.log(this.props.timeoutSecs)
      this.remainingSecs = this.props.timeoutSecs;
      this.gameTimer = setInterval(() => {
        console.log(this.remainingSecs);
        if(--this.remainingSecs === 0){
          this.setState({ gameState: "lost" });
          clearInterval(this.gameTimer);
        }
      }, 1000);
    })
  }

  recordGuess({ cellId, userGuessIsCorrect }){
    let { wrongGuesses, correctGuesses, gameState } = this.state;
    if(userGuessIsCorrect){
      correctGuesses.push(cellId);
      if(correctGuesses.length === this.props.activeCellCount){
        clearInterval(this.gameTimer);
        gameState = 'won';
      }
    }
    else{
      wrongGuesses.push(cellId);
      if(wrongGuesses.length > this.props.wrongAttemptsAllowed)
        gameState = 'lost';
    }
    this.setState({ wrongGuesses, correctGuesses, gameState })
  }

  resetGame(){
    let correctGuesses = [];
    let wrongGuesses = [];

    this.setState({gameState: "ready", correctGuesses, wrongGuesses});
    this.setStateTime.bind(this)();
  }

  setStateTime(){
    this.memorizeTimer = setTimeout(() => this.setState({ gameState: 'memorize' }, () => (
      this.recallTimer = setTimeout(this.startRecall.bind(this) , 2000)
    )), 2000);
  }

  showActiveCells(){
    console.log("check")
    return ["memorize", "lost"].indexOf(this.state.gameState) >= 0;
  }

  render(){
    let showActiveCells = this.showActiveCells();

    return(
      <div>
        <div className="grid">
        {
          this.matrix.map((row, rowId) => (
            <Row key={rowId}>
            {
              row.map(cellId => (
                <Cell key={cellId} id={cellId}
                      showActiveCells={showActiveCells}
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
                activeCellCount={this.props.activeCellCount}
                resetGame={this.resetGame.bind(this)}/>
      </div>
    )
  }
}

Game.defaultProps = {
  wrongAttemptsAllowed: 2,
  timeoutSecs: 10
}

export default Game;