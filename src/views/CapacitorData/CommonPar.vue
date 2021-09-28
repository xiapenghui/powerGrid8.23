<template>
  <div class="app-container">
    <div class="search">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :content="content1" placement="top-start">
              <label class="radio-label">{{ $t('permission.supplierCode') }}:</label>
            </el-tooltip>
          </el-col>
          <el-col :span="16">
            <el-input v-model="listQuery.supplierCode" :placeholder="$t('permission.supplierCode')" clearable />
          </el-col>
        </el-col>

        <!-- <el-col :span="8">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" content="创建时间" placement="top-start"><label class="radio-label">创建时间:</label></el-tooltip>
          </el-col>
          <el-col :span="16">
            <el-date-picker
              v-model="listQuery.importDate"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :clearable="false"
              @change="importChange"
            />
          </el-col>
        </el-col> -->

        <el-col :span="4">
          <el-button type="primary" icon="el-icon-search" @click="handleSearch">{{ $t('permission.search') }}</el-button>
          <el-button type="danger" icon="el-icon-refresh" @click="handleReset">{{ $t('permission.reset') }}</el-button>
        </el-col>
      </el-row>
    </div>

    <div class="rightBtn">
      <el-button type="primary" icon="el-icon-circle-plus-outline" @click="handleAddUser">{{ $t('permission.parameter') }}</el-button>
      <el-button type="danger" icon="el-icon-delete" @click="deleteAll">{{ $t('permission.deleteAll') }}</el-button>
    </div>

    <el-table
      v-loading="listLoading"
      :header-cell-style="{ background: '#008284', color: '#ffffff' }"
      :data="tableData"
      :height="tableHeight"
      style="width: 100%"
      border
      element-loading-text="拼命加载中"
      fit
      highlight-current-row
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" align="center" width="55" fixed />

      <el-table-column align="center" :label="$t('permission.SaleOrg')"  width="150" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.salesOrg }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.tableName')"  width="150" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.tableName }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.standardVersion')"  width="150" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.standardVersion }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.supplierCode')"  width="150" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.supplierCode }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.modelCode')"  width="150" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.modelCode }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.categoryType')"  width="150" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.categoryType }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.isAlarmData')"  width="150" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.isAlarmData === 1 ? '是' : '否' }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.alarmItem')"  width="150" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.alarmItem  }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.processType')"  width="150" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.processType }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.pdCode')"  width="150" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.pdCode }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.operations')" fixed="right" width="150">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope.$index, scope.row)">{{ $t('table.edit') }}</el-button>
        </template>
      </el-table-column>

    </el-table>

    <!-- 编辑弹窗 -->
    <el-dialog :close-on-click-modal="false" :visible.sync="dialogFormVisible" :title="dialogType === 'edit' ? $t('permission.editSupplier') : $t('permission.addSupplier')">
      <el-form
        ref="ruleForm"
        v-loading="editLoading"
        :model="ruleForm"
        :rules="rules"
        label-width="200px"
        label-position="left"
      >

        <el-form-item label="工厂" prop="salesOrg">
          <el-select v-model="ruleForm.salesOrg" placeholder="请选择">
            <el-option v-for="item in salesOrgList" :key="item.id" :label="item.saleOrg" :value="item.id" />
          </el-select>
        </el-form-item>

        <el-form-item label="产品名称" prop="tableName">
          <el-input v-model="ruleForm.tableName" />
        </el-form-item>

        <el-form-item label="采集规范版本号默认:1" prop="standardVersion">
          <el-input v-model="ruleForm.standardVersion" />
        </el-form-item>
        <el-form-item label="国网侧供应商编码" prop="supplierCode">
          <el-input v-model="ruleForm.supplierCode" />
        </el-form-item>
        <el-form-item label="规格型号编码" prop="supplierCode">
          <el-input v-model="ruleForm.modelCode" />
        </el-form-item>
        <el-form-item label="物资品类类型" prop="categoryType">
          <el-input v-model="ruleForm.categoryType" />
        </el-form-item>
        <el-form-item label="厂区编号" prop="factoryCode">
          <el-input v-model="ruleForm.factoryCode" />
        </el-form-item>
        <el-form-item label="是否是告警问题数据" prop="isAlarmData">
          <el-select v-model="ruleForm.isAlarmData" placeholder="请选择">
            <el-option v-for="item in isAlarmDataList" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>

        <el-form-item label="告警项" prop="alarmItem" :rules="[{ required: isAlarmItem, message: '请输入告警项', trigger: 'blur' }]">
          <el-input v-model="ruleForm.alarmItem" />
        </el-form-item>
        <el-form-item label="感知过程默认1" prop="processType">
          <el-input v-model="ruleForm.processType" />
        </el-form-item>
        <el-form-item label="工序默认" prop="pdCode">
          <el-input v-model="ruleForm.pdCode" />
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      </div>
    </el-dialog>
    <pagination
      v-show="total > 0"
      :total="total"
      :current.sync="pagination.current"
      :size.sync="pagination.size"
      @pagination="getList"
    />
  </div>
