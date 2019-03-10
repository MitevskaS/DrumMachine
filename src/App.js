import React, { Component } from 'react';
import data from './resources/data';
import Switch from './components/Switch';
import './style/App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      display: 'Press on these buttons below to play or on the keyboard',
      volume: "0.1",
      sliderValue: 50,
      switchValue: true,
    }
    this.keyboardEvent = this.keyboardEvent.bind(this)
    this.volumeChange = this.volumeChange.bind(this)
    this.onSwitch = this.onSwitch.bind(this)
  }

  render() {
    const sounds = data.sounds;
    const {display, switchValue, sliderValue, power} = this.state;

    return (
      <div
        id="drum-machine" 
        className="App">
        <div
          id="display"
          className="drums-controls-item">
          {display}
        </div>
        <div
          className="drums-controls">
          <span
            className="switch-container drums-controls-item">
            <Switch 
              label="Power"
              checked={switchValue}
              onChange={this.onSwitch}
            />
            <span
              className="switch-label">
              Power
            </span>  
          </span>
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={sliderValue}
            className="slider-range drums-controls-item" 
            onChange={this.volumeChange}
            id="myRange"
          />
        </div>
        <div
          className="drums-container">
          {
            sounds.map((sound, inx) => 
              <button 
                key={sound.id}
                className="drum-pad"
                id={sound.id}
                disabled={!switchValue}
                onClick={() => this.play(sound.keyTrigger, sound.id)}>
                {sound.keyTrigger}
                <audio 
                  id={sound.keyTrigger}
                  volume={this.state.volume}
                  className="clip"
                  muted={!switchValue}
                  controls>
                  <source 
                    src={sound.url}
                  />
                </audio>
              </button>
            )
          }
        </div>
      </div>
    );
  }

  keyboardEvent(event){
    // find the object with keyCode equal to the pressed keyCode
    var id = data.sounds.filter(sound => sound.keyCode === event.keyCode)   
    if(id[0] !== undefined){
      // call method play with found arguments
      this.play(id[0].keyTrigger, id[0].id)
    } 
  }

  play = (id, name) => {
    // display name of pressed key
    if(this.state.switchValue){
      this.setState({
        display: name
      })
    }
    else {
      this.setState({
        display: 'Power is Off'
      })
    }
    // find element audio with keyCode == id and play it
    document.getElementById(''+id+'').play()
  }

  volumeChange(event){
    var volume = event.target.value/100;
    this.setState({
      volume: volume.toString(),
      sliderValue: event.target.value,
      display: 'Volume: '+event.target.value
    })
  }

  onSwitch = () => {
    if(!this.state.switchValue){
      this.setState({
        display: 'Power on'
      })
    }
    this.setState({
      switchValue: !this.state.switchValue
    })
  }

  componentDidMount(){
    // keyboard listener to trigger method - keyboardEvent when certain key is pressed
    document.addEventListener("keydown", this.keyboardEvent, false);      
  }

  componentWillUnmount(){
    // remove listener when component is unmounting
    document.removeEventListener("keydown", this.keyboardEvent, false);  
  }
}
export default App;
