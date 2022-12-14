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

//数组的深copy
export function deepClone(obj) {
    //判断传进来的参数类型不是对象数组 或者是null时 直接返回
    if (typeof obj !== "object" || obj == null) {
      return obj
    }
    //定义返回值
    let result;
    // 判断传进来的数据类型 是数组/对象 就给result一个数组/对象
    if (obj instanceof Array) {
      result = []
    } else {
      result = {}
    }
    //循环遍历方便拷贝
    for (let key in obj) {
      //判读自有属性
      if (obj.hasOwnProperty(key)) {
        //函数递归实现深层拷贝
        result[key] = deepClone(obj[key])
      }
    }
    //返回出去
    return result
  }