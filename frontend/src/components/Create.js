import React, { Component } from 'react';
import { Button, Tabs, Typography } from 'antd';

import Canvas from './Canvas';
import { Controller } from '../graphics/Controller';
import { create } from '../api';

import './Create.css';

const { Group } = Button;
const { TabPane } = Tabs;
const { Title } = Typography;

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Enter a title here.',
      publishing: false
    };
    this.controller = new Controller();
  }

  handleTitle = title => {
    this.setState({ title });
  };

  handleTemplate = canvas => {
    this.controller.templateCanvas = canvas;
    this.controller.showTemplate();
  };

  handleAttractor = canvas => {
    this.controller.attractorCanvas = canvas;
  };

  handleAdd = () => {
    this.controller.add();
  };

  onTab = key => {
    if (key === 'template') {
      this.controller.showTemplate();
    } else {
      this.controller.showPreview();
    }
  };

  publish = async () => {
    this.setState({ publishing: true });
    try {
      const response = await create(this.state.title, this.controller.template);
      this.props.history.push(`/${response.data.key}`);
    } catch (error) {
      console.error(`Failed to publish (${error.response.status})`);
    }
    this.setState({ publishing: false });
  };

  render() {
    return (
      <div className="Create">
        <Title editable={{ onChange: this.handleTitle }}>
          {this.state.title}
        </Title>
        <Tabs
          size="large"
          onChange={this.onTab}
          tabBarExtraContent={
            <Group>
              <Button size="large" onClick={this.handleAdd}>
                Add
              </Button>
              <Button
                size="large"
                type="primary"
                onClick={this.publish}
                loading={this.state.publishing}
              >
                Publish
              </Button>
            </Group>
          }
        >
          <TabPane tab="Template" key="template" forceRender>
            <Canvas
              width={window.innerWidth}
              height="1000"
              onRef={this.handleTemplate}
            />
          </TabPane>
          <TabPane tab="Preview" key="preview" forceRender>
            <Canvas
              width={window.innerWidth}
              height="1000"
              onRef={this.handleAttractor}
            />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default Create;
