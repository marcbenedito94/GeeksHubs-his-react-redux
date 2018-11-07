import React from "react";


const Hola = props => (
 <div>
   <h3>{props.edad}</h3>
   {
     props.nombres.map(item => (
       <h1>hola {item}</h1>
     ))
   }
 </div>
)

class App extends React.Component {
  constructor(p) {
    super(p);
    this.state = { edad: 26, names: ["juan",'manolo'] };
  }
  handleClick = () =>  {
    // this.setState({ edad: this.state.edad + 1 })
    this.setState((prevState) => ({ edad: prevState.edad + 1 }));
    
  };
  cambiaNombre = () => this.setState({ names: [...this.state.names, 'pepe']});
  render() {
    return <div>
        <button onClick={this.handleClick}>cumple años</button>
        <button onClick={this.cambiaNombre}>me llamo pepe</button>
        <Hola nombres={this.state.names} edad={this.state.edad} >
          asdas
        </Hola>
      </div>;
  }
}

export default App;
