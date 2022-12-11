import React from 'react'
import Menu from "../pages/menu";
//将树形列表转为普通列表
export const getListByTree = (datas) => {
    var arr = [];
    function formateData(datas){
        for(var i in datas){
            arr.push({
                id:datas[i]["id"],
                value:datas[i]["label"],
                key:datas[i]["label"],
                pId:datas[i]["pid"],
                title:datas[i]["label"]
            });
            if(datas[i].children){
                arr.push({children:formateData(datas[i].children)});
            }
        }
    return arr;
    }
    return formateData(datas)
}

//遍历菜单树结构，判断是否存在传入的值
export const existValue = (treedata,root,value)=>{
    let flag = false
    treedata.map((data)=>{
        if (data.label===root){
            _existValue(data)
        }
    })
    function _existValue(treedata){
        if (treedata.permission === value){
            flag = true
        }
        if (treedata.children){
            treedata.children.map((children)=>{
                if (flag){
                    return
                }
                _existValue(children) 
            })
        } 
    }
    
    return flag
}