import React, { Component } from 'react';
import Joyride from 'react-joyride';

import TourTooltip from './TourTooltip';

const primaryColor = '#2593FC';

class Tour extends Component {
  state = {
    steps: [
      {
        target: '.EditableTitle',
        content:
          "Click to give the fractal a name. This name will become the fractal's URL.",
        placement: 'left',
        disableBeacon: true
      },
      {
        target: '.Create-template',
        content:
          'The white rectangle on the canvas acts as the base shape. Click the base to resize.',
        placement: 'top-start',
        placementBeacon: 'top'
      },
      {
        target: '.Create-add',
        content:
          'Click to add a new shape. Each shape represents a transformation from the base shape.'
      },
      {
        target: '.Create-preview',
        content: 'Select to render your template as a fractal.'
      },
      {
        target: '.Create-publish',
        content:
          'Click to publish the fractal. Careful, fractals cannot be changed once published.'
      }
    ]
  };

  render() {
    return (
      <Joyride
        run={this.props.run}
        steps={this.state.steps}
        continuous={true}
        styles={{ options: { primaryColor } }}
        tooltipComponent={TourTooltip}
      />
    );
  }
}

export default Tour;
