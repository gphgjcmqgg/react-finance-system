# react-finance-system

小型财务系统-react

## mock数据

https://mockapi.io/

## json-server

npm install -g json-server
json-server --watch db.json --port 端口号

## fetch 

https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch

```
fetch('http://localhost:3004/records').then(function(res){ return res.json()}).then(function(data) { console.log(data)})
```

## axios

yarn add axios

## windows环境变量

windows平台：不能直接使用环境变量, 步骤如下：

1. npm install cross-env --save-dev
2. "start": "cross-env REACT_APP_RECORDS_API_URL=https://5a637781f2bae00012ca1a18.mockapi.io/api/v1/records react-scripts start"
或者
3. .env.development.local文件中定义REACT_APP_RECORDS_API_URL=https://XXX.mockapi.io
4. 通过process.env.REACT_APP_XXXX 来获取环境变量

## 数组

filter  过滤  检测数值元素，并返回符合条件所有元素的数组。返回一个新数组
map     遍历  通过指定函数处理数组的每个元素，并返回处理后的数组。
reduce  将数组元素计算为一个值（从左到右）。累加
  return credits.reduce((prev, curr) => {
    return prev + Number.parseInt(curr.amount, 0)
  }, 0);

