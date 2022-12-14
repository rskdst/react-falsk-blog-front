import React, { useState,useEffect } from 'react';
import Tip from "../../../components/layout/Tip";
import "./index.css"
import { Tree,Button } from 'antd';
import {connect} from 'react-redux';
import { addRoleMenuAsync } from '../../../store/actions/role';

function PermissionDialog(props) {
    // const [expandedKeys, setExpandedKeys] = useState([]);
    const [checkedKeys, setCheckedKeys] = useState([]);
    const [allCheckedKeys, setAllCheckedKeys] = useState([]); //提交给后台的值
    // const [selectedKeys, setSelectedKeys] = useState([]);
    // const [autoExpandParent, setAutoExpandParent] = useState(true);


    // const onExpand = (expandedKeysValue) => {
    //     console.log('onExpand', expandedKeysValue);
    //     // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    //     // or, you can remove all expanded children keys.
    //     setExpandedKeys(expandedKeysValue);
    //     setAutoExpandParent(false);
    // };
    const onCheck = (checkedKeysValue,info) => {
        
        let allCheckedKeys = checkedKeysValue.concat(info.halfCheckedKeys);
        console.log('onCheck', allCheckedKeys);
        setCheckedKeys(checkedKeysValue);
        setAllCheckedKeys(allCheckedKeys);
    };
    // const onSelect = (selectedKeysValue, info) => {
    //     console.log('onSelect', info);
    //     setSelectedKeys(selectedKeysValue);
    // };

    const onSubmit = () =>{
        const role_id = props.record.id;
        const formData = new FormData();
        formData.append("role_id",role_id)
        formData.append("menu_ids",allCheckedKeys)
        
        props.addRoleMenuAsync(formData)
        console.log(allCheckedKeys)

    }

    return (
        <div className="permission-dialog-main">
            <Tip tipName={props.operate}/>
            <div className="permission-tree">
                <Tree
                    checkable
                    showLine
                    // onExpand={onExpand}
                    // expandedKeys={expandedKeys}
                    // autoExpandParent={autoExpandParent}
                    onCheck={onCheck}
                    checkedKeys={checkedKeys}
                    // onSelect={onSelect}
                    // selectedKeys={selectedKeys}
                    treeData={props.menu_list}
                    fieldNames={{
                        title:"label",
                        key:"id"
                    }}
                />
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
        menu_list:state.menu_list
    }),
    {
        addRoleMenuAsync
    }
)(PermissionDialog);