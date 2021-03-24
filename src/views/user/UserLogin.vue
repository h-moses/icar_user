<template>
    <div class="login-container">
        <el-row :gutter="0" class="bk_row">
            <img alt="" src="">
            <el-col :span="16"></el-col>
            <el-col :offset="16" :span="8" class="login_region">
                <!--头像区域-->
                <div class="avatar_box">
                    <img alt="" src="../../assets/logo.png">
                </div>
                <el-link :underline="false" @click="register" class="register-link" style="font-size: 0.8rem" type="danger">
                    没有账号？点此注册
                </el-link>
                <el-form :model="this.loginForm" :rules="this.loginFormRules" class="login_form" label-width="0"
                         ref="loginFormRef">
                    <el-form-item prop="username">
                        <el-input clearable placeholder="请输入账号"
                                  prefix-icon="icar_user iconyonghu" v-model="loginForm.username"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input clearable placeholder="请输入密码" prefix-icon="icar_user iconmima"
                                  type="password" v-model="loginForm.password"></el-input>
                    </el-form-item>
                    <el-form-item class="btns">
                        <el-button @click="login" class="btn-login" type="primary">登录</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "UserLogin",
        data() {
            return {
                loginForm: {
                    username: '',
                    password: ''
                },
                loginFormRules: {
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {min: 6, max: 18, message: '密码不得少于6位，不多于18位', trigger: 'blur'}
                    ]
                },
            }
        },
        methods: {
            login() {
                this.$refs.loginFormRef.validate(async valid => {
                    if (!valid) return
                    await this.$router.push('/userHome')
                })

            },
            async register() {
                await this.$router.push('/userRegister')
            }
        }
    }
</script>

<style lang="less" scoped>
    .login-container {
        background-color: #849FC4;
        height: 100%;
    }

    .bk_row {
        height: 100%;
        width: 100%;

        img {
            width: 100%;
            height: 100%;
            float: left;
        }
    }

    .login_region {
        position: fixed;
        top: 1%;
        bottom: 1%;
        right: 1%;
        width: 30%;
        height: 98%;
        border-radius: 1%;
        background-color: #C7D7EE;
        opacity: 0.94;
    }

    .avatar_box {
        position: absolute;
        top: 20%;
        left: 50%;
        height: 130px;
        width: 130px;
        border: solid 1px #eee;
        border-radius: 50%;
        padding: 10px;
        box-shadow: 0 0 10px #eee;
        transform: translate(-50%, -50%);
        background-color: #fff;

        img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background-color: #eee;
        }
    }

    .register-link {
        position: absolute;
        top: 36%;
        right: 20%;
    }

    .login_form {
        position: absolute;
        width: 100%;
        height: 300px;
        top: 40%;
        padding: 0 20%;
        box-sizing: border-box;

        /deep/ .el-input__inner {
            border-radius: 0;
        }
    }

    .btns {
        position: relative;
        width: 100%;
        top: 10%;

        .btn-login {
            width: 100%;
            border-radius: 0;
            border: 0;
            background-color: #87AFFF;
            transition: background-color 0.5s;
        }

        .btn-login:hover {
            background-color: #4784FF;;
        }
    }
</style>
