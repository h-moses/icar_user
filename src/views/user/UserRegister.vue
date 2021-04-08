<template>
    <div class="user-register">
        <div class="register-box">
<!--            <div class="register-left">-->
<!--                <div class="register-introduce">-->
<!--                    <img alt="" class="register-logo" src="../../assets/logo.png"/>-->
<!--                    <span class="register-first">驭鹰</span>-->
<!--                </div>-->
<!--                <div class="register-system">智能网联汽车辅助驾驶安全信息检测系统</div>-->
<!--            </div>-->
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
                        <el-form-item prop="username">
                            <el-input clearable placeholder="用户名" prefix-icon="icar_user iconyonghu" v-model="registerForm.username"></el-input>
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input clearable placeholder="密码不少于6位" prefix-icon="icar_user iconmima" show-password
                                      type="password" v-model="registerForm.password"></el-input>
                        </el-form-item>
                        <el-form-item prop="userphone">
                            <el-input clearable placeholder="手机" prefix-icon="icar_user iconshumatubiaozhizuochunsezhuanqu-"
                                      v-model="registerForm.userphone"></el-input>
                        </el-form-item>
                        <el-form-item prop="email">
                            <el-input clearable placeholder="邮箱" prefix-icon="icar_user iconshuangsechangyongtubiao-"
                                      v-model="registerForm.email"></el-input>
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
                    username: '',
                    userphone: '',
                    password: '',
                    email: ''
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
            async registerUser() {

            }
        }
    }
</script>

<style lang="less" scoped>
    .user-register {
        width: 100%;
        height: 100%;
        background: center/cover no-repeat url("../../assets/bag@2x.png");
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

                /deep/ .el-input__inner {
                    border-radius: 20px;
                }

            }

            .register-btn {
                width: 90%;
                border: 0;
                border-radius: 20px;
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
