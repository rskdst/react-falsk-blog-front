import { Button,Avatar, Divider, List, Skeleton, Switch } from 'antd';
import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom'
import "./index.css"
import InfiniteScroll from 'react-infinite-scroll-component';
const Category = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const loadMoreData = () => {
        if (loading) {
            return;
        }
        setLoading(true);
        fetch('https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo')
            .then((res) => res.json())
            .then((body) => {
            setData([...data, ...body.results]);
            setLoading(false);
            })
            .catch(() => {
            setLoading(false);
        });
    };
    useEffect(() => {
      loadMoreData();
    }, []);
    return ( 
        <div className='category-main'>
            <div className='category-top'>
                <h3 style={{display:"inline-block"}}>全部(0)</h3>
                <Button className='category-add' onClick={()=>{
                    navigate("/article/add_category/123213")
                }}>新建</Button>
            </div>
            <div className='category-list'>
            <div
                id="scrollableDiv"
                style={{
                    height: 400,
                    overflow: 'auto',
                    padding: '0 16px',
                }}
                >
                <InfiniteScroll
                    dataLength={data.length}
                    next={loadMoreData}
                    hasMore={data.length < 50}
                    loader={
                    <Skeleton
                        avatar
                        paragraph={{
                        rows: 1,
                        }}
                        active
                    />
                    }
                    endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                    scrollableTarget="scrollableDiv"
                >
                    <List
                    dataSource={data}
                    header={<>
                        <div className='list-category' style={{color: "#999"}}>类别</div>
                        <div className='list-operate' style={{color: "#999"}}>操作</div>
                        <div className='list-show' style={{color: "#999"}}>前台是否显示</div>
                        <div className='list-article-num' style={{color: "#999"}}>文章数</div>
                    </>}
                    renderItem={(item) => (
                        <List.Item key={item.email}>
                            <div className='list-category'>
                                <img src="#" alt="" style={{width:"3rem",height:"3rem",marginRight:"1rem"}}/>
                                <h4 style={{display:"inline-block"}}>数据结构</h4>
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
                </InfiniteScroll>
                </div>
            </div>
        </div>
     );
}
 
export default Category;