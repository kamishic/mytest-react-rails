import React ,{ Component } from 'react'
import axios from 'axios'
import {Button,FormGroup,FormControl} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import update from 'react-addons-update'

class MainContainer extends Component{
  constructor(props){
    super(props)
    this.state = {
      tweets: []
    }
  }

  componentDidMount(){
    axios.get('http://localhost:3001/tweets')
    .then((results) => {
      console.log(results)
      this.setState({tweets: results.data})
    })
    .catch((data) => {
      console.log(data)
    })
  }

  onChangetext(e) {
    this.setState({tweet: e.target.value})
  }

  createTweet(tweet) {
    axios.post('http://localhost:3001/tweets',{tweet: tweet} )
    .then((response) => {
      const newData = update(this.state.tweets, {$push:[response.data]})
      this.setState({tweets: newData})
    })

    .catch((data) =>{
      console.log(data)
    })
  }

  hundleSubmit = () => {
    this.createTweet(this.state.tweet)
    this.setState({tweet:''})
  }

  render(){
    return (
      <div className="app-main">
        <form>
        <FormGroup controlId="formBasicText">
          <FormControl
            type="text"
            value={this.state.tweet}
            placeholder="Enter text"
            onChange={ e => this.onChangetext(e)}
          />
        </FormGroup>
      </form>
      <Button type="submit" onClick={this.hundleSubmit}>つぶやく</Button>
        
        <ul>
          {this.state.tweets.map((data) => {
            return <li>{data.tweet}</li>;
          })}
        </ul>
      </div>
    )
  }
}

export default MainContainer