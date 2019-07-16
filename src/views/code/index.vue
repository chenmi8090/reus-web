<template>

  <el-container style="min-height: 900px; border: 1px solid #eee;">

    <el-dialog title="选择路径" :visible.sync="dialogTableVisible">
      <el-tree :props="defaultProps" :load="loadNode" @node-click="handleTreeClick" lazy></el-tree>
    </el-dialog>

    <el-dialog title="选择路径" :visible.sync="dialogTableImplVisible">
      <el-tree :props="defaultProps" :load="loadNode" @node-click="handleTreeClickByImpl" lazy></el-tree>
    </el-dialog>

    <el-dialog
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      title="新建数据库连接"
      width="30%">
      <el-form ref="saveForm" :model="saveForm" :rules="rules" label-width="180px">
        <el-row type="flex" justify="start">
          <el-col :span="20">
            <el-form-item label="保存名称" prop="connectionName">
              <el-input v-model="saveForm.connectionName" size="mini"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="start">
          <el-col :span="20">
            <el-form-item label="数据库类型" prop="databaseType">
              <el-select v-model="saveForm.databaseType" placeholder="请选择" size="mini">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="start">
          <el-col :span="20">
            <el-form-item label="主机名/IP地址" prop="hostName">
              <el-input v-model="saveForm.hostName" name="hostName" size="mini"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="start">
          <el-col :span="11">
            <el-form-item label="端口号" prop="port">
              <el-input v-model="saveForm.port" name="port" size="mini"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="start">
          <el-col :span="17">
            <el-form-item label="用户名" prop="userName">
              <el-input v-model="saveForm.userName" name="userName" size="mini"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="start">
          <el-col :span="17">
            <el-form-item label="密码" prop="password">
              <el-input
                v-model="saveForm.password"
                name="password"
                auto-complete="new-password"
                type="text"
                size="mini"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="start">
          <el-col :span="17">
            <el-form-item label="Schema/数据库" prop="database">
              <el-input v-model="saveForm.database" name="database" size="mini"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="start">
          <el-col :span="17">
            <el-form-item label="编码" prop="encoding">
              <el-select v-model="saveForm.encoding" name="encoding" placeholder="请选择" size="mini">
                <el-option
                  v-for="item in optionsEncoding"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialogNewConnection('saveForm')">取 消</el-button>
        <el-button type="primary" @click="saveNewConnection('saveForm')">确 定</el-button>
      </span>
    </el-dialog>


    <el-dialog
      :visible.sync="dialogEditVisible"
      :before-close="handleClose"
      title="修改数据库连接"
      width="30%">
      <el-form ref="updForm" :model="updForm" :rules="rules" label-width="180px">
        <el-row type="flex" justify="start">
          <el-col :span="20">
            <el-form-item label="保存名称" prop="connectionName">
              <el-input v-model="updForm.connectionName" size="mini"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="start">
          <el-col :span="20">
            <el-form-item label="数据库类型" prop="databaseType">
              <el-select v-model="updForm.databaseType" placeholder="请选择" size="mini">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="start">
          <el-col :span="20">
            <el-form-item label="主机名/IP地址" prop="hostName">
              <el-input v-model="updForm.hostName" name="hostName" size="mini"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="start">
          <el-col :span="11">
            <el-form-item label="端口号" prop="port">
              <el-input v-model="updForm.port" name="port" size="mini"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="start">
          <el-col :span="17">
            <el-form-item label="用户名" prop="userName">
              <el-input v-model="updForm.userName" name="userName" size="mini"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="start">
          <el-col :span="17">
            <el-form-item label="密码" prop="password">
              <el-input
                v-model="updForm.password"
                name="password"
                type="text"
                auto-complete="new-password"
                size="mini"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="start">
          <el-col :span="17">
            <el-form-item label="Schema/数据库" prop="database">
              <el-input v-model="updForm.database" name="database" size="mini"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="start">
          <el-col :span="17">
            <el-form-item label="编码" prop="encoding">
              <el-select v-model="updForm.encoding" name="encoding" placeholder="请选择" size="mini">
                <el-option
                  v-for="item in optionsEncoding"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialogUpdateConnection('updForm')">取 消</el-button>
        <el-button type="primary" @click="updateConnection(updForm)">确 定</el-button>
      </span>
    </el-dialog>


    <el-aside style="height: 1500px; width : 430px" aria-expanded=true>
      <el-button type="primary" icon="el-icon-menu" size="medium" @click="openDialogNewConnection">添加连接</el-button>
      <el-button type="primary" icon="el-icon-tickets" size="medium">配置</el-button>
      <el-tooltip
        class="item"
        effect="dark"
        placement="top-start"
        style="vertical-align: middle; width: 1em; height: 1em; margin-left: 6em; margin-top: 1em;  white-space: pre-wrap;">
        <div slot="content"> 操作步骤：<br> 1.添加连接，指定对应的数据源 <br> 2.选择对应连接，加载该数据源下的所有表记录 <br> 3.双击表结构，点击代码生成</div>
        <svg-icon icon-class="tip"/>
      </el-tooltip>
      <el-row class="tac">
        <el-col :span="25">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleSelect"
            @contextmenu.prevent.native="$easycm($event,$root)">
            <el-submenu v-for="connection in connections" :index="connection.key" :key="connection.key"
                        style="width: 400px">
              <template slot="title">
                <div
                  id="myContext"
                  @contextmenu="showMenu(connection.index)"
                  style="width: 390px;height: 56px;">
                  <i class="el-icon-setting"/>
                  <span>{{ connection.key }}</span>
                  <vue-context-menu style="width: 150px;height: 86px"
                                    :contextMenuData="contextMenuData"
                                    :transferIndex="transferIndex"
                                    @updateDate="updateCheckConnection(connection.key)"
                                    @deleteDate="deleteCheckConnection(connection.key)">
                  </vue-context-menu>
                </div>
              </template>
              <el-menu-item v-for="table in connection.tables" :index="table" @click="handleClick(table,connection)">
                <i class="el-icon-rank"/>
                <span slot="title" style="width: 400px">{{ table }}</span>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-col>
      </el-row>
    </el-aside>

    <el-container>
      <el-form :rules="rules" ref="form" :model="form" label-width="180px">
        <el-collapse v-model="activeNames" class="collapse-title">
          <el-collapse-item title="Controller" name="1" accordion>
            <el-row>
              <el-form-item label="Controller类包名">
                <el-col :span="12">
                  <el-input v-model="form.controller.packageName"/>
                </el-col>
                <el-switch
                  style="margin-left: 100px;"
                  v-model="form.controller.generate"
                  inactive-text="是否生成"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  :span="12">
                </el-switch>
              </el-form-item>
            </el-row>
            <el-form-item style="margin-top: 10px" prop="controllerPath" label="路径">
              <el-col :span="12">
                <el-input v-model="form.controller.path" disabled/>
              </el-col>
              <el-button type="primary" style="margin-left: 100px;"
                         @click="dialogTableVisible = true; myOptionItem = form.controller; myOptionItemType= 1" plain>
                选择路径
              </el-button>
            </el-form-item>
          </el-collapse-item>
        </el-collapse>
        <el-collapse v-model="activeNames" class="collapse-title">
          <el-collapse-item title="Service" name="2" accordion>
            <el-row>
              <el-form-item label="Service类包名">
                <el-col :span="12">
                  <el-input v-model="form.service.packageName"/>
                </el-col>
                <el-switch
                  style="margin-left: 100px;"
                  v-model="form.service.generate"
                  inactive-text="是否生成"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  :span="12">
                </el-switch>
              </el-form-item>
            </el-row>
            <el-form-item style="margin-top: 10px" prop="servicePath" label="路径">
              <el-col :span="12">
                <el-input v-model="form.service.path" disabled/>
              </el-col>
              <el-button type="primary" style="margin-left: 100px;"
                         @click="dialogTableVisible = true; myOptionItem = form.service; myOptionItemType= 2" plain>选择路径
              </el-button>
            </el-form-item>
          </el-collapse-item>
        </el-collapse>
        <el-collapse v-model="activeNames" class="collapse-title">
          <el-collapse-item title="Facade" name="4" accordion>
            <el-row>
              <el-form-item style="margin-top: 10px" label="Facade类包名">
                <el-col :span="12">
                  <el-input v-model="form.facade.packageName"/>
                </el-col>
                <el-switch
                  style="margin-left: 100px;"
                  v-model="form.facade.generate"
                  inactive-text="是否生成"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  :span="12">
                </el-switch>
              </el-form-item>
            </el-row>
            <el-form-item style="margin-top: 10px" prop="facadePath" label="路径">
              <el-col :span="12">
                <el-input v-model="form.facade.path" disabled/>
              </el-col>
              <el-button type="primary" style="margin-left: 100px;"
                         @click="dialogTableVisible = true; myOptionItem = form.facade; myOptionItemType= 4 " plain>选择路径
              </el-button>
            </el-form-item>
            <el-form-item style="margin-top: 20px" prop="facadeImplPath" label="Impl路径">
              <el-col :span="12">
                <el-input v-model="facadeImplPath" disabled/>
              </el-col>
              <el-button type="primary" style="margin-left: 100px;"
                         @click="dialogTableImplVisible = true; myOptionItemType= 9 " plain>选择路径
              </el-button>
            </el-form-item>
          </el-collapse-item>
        </el-collapse>
        <el-collapse v-model="activeNames" class="collapse-title">
          <el-collapse-item title="DTO" name="5" accordion>
            <el-row>
              <el-form-item label="DTO类包名">
                <el-col :span="12">
                  <el-input v-model="form.dto.packageName"/>
                </el-col>
                <el-switch
                  style="margin-left: 100px;"
                  v-model="form.dto.generate"
                  inactive-text="是否生成"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  :span="12">
                </el-switch>
              </el-form-item>
            </el-row>
            <el-form-item style="margin-top: 10px" prop="dtoPath" label="路径">
              <el-col :span="12">
                <el-input v-model="form.dto.path" disabled/>
              </el-col>
              <el-button type="primary" style="margin-left: 100px;"
                         @click="dialogTableVisible = true; myOptionItem = form.dto; myOptionItemType= 5" plain>选择路径
              </el-button>
            </el-form-item>
          </el-collapse-item>
        </el-collapse>
        <el-collapse v-model="activeNames" class="collapse-title">
          <el-collapse-item title="MainService" name="3" accordion>
            <el-row>
              <el-form-item label="MainService类包名">
                <el-col :span="12">
                  <el-input v-model="form.mainService.packageName"/>
                </el-col>
                <el-switch
                  style="margin-left: 100px;"
                  v-model="form.mainService.generate"
                  inactive-text="是否生成"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  :span="12">
                </el-switch>
              </el-form-item>
            </el-row>
            <el-form-item style="margin-top: 10px" prop="mainServicePath" label="路径">
              <el-col :span="12">
                <el-input v-model="form.mainService.path" disabled/>
              </el-col>
              <el-button type="primary" style="margin-left: 100px;"
                         @click="dialogTableVisible = true; myOptionItem = form.mainService; myOptionItemType= 3" plain>
                选择路径
              </el-button>
            </el-form-item>
          </el-collapse-item>
        </el-collapse>
        <el-collapse v-model="activeNames" class="collapse-title">
          <el-collapse-item title="Mapper" name="6" accordion>
            <el-row>
              <el-form-item label="Mapper类包名">
                <el-col :span="12">
                  <el-input v-model="form.mapper.packageName"/>
                </el-col>
                <el-switch
                  style="margin-left: 100px;"
                  v-model="form.mapper.generate"
                  inactive-text="是否生成"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  :span="12">
                </el-switch>
              </el-form-item>
              <el-form-item style="margin-top: 20px" prop="mapperFileName" label="Xml文件名称（自定义）">
                <el-col :span="12">
                  <el-input v-model="form.mapper.name"/>
                </el-col>
              </el-form-item>
            </el-row>
            <el-form-item style="margin-top: 10px" prop="mapperPath" label="路径">
              <el-col :span="12">
                <el-input v-model="form.mapper.path" disabled/>
              </el-col>
              <el-button type="primary" style="margin-left: 100px;"
                         @click="dialogTableVisible = true; myOptionItem = form.mapper; myOptionItemType= 6" plain>选择路径
              </el-button>
            </el-form-item>
            <el-form-item style="margin-top: 20px" prop="mapperXmlPath" label="Xml路径">
              <el-col :span="12">
                <el-input v-model="xmlPath" disabled/>
              </el-col>
            </el-form-item>
          </el-collapse-item>
        </el-collapse>

        <el-collapse v-model="activeNames" class="collapse-title">
          <el-collapse-item title="Entity" name="7" accordion>
            <el-row>
              <el-form-item label="Entity类包名">
                <el-col :span="12">
                  <el-input v-model="form.entity.packageName"/>
                </el-col>
                <el-switch
                  style="margin-left: 100px;"
                  v-model="form.entity.generate"
                  inactive-text="是否生成"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  :span="12">
                </el-switch>
              </el-form-item>
            </el-row>
            <el-form-item prop="entityPath" style="margin-top: 10px" label="路径">
              <el-col :span="12">
                <el-input v-model="form.entity.path" disabled/>
              </el-col>
              <el-button type="primary" style="margin-left: 100px;"
                         @click="dialogTableVisible = true; myOptionItem = form.entity; myOptionItemType= 8;"
                         plain>选择路径
              </el-button>
            </el-form-item>
          </el-collapse-item>
        </el-collapse>

        <el-collapse v-model="activeNames" class="collapse-title">
          <el-collapse-item title="其他" name="8" accordion>
            <el-row>
              <el-form-item label="表名">
                <el-col :span="6">
                  <el-input v-model="form.tableName" :disabled="true"/>
                </el-col>
              </el-form-item>
              <el-form-item prop="authorName" style="margin-top: 20px" label="作者名">
                <el-col :span="12">
                  <el-input v-model="form.author"/>
                </el-col>
              </el-form-item>
              <el-form-item>
                <el-col hidden="hidden" :span="12">
                  <el-switch
                    v-model="form.isPaging"
                    active-text="分页"/>
                  <el-switch
                    v-model="form.isPaging"
                    active-text="生成注释"/>
                </el-col>
              </el-form-item>
            </el-row>
          </el-collapse-item>
        </el-collapse>
        <el-button style="margin-left: 100px;" type="success" @click="generateCode('form')">代码生成</el-button>
        <el-button type="primary">确定</el-button>
      </el-form>
    </el-container>
  </el-container>
