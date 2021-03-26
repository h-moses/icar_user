<template>
    <div id="submit-order">
        <!--    面包屑导航区-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{path:'/userHome'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item>个人工单</el-breadcrumb-item>
            <el-breadcrumb-item>提交工单</el-breadcrumb-item>
        </el-breadcrumb>

        <el-card>
            <el-page-header @back="goBack" content="提交工单"/>
            <el-row :gutter="20">
                <el-col :span="20">
                    <el-form id="submit-form" :model="submitForm" :rules="submitFormRules" ref="submitFormRef">
                        <el-input name="token" type="hidden" v-model="token"/>
                        <el-row id="user-row">
                            <el-form-item class="row-item" prop="username">
                                <div class="item-label">用户名</div>
                                <el-input readonly v-model="submitForm.username"/>
                            </el-form-item>
                            <el-form-item class="row-item" prop="userphone">
                                <div class="item-label">手机</div>
                                <el-input readonly v-model="submitForm.userphone"/>
                            </el-form-item>
                        </el-row>
                        <el-row id="title-row">
                            <el-form-item class="row-item" prop="ordertitle">
                                <div class="item-label">主题</div>
                                <el-input v-model="submitForm.ordertitle" placeholder="请输入工单主题" maxlength="60" show-word-limit clearable/>
                            </el-form-item>
                        </el-row>
                        <el-row id="service-row">
                            <el-form-item class="row-item" prop="servicelabel">
                                <div class="item-label">服务标签</div>
                                <el-select v-model="submitForm.servicelabel" placeholder="请选择服务标签">
                                    <el-option-group v-for="group in serviceLabels" :key="group.label" :label="group.label">
                                        <el-option v-for="item in group.options" :key="item.value" :label="item.value" :value="item.value"/>
                                    </el-option-group>
                                </el-select>
                            </el-form-item>
                            <el-form-item class="row-item" prop="servicelabel">
                                <div class="item-label">工单优先级</div>
                                <el-select v-model="submitForm.orderpriority" placeholder="中">
                                    <el-option v-for="item in priorities" :key="item.value" :label="item.value" :value="item.value"/>
                                </el-select>
                            </el-form-item>
                        </el-row>
                        <el-row id="content-row">
                            <el-form-item class="row-item" prop="orderContent">
                                <div class="item-label">工单内容</div>
                                <el-input type="textarea" v-model="submitForm.orderContent" rows="10" maxlength="400" clearable show-word-limit/>
                            </el-form-item>
                        </el-row>
                        <el-row id="image-row">
                            <el-form-item class="row-item" prop="orderimages">
                                <div class="item-label">上传材料</div>
                                <el-upload
                                        class="upload-image"
                                        ref="uploadRef"
                                        action="#"
                                        accept="image/jpeg,image/png"
                                        :auto-upload="false"
                                        :on-preview="handlePreview"
                                        :on-change="handleChange"
                                        :on-exceed="handleExceed"
                                        :file-list="submitForm.orderimages"
                                        list-type="picture"
                                        :limit="3"
                                        multiple>
                                    <el-button size="small" type="primary">点击上传</el-button>
                                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                                </el-upload>
                                <el-button class="submit-btn" size="small" type="primary" @click="submit">提交</el-button>
                                <el-dialog :visible.sync="dialogVisible">
                                    <img :src="dialogImageUrl" alt="" width="100%">
                                </el-dialog>
                            </el-form-item>
                        </el-row>
                    </el-form>
                </el-col>
                <el-col :span="4"></el-col>
            </el-row>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "SubmitOrder",
        data() {
            return {
                token: '',
                submitForm: {
                    username:'h_admin',
                    userphone:'19858160932',
                    ordertitle:'',
                    servicelabel:'',
                    orderpriority: '',
                    orderContent:'',
                    orderimages: []
                },
                submitFormRules: {

                },
                serviceLabels: [
                    {
                        label: '识别预警',
                        options: [
                            {
                                value: '设备检测'
                            },
                            {
                                value: '预警反馈'
                            },
                            {
                                value: '摄像画面'
                            }
                        ]
                    },
                    {
                        label: '数据分析',
                        options: [
                            {
                                value: '历史记录'
                            },
                            {
                                value: '数据报告'
                            }
                        ]
                    },
                    {
                        label: '贴心服务',
                        options: [
                            {
                                value: '天气查询'
                            },
                            {
                                value: '碰撞方案'
                            },
                            {
                                value: '其他功能'
                            }
                        ]
                    }
                ],
                priorities: [
                    {
                        value: '高'
                    },
                    {
                        value: '中'
                    },
                    {
                        value: '低'
                    }
                ],
                dialogVisible: false,
                dialogImageUrl: ''
            }
        },
        created() {
            this.token = window.localStorage.getItem("userToken")
        },
        methods: {
            handlePreview(file) {
                this.dialogImageUrl = file.url
                this.dialogVisible = true
            },
            handleExceed(fileList) {
                if (fileList.length > 3) {
                    this.$message.error("最多允许上传3个图片")
                    return false
                }
            },
            handleChange(file,fileList) {
                if (fileList.length > 0) {
                    const isLt1M = file.size / 1024  < 500
                    if (!isLt1M) {
                        this.$message.error("上传图片大小不能超过500kb")
                        this.handleRemove(file)
                        return isLt1M
                    }
                    return true
                }
                return false
            },
            goBack() {
                this.$router.back()
            },
            submit() {

            }
        }
    }
</script>

<style lang="less" scoped>
    #submit-order {
        padding: 20px;
    }

    .el-card {
        margin-top: 15px;
        height: 100%;

        #submit-form {
            .row-item {
                display: inline-flex;

                .item-label {
                    font-family: "microsoft yahei", Arial, Helvetica, sans-serif;
                    font-weight: bold;
                }

                /deep/ .el-input__inner {
                    height: 32px;
                }
            }
            .row-item:not(:first-child) {
                margin-left: 100px;
            }
        }

        #user-row {
            /deep/ .el-input__inner {
                background-color: #EEEEEE;
            }
        }

        #title-row {
             .el-input {
                width: 600px;
            }
        }

        #content-row {
            .el-textarea {
                width: 700px;
            }
        }

        #image-row {

            /deep/ .el-form-item__content {
                width: 700px;
                /*display: flex;*/
                /*flex-direction: row;*/
                /*justify-content: space-between;*/

                .upload-image {
                    display: inline-flex;
                    flex-direction: column;
                    align-items: flex-start;
                }

                .submit-btn {
                    display: inline-flex;
                    position: absolute;
                    right: 10px;
                }
            }


        }
    }
</style>
