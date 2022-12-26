import { Button,Avatar, Divider, List, Skeleton, Switch } from 'antd';
import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom'
import { connect } from 'react-redux';
import { getArticleCategoryAsync } from '../../../store/actions/article'; 
import "./index.css"
import InfiniteScroll from 'react-infinite-scroll-component';
const Category = (props) => {
    const navigate = useNavigate()
    useEffect(() => {
    //   loadMoreData();
      props.getArticleCategoryAsync()
    }, []);
    return ( 
        <div className='category-main'>
            <div className='category-top'>
                <h3 style={{display:"inline-block"}}>全部({props.categorys.length})</h3>
                <Button className='category-add' onClick={()=>{
                    navigate("/article/add_category")
                }}>新建</Button>
            </div>
            <div className='category-list'>
            <div
                id="scrollableDiv"
                style={{
                    // height: 400,
                    overflow: 'auto',
                    padding: '0 16px',
                }}
                >
                    <List
                    dataSource={props.categorys}
                    header={<>
                        <div className='list-category' style={{color: "#999"}}>类别</div>
                        <div className='list-operate' style={{color: "#999"}}>操作</div>
                        <div className='list-show' style={{color: "#999"}}>前台是否显示</div>
                        <div className='list-article-num' style={{color: "#999"}}>文章数</div>
                    </>}
                    renderItem={(item) => (
                        <List.Item key={item.id}>
                            <div className='list-category'>
                                <img src="#" alt="" style={{width:"3rem",height:"3rem",marginRight:"1rem"}}/>
                                <h4 style={{display:"inline-block"}}>{item.category_name}</h4>
                            </div>
                            <div className='list-operate'>
                                <a>管理</a>
                                <a>编辑</a>
                                <a>删除</a>
                            </div>
                            <div className='list-show'>
                                <Switch/>
                            </div>
                            <div className='list-article-num'>
                                <a>4</a>
                            </div>
                        </List.Item>
                    )}
                    />
                </div>
            </div>
        </div>
     );
}
 
export default connect(
    state =>({
        categorys:state.categorys
    }),
    {
        getArticleCategoryAsync
    }
)(Category);