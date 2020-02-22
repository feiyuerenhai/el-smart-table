# el-smart-table 智能列表组件

## 📦 What

基于vue + element-ui的智能列表组件

## 🚀 Why

在同类型的业务场景中，列表往往具有许多共性特征，我们对内部数据进行隔离，抽象出了smart-table组件，它能让使用者，（在最理想的情况下）只需要配置好数据接口的url即可快速创建列表。

```vue
<template>
    <SmartTable ref="smart-table" url="path/to/url" :before-fetch="beforeFetch" :after-fetch="afterFetch" :auto="true" :loading="loading">
        <TableColumn label="姓名" prop="name"></TableColumn>
        <TableColumn label="年龄" prop="age"></TableColumn>
    </SmartTable>
</template>

<script>
import SmartTable from 'el-smart-table';
import {TableColumn} from 'element-ui';

export default {
  components: {SmartTable, TableColumn},
  methods: {
    beforeFetch(pageSize, pageNo){
      return {
        pageSize,
        currentPageNo: pageNo,
        extraParams: 'xyz'
      }
    },
    afterFetch(response, intendedPageNo){
      const {status, data, msg} = response;
      return {
        data: (response.data && response.data.result) || [],
        total: (response.data && response.data.total) || 0,
        pageSize: intendedPageSize,
        pageNo: intendedPageNo
      }
    },
    loading(is){
      // UI loading
    }
  }
} 
</script>
```

![](https://i.imgur.com/K8tfA2L.jpg)

# 🎮 How

`npm install el-smart-table -S`

**url**: 接口url。最理想的情况下，使用者只需要配置好接口url参数即可。

**fetch**: 自定义获取数据的方法。smart-table允许使用者完全可控数据的获取过程，自己进行数据获取。fetch的优先级高于url。

**before-fetch**: 请求接口之前的钩子。在这里可以进行数据格式的转换（如服务端需要的字段是currentPageNo而不是pageNo，都可以在这里进行转换），或者，如果查询表格时，需要塞入额外的过滤参数，都可以在此钩子中进行。

**after-fetch**: 请求接口之后的钩子。在这里可以进行数据格式的转换，如服务端给出的响应接口完全和组件预期不同，可以在这里将response的值分别取出，作为data、total、pageSize、pageNo等。

**reload**: 表格实例的刷新方法。如进行某些列操作之后需要再次查询表格数据的最新状态，可以使用`this.$refs['smart-table'].reload()`方法，以进行当前列表页的刷新。另外，如果需要刷新到某一页，可传入具体页码。

**custom**: 自定义模板。用户也可以通过custom开关以及配合slot-scope，来完全自定义列表的展现方式，示例代码如下：

```vue
<SmartTable :custom="true">
  <template slot-scope="scope">
    <Card :data="scope.$data"/>
  </template>
</SmartTable>
```

![](https://i.imgur.com/VZh3N3X.jpg)