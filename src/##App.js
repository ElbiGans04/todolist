// // BAGAIN 1 
// // Komponent untuk mengetahui titik kordinat
// import React from "react";

// class MouseTracker extends React.Component {
//   constructor(props) {
//     super(props);
//     this.handleMouseMove = this.handleMouseMove.bind(this);
//     this.state = { x: 0, y: 0 };
//   }

//   handleMouseMove(event) {
//     this.setState({
//       x: event.clientX,
//       y: event.clientY
//     });
//   }

//   render() {
//     return (
//       <div style={{ height: '100vh' }} onMouseMove={this.handleMouseMove}>
//         <h1>Move the mouse around!</h1>
//         <p>The current mouse position is ({this.state.x}, {this.state.y})</p>
//       </div>
//     );
//   }
// }

// export default MouseTracker;

// // #1 Problem 1
// // Sekarang bagaimana jika kita ingin berbegi prilaku ini dengan komponen lain ?






// // BAGIAN 2
// //  BAGIAN INI KITA MERANGKUM  PERILAKU
// import React from "react";

// // The <Mouse> component encapsulates the behavior we need...
// class Mouse extends React.Component {
//   constructor(props) {
//     super(props);
//     this.handleMouseMove = this.handleMouseMove.bind(this);
//     this.state = { x: 0, y: 0 };
//   }

//   handleMouseMove(event) {
//     this.setState({
//       x: event.clientX,
//       y: event.clientY
//     });
//   }

//   render() {
//     return (
//       <div style={{ height: '100vh' }} onMouseMove={this.handleMouseMove}>

//         {/* ...but how do we render something other than a <p>? */}
//         <p>The current mouse position is ({this.state.x}, {this.state.y})</p>
//       </div>
//     );
//   }
// }

// class MouseTracker extends React.Component {
//   render() {
//     return (
//       <>
//         <h1>Move the mouse around!</h1>
//         <Mouse />
//       </>
//     );
//   }
// }

// export default MouseTracker;


// // BAGIAN #3 
// // KETIKA COMPONENT LAIN MEMBUTUHKAN PERILAKU TERSEBUT
// // kekurangannya adalah react harus membuat component lagi setiap kali ingin menggunakan prilakunya
// import React from 'react';

// class Cat extends React.Component {
//   render() {
//     const mouse = this.props.mouse;
//     return (
//       <img src="/cat.jpg" alt="kucing" style={{ position: 'absolute', left: mouse.x, top: mouse.y }} />
//     );
//   }
// }

// class MouseWithCat extends React.Component {
//   constructor(props) {
//     super(props);
//     this.handleMouseMove = this.handleMouseMove.bind(this);
//     this.state = { x: 0, y: 0 };
//   }

//   handleMouseMove(event) {
//     this.setState({
//       x: event.clientX,
//       y: event.clientY
//     });
//   }

//   render() {
//     return (
//       <div style={{ height: '100vh' }} onMouseMove={this.handleMouseMove}>

//         {/*
//           We could just swap out the <p> for a <Cat> here ... but then
//           we would need to create a separate <MouseWithSomethingElse>
//           component every time we need to use it, so <MouseWithCat>
//           isn't really reusable yet.
//         */}
//         <Cat mouse={this.state} />
//       </div>
//     );
//   }
// }

// class MouseTracker extends React.Component {
//   render() {
//     return (
//       <div>
//         <h1>Move the mouse around!</h1>
//         <MouseWithCat />
//       </div>
//     );
//   }
// };

// export default MouseTracker;













// // bagian #4
// // solusi dari bagian 3

import React from 'react'

class Cat extends React.Component {
  render() {
    const mouse = this.props.mouse;
    return (
      <img src="/cat.jpg" loading="lazy" style={{ position: 'absolute', left: mouse.x, top: mouse.y }} />
    );
  }
}

class Mouse extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.state = { x: 0, y: 0 };
  }

  handleMouseMove(event) {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  }

  render() {
    return (
      <div style={{ height: '100vh' }} onMouseMove={this.handleMouseMove}>

        {/*
          Instead of providing a static representation of what <Mouse> renders,
          use the `render` prop to dynamically determine what to render.
        */}
        {this.props.render(this.state)}
      </div>
    );
  }
}

class MouseTracker extends React.Component {
  render() {
    return (
      <div>
        <h1>Move the mouse around!</h1>
        <Mouse render={mouse => (
          <Cat mouse={mouse} />
        )}/>
      </div>
    );
  }
};




export default MouseTracker;