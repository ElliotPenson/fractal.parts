import React, { Component } from 'react';
import { Typography, Button } from 'antd';

import Canvas from './Canvas';
import './Create.css';

const { Title } = Typography;

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Enter a title here.',
      context: null
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidUpdate() {
    const { context } = this.state;
    context.globalAlpha = 0.8;
    context.fillStyle = '#096dd9';
    context.fillRect(100, 100, 250, 250);
  }

  handleChange(title) {
    console.log(title);
    this.setState({ title });
  }

  render() {
    return (
      <div className="Create">
        <Title editable={{ onChange: this.handleChange }}>
          {this.state.title}
        </Title>
        <Canvas
          width="750"
          height="750"
          onContext={context => this.setState({ context })}
        />
        <div>
          <Button type="primary" size="large">
            New
          </Button>
          <Button size="large">Preview</Button>
          <Button size="large">Publish</Button>
          <Button size="large">Help</Button>
        </div>
      </div>
    );
  }
}

export default Create;
