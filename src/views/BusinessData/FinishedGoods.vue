<template>
  <div class="app-container">
    <div class="search">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :content="content1" placement="top-start">
              <label class="radio-label">{{ $t('permission.supplyNo') }}:</label>
            </el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model="listQuery.supplyNo" :placeholder="$t('permission.supplyNoInfo')" clearable /></el-col>
        </el-col>
        <!--
        <el-col :span="8">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" content="创建时间" placement="top-start"><label class="radio-label">创建时间:</label></el-tooltip>
          </el-col>
          <el-col :span="16">
            <el-date-picker
              v-model="listQuery.importDate"
              type="daterange"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :clearable="false"
              :picker-options="pickerOptions"
              @change="importChange"
            />
          </el-col>
        </el-col> -->

        <el-col :span="4" class="textLeft">
          <el-button type="primary" icon="el-icon-search" @click="handleSearch">{{ $t('permission.search') }}</el-button>
          <el-button type="danger" icon="el-icon-refresh" @click="handleReset">{{ $t('permission.reset') }}</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="rightBtn">
      <el-button type="danger" icon="el-icon-delete" @click="deleteAll">{{ $t('permission.deleteAll') }}</el-button>
      <!-- <el-button type="primary" icon="el-icon-upload2" @click="okUpload">上传国网</el-button> -->
      <el-button type="primary" icon="el-icon-download" @click="okImprot">导入文件</el-button>
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

      <!-- <el-table-column align="center" label="创建时间" width="150">
        <template slot-scope="scope">
          {{ scope.row.createTime }}
        </template>
      </el-table-column>
 -->
      <el-table-column align="center" :label="$t('permission.upload')" width="100">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.isUpload === 0" class="classBlack">未上传</el-tag>
          <el-tag v-else-if="scope.row.isUpload === 2" class="classGreen">已上传</el-tag>
          <el-tag v-else class="classRed">上传失败</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.SaleOrg')" width="150" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.saleOrg }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.standardVersion')" width="150" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.standardVersion }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.supplierCode')" width="150" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.supplierCode }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.modelCode')" width="150" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.modelCode }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.categoryType')" width="150" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.categoryType }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.factoryCode')" width="150" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.factoryCode }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.pdCode')" width="150" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.pdCode }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.voltageGrade')" width="150" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.voltageGrade }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.processType')" width="150" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.processType }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.specifNumber')" width="150" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.specifNumber }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.isQualified')" width="150" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.isQualified }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.supplierWorkNo')" width="150" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.supplierWorkNo }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.productModelOther')" width="150" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.productModel }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.swId')" width="150" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.swId }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.supplierSupportIdTwo')" width="150" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.supplierSupportId }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.inventoryQuantity')" width="150" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.inventoryQuantity }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.measuringUnit')" width="150" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.measuringUnit }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.storageTime')" width="150" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.storageTime }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.deliveryStatus')" width="150" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.deliveryStatus }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.deliveryTime')" width="150" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.deliveryTime }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.checkTime')" width="150" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.checkTime }}
        </template>
      </el-table-column>

     <el-table-column align="center" :label="$t('permission.operations')" fixed="right" width="150">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope.$index, scope.row)">{{ $t('table.edit') }}</el-button>
          <el-button type="warning" size="small" @click="clickLogs(scope.row)">日志</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 编辑弹窗 -->
    <el-dialog title="编辑信息" :close-on-click-modal="false" :visible.sync="dialogFormVisible">
      <el-form ref="ruleForm" v-loading="editLoading" :model="ruleForm" :rules="rules" label-width="150px" class="demo-ruleForm">
        <div class="bigUpBox">
          <div class="boxLeft">
            <el-form-item label="工厂"><el-input v-model="ruleForm.saleOrg" :disabled="true" /></el-form-item>
            <el-form-item label="采集规范版本号"><el-input v-model="ruleForm.standardVersion" :disabled="true" /></el-form-item>
            <el-form-item label="国网侧供应商编码"><el-input v-model="ruleForm.supplierCode" :disabled="true" /></el-form-item>
            <el-form-item label="规格型号编码"><el-input v-model="ruleForm.modelCode" :disabled="true" /></el-form-item>
            <el-form-item label="物资种类编码"><el-input v-model="ruleForm.categoryType" :disabled="true" /></el-form-item>
            <el-form-item label="厂区编号"><el-input v-model="ruleForm.factoryCode" :disabled="true" /></el-form-item>
            <el-form-item label="工序"><el-input v-model="ruleForm.pdCode" :disabled="true" /></el-form-item>
            <el-form-item label="电压等级"><el-input v-model="ruleForm.voltageGrade" :disabled="true" /></el-form-item>
            <el-form-item label="感知过程"><el-input v-model="ruleForm.processType" :disabled="true" /></el-form-item>
            <el-form-item label="规格型号"><el-input v-model="ruleForm.specifNumber" :disabled="true" /></el-form-item>
            <el-form-item label="是否合格"><el-input v-model="ruleForm.isQualified" :disabled="true" /></el-form-item>
          </div>
          <div class="boxRight">
            <el-form-item label="采购方总部编码" prop="supplierWorkNo"><el-input v-model="ruleForm.supplierWorkNo"  /></el-form-item>
            <el-tooltip class="item" effect="dark" content="供应商数据唯一标识(序列号)" placement="top-start">
               <el-form-item label="供应商数据唯一标识(序列号)" prop="productModel"><el-input v-model="ruleForm.productModel"  /></el-form-item>
            </el-tooltip>
            <el-form-item label="实物ID" prop="swId"><el-input v-model="ruleForm.swId"  /></el-form-item>
            <el-form-item label="产品编号(物料号)" prop="supplierSupportId"><el-input v-model="ruleForm.supplierSupportId"  /></el-form-item>
            <el-form-item label="入库数量" prop="inventoryQuantity"><el-input v-model="ruleForm.inventoryQuantity"  /></el-form-item>
            <el-form-item label="计量单位" prop="measuringUnit"><el-input v-model="ruleForm.measuringUnit"  /></el-form-item>
            <el-form-item label="入库日期" prop="storageTime">
              <el-date-picker v-model="ruleForm.storageTime" type="datetime" format="yyyy-MM-dd hh:mm:ss" placeholder="选择日期时间"   />
            </el-form-item>
            <el-form-item label="发货状态" prop="deliveryStatus"><el-input v-model="ruleForm.deliveryStatus"  /></el-form-item>
            <el-form-item label="发货日期" prop="deliveryTime">
              <el-date-picker v-model="ruleForm.deliveryTime" type="datetime" format="yyyy-MM-dd hh:mm:ss" placeholder="选择日期时间"  />
            </el-form-item>
            <el-form-item label="采集时间" prop="checkTime">
              <el-date-picker v-model="ruleForm.checkTime" type="datetime" format="yyyy-MM-dd hh:mm:ss" placeholder="选择日期时间" />
            </el-form-item>
          </div>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      </div>
    </el-dialog>

    <!-- 日志弹出框 -->
    <log-dialog :is-show="dialogTableVisible" :log-total="logTotal" :pagination-log="paginationLog" :data="gridData" @pageChange="getLogList" @closeLog="closeLog" />

    <!-- 上传文件弹窗 -->
    <ImprotFile
      :dialog-visible="dialogVisible"
      :improt-loading="improtLoading"
      :production-url="productionUrl"
      @handleavatarsuccess="handleAvatarSuccess"
      @beforeavatarupload="beforeAvatarUpload"
      @fileClose="fileClose"
    />

    <pagination v-show="total > 0" :total="total" :current.sync="pagination.current" :size.sync="pagination.size" @pagination="getList" />
  </div>
