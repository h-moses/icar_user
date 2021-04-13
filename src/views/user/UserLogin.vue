<template>
    <div class="login-container">
        <el-col class="login_region">
            <div class="login_title">
                <h1>Hello！</h1>
                <div>欢迎登录<span>驭鹰</span></div>
                <div>驾驶安全信息检测系统</div>
            </div>
            <el-link class="register-link" :underline="false" @click="register" style="font-size: 0.8rem" type="danger">
                没有账号？点此注册
            </el-link>
            <el-form class="login_form" :model="this.loginForm" :rules="this.loginFormRules" label-width="0"
                     ref="loginFormRef">
                <el-form-item prop="user_name">
                    <el-input clearable placeholder="请输入账号"
                              prefix-icon="icar_user iconyonghu" v-model="loginForm.user_name"></el-input>
                </el-form-item>
                <el-form-item prop="user_pwd">
                    <el-input clearable placeholder="请输入密码" prefix-icon="icar_user iconmima"
                              type="password" v-model="loginForm.user_pwd" @keyup.enter.native="login"></el-input>
                </el-form-item>
            </el-form>
            <el-button class="btn-login" :loading="loading" @click="login" type="primary">登录<span v-if="loading === true">中</span></el-button>
        </el-col>
    </div>
</template>

<script>
    export default {
        name: "UserLogin",
        data() {
            return {
                loginForm: {
                    user_name: '',
                    user_pwd: ''
                },
                loginFormRules: {
                    user_name: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                    ],
                    user_pwd: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        // {min: 6, max: 18, message: '密码不得少于6位，不多于18位', trigger: 'blur'}
                    ]
                },
                loading: false
            }
        },
        methods: {
            login() {
                this.$refs.loginFormRef.validate(async valid => {
                    if (!valid) return
                    this.loading = true
                    const {data:res} = await this.$http.post('user_login',this.loginForm)
                    if (res.code !== 200) {
                        return this.$message.error("登录失败")
                    }
                    window.sessionStorage.setItem('token',res.data['token'])
                    window.sessionStorage.setItem('userID',res.data.user['userID'])
                    window.sessionStorage.setItem('userAvatar',res.data.user['userAvatar'])
                    window.sessionStorage.setItem('userName',res.data.user['userName'])
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
        background: center/cover no-repeat url("../../assets/background.png");
        height: 100%;
    }

    .login_title {
        margin-bottom: 50px;
        >h1 {
            margin: 5px;
        }
        >div {
            font-size: 20px;
            letter-spacing: 3px;
        }
        >div:nth-child(3) {
            margin-top: 5px;
            color: #4F71FC;
        }
    }

    .login_region {
        position: absolute;
        top: 40%;
        left: 10%;
        transform: translateY(-30%);
        width: 20%;
        height: 50%;

        .register-link {
            width: 100%;
            display: flex;
            justify-content: flex-end;
            margin-bottom: 3%;
        }

        .login_form {


            /deep/ .el-input__inner {
                border-radius: 20px;
            }
        }

        .btn-login {
            width: 100%;
            border-radius: 20px;
            margin-top: 5px;
            border: 0;
            background-image: linear-gradient(to right,#95C2FF,#006CFF);
        }

        .btn-login:active {
            box-shadow: 0 2px 1px -1px #3D8EFC, 0 -2px 1px -1px #3D8EFC, 2px 0 1px -1px #3D8EFC, -2px 0 1px -1px #3D8EFC;
        }
    }

</style>
