import React from "react";
import Opciones from "./Opciones.jsx";
import Historial from "./Historial.jsx";
import data from "./data.json";
import Swal from 'sweetalert2';

const elegidos = [];

export default class Contenido extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contador: 0,
      selectPrev: "",
    };
  }


  componentDidUpdate(prevProps,prevState) {
    if (prevState.contador !== this.state.contador) {
      elegidos.push(this.state.selectPrev);
    }
  }


  handleClick = (e) => {
    const id = e.target.id;
    if (this.state.contador >= 7) {

       Swal.fire('Fin! actualiza la página para mas aventuras!');
    
    } else if (id === "A" && this.state.selectPrev !== "A") {
      this.setState({
        contador: this.state.contador + 1,
        selectPrev: "A",
      });
    } else if (id === "A" && this.state.selectPrev === "A") {
      this.setState({
        contador: this.state.contador + 2,
      });
    } else if (id === "B" && this.state.selectPrev === "A") {
      this.setState({
        contador: this.state.contador + 3,
        selectPrev: "B",
      });
    } else if (id === "B") {
      this.setState({
        contador: this.state.contador + 2,
        selectPrev: "B",
      });
    }
  };
  

  render() {
    return (
      <div className="layout">
        <h1 className="historia">{data[this.state.contador].historia}</h1>

        <Opciones
          handleClick={this.handleClick}
          opcionA={data[this.state.contador].opciones.a}
          opcionB={data[this.state.contador].opciones.b}
        />

        <Historial
          seleccionPrevia={this.state.selectPrev}
          historial={elegidos.map(
            (e, index) => (
              <li key={index}>{e}</li>
            ),
            data[this.state.contador].id
          )}
        />
        
      </div>
    );
  }
}