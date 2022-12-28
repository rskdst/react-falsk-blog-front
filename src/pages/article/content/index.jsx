import { Button,Select,Form, Input,List,Tag } from 'antd';
import { connect } from 'react-redux';
import React,{useState,useEffect} from 'react';
import { getQueryCriteriaAsync,getArticleList } from '../../../store/actions/article';
import "./index.css"
const Content = (props) => {
  console.log(props)
  const [form] = Form.useForm()
  const [activeKey,setActiveKey] = useState("1")
  const [yearOptions,setyearOptions] = useState([{label:"不限",value:"不限"}])
  const [monthOptions,setMonthOptions] = useState([{label:"不限",value:"不限"}])
  const [categoryOptions,setCategoryOptions] = useState([{label:"不限",value:"不限"}])

  useEffect(()=>{
    props.getQueryCriteriaAsync()
    props.getArticleList()
  },[])

  useEffect(()=>{
    let yearOptions = []
    let categoryOptions = []
    props.queryCriteria.date.map((year)=>{
      yearOptions.push({label:year,value:year})
    })
    props.queryCriteria.categorys.map((category)=>{
      categoryOptions.push({label:category.category_name,value:category.category_name})
    })
    setyearOptions([{label:"不限",value:"不限"}].concat(yearOptions))
    setCategoryOptions([{label:"不限",value:"不限"}].concat(categoryOptions))
    
  },[props.queryCriteria])


  const handleChangeYear = (value) => {
    if (value!=="不限"){
      const months = ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"]
      const options = []
      months.map((month)=>{
        options.push({label:month,value:month})
      })
      setMonthOptions([{label:"不限",value:"不限"},...options])
    }else{
      setMonthOptions([{label:"不限",value:"不限"}])
      if (form.getFieldValue("month")!=undefined){
        form.setFieldValue("month","不限")
      }
      
    }
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };


  const onFinish = (values) => {
    console.log('Received values from form: ', values);
  };
  return (
    <div className='content-main'>
      <div className='content-top'>
        <ul className='content-ul'>
          <li key="1" className={activeKey === "1"?"active":""} onClick={()=>{setActiveKey("1")}}>全部({props.articles.count.all})</li>
          <li key="2" className={activeKey === "2"?"active":""} onClick={()=>{setActiveKey("2")}}>全部可见({props.articles.count.enable})</li>
          <li key="3" className={activeKey === "3"?"active":""} onClick={()=>{setActiveKey("3")}}>仅我可见({props.articles.count.private})</li>
        </ul>
        <Button style={{position:"absolute",right:"2rem"}} onClick={()=>{window.open('/publish',"_blank")}}>发布</Button>
      </div>
      <div className='content-search'>
        <Form
        name='form'
        form={form}
        onFinish={onFinish}
        layout="inline"
        >
          <Form.Item
          name="year"
          initialValue={undefined}
          >
            <Select
            placeholder="年"
            style={{
              width: 90,
            }}
            onChange={handleChangeYear}
            options={yearOptions}
          />
          </Form.Item>
          <Form.Item
          name="month"
          initialValue={undefined}
          >
            <Select
            placeholder='月'
            style={{
              width: 70,
            }}
            onChange={handleChange}
            // options={monthOptions}
          >
            {monthOptions.map((item)=>{
              return <Select.Option key={item.value} value={item.value}>{item.label}</Select.Option>
            })}
          </Select>
          </Form.Item>
          <Form.Item
          name="article_type"
          initialValue={undefined}
          >
            <Select
            placeholder='文章类型'
            style={{
              width: 120,
            }}
            onChange={handleChange}
            options={[
              {
                label: '不限',
                value: '不限',
              },
              {
                label: '原创',
                value: '原创',
              },
              {
                label: '转载',
                value: '转载',
              }
            ]}
          />
          </Form.Item>
          <Form.Item
          name="article_category"
          initialValue={undefined}
          >
            <Select
            placeholder='分类专栏'
            style={{
              width: 180,
            }}
            onChange={handleChange}
            options={categoryOptions}
          />
          </Form.Item>
          <Form.Item
          name="keyword"
          initialValue=""
          >
            <Input placeholder='请输入关键字'/>
          </Form.Item>
          <Form.Item>
              <div>
                  <Button danger htmlType="submit">
                      搜索
                  </Button>
              </div>
              
          </Form.Item>
        </Form>
        
      </div>
      <div className='content-list'>
        <List
          dataSource={props.articles.list}
          renderItem={(item) => (
              <List.Item key={item.id}>
                  <div className='list-article'>
                      <p className='article-info-title'>
                        <a href="#">{item.title}</a>
                        <span className='article-date'>{item.create_date}</span>
                      </p>
                      <div style={{display:"flex",marginBottom:"1rem"}}>
                        <Tag color="default">{item.article_type==1?"原创":"转载"}</Tag>
                        {item.content_level==2 &&<Tag className='article-level'>仅我可见</Tag>}
                      </div>
                      <div className='article-footer'>
                        <div className='article-info-left'>
                          <p className='article-list-item-readComment'>浏览 {item.view_count}</p>
                          <span className='circle-step'></span>
                          <p className='article-list-item-readComment'>评论 {item.comment_count}</p>
                          <span className='circle-step'></span>
                          <p className='article-list-item-readComment'>点赞 {item.digg_count}</p>
                        </div>
                        <div className='article-info-right'>
                          <a><span className='item-info-oper-text'>查看数据</span></a>
                          <a><span className='item-info-oper-text'>编辑</span></a>
                          <a><span className='item-info-oper-text'>浏览</span></a>
                          <a><span className='item-info-oper-text'>删除</span></a>
                        </div>
                      </div>
                  </div>
              </List.Item>
          )}
          />
      </div>
    </div>
    
  );
}
 
export default connect(
  state =>({
    queryCriteria:state.queryCriteria,
    articles:state.articles
  }),
  {
    getQueryCriteriaAsync,
    getArticleList
  }
)(Content);