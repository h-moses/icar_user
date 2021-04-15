<template>
    <div class="user-register">
        <div class="register-box">
            <div class="form-container">
                <div class="form-header">
                    <h2 class="form-title">
                        <span>注册</span>
                    </h2>
                    <span class="tip-login">
                        <span class="have-account">已有账号？</span>
                        <router-link class="click-login" to="/userLogin">点此登录</router-link>
                    </span>
                </div>
                <div class="form-content">
                    <el-form class="register-form" :model="registerForm" :rules="registerFormRules" ref="registerFormRef">
                        <el-form-item prop="user_name">
                            <el-input clearable placeholder="用户名" prefix-icon="icar_user iconyonghu" v-model="registerForm.user_name"></el-input>
                        </el-form-item>
                        <el-form-item prop="user_pwd">
                            <el-input clearable placeholder="密码不少于6位" prefix-icon="icar_user iconmima" show-password
                                      type="password" v-model="registerForm.user_pwd"></el-input>
                        </el-form-item>
                        <el-form-item prop="user_phone">
                            <el-input clearable placeholder="手机" prefix-icon="icar_user iconshumatubiaozhizuochunsezhuanqu-"
                                      v-model="registerForm.user_phone"></el-input>
                        </el-form-item>
                        <el-form-item prop="user_email">
                            <el-input clearable placeholder="邮箱" prefix-icon="icar_user iconshuangsechangyongtubiao-"
                                      v-model="registerForm.user_email"></el-input>
                        </el-form-item>
                        <el-form-item prop="real_name">
                            <el-input clearable placeholder="真实姓名" prefix-icon="icar_user iconzhenshixingming"
                                      v-model="registerForm.real_name"></el-input>
                        </el-form-item>
                        <el-form-item id="gender-item" prop="user_gender">
                            <i class="icar_user iconxingbie"><span>性别</span></i>
                            <el-card>
                                <el-radio-group class="gender-group" v-model="registerForm.user_gender">
                                    <el-radio label="男">男</el-radio>
                                    <el-radio label="女">女</el-radio>
                                </el-radio-group>
                            </el-card>
                        </el-form-item>
                    </el-form>
                </div>
                <el-button @click="registerUser" class="register-btn" type="primary">注册</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "UserRegister",
        data() {
            var checkPhone = (rule, value, cb) => {
                const regMobile = /^1[345789]\d{9}$/;
                if (regMobile.test(value)) {
                    // 合法的手机号码
                    return cb()
                }
                cb(new Error('手机号码格式不正确'))
            };
            var checkEmail = (rule, value, cb) => {
                const regEmail = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
                if (regEmail.test(value)) {
                    // 合法的邮箱
                    return cb()
                }
                cb(new Error('请输入合法的邮箱'))
            };
            return {
                registerForm: {
                    user_name: '',
                    user_pwd: '',
                    user_phone: '',
                    user_email: '',
                    user_gender: '',
                    real_name: ''
                },
                registerFormRules: {
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                    ],
                    userphone: [
                        {required: true, message: '请输入手机', trigger: 'blur'},
                        {validator: checkPhone, trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {min: 6, max: 18, message: '密码不得少于6位，不多于18位', trigger: 'blur'}
                    ],
                    email: [
                        {required: true, message: '请输入邮箱', trigger: 'blur'},
                        {validator: checkEmail, trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            registerUser() {
                this.$refs.registerFormRef.validate(async valid => {
                    if (!valid) return
                    const {data:res} = await this.$http.post('register',this.registerForm)
                    if (res.code === 100) {
                        return this.$message.error("此用户名已被占用")
                    }else if (res.code !== 200) {
                        return this.$message.error("注册失败")
                    }
                    this.$message.success("注册成功，即将跳转至登录界面")
                    setTimeout(() => {
                        this.$router.push('/userLogin')
                    },3000)
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    .user-register {
        width: 100%;
        height: 100%;
        background: center/cover no-repeat url("../../assets/background.png");
    }

    .register-box {
        position: absolute;
        top: 20%;
        left: 20%;
        transform: translateX(-50%);
        width: 20%;
        height: 80%;
        display: flex;
        justify-content: center;


        .form-container {
            width: 100%;
            display: inline-flex;
            flex-direction: column;
            align-items: center;

            .form-header {
                width: 100%;
                height: 60px;
                display: inline-flex;
                justify-content: space-between;
                align-items: center;

                .click-login {
                    text-decoration: none;
                    color: #9479FF;
                }
            }

            .form-content {
                margin-top: 20px;
                width: 90%;

                .el-form-item:nth-child(5) {
                    margin-bottom: 10px;
                }

                #gender-item {
                    margin-top: 0;
                    .iconxingbie {
                        margin-left: 5px;
                        color: #cccccc;

                        span {
                            margin-left: 10px;
                        }
                    }

                    .el-card {
                        border-radius: 40px;

                        /deep/ .el-card__body {
                            padding: 10px;
                        }
                    }

                    .gender-group {
                        width: 100%;
                        display: flex;
                        justify-content: space-evenly;
                    }
                }
            }

            .register-btn {
                width: 90%;
                border: 0;
                background-color: #87AFFF;
                transition: background-color 0.5s;
            }

            .register-btn:hover {
                background-color: #4784FF;
            }

            .register-btn:active {
                box-shadow: 0 2px 1px -1px #3D8EFC, 0 -2px 1px -1px #3D8EFC, 2px 0 1px -1px #3D8EFC, -2px 0 1px -1px #3D8EFC;
            }
        }
    }

</style>
