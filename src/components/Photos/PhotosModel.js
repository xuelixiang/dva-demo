import React, { Component } from 'react';
import { Modal, Form, Input, Icon} from 'antd';

class PhotosModel extends Component {
  constructor(props){
    super(props);
    this.state = {
      visible: false,
    };
  };

  okHandler = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onOk(values);
        this.hideModelHandler();
      }
    });
  };

  hideModelHandler = () => {
    this.setState({
      visible: false,
    });
  };

  showModelHandler = (e) => {
    if (e) {
      e.stopPropagation();
    }
    this.setState({
      visible: true,
    });
  };




  render(){
    const { children, queryType } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { albumId, id, title, url, thumbnailUrl } = this.props.record;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    let modalTitle;
    if(queryType == "add"){
      modalTitle = "添加数据";
    }else{
      modalTitle = "编辑数据";
    }

    return (
      <span>
        <span onClick={this.showModelHandler}>{ children }</span>
        <Modal
        title={modalTitle}
        visible={this.state.visible}
        onOk={this.okHandler}
        onCancel={this.hideModelHandler}
        >
          <Form horizontal onSubmit={this.okHandler}>
            <Form.Item
              {...formItemLayout}
              label="AlbumId"
            >
              {
                getFieldDecorator('albumId', {
                  rules: [{ required: true, message: 'Please input your albumId!'}],
                  initialValue: albumId,
                })(
                  <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="AlbumId" />
                )}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="Id"
            >
              {
                getFieldDecorator('id', {
                  rules: [{ required: true, message: 'Please input your id!'}],
                  initialValue: id,
                })(
                  <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Id" />
                )}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="Title"
            >
              {
                getFieldDecorator('title', {
                  rules: [{ required: true, message: 'Please input your title!'}],
                  initialValue: title,
                })(
                  <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Title" />
                )}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="Url"
            >
              {
                getFieldDecorator('url', {
                  rules: [{ required: true, message: 'Please input your url!'}],
                  initialValue: url,
                })(
                  <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Url" />
                )}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="ThumbnailUrl"
            >
              {
                getFieldDecorator('thumbnailUrl', {
                  rules: [{ required: true, message: 'Please input your thumbnailUrl!'}],
                  initialValue: thumbnailUrl,
                })(
                  <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="ThumbnailUrl" />
                )}
            </Form.Item>
          </Form>
        </Modal>
      </span>
    );
  };

}

export default Form.create()(PhotosModel);