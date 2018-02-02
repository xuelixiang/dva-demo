import React from 'react';
import { connect } from 'dva';
import styles from './Photos.css';
import { Table, DatePicker, Button, Pagination, message, Popconfirm, Switch, Icon, notification, Avatar } from 'antd';
import { PAGE_SIZE } from '../../constants';
import { routerRedux } from 'dva/router';
import ProgressComponent from './ProgressComponent';
import PhotosModel from './PhotosModel';

function Photos({ dispatch, photosList, loading, total, currentPage, percent}){
  function handleChange(value){
    console.log("value:",value);
    message.info('您选择的日期是: ' + value.toString());
  };

  // function refreshData(){
  //   dispatch({
  //     type: 'photos/fetch',
  //     payload: {
  //       page: 2,
  //     }
  //   });
  // };

  function pageChangeHandler(page){
    dispatch(routerRedux.push({
      pathname: '/photos',
      query: { page },
    }));
  };

  function deleteAction(recordId){
    console.log("recordId:",recordId);
    dispatch({
      type: 'photos/remove',
      payload: {
        id: recordId,
      },
    });
  };

  function switchAction(value){
    message.success('你选择的开关按钮是：' + value);
    notification['success']({
      message: "按钮选择：",
      description: '你选择的开关按钮是：' + value,
      duration: 0,
      placement: 'bottomRight',
    });
  };

  function editHandler(id, values){
    console.log("values in editHandler:",values);
    dispatch({
      type: 'photos/patch',
      payload: { id, values },
    });
  };

  function createHandler(values){
    console.log("values in createHandler:",values);
    dispatch({
      type: 'photos/create',
      payload: values,
    });
  };
  // function pageChangeHandler(page){
  //   dispatch({
  //     type: 'photos/fetch',
  //     payload: {
  //       page: page,
  //     }
  //   });
  // };

  const columns = [
    {
      title: 'AlbumId',
      dataIndex: 'albumId',
      key: 'albumId',
    },
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Url',
      dataIndex: 'url',
      key: 'url',
    },
    {
      title: 'Avatar',
      key: 'avatar',
      render: (text, record) => (
        <Avatar src={record.url} />
      ),
    },
    {
      title: 'ThumbnailUrl',
      dataIndex: 'thumbnailUrl',
      key: 'thumbnailUrl',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <span className={styles.operation}>
          <PhotosModel record={record} queryType="edit" onOk={editHandler.bind(null, record.id)}>
            <a>Edit</a>
          </PhotosModel>
          <Popconfirm title="Delete?" onConfirm={deleteAction.bind(null, record.id)}>
            <a>Delete</a>
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <div className={styles.normal}>
      <div>
        <div className={styles.bottom10}>
          <ProgressComponent percent={percent} dispatch={dispatch} />
        </div>
        <div className={styles.bottom10}>
          <Switch checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="cross" />} defaultChecked onChange={switchAction} />
        </div>
        <div className={styles.create}>
          <DatePicker onChange={handleChange} />
        </div> 
        <div className={styles.create}>
          <PhotosModel record={{}} queryType="add" onOk={createHandler}>
            <Button type="primary">Add</Button>
          </PhotosModel>
        </div> 
        <Table 
          columns={columns}
          dataSource={photosList}
          loading={loading}
          rowKey={record => record.id}
          pagination={false}
        />
        <Pagination
          className="amt-table-pagination"
          total={total}
          current={currentPage}
          pageSize={PAGE_SIZE}
          onChange={pageChangeHandler}
        />
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  const { photosList, total, currentPage } = state.photos;
  const { percent } = state.app;
  console.log("percent in photos:",percent)
  const defaultPercent = percent || 20;
  return {
    loading: state.loading.models.photos,
    photosList,
    total,
    currentPage,
    percent,
  };
};

export default connect(mapStateToProps)(Photos);