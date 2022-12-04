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

