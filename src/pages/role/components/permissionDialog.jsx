import React, { useState,useEffect } from 'react';
import Tip from "../../../components/layout/Tip";
import "./index.css"
import { Tree,Button } from 'antd';
import {connect} from 'react-redux';
import { addRoleMenuAsync,getRoleListAsync,resetRoleList } from '../../../store/actions/role';


function PermissionDialog(props) {
    const [checkedKeys, setCheckedKeys] = useState([]);

    useEffect(()=>{
        props.resetRoleList() //先将默认选中的列表设置为空
        props.getRoleListAsync({id:props.record.id}) //请求后端默认选中的节点
    },[])

    const onCheck = (checkedKeysValue,info) => {
        let allCheckedKeys = checkedKeysValue.concat(info.halfCheckedKeys);
        setCheckedKeys(allCheckedKeys);
    }

    const onSubmit = () =>{
        const role_id = props.record.id;
        const formData = new FormData();
        formData.append("role_id",role_id)
        formData.append("menu_ids",checkedKeys)
        
        props.addRoleMenuAsync(formData)
        console.log(checkedKeys)
    }
    //获取所有最深层子节点（包含所有的子节点及没有子节点的父节点）
    const test = [];
    const requestList = (data) => {
        data.map((item) => {
          if (item.children && item.children.length > 0) {
            requestList(item.children);
          } else {
            test.push(item.id);
          }
          return null;
        });
        console.log(test)
        return test;
    };
    return (
        <div className="permission-dialog-main">
            <Tip tipName={props.operate}/>
            <div className="permission-tree">
                {props.role_list.length>0 && <Tree
                    checkable
                    showLine
                    defaultCheckedKeys={[...new Set(requestList(props.menu_list))].filter((item) =>
                        new Set(props.role_list).has(item)
                      )}
                    defaultExpandAll
                    onCheck={onCheck}
                    treeData={props.menu_list}
                    fieldNames={{
                        title:"label",
                        key:"id"
                    }}
                />}
            </div>
            <div className="permission-operate">
                <Button type="primary" htmlType="submit" onClick={onSubmit}>
                    确定
                </Button>
                <Button style={{marginLeft:'2rem'}} danger onClick={props.onClose}>
                    关闭
                </Button>
            </div>

        </div>
    );
}

export default connect(
    state =>({
        menu_list:state.menu_list,
        role_list:state.role_list
    }),
    {
        addRoleMenuAsync,
        getRoleListAsync,
        resetRoleList
    }
)(PermissionDialog);