import React from 'react';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';

class EmailPage extends React.Component {

    state = {
        layoutName: "default",
        input: ""
      };
    
      onChange = input => {
        this.setState({
          input: input
        });
        console.log("Input changed", input);
      };
    
      onKeyPress = button => {
        console.log("Button pressed", button);
    
        /**
         * If you want to handle the shift and caps lock buttons
         */
        if (button === "{shift}" || button === "{lock}") this.handleShift();
      };
    
      handleShift = () => {
        let layoutName = this.state.layoutName;
    
        this.setState({
          layoutName: layoutName === "default" ? "shift" : "default"
        });
      };
    
      onChangeInput = event => {
        let input = event.target.value;
        this.setState(
          {
            input: input
          },
          () => {
            this.keyboard.setInput(input);
          }
        );
      };

      showOrHide = () => {
        var x = document.getElementById("email3");
        var y = document.getElementById("email4");

        if (x.style.display === "none") {
            x.style.display = "block";
          } else {
            y.style.display = "block";
          }
      }
    
    render() {
        return (
            <div className="emailInputField">
                <div id="email1">
                    <input
                        value={this.state.input}
                        placeholder={"E-mailadres"}
                        onChange={e => this.onChangeInput(e)}
                    />
                </div>    
                <div id="email2">
                    <input
                        value={this.state.input}
                        placeholder={"E-mailadres"}
                        onChange={e => this.onChangeInput(e)}
                    />
                </div>
                <div id="email3">
                    <input
                        value={this.state.input}
                        placeholder={"E-mailadres"}
                        onChange={e => this.onChangeInput(e)}
                    />
                </div>
                <div id="email4">
                    <input
                        value={this.state.input}
                        placeholder={"E-mailadres"}
                        onChange={e => this.onChangeInput(e)}
                    />
                </div>     
                <div id="email5">
                    <input
                        value={this.state.input}
                        placeholder={"E-mailadres"}
                        onChange={e => this.onChangeInput(e)}
                    />
                    <button className="addButton" onClick={this.showOrHide}>
                        <img src="./style/img/add.png" alt="add" />
                    </button>
                </div> 
                <Keyboard
                    ref={r => (this.keyboard = r)}
                    layoutName={this.state.layoutName}
                    onChange={input => this.onChange(input)}
                    onKeyPress={button => this.onKeyPress(button)}
                />
                
            </div>
        );
    }
}
export default EmailPage;