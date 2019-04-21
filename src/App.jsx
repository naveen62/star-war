import React, { Component } from 'react';
import axios from 'axios';
// import uniqid from 'uniqid'
import CharacterList from './components/CharacterList';
import './style.css'

class App extends Component {
  state = {
    peoples:[],
    start:1,
    end:9,
    show:false,
    test:false
  }

  componentDidMount() {
    const httpArr = [];
    const httpData = [];
    for(var i=1; i<=this.state.end; i++) {
      httpArr.push(axios.get(`https://swapi.co/api/people/${i}/`))
    } 
    axios.all(httpArr).then((res) => {
       res.forEach((r) => {
         httpData.push(r.data);
       })
       this.setState({peoples:[...httpData], show:true});
    }).catch((err) => {
      console.log(err);
    })
  }
  handleNext = () => {
    this.setState({show:false})
    const httpArr = [];
    const httpData = [];
    const start = this.state.start + 9;
    let end = this.state.end + 9;
    if(start == 82) {
      end = 87;
    }
    for(var i=start; i<=end; i++) {
      if(i !== 17) {
        httpArr.push(axios.get(`https://swapi.co/api/people/${i}/`));
      }
    }
    axios.all(httpArr).then((res) => {
      res.forEach((r) => {
        httpData.push(r.data)
      })
      this.setState({
        peoples:[...httpData],
        start,
        end,
        show:true
      })
    }).catch((err) => {
      console.log(err)
    })
  }
  handlePrev = () => {
    this.setState({show:false})
    const httpArr = [];
    const httpData = [];
    const start = this.state.start - 9;
    let end = this.state.end - 9;
    if(end == 78) {
      end = 81
    }
    for(var i=start; i<=end; i++) {
      if(i !== 17) {
        httpArr.push(axios.get(`https://swapi.co/api/people/${i}/`));
      }
    }
    axios.all(httpArr).then((res) => {
      res.forEach((r) => {
        httpData.push(r.data)
      })
      this.setState({
        peoples:[...httpData],
        start,
        end,
        show:true
      })
    }).catch((err) => {
      console.log(err)
    })
  }
  render() {
    return (
      <div>
        <h3 style={{textAlign:'center'}}>{this.state.start}-{this.state.end} characters out of 87</h3>
        {this.state.show ? (<CharacterList characters={this.state.peoples} />) : (
          <div className='loader_container'>
             <div className="loader"></div>
          </div>
        )}
        <div className='pag_container'>
          {this.state.start !== 1 && <span onClick={this.handlePrev} className='pag_item'>
            <i className="fas fa-chevron-left icon"></i><i className="fas fa-chevron-left icon"></i> prev
          </span>}
          {this.state.end !== 87 && <span onClick={this.handleNext} className='pag_item'>
            next <i className="fas fa-chevron-right icon"></i><i className="fas fa-chevron-right icon"></i>
          </span>}
        </div>
      </div>
    );
  }
}

export default App;
