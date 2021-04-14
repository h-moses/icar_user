<template>
    <div id="submit-order">
<!--            面包屑导航区-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{path:'/homePage'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item>个人工单</el-breadcrumb-item>
            <el-breadcrumb-item>提交工单</el-breadcrumb-item>
        </el-breadcrumb>

        <el-card>
            <el-row id="card-row" :gutter="0">
                <el-col :span="12">
                    <el-form :model="submitForm" id="submit-form" ref="submitFormRef">
                        <el-row id="user-row">
                            <el-form-item class="row-item" prop="username">
                                <div class="item-label">用户名</div>
                                <el-input readonly v-model="username"/>
                            </el-form-item>
                            <el-form-item class="row-item" prop="userphone">
                                <div class="item-label">手机</div>
                                <el-input readonly v-model="userphone"/>
                            </el-form-item>
                        </el-row>
                        <el-row id="title-row">
                            <el-form-item class="row-item" prop="ordertitle">
                                <div class="item-label">主题</div>
                                <el-input clearable maxlength="60" placeholder="请输入工单主题" show-word-limit v-model="submitForm.title"/>
                            </el-form-item>
                        </el-row>
                        <el-row id="service-row">
                            <el-form-item class="row-item" prop="servicelabel">
                                <div class="item-label">服务标签</div>
                                <el-select placeholder="请选择服务标签" v-model="submitForm.label">
                                    <el-option-group :key="group.label" :label="group.label" v-for="group in serviceLabels">
                                        <el-option :key="item.value" :label="item.value" :value="item.value" v-for="item in group.options"/>
                                    </el-option-group>
                                </el-select>
                            </el-form-item>
                            <el-form-item class="row-item" prop="servicelabel">
                                <div class="item-label">工单优先级</div>
                                <el-select placeholder="中" v-model="submitForm.priority">
                                    <el-option :key="item.value" :label="item.value" :value="item.value" v-for="item in priorities"/>
                                </el-select>
                            </el-form-item>
                        </el-row>
                        <el-row id="content-row">
                            <el-form-item class="row-item" prop="orderContent">
                                <div class="item-label">工单内容</div>
                                <el-input clearable maxlength="400" rows="10" show-word-limit type="textarea" v-model="submitForm.content"/>
                            </el-form-item>
                        </el-row>
                        <el-row id="image-row">
                            <el-form-item class="row-item" prop="orderimages">
                                <div class="item-label">上传材料</div>
                                <el-upload
                                        :auto-upload="false"
                                        :file-list="pics"
                                        :limit="1"
                                        :on-change="handleChange"
                                        :on-exceed="handleExceed"
                                        :on-preview="handlePreview"
                                        :http-request="uploadFile"
                                        accept="image/jpeg,image/png"
                                        action="action"
                                        class="upload-image"
                                        list-type="picture"
                                        ref="uploadRef">
                                    <el-button size="small" type="primary">点击上传</el-button>
                                    <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb。最多上传1张图片</div>
                                </el-upload>
                                <el-button @click="submit" class="submit-btn" size="small" type="primary">提交</el-button>
                                <el-dialog :visible.sync="dialogVisible">
                                    <img :src="dialogImageUrl" alt="" width="100%">
                                </el-dialog>
                            </el-form-item>
                        </el-row>
                    </el-form>
                </el-col>
                <el-col :offset="2" :span="12">
                    <el-collapse id="recent-order" v-model="activeName">
                        <el-collapse-item class="order-item" title="最近工单" name="1">
                            <el-table :data="recentOrder">
                                <el-table-column prop="feedbackID" label="工单号" width="180" align="center"></el-table-column>
                                <el-table-column prop="feedbackTitle" label="主题" width="150" align="center"></el-table-column>
                                <el-table-column prop="feedBackState" label="状态" width="100" align="center">
                                    <template slot-scope="scope">
                                        <el-tag v-if="scope.row.feedbackState === '已提交'" type="success" size="small" effect="plain">已提交</el-tag>
                                        <el-tag v-else-if="scope.row.feedbackState === '处理中'" type="warning" size="small" effect="plain">处理中</el-tag>
                                        <el-tag v-else type="info" size="small" effect="plain">已关闭</el-tag>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="feedbackTime" label="时间" align="center"></el-table-column>
                            </el-table>
                        </el-collapse-item>
                    </el-collapse>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "SubmitOrder",
        data() {
            return {
                submitForm: {
                    user_id: '',
                    title: '',
                    label: '',
                    priority: '',
                    content: '',
                },
                userphone: '',
                userName: '',
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
                dialogImageUrl: '',
                activeName: '1',
                recentOrder: [],
                pics: []
            }
        },
        created() {
            this.getRecentOrder()
            this.username = window.sessionStorage.getItem('userName')
            this.userphone = window.sessionStorage.getItem('userPhone')
            this.submitForm.user_id = window.sessionStorage.getItem('userID')
        },
        methods: {
            handlePreview(file) {
                this.dialogImageUrl = file.url
                this.dialogVisible = true
            },
            handleExceed(fileList) {
                if (fileList.length > 1) {
                    this.$message.error("最多允许上传1个图片")
                    return false
                }
            },
            handleChange(file, fileList) {
                if (fileList.length > 0) {
                    const isLt1M = file.size / 1024 < 500
                    if (!isLt1M) {
                        this.$message.error("上传图片大小不能超过500kb")
                        this.handleRemove(file)
                        return isLt1M
                    }
                    return true
                }
                return false
            },
            async submit() {
                this.$refs.uploadRef.submit()
                this.$message.success("提交成功")
                await this.$router.push('/checkOrder')
            },
            async getRecentOrder() {
                const data = {}
                data['user_phone'] = window.sessionStorage.getItem('userPhone')
                data['currentPage'] = 1
                data['pageSize'] = 4
                const {data:res} = await this.$http.post('feedback/view',data)
                if (res.code !== 200) {
                    return this.$message.error("获取最近工单失败")
                }
                this.recentOrder = res.data.feedbackRecord.list
            },
            async uploadFile(params) {
                const data = JSON.parse(JSON.stringify(this.submitForm))
                data['pics'] = params.file
                console.log(data)
                const {data:res} = await this.$http.post('feedback/submit',data)
                if (res.code !== 200) {
                    return this.$message.error("提交失败")
                }
                setTimeout(() => {
                    this.$router.push('/checkOrder')
                },2000)
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

        #card-row {
            display: flex;
            padding: 0 40px;
            justify-content: space-around;
        }

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

        #recent-order {
            margin-top: 20px;
            width: 600px;
            border: 1px solid #F5F5F5;

            /deep/ .el-collapse-item__header {
                background-color: #F5F5F5;
                width: 600px;
                height: 40px;
                display: flex;
                justify-content: space-around;

                .el-collapse-item__arrow {
                    margin: 0 0 0 250px;
                }
            }

            /deep/ .el-collapse-item__content {
                padding-bottom: 0;
            }

        }
    }
</style>
