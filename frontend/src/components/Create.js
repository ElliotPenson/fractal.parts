import React, { Component } from 'react';
import { Button, Tabs } from 'antd';

import Canvas from './Canvas';
import EditableTitle from './EditableTitle';
import PublishButton from './PublishButton';
import SettingsDrawer from './SettingsDrawer';
import Attractor from './Attractor';
import { Template } from '../graphics/Template';
import { create } from '../api';

import './Create.css';

const { Group } = Button;
const { TabPane } = Tabs;

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Enter a title here.',
      isPublishing: false,
      settingsVisible: false,
      fractal: null
    };
  }

  handleTitle = title => {
    this.setState({ title });
  };

  handleTemplate = canvas => {
    if (canvas) {
      this.template = new Template(canvas);
      this.template.makeInteractive();
      this.template.draw();
    }
  };

  handleAdd = () => {
    this.template.add();
    this.template.draw();
  };

  onTab = key => {
    const { template } = this;
    if (key === 'template') {
      template.makeInteractive();
    } else {
      template.removeInteractivity();
    }
    this.setState({ fractal: template });
  };

  publish = async () => {
    this.setState({ isPublishing: true });
    try {
      const response = await create(this.state.title, this.template);
      this.props.history.push(`/${response.data.key}`);
    } catch (error) {
      console.error(`Failed to publish (${error.response.status})`);
      this.setState({ isPublishing: false });
    }
  };

  render() {
    const { title, isPublishing, drawerVisible } = this.state;
    return (
      <div className="Create">
        <EditableTitle value={title} onChange={this.handleTitle} />
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
                onClick={() => this.setState({ drawerVisible: true })}
              >
                Settings
              </Button>
              <PublishButton
                isPublishing={isPublishing}
                onPublish={this.publish}
              />
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
            <Attractor
              width={window.innerWidth}
              height="1000"
              fractal={this.state.fractal}
            />
          </TabPane>
        </Tabs>
        <SettingsDrawer
          visible={drawerVisible}
          onClose={() => this.setState({ drawerVisible: false })}
        />
      </div>
    );
  }
}

export default Create;