</template>

<script>
import '../../styles/scrollbar.css'
import '../../styles/commentBox.scss'
import i18n from '@/lang'
import {
  drqList,
  drqDellte,
  drqEdit,
  drqAdd,
  saleOrg
} from '@/api/business'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination4
const fixHeight = 280
export default {
  components: {
    Pagination
  },
  data() {
    return {
      // 日志分页
      paginationLog: {
        current: 1,
        size: 10
      },
      logTotal: 0,
      tableData: [],
      ruleForm: {}, // 编辑弹窗
      pagination: {
        current: 1,
        size: 50
        // startTime: '',
        // endTime: ''
      },
      listQuery: {
        supplierCode: undefined
        // importDate: []
      },
      listLoading: true,
      editLoading: false, // 编辑loading
      total: 10,
      selectedData: [], // 批量删除新数组
      tableHeight: window.innerHeight - fixHeight, // 表格高度
      dialogFormVisible: false, // 编辑弹出框
      content1: this.$t('permission.supplierCode'),
      dialogType: 'new',
      salesOrgList: [],
      isAlarmItem: false,
      isAlarmDataList: [{
        value: 0,
        label: '否'
      },
      {
        value: 1,
        label: '是'
      }
      ],

      rules: {
        salesOrg: [{
          required: true,
          message: '请输入工厂',
          trigger: 'blur'
        }],
        tableName: [{
          required: true,
          message: '请输入产品名称',
          trigger: 'blur'
        }],
        standardVersion: [{
          required: true,
          message: '请输入采集规范版本号默认',
          trigger: 'blur'
        }],
        supplierCode: [{
          required: true,
          message: '请输入国网侧供应商编码',
          trigger: 'blur'
        }],
        modelCode: [{
          required: true,
          message: '请输入规格型号编码',
          trigger: 'blur'
        }],
        categoryType: [{
          required: true,
          message: '请输入物资品类类型',
          trigger: 'blur'
        }],
        factoryCode: [{
          required: true,
          message: '厂区编号',
          trigger: 'blur'
        }],
        isAlarmData: [{
          required: true,
          message: '请输入是否是告警问题数据',
          trigger: 'blur'
        }],
        alarmItem: [{
          required: true,
          message: '请输入告警项',
          trigger: 'blur'
        }],
        processType: [{
          required: true,
          message: '请输入感知过程',
          trigger: 'blur'
        }],
        pdCode: [{
          required: true,
          message: '请输入工序',
          trigger: 'blur'
        }]
      }
    }
  },
  computed: {},
  watch: {

    // 监听警告0或1
    'ruleForm.isAlarmData': {
      handler(val) {
        val = this.ruleForm.isAlarmData
        if (val === 0) {
          this.isAlarmItem = false
        } else {
          this.isAlarmItem = true
        }
      }
    },
    // 监听表格高度
    tableHeight(val) {
      if (!this.timer) {
        this.tableHeight = val
        this.timer = true
        const that = this
        setTimeout(function() {
          that.timer = false
        }, 400)
      }
    },
    // 'listQuery.importDate': {
    //   handler(val) {
    //     this.pagination.startTime = val[0] + ' 00:00:00'
    //     this.pagination.endTime = val[1] + ' 23:59:59'
    //   },
    //   deep: true
    // },
    // 监听data属性中英文切换问题
    '$i18n.locale'() {
      this.content1 = this.$t('permission.supplierWorkNo')
    }
  },
  created() {
    // 搜索框初始化开始结束时间
    // this.listQuery.importDate[0] = this.$moment(new Date())
    //   .subtract(1, 'months')
    //   .format('YYYY-MM-DD 00:00:00')
    // this.listQuery.importDate[1] = this.$moment(new Date()).format('YYYY-MM-DD 23:59:59')
    // this.pagination.startTime = this.listQuery.importDate[0]
    // this.pagination.endTime = this.listQuery.importDate[1]
    // 监听表格高度
    const that = this
    window.onresize = () => {
      return (() => {
        that.tableHeight = window.innerHeight - fixHeight
      })()
    }
    this.getList()
    this.getSaleOrg() // 获取所有工厂
  },
  methods: {
    // // 改变搜索框开始结束时间触发
    // importChange(val) {
    //   this.listQuery.importDate[0] = val[0]
    //   this.listQuery.importDate[1] = val[1]
    // },
    // 查询
    handleSearch() {
      this.pagination.current = 1
      if (this.listQuery.supplierCode === '') {
        this.listQuery.supplierCode = undefined
      }
      this.getList()
    },
    // 重置
    handleReset() {
      // this.listQuery = {
      //   supplierCode: undefined,
      //   importDate: [
      //     this.$moment(new Date())
      //       .subtract(1, 'months')
      //       .format('YYYY-MM-DD'),
      //     this.$moment(new Date()).format('YYYY-MM-DD')
      //   ]
      // }
      this.pagination = {
        current: 1,
        size: 50
      }
      this.getList()
    },

    // 多选
    handleSelectionChange(val) {
      this.selectedData = val
    },

    // 批量删除
    deleteAll() {
      if (this.selectedData.length > 0) {
        this.$confirm(this.$t('table.deleteInfo'), this.$t('table.Tips') + this.$t('table.total') + this.selectedData
          .length + this.$t('table.dataInfo'), {
          confirmButtonText: this.$t('table.confirm'),
          cancelButtonText: this.$t('table.cancel'),
          type: 'warning'
        })
          .then(() => {
            const idList = []
            this.selectedData.map(item => {
              const newFeatid = item.id
              idList.push(newFeatid)
            })
            drqDellte(idList).then(res => {
              if (res.code === 200) {
                this.$message({
                  type: 'success',
                  message: res.message
                })
                this.getList()
              }
            })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: this.$t('table.deleteError')
            })
          })
      }
    },
    // 增加角色
    handleAddUser() {
      this.dialogType = 'new'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs.ruleForm.clearValidate()
      })
      this.ruleForm = {}
    },

    // 获取列表
    getList() {
      this.listLoading = true
      drqList(this.pagination, this.listQuery).then(res => {
        this.tableData = res.data.records
        this.total = res.data.total
        this.listLoading = false
      })
    },
    i18n(routes) {
      const app = routes.map(route => {
        route.title = i18n.t(`route.${route.title}`)
        if (route.children) {
          route.children = this.i18n(route.children)
        }
        return route
      })
      return app
    },
    // 编辑
    handleEdit(index, row) {
      this.dialogType = 'edit'
      this.dialogFormVisible = true
      this.ruleForm = JSON.parse(JSON.stringify(row))
      this.$nextTick(() => {
        this.$refs.ruleForm.clearValidate()
      })
    },
    // 编辑成功
    tipsFn() {
      this.$message({
        type: 'success',
        message: this.$t('table.editSuc')
      })
      this.editLoading = false
      this.dialogFormVisible = false
      this.getList()
    },
    // 编辑成功
    submitForm(formName) {
      this.editLoading = true
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.dialogType === 'edit') {
            drqEdit(this.ruleForm).then(res => {
              if (res.code === 200) {
                this.tipsFn()
              }
            })
            this.editLoading = false
          } else {
            drqAdd(this.ruleForm).then(res => {
              console.log('1111', this.ruleForm)
              if (res.code === 200) {
                this.tipsFn()
              }
            })
            this.editLoading = false
          }
        } else {
          this.editLoading = false
          this.$message({
            type: 'error',
            message: '必填项不能为空'
          })
          return false
        }
      })
    },

    // 获取所有工厂
    getSaleOrg() {
      saleOrg().then(res => {
        this.salesOrgList = res.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  ::v-deep .el-form-item__label {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
