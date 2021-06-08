import React from 'react';
import {ThemeContext} from './theme-context';

// function ThemeTogglerButton() {
//   // The Theme Toggler Button receives not only the theme
//   // but also a toggleTheme function from the context
//   return (
//     <ThemeContext.Consumer>
//       {({theme, toggleTheme}) => (
//         <button
//           onClick={toggleTheme}
//           style={{backgroundColor: theme.background}}>
//           Toggle Theme
//         </button>
//       )}
//     </ThemeContext.Consumer>
//   );
// }

class ThemeTogglerButton extends React.Component {
  render () {
    console.log(this.context)
    return (<button
      onClick={this.context.toggleTheme}
      style={{backgroundColor: this.context.theme.background}}>
      Toggle Theme
    </button>)
  }
};

ThemeTogglerButton.contextType = ThemeContext;

export default ThemeTogglerButton;