</template>
<script>
  import {setLocalStorage, getLocalStorage, removeLocalStorage} from '@/utils/storage.js'
  import 'element-ui/lib/theme-chalk/index.css';
  import {doPost} from '../../utils/http'
  import '../../utils/array'

  export default {
    data() {
      var controllerPath = (rule, value, callback) => {
        if (this.form.controller.generate) {
          if (this.form.controller.path === '') {
            callback(new Error('请选择网关层的Controller类生成路径'));
          } else {
            callback();
          }
        } else {
          callback();
        }
      };
      var servicePath = (rule, value, callback) => {
        if (this.form.service.generate) {
          if (this.form.service.path === '') {
            callback(new Error('请选择网关层的Service类生成路径'));
          } else {
            callback();
          }
        } else {
          callback();
        }
      };
      var facadePath = (rule, value, callback) => {
        if (this.form.facade.generate) {
          if (this.form.facade.path === '') {
            callback(new Error('请选择Facade类的生成路径'));
          } else {
            callback();
          }
        } else {
          callback();
        }
      };
      var facadeImplPath = (rule, value, callback) => {
        if (this.form.facade.generate) {
          if (this.facadeImplPath === '') {
            callback(new Error('请选择Facade实现类的生成路径'));
          } else {
            callback();
          }
        } else {
          callback();
        }
      };
      var dtoPath = (rule, value, callback) => {
        if (this.form.dto.generate) {
          if (this.form.dto.path === '') {
            callback(new Error('请选择DTO类的生成路径'));
          } else {
            callback();
          }
        } else {
          callback();
        }
      };
      var mainServicePath = (rule, value, callback) => {
        if (this.form.mainService.generate) {
          if (this.form.mainService.path === '') {
            callback(new Error('请选择Main层的Service类生成路径'));
          } else {
            callback();
          }
        } else {
          callback();
        }
      };
      var mapperFileName = (rule, value, callback) => {
        if (this.form.mapper.generate) {
          if (this.form.mapper.name === '') {
            callback(new Error('Xml文件名称不能为空'));
          } else {
            callback();
          }
        } else {
          callback();
        }
      };
      var mapperPath = (rule, value, callback) => {
        if (this.form.mapper.generate) {
          if (this.form.mapper.path === '') {
            callback(new Error('请选择Mapper类的生成路径'));
          } else {
            callback();
          }
        } else {
          callback();
        }
      };
      var mapperXmlPath = (rule, value, callback) => {
        if (this.form.mapper.generate) {
          if (this.form.mapper.path === '') {
            callback(new Error('请选择Xml文件的生成路径'));
          } else {
            callback();
          }
        } else {
          callback();
        }
      };
      var entityPath = (rule, value, callback) => {
        if (this.form.entity.generate) {
          if (this.form.entity.path === '') {
            callback(new Error('请选择Entity类的生成路径'));
          } else {
            callback();
          }
        } else {
          callback();
        }
      };
      var authorName = (rule, value, callback) => {
        if (this.form.author === '') {
          callback(new Error('请输入作者名称'));
        } else {
          callback();
        }
      };
      return {
        transferIndex: null,
        contextMenuData: {
          menuName: 'demo',
          axis: {
            x: null,
            y: null
          },
          menulists: [
            {
              fnHandler: 'updateDate',
              icoName: 'el-icon-edit',
              btnName: '修改'
            },
            {
              fnHandler: 'deleteDate',
              icoName: 'el-icon-delete',
              btnName: '删除'
            }
          ]
        },
        xmlPath: '',
        facadeImplPath: '',
        myOptionItem: null,
        myOptionItemType: null,
        dialogTableXmlVisible: false,
        dialogTableImplVisible: false,
        dialogTableVisible: false,
        defaultProps: {
          children: 'children',
          label: 'label',
          value: 'value',
          id: 'id'
        },
        directory: [{
          id: '1',
          label: '/',
          value: '/',
          children: []
        }],
        activeNames: ['1', '2', '3', '4', '5', '6', '7', '8'],
        tip: '操作步骤：1.添加连接，指定对应的数据源 <br/> 2.选择对应连接，加载该数据源下的所有表记录 <br/> 3.双击表结构，点击代码生成',
        rightClickMenuDel: [{
          text: '编辑',
          icon: 'iconfont icon-bofang', // 选填 字体图标 class
        }, {
          text: '删除',
          icon: 'iconfont icon-bofang', // 选填 字体图标 class
        }],
        connections: [],
        connectionsNew: [],
        // tables: [],
        optionsEncoding: [
          {
            value: '1',
            label: 'utf-8'
          },
          {
            value: '2',
            label: 'gb2312'
          },
          {
            value: '3',
            label: 'gbk'
          }
        ],
        delConnection: null,
        fileName: '',
        options: [{
          value: '1',
          label: 'MySQL'
        }, {
          value: '2',
          label: 'MySQL_v8'
        }, {
          value: '3',
          label: 'Oracle'
        }, {
          value: '4',
          label: 'IBM DB2'
        }, {
          value: '5',
          label: 'PostgreSQL'
        }, {
          value: '6',
          label: 'SQL_Server'
        }, {
          value: '7',
          label: 'Sqllite'
        }],
        value: '',
        dialogEditVisible: false,
        saveForm: {
          index: -1,
          connectionName: '',
          databaseType: '',
          hostName: '',
          port: '',
          userName: '',
          password: '',
          database: '',
          encoding: ''
        },
        updForm: {
          index: -1,
          connectionName: '',
          databaseType: '',
          hostName: '',
          port: '',
          userName: '',
          password: '',
          database: '',
          encoding: ''
        },
        connectionForm: {
          index: -1,
          connectionName: '',
          databaseType: '',
          hostName: '',
          port: '',
          userName: '',
          password: '',
          database: '',
          encoding: ''
        },
        form: {
          isPaging: true,
          tableName: 't_xxx',
          encoding: '',
          author: 'minivision',
          controller: {
            name: 'XxxController',
            packageName: 'com.minivision.sms.agw.gateway.controller.xxx',
            path: '',
            generate: true
          },
          service: {
            name: 'XxxService',
            packageName: 'com.minivision.sms.agw.gateway.service.xxx',
            path: '',
            generate: true
          },
          dto: {
            name: 'XxxDTO',
            packageName: 'com.minivision.sms.api.domain.dto.xxx',
            path: '',
            generate: true
          },
          entity: {
            id: 'XxxId',
            name: 'Xxx',
            packageName: 'com.minivision.sms.main.domain.entity.xxx',
            path: '',
            generate: true
          },
          mapper: {
            name: 'XxxMapper',
            packageName: 'com.minivision.sms.main.domain.mapper.xxx',
            path: '',
            generate: true
          },
          facade: {
            name: 'XxxFacade',
            packageName: 'com.minivision.sms.api.domain.facade.xxx',
            path: '',
            generate: true
          },
          mainService: {
            name: 'XxxService',
            packageName: 'com.minivision.sms.main.domain.service.xxx',
            path: '',
            generate: true
          },
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        sortType: '',
        dialogVisible: false,
        aaa: false,
        nowConnectionKey: '',
        filePath: '',

        rules: {
          controllerPath: [
            {validator: controllerPath, trigger: 'change'}
          ],
          servicePath: [
            {validator: servicePath, trigger: 'change'}
          ],
          dtoPath: [
            {validator: dtoPath, trigger: 'change'}
          ],
          facadePath: [
            {validator: facadePath, trigger: 'change'}
          ],
          facadeImplPath: [
            {validator: facadeImplPath, trigger: 'change'}
          ],
          mainServicePath: [
            {validator: mainServicePath, trigger: 'change'}
          ],
          mapperFileName: [
            {validator: mapperFileName, trigger: 'change'}
          ],
          mapperPath: [
            {validator: mapperPath, trigger: 'change'}
          ],
          mapperXmlPath: [
            {validator: mapperXmlPath, trigger: 'change'}
          ],
          entityPath: [
            {validator: entityPath, trigger: 'change'}
          ],
          authorName: [
            {validator: authorName, trigger: 'change'}
          ],
          connectionName: [
            {required: true, message: '请输入连接名称', trigger: 'blur'}
          ],
          databaseType: [
            {required: true, message: '请选择数据类型', trigger: 'blur'}
          ],
          hostName: [
            {required: true, message: '请输入主机名/IP地址', trigger: 'blur'}
          ],
          port: [
            {required: true, message: '请输入端口号', trigger: 'blur'}
          ],
          userName: [
            {required: true, message: '请输入用户名', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ],
          database: [
            {required: true, message: '请输入Schema/数据库', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      updateCheckConnection(key) {
        this.nowConnectionKey = key
        const that = this
        const localStorage = getLocalStorage(key);
        const json = JSON.parse(localStorage);
        that.updForm =
          {
            index: -1,
            connectionName: json.connectionName,
            databaseType: json.databaseType,
            hostName: json.hostName,
            port: json.port,
            userName: json.userName,
            password: json.password,
            database: json.database,
            encoding: json.encoding
          }
        this.dialogEditVisible = true
      }
      ,
      deleteCheckConnection(key) {
        const cons = JSON.parse(getLocalStorage('connectionsIndex'))
        removeLocalStorage(key)
        for (const obj of cons) {
          if (obj.key === key) {
            for (let i = 0; i < cons.length; i++) {
              if (obj.index < cons[i].index) {
                cons[i].index = cons[i].index - 1
              }
            }
            cons.remove(obj)
            setLocalStorage('connectionsIndex', JSON.stringify(cons))
            break
          }
        }
        this.loadConnection()
      }
      ,
      showMenu(index) {
        let myContext = document.getElementById('myContext')
        let myContextList = myContext.getElementsByClassName('vue-contextmenu-listWrapper')
        this.transferIndex = index; // tranfer index to child component
        event.preventDefault();
        var x = event.clientX;
        var y = event.clientY;
        this.contextMenuData.axis = {
          x,
          y
        };
      }
      ,
      handleTreeClickByXml(data) {
        this.dialogTableXmlVisible = false
        this.xmlPath = data.value + '\\src\\main\\resources\\'
      }
      ,
      handleTreeClickByImpl(data) {
        this.dialogTableImplVisible = false
        if (this.form.entity.path === '') {
          this.form.entity.path = data.value + '\\src\\main\\java\\'
        }
        if (this.form.mapper.path === '') {
          this.form.mapper.path = data.value + '\\src\\main\\java\\'
        }
        if (this.form.mainService.path === '') {
          this.form.mainService.path = data.value + '\\src\\main\\java\\'
        }
        this.xmlPath = data.value + '\\src\\main\\resources\\'
        this.facadeImplPath = data.value + '\\src\\main\\java\\'
      }
      ,
      handleTreeClick(data) {
        this.dialogTableVisible = false
        if (this.myOptionItemType === 1 && this.form.service.path === '') {
          this.form.service.path = data.value + '\\src\\main\\java\\'
        }
        if (this.myOptionItemType === 2 && this.form.controller.path === '') {
          this.form.controller.path = data.value + '\\src\\main\\java\\'
        }

        if (this.myOptionItemType === 4 && this.form.dto.path === '') {
          this.form.dto.path = data.value + '\\src\\main\\java\\'
        }
        if (this.myOptionItemType === 5 && this.form.facade.path === '') {
          this.form.facade.path = data.value + '\\src\\main\\java\\'
        }

        if ((this.myOptionItemType === 3 && this.form.entity.path === '') || (this.myOptionItemType === 3 && this.form.mapper.path === '')) {
          if (this.form.mapper.path === '') {
            this.form.mapper.path = data.value + '\\src\\main\\java\\'
          }
          if (this.facadeImplPath === '') {
            this.facadeImplPath = data.value + '\\src\\main\\java\\'
          }
          if (this.form.entity.path === '') {
            this.form.entity.path = data.value + '\\src\\main\\java\\'
          }
          this.xmlPath = data.value + '\\src\\main\\resources\\'
        }
        if ((this.myOptionItemType === 6 && this.form.mainService.path === '') || (this.myOptionItemType === 6 && this.form.entity.path === '')
          || (this.myOptionItemType === 6 && this.xmlPath !== '')) {
          if (this.form.mainService.path === '') {
            this.form.mainService.path = data.value + '\\src\\main\\java\\'
          }
          if (this.facadeImplPath === '') {
            this.facadeImplPath = data.value + '\\src\\main\\java\\'
          }
          if (this.form.entity.path === '') {
            this.form.entity.path = data.value + '\\src\\main\\java\\'
          }
          this.xmlPath = data.value + '\\src\\main\\resources\\'
        }
        if ((this.myOptionItemType === 8 && this.form.mapper.path === '') || (this.myOptionItemType === 8 && this.form.mainService.path === '')) {
          if (this.form.mapper.path === '') {
            this.form.mapper.path = data.value + '\\src\\main\\java\\'
          }
          if (this.facadeImplPath === '') {
            this.facadeImplPath = data.value + '\\src\\main\\java\\'
          }
          if (this.form.mainService.path === '') {
            this.form.mainService.path = data.value + '\\src\\main\\java\\'
          }
          this.xmlPath = data.value + '\\src\\main\\resources\\'
        }
        this.myOptionItem.path = data.value + '\\src\\main\\java\\'
      },
      loadNode(node, resolve) {
        if (node.level === 0) {
          const jsonString = {
            id: '1',
            directory: '/'
          }
          doPost(JSON.stringify(jsonString), '/code/getDirectory')
            .then(res => {
              return resolve(res.data.data)
            })
        } else {
          const jsonString = {
            id: node.data.id,
            directory: node.data.value
          }
          doPost(JSON.stringify(jsonString), '/code/getDirectory')
            .then(res => {
              if (res.data.code === 1) {
                if (res) {
                  return resolve(res.data.data)
                }
              }
              return resolve([])
            })
        }
      }
      ,
      getObjectURL(file) {
        var url = null;
        if (window.createObjcectURL != undefined) {
          url = window.createOjcectURL(file);
        } else if (window.URL != undefined) {
          url = window.URL.createObjectURL(file);
        } else if (window.webkitURL != undefined) {
          url = window.webkitURL.createObjectURL(file);
        }
        return url;
      }
      ,
      browseFolder(path) {
        let myFile = this.$refs['myFile'].files[0]
        var objURL = this.getObjectURL(myFile)
        window.open(objURL)
      }
      ,
      handleChange(val) {
      }
      ,
      updateConnection(updForm) {
        const that = this
        const localStorage = getLocalStorage(that.nowConnectionKey);
        const json = JSON.parse(localStorage);
        json.connectionName = updForm.connectionName
        json.databaseType = updForm.databaseType
        json.hostName = updForm.hostName
        json.port = updForm.port
        json.userName = updForm.userName
        json.password = updForm.password
        json.database = updForm.database
        json.encoding = updForm.encoding
        const cons = JSON.parse(getLocalStorage('connectionsIndex'))
        removeLocalStorage(that.nowConnectionKey)
        for (const obj of cons) {
          if (obj.key === that.nowConnectionKey) {
            cons.remove(obj)
            if (obj.index === 0) {
              json.index = 0
            } else {
              json.index = obj.index
            }
            setLocalStorage('connectionsIndex', JSON.stringify(cons))
            break
          }
        }
        setLocalStorage(json.connectionName, JSON.stringify(json))
        const indexInJson = JSON.parse(getLocalStorage('connectionsIndex'))
        indexInJson.push({'key': json.connectionName, 'index': json.index, 'tables': []})
        setLocalStorage('connectionsIndex', JSON.stringify(indexInJson))
        this.dialogEditVisible = false
        this.loadConnection()
      }
      ,
      popMenu(e) {
        // alert(1);
        const self = this
        e.preventDefault()
        // alert(e.button === 2)
        if (e.button === 2) {
          const x = e.layerX
          const y = e.layerY
          self.mousePosition = [x, y]
        } else if (e.button === 0) {
          self.mousePosition = ['close']
        }
      }
      ,
      list_item_click(it) {
        switch (it) {
          case 0:
            alert('第一项被点击')
            break
          case 1:
            alert('第二项被点击')
            break
        }
      }
      ,
      rightShow() {
        alert('right-click')
      }
      ,
      loadDatabase(connection) {
        alert(connection)
      }
      ,
      openDialogNewConnection() {
        this.saveForm =
          {
            index: -1,
            connectionName: '新建连接1',
            databaseType: 'MySQL',
            hostName: '127.0.0.1',
            port: 3306,
            userName: 'root',
            password: '',
            database: '',
            encoding: 'UTF-8'
          }
        this.dialogVisible = true
      }
      ,

      closeDialogUpdateConnection(form) {
        this.dialogEditVisible = false
        this.$refs[form].resetFields()
        this.loadConnection()
      }
      ,
      closeDialogNewConnection(form) {
        this.dialogVisible = false
        this.$refs[form].resetFields()
        this.loadConnection()
      }
      ,
      generateCode(form) {
        this.$refs[form].validate((valid) => {
          if (!valid) {
            this.$message.error('请完善参数后再继续操作按钮！');
            return false;
          } else {
            const jsonString = {
              tableName: this.form.tableName,
              encoding: 'utf-8',
              author: this.form.author,
              xmlPath: this.xmlPath,
              facadeImplPath: this.facadeImplPath,
              mapperName: this.form.mapper.name,
              primaryKey: this.form.entity.id,
              dataSource: this.connectionForm,
              controller: {
                name: this.form.controller.name,
                packageName: this.form.controller.packageName,
                path: this.form.controller.path,
                isGenerate: this.form.controller.generate
              },
              service: {
                name: this.form.service.name,
                packageName: this.form.service.packageName,
                path: this.form.service.path,
                isGenerate: this.form.service.generate
              },
              dto: {
                name: this.form.dto.name,
                packageName: this.form.dto.packageName,
                path: this.form.dto.path,
                isGenerate: this.form.dto.generate
              },
              entity: {
                name: this.form.entity.name,
                packageName: this.form.entity.packageName,
                path: this.form.entity.path,
                isGenerate: this.form.entity.generate
              },
              mapper: {
                name: this.form.mapper.name,
                packageName: this.form.mapper.packageName,
                path: this.form.mapper.path,
                isGenerate: this.form.mapper.generate
              },
              facade: {
                name: this.form.facade.name,
                packageName: this.form.facade.packageName,
                path: this.form.facade.path,
                isGenerate: this.form.facade.generate
              },
              mainService: {
                name: this.form.mainService.name,
                packageName: this.form.mainService.packageName,
                path: this.form.mainService.path,
                isGenerate: this.form.mainService.generate
              }
            }
            doPost(JSON.stringify(jsonString), '/code/generate')
              .then(res => {
                if (res.data.code === 1) {
                  this.$message.success(res.data.msg[0].msgText);
                  // 如果数据不需要生成那么就不需要展示
                  if (!this.form.controller.generate) {
                    this.form.controller.path = ''
                  }
                  if (!this.form.service.generate) {
                    this.form.service.path = ''
                  }
                  if (!this.form.facade.generate) {
                    this.form.facade.path = ''
                    this.facadeImplPath = ''
                  }
                  if (!this.form.dto.generate) {
                    this.form.dto.path = ''
                  }
                  if (!this.form.mainService.generate) {
                    this.form.mainService.path = ''
                  }
                  if (!this.form.mapper.generate) {
                    this.form.mapper.path = ''
                    this.xmlPath = ''
                  }
                  if (!this.form.entity.generate) {
                    this.form.entity.path = ''
                  }
                  this.$alert('网关层Controller类生成路径：' + this.form.controller.path + '</br>'
                              + '网关层Service类生成路径：' + this.form.service.path + '</br>'
                              + 'Facade接口类生成路径：' + this.form.facade.path + '</br>'
                              + 'Facade实现类生成路径：' + this.facadeImplPath + '</br>'
                              + 'DTO类生成路径：' + this.form.dto.path + '</br>'
                              + 'Main层Service类生成路径：' + this.form.mainService.path + '</br>'
                              + 'Mapper接口类生成路径：' + this.form.mapper.path + '</br>'
                              + 'Xml文件生成路径：' + this.xmlPath + '</br>'
                              + 'Entity类生成路径：' + this.form.entity.path + '</br>'
                              , '生成文件的路径：', {
                    confirmButtonText: '确定',
                    dangerouslyUseHTMLString: true
                  });
                } else {
                  this.$message.error(res.data.msg[0].msgText);
                }
              })
          }
        })
      }
      ,
      handleKey(key) {
        if (getLocalStorage(key) == null) {
          if (getLocalStorage('connectionsIndex') == null) {
            setLocalStorage('connectionsIndex', JSON.stringify([{'key': key, 'index': 0}]))
          } else {
            const indexInJson = JSON.parse(getLocalStorage('connectionsIndex'))
            const idx = indexInJson.length
            indexInJson.push({'key': key, 'index': idx, 'tables': []})
            setLocalStorage('connectionsIndex', JSON.stringify(indexInJson))
            return idx
          }
        }
      }
      ,
      saveNewConnection(form) {
        this.$refs[form].validate((valid) => {
          if (valid) {
            const key = this.saveForm.connectionName
            const idx = this.handleKey(key)
            if (getLocalStorage(key) == null) {
              this.saveForm.index = idx
              setLocalStorage(key, JSON.stringify(this.saveForm))
              this.dialogVisible = false
              this.$refs[form].resetFields()
              this.loadConnection()
            } else {
              this.$message({
                message: '该名称已经存在',
                type: 'warning'
              })
            }
          } else {
            return false
          }
        })
      }
      ,
      handleOpen(key, keyPath) {
        // doPost
      }
      ,
      handleSelect(connection, keyPath) {
        const that = this
        doPost(getLocalStorage(connection), '/database/connect')
          .then(res => {
            if (res.data.code != 1) {
              if (res.data.msg[0].msgText != '') {
                this.$message.error(res.data.msg[0].msgText);
              } else {
                this.$message.error('数据库连接异常,请检查配置后再次点击连接');
              }
            } else {
              for (let i = 0; i < that.connections.length; i++) {
                if (that.connections[i].key === connection) {
                  that.connections[i].tables = res.data.data
                }
              }
              setLocalStorage('connectionsIndex', JSON.stringify(that.connections))
            }
          })
      }
      ,
      handleClick(tableName, connection) {
        const json = {'tableName': tableName}
        const that = this
        doPost(json, '/code/getPackageAndClass')
          .then(res => {
            if (res.data.code === 0) {
              this.$message.error(res.data.msg[0].msgText);
            } else {
              const response = res.data.data
              that.form.controller = response.controller
              that.form.mapper = response.mapper
              that.form.service = response.service
              that.form.dto = response.dto
              that.form.entity = response.entity
              that.form.mainService = response.mainService
              that.form.facade = response.facade
              that.form.tableName = response.tableName
              this.connectionForm = JSON.parse(getLocalStorage(connection.key))
            }
          })
      }
      ,
      onSubmit() {
      }
      ,
      handleClose(done) {
        this.loadConnection()
        done()
      }
      ,
      loadConnection() {
        const indexInJson = JSON.parse(getLocalStorage('connectionsIndex'))
        if (indexInJson !== null && indexInJson.length !== 0) {
          for (let i = 0; i < indexInJson.length - 1; i++) {
            for (let j = 0; j < indexInJson.length - 1 - i; j++) {
              if (indexInJson[j].index > indexInJson[j + 1].index) {
                const temp = indexInJson[j]
                indexInJson[j] = indexInJson[j + 1]
                indexInJson[j + 1] = temp
              }
            }
          }
        }
        this.connections = indexInJson
      }
      ,
    }
    ,
    created() {
      this.connectionForm =
        {
          index: -1,
          connectionName: 'sms_cloud_baseline',
          databaseType: 'MySQL',
          hostName: '192.168.109.24',
          port: 3306,
          userName: 'root',
          password: 'xskj2017',
          database: 'sms_prod',
          encoding: 'UTF-8'
        }

      this.saveForm = {
        index: -1,
        connectionName: '',
        databaseType: '',
        hostName: '',
        port: -1,
        userName: '',
        password: '',
        database: '',
        encoding: ''
      }

      this.loadConnection()
    }
  }
</script>
<style>

  .tooltip {
    vertical-align: middle;
    width: 1em;
    height: 1em;
    margin-left: 6em;
    margin-top: 1em
  }

  .easy-ul li {
    background-color: #df5000;
    color: #ffffff;
  }

  .easy-ul li div:hover {
    background-color: #ffffff !important;
    color: #df5000 !important;
  }

  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 1024px;
  }

  .el-form-item {
    margin-bottom: 11px;
  }

  .collapse-title .el-collapse-item__header {
    font-size: 18px;
    width: 1024px;
  }
</style>
