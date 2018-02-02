import React, { Component } from 'react';
import { Progress, Button, message } from 'antd';

class ProgressComponent extends Component {
  constructor(props){
    super(props);
    // this.state = {
    //   percent: 0,
    // };
    // this.increase = this.increase.bind(this);
  };

  increase = () => {
    this.props.dispatch({
      type: 'app/percentIncrease',
    });
    // let percent = this.props.percent;
    // message.info('increase中percent是: ' + percent);
    // if(percent < 100){
    //   percent = percent + 10;
    //   this.props.dispatch({
    //     type: 'photos/setPercent',
    //     payload: percent,
    //   });
      // this.setState({
      //   percent: percent,
      // });
    // }
  };

  decline = () => {
    this.props.dispatch({
      type: 'app/percentdecline',
    });
    // let percent = this.props.percent;
    // message.info('decline中percent是: ' + percent);
    // if(percent > 0){
    //   percent = percent - 10;
    //   this.props.dispatch({
    //     type: 'photos/setPercent',
    //     payload: percent,
    //   });
      // this.setState({
      //   percent: percent,
      // });
    // }
  };

  render() {
    return (
      <div>
        <Progress type="circle" percent={this.props.percent} />
        <Progress type="dashboard" percent={this.props.percent} />
        <Progress percent={this.props.percent} />
        <Button.Group>
          <Button onClick={this.decline} icon="minus"></Button>
          <Button onClick={this.increase} icon="plus"></Button>
        </Button.Group>
      </div>
    );
  };
}

export default ProgressComponent;