<template>
    <div>
       <!-- <mt-navbar v-model="selected">
            <mt-tab-item id="1">选项一</mt-tab-item>
            <mt-tab-item id="2">选项二</mt-tab-item>
            <mt-tab-item id="3">选项三</mt-tab-item>
        </mt-navbar>

        &lt;!&ndash; tab-container &ndash;&gt;
        <mt-tab-container v-model="selected">
        <mt-tab-container-item id="1">
            <mt-cell v-for="n in 10" :title="'内容 ' + n" :key='n' />
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
            <mt-cell v-for="n in 4" :title="'测试 ' + n" :key='n' />
        </mt-tab-container-item>
        <mt-tab-container-item id="3">
            <mt-cell v-for="n in 6" :title="'选项 ' + n"  :key='n' />
        </mt-tab-container-item>
        </mt-tab-container>
        <ul
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="loading"
            infinite-scroll-distance="40">
            <li v-for="item in list">{{ item }}</li>
            </ul>-->
      学校类型:<select @change="typeChange($event)">
        <option>请选择</option>
        <option v-for="o in school.typeList" :value="o">{{o}}</option>
      </select>
      学校名称：<select id="schoolSelect" v-model="schoolName">
        <option>请选择</option>
        <option v-for="o in schoolList" :value="o">{{o}}</option>
      </select>
      年级：<select>
        <option v-on:select="select">请选择</option>
        <option v-for="o in gradeList" :value="o">{{o}}</option>
      </select>
      班级：<select>
        <option v-on:select="select">请选择</option>
        <option v-for="o in classList" :value="o">{{o}}</option>
      </select>

      <br/>
      <div class="noteItem">
        <div style="width: 100px">
          <div class="noteName">部门*</div>
        </div>
        <div style="flex: auto">
          <div class="noteInputContainer" style="height:100%">
            <select v-model="departmentName" class="select" @change="departmentChange($event)">
              <option value="">请选择</option>
              <option :value="o.name" v-for="o in departmentList">{{o.name}}</option>
            </select>
          </div>
        </div>
      </div>
      <div class="noteItem">
        <div style="width: 100px">
          <div class="noteName">部门编码*</div>
        </div>
        <div style="flex: auto">
          <div class="noteInputContainer">
            <input class="noteInput" v-model="departmentCode"
                   placeholder="请填写部门编码">
          </div>
        </div>
      </div>

    </div>
</template>

<script>
  // 学校相关数据
  let school = {
    typeList: ["幼儿园", "小学"],
    schoolList: {
      youeryuan: [
        "阜宁县幼儿园",
        "阜宁县东风路幼儿园",
        "阜宁县胜利路幼儿园",
        "阜宁县实验幼儿园",
        "阜宁县新城幼儿园（南园）",
        "阜宁县新城幼儿园（北园）",
        "阜宁县四通幼儿园",
        "阜宁县苏州路幼儿园",
        "阜宁县光明路幼儿园"
      ],
      xiaoxue: [
        "阜宁实小",
        "实小府前街校区",
        "实小石字路校区",
        "实小向阳路校区",
        "实小苏州路校区",
        "实小长春路校区",
        "实小新林路校区",
        "阜师附小",
        "附小通榆路校区",
        "附小香港路校区",
        "特殊教育学校",
        "体校",
        "沟墩中心小学",
        "吴滩中心小学",
        "合利中心小学",
        "陈良中心小学",
        "施庄中心小学",
        "三灶中心小学",
        "郭墅中心小学",
        "陈集中心小学",
        "羊寨中心小学",
        "北沙中心小学",
        "芦蒲中心小学",
        "硕集中心小学",
        "东沟中心小学",
        "益林中心小学",
        "益林益北小学",
        "公兴中心小学",
        "杨集中心小学",
        "古河中心小学",
        "罗桥中心小学",
        "凤谷中心小学"
      ]
    },
    gradeList: {
      youeryuan: ["小班", "中班", "大班"],
      xiaoxue: ["一年级", "二年级", "三年级", "四年级", "五年级", "六年级"]
    },
    classList: {
      youeryuan: ["1班", "2班", "3班", "4班", "5班", "6班", "7班", "8班"],
      xiaoxue: ["1班", "2班", "3班", "4班", "5班", "6班", "7班", "8班", "9班", "10班", "11班", "12班", "13班", "14班", "15班", "16班", "17班", "18班", "19班", "20班"]
    }
  };


  // 商户相关数据
  let shopData = {
    departmentList: [
      {name: "百货大楼高阶潮流部", code: "2217"},
      {name: "百货大楼潮流女装部", code: "2218"},
      {name: "百货大楼潮流运动部", code: "2219"},
      {name: "百货大楼潮流配饰部", code: "2220"},
      {name: "百货大楼人力资源部", code: "220302"},
      {name: "百货大楼后勤物业管理部", code: "220303"}
    ],
    projectList: [
      {name: "服保金", money: "0.03"},
      {name: "临时工号", money: "0.01"},
      {name: "工本费", money: "0.01"},
      {name: "施工保证金", money: "0.05"},
      {name: "施工证", money: "0.01"},
      {name: "日志", money: "0.01"},
      {name: "送货本", money: "0.01"},
      {name: "罚款", money: "0.01"},
      {name: "花车保证金", money: ""},
      {name: "零时收款", money: ""}
    ]
  };
export default {
  data () {
    return {
      msg: '捕捉一只向帅帅',
      loading: false,
      list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      selected: '1',
      school: school,
      schoolList: [],
      gradeList: [],
      classList: [],
      select: 1,
      schoolName: '请选择',

      departmentList: shopData.departmentList,
      projectList: shopData.projectList,
      payName: "",
      supplier: "",
      supplierCode: "",
      departmentName: "",
      departmentCode: "",
      projectName: "",
      projectCode: "",
    }
  },
  methods: {
    loadMore () {
      this.loading = true
      setTimeout(() => {
        let last = this.list[this.list.length - 1]

        for (let i = 1; i <= 10; i++) {
          this.list.push(last + i)
        }
        this.loading = false
      }, 2500)
    },
    departmentChange: function (event) {
      // 选中的值
      var departmentName = event.target.value;
      // 查找选中的元素
      var departmentItem = shopData.departmentList.find(item=>item.name==departmentName);
      this.departmentCode = departmentItem.code;
    },
    typeChange: function (event) {
      // 根据学校类型，更改学校信息，年级信息，班级信息
      var schoolType = event.target.value;
      if ("幼儿园" == schoolType) {
        this.schoolList = this.school.schoolList.youeryuan;
        this.gradeList = this.school.gradeList.youeryuan;
        this.classList = this.school.classList.youeryuan;

        this.schoolName='请选择';
      } else if ("小学" == schoolType) {
        this.schoolList = this.school.schoolList.xiaoxue;
        this.gradeList = this.school.gradeList.xiaoxue;
        this.classList = this.school.classList.xiaoxue;
        this.schoolName='请选择';
      } else {
        this.schoolList = [];
        this.gradeList = [];
        this.classList = [];
      }
    }
  }
}
</script>

<style lang='less'>

</style>