</template>

<script>
import '../../styles/scrollbar.css'
import '../../styles/commentBox.scss'
import i18n from '@/lang'
import { cprkList, cprkDellte, cprkEdit, cprkUpload, allLogs } from '@/api/business'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import logDialog from '@/components/logDialog' // 日志封装
import ImprotFile from '@/components/ImprotFile' // 文件上传文件封装
const fixHeight = 270
export default {
  name: 'SupplyList',
  components: { Pagination, logDialog, ImprotFile },
  data() {
    return {
      productionUrl: this.GLOBAL.BASE_URL + '/api/eipStorage/import/file',
      // 日志分页
      paginationLog: {
        current: 1,
        size: 10
      },
      logTotal: 0,
      logId: {}, // 日志行数据
      tableData: [],
      gridData: [], // 日志信息
      ruleForm: {}, // 编辑弹窗
      pagination: {
        current: 1,
        size: 50
        // startTime: '',
        // endTime: ''
      },
      listQuery: {
        supplyNo: undefined
        // importDate: []
      },
      listLoading: true,
      editLoading: false, // 编辑loading
      improtLoading: false, // 导入文件进度loading
      total: 10,
      downloadLoading: false,
      selectedData: [], // 批量删除新数组
      tableHeight: window.innerHeight - fixHeight, // 表格高度
      dialogTableVisible: false, // 日志弹出框
      dialogVisible: false, // 文件上传弹出框
      dialogFormVisible: false, // 编辑弹出框
      content1: this.$t('permission.supplyNo'),
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近六个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 180)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      rules: {
        supplierWorkNo: [{ required: true, message: '请输入供应商工单编号', trigger: 'blur' }],
        productModel: [{ required: true, message: '请输入供应商数据唯一标识(序列号)', trigger: 'blur' }],
        swId: [{ required: true, message: '请输入实物ID', trigger: 'blur' }],
        supplierSupportId: [{ required: true, message: '请输入产品编号(物料号)', trigger: 'blur' }],
        inventoryQuantity: [{ required: true, message: '请输入入库数量', trigger: 'blur' }],
        measuringUnit: [{ required: true, message: '请输入计量单位', trigger: 'blur' }],
        storageTime: [{ required: true, message: '请输入入库日期', trigger: 'blur' }],
        deliveryStatus: [{ required: true, message: '请输入发货状态', trigger: 'blur' }],
        deliveryTime: [{ required: true, message: '请输入发货日期', trigger: 'blur' }],
        checkTime: [{ required: true, message: '请输入采集时间', trigger: 'blur' }],
      }
    }
  },
  computed: {},
  watch: {
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
    // 监听data属性中英文切换问题
    '$i18n.locale'() {
      this.content1 = this.$t('permission.supplyNo')
    }
    // 'listQuery.importDate': {
    //   handler(val) {
    //     this.pagination.startTime = val[0] + ' 00:00:00'
    //     this.pagination.endTime = val[1] + ' 23:59:59'
    //   },
    //   deep: true
    // }
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
  },
  methods: {
    // 改变搜索框开始结束时间触发
    // importChange(val) {
    //   this.listQuery.importDate[0] = val[0]
    //   this.listQuery.importDate[1] = val[1]
    // },
    // 查询
    handleSearch() {
      this.pagination.current = 1
      if (this.listQuery.supplyNo === '') {
        this.listQuery.supplyNo = undefined
      }
      this.getList()
    },
    // 重置
    handleReset() {
      this.listQuery = {
        supplyNo: undefined
        // importDate: [
        //   this.$moment(new Date())
        //     .subtract(1, 'months')
        //     .format('YYYY-MM-DD'),
        //   this.$moment(new Date()).format('YYYY-MM-DD')
        // ]
      }
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
    // 点击日志
    clickLogs(row) {
      this.logId = row
      allLogs(this.paginationLog, { dataId: row.id }).then(res => {
        if (res.data.records.length > 0) {
          this.dialogTableVisible = true
          this.gridData = res.data.records
          this.logTotal = res.data.total
        } else {
          this.dialogTableVisible = false
          this.$message('此条数据暂无操作日志！')
        }
      })
    },
    // 日志分页
    getLogList(val) {
      this.paginationLog = val
      this.clickLogs(this.logId)
    },
    //  关闭日志弹窗
    closeLog() {
      this.dialogTableVisible = false
    },
    // 批量删除
    deleteAll() {
      if (this.selectedData.length > 0) {
        this.$confirm(this.$t('table.deleteInfo'), this.$t('table.Tips') + this.$t('table.total') + this.selectedData.length + this.$t('table.dataInfo'), {
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
            cprkDellte(idList).then(res => {
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
              type: 'error',
              message: this.$t('table.deleteError')
            })
          })
      }
    },

    // 获取列表
    getList() {
      this.listLoading = true
      cprkList(this.pagination, this.listQuery).then(res => {
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
      this.ruleForm = JSON.parse(JSON.stringify(row))
      this.dialogFormVisible = true
    },
    // 编辑成功
    submitForm(formName) {
      this.editLoading = true
      this.$refs[formName].validate(valid => {
        if (valid) {
          cprkEdit(this.ruleForm).then(res => {
            if (res.code === 200) {
              this.$message({
                type: 'success',
                message: this.$t('table.editSuc')
              })
              this.editLoading = false
              this.dialogFormVisible = false
              this.getList()
            }
          })
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
    // 上传
    okUpload() {
      this.listLoading = true
      cprkUpload().then(res => {
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: '操作成功！'
          })
        }
        this.getList()
        this.listLoading = false
      })
    },
    // 文件导入
    okImprot() {
      this.dialogVisible = true
    },
    // 关闭导入文件弹窗
    fileClose() {
      this.dialogVisible = false
    },
    // 成功
    handleAvatarSuccess(res, file) {
      if (res.code === 200) {
        this.$message.success(this.$t('table.upSuccess'))
        this.dialogVisible = false
        this.improtLoading = false
        this.getList()
      } else {
        this.$message({
          message: res.message,
          type: 'error',
          duration: 5000
        })
        this.dialogVisible = false
        this.improtLoading = false
      }
    },
   // 文件上传前验证
   beforeAvatarUpload(file) {
     // const isXLS = file.type === 'application/vnd.ms-excel'
     // const isXLSX = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
     const isLt50M = file.size / 1024 / 1024 < 50

     // if (!isXLS || !isXLSX) {
     //   this.$message.error(this.$t('table.errorOne'))
     // }
     if (!isLt50M) {
       this.$message.error(this.$t('table.errorTwo'))
     }
     this.improtLoading = true
     return  isLt50M
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
