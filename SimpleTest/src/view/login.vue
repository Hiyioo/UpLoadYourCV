<template>
    <div class="login">
        <div class="loginBox">
            <!-- 登录框 -->
            <div class="container">
                <div class="drop">
                    <div class="content">
                        <div class="logo">
                            <img src="../img/logo.jpg" alt="">
                        </div>
                        <el-form ref="form" :model="user" :rules="rules">
                            <el-form-item class="inputBox" prop="email">
                                <el-input v-model="user.email" placeholder="请输入邮箱" ></el-input>
                            </el-form-item>
                            <el-form-item class="inputBox" prop="password">
                                <el-input v-model="user.password" placeholder="请输入密码"></el-input>
                            </el-form-item>
                            <el-form-item class="inputBox" id="yanzheng">
                                <el-input type="text" v-model="yantext" placeholder="验证码" />
                                <div>
                                    <canvas id="canvas" class="canvascs" @click="draw()">
                                    </canvas>
                                </div>
                            </el-form-item>
                            <el-form-item class="inputBox" :style="{ margin: '0 auto' }">
                                <el-input type="button" value="登录" @click="login" />
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
let yanma = ref("");
// 绑定验证码
let yantext = ref("");
//验证码图形生成
var show_num = [];
onMounted(() => {
    draw();
});

const user = ref({
    email:'',
    password:''
})
// 登录
function login() {
    // 先验证用户输入的验证码

    console.log(user.email);
    console.log(user.password);
    console.log(yanma.value);


    if (yantext.value === yanma.value) {
        console.log("验证成功");
        router.push('/home')
    } else {
        console.log("验证失败");
        draw();
        yantext.value = "";
    }
}
function draw() {
    //jquery对canvas对象无法获取，原生js可以解决
    var canvas_width = document.getElementById("canvas").clientWidth;
    var canvas_height = document.getElementById("canvas").clientHeight;
    var canvas = document.getElementById("canvas"); //获取到canvas的对象，画布
    var context = canvas.getContext("2d"); //画笔
    //画布范围
    canvas.width = canvas_width;
    canvas.height = canvas_height;
    //字符集
    var sCode =
        "A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,1,2,3,4,5,6,7,8,9,0,q,w,e,r,t,y,u,i,o,p,a,s,d,f,g,h,j,k,l,z,x,c,v,b,n,m";
    var aCode = sCode.split(",");
    var aLength = aCode.length; //获取到数组的长度
    for (var i = 0; i <= 3; i++) {
        //向下取整
        var j = Math.floor(Math.random() * aLength); //获取到随机的索引值
        var deg = (Math.random() * 30 * Math.PI) / 180; //产生0~30之间的随机弧度
        var txt = aCode[j]; //得到随机的一个字符
        show_num[i] = txt;
        var x = 10 + i * 20; //文字在canvas上的x坐标
        var y = 20 + Math.random() * 8; //文字在canvas上的y坐标
        //字体样式大小
        context.font = "23px 微软雅黑";
        //书写位置位移
        context.translate(x, y);
        //旋转
        context.rotate(deg);
        //填充的样式
        context.fillStyle = randomColor();
        //填充的字符,位置
        context.fillText(txt, 0, 0);
        //重置书写位置(上面的xy与循环中的i有关)
        context.rotate(-deg);
        context.translate(-x, -y);
    }
    //干扰项
    for (var i = 0; i <= 5; i++) {
        //验证码上显示线条
        context.strokeStyle = randomColor();
        //路线开始
        context.beginPath();
        //起点
        context.moveTo(Math.random() * canvas_width, Math.random() * canvas_height);
        //终点
        context.lineTo(Math.random() * canvas_width, Math.random() * canvas_height);
        //关闭路线
        context.closePath();
        //绘制
        context.stroke();
    }
    for (var i = 0; i <= 30; i++) {
        //验证码上显示小点
        context.strokeStyle = randomColor();
        context.beginPath();
        var x = Math.random() * canvas_width;
        var y = Math.random() * canvas_height;
        //圆心x,y,半径,起始,终点
        context.arc(x, y, 1, 0, 2 * Math.PI);
        //	            context.moveTo(x, y);
        //	            context.lineTo(x + 1, y + 1);
        context.closePath();
        context.stroke();
    }
    //得到随机的颜色值
    function randomColor() {
        var r = Math.floor(Math.random() * 256);
        var g = Math.floor(Math.random() * 256);
        var b = Math.floor(Math.random() * 256);
        //	        	return "rgb(" + r + "," + g + "," + b + ")";
        return `rgb(${r},${g},${b})`;
    }
    //
    // alert("验证码：" + show_num.join(""));
    yanma.value = show_num.join("");
    return show_num;
}
// $(document).ready(function () {
//   //初始化验证码
//   draw();
// )}

//定义邮箱校验规则
const checkEmail = (rule, value, callback) => {
    const regEmail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    if (value === '') {
        callback(new Error("邮箱不可为空"))
    } else if (regEmail.test(value)) {
        return callback();
    }
    callback(new Error("请输入合法的邮箱"));
}
//定义密码
const checkPassword = (rule, value, callback) => {
    if (value === '') {
        callback(new Error("密码不可为空"))
    } else if (value.length<6) {
        callback(new Error("密码要6位以上"))
    }else{
        return callback()
    }
}

const rules = {
    email: [
        { require: true, message: '请输入邮箱', trigger: 'blur' },
        {
            min: 3,
            max: 20,
            message: '用户名为3~20位非空字符',
            trigger: 'blur'
        },
        {
            validator: checkEmail,
            trigger: 'blur'
        }
    ],
    password: [
        { require: true, message: '请输入密码', trigger: 'blur' },
        {
            min: 3,
            max: 20,
            message: '用户名为6位以上非空字符',
            trigger: 'blur'
        },
        {
            validator: checkPassword,
            trigger: 'blur'
        }
    ]
}



</script>

<style scoped>
.login {
    width: 100%;
    overflow: hidden;

}

.logo img {
    width: 70px;
    height: 70px;
}

/* 验证码样式 */
.canvascs {
    width: 92px;
    height: 30px;
    border-radius: 5px;
    margin-top: 2px;
    background: white;
    margin-left: 5px;
}

#yanzheng {
    display: flex;
}

#yanzheng div {
    width: 96px;
    /* background: pink; */
}

#yanzheng input {
    width: 100px;
}

video {
    height: 100%;
    width: 100%;
    object-fit: cover;
    object-position: center;
}

.loginBox {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

/* 登录框 */
.container .drop {
    position: relative;
    width: 450px;
    height: 450px;
    box-shadow: inset 20px 20px 20px rgba(0, 0, 0, 0.05),
        25px 35px 20px rgba(0, 0, 0, 0.05), 25px 30px 30px rgba(0, 0, 0, 0.05),
        inset -20px -20px 25px rgba(255, 255, 255, 0.9);
    transition: 0.5s;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
}

.container .drop:hover {
    border-radius: 10%;
}

.container .drop::before {
    content: "";
    position: absolute;
    top: 50px;
    left: 85px;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background: #fff;
    opacity: 0.9;
}

.container .drop::after {
    content: "";
    position: absolute;
    top: 90px;
    left: 110px;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background: #fff;
    opacity: 0.9;
}

.container .drop .content {
    position: relative;
    display: flex;
    justify-content: center;
    /* align-items: center; */
    flex-direction: column;
    text-align: center;
    padding: 40px;
    gap: 15px;
}

.container .drop .content h2 {
    position: relative;
    color: #333;
    font-size: 1.5em;
}

.container .drop .content form {
    display: flex;
    flex-direction: column;
    gap: 20px;
    justify-content: center;
    /* align-items: center; */
}

.container .drop .content form .inputBox {
    position: relative;
    width: 225px;
    box-shadow: inset 2px 5px 10px rgba(0, 0, 0, 0.1),
        inset -2px -5px 10px rgba(255, 255, 255, 1),
        15px 15px 10px rgba(0, 0, 0, 0.05), 15px 10px 15px rgba(0, 0, 0, 0.025);
    border-radius: 25px;
}

.container .drop .content form .inputBox p {
    color: #ff0202;
}

.container .drop .content form .inputBox::before {
    content: "";
    position: absolute;
    top: 8px;
    left: 50%;
    transform: translateX(-50%);
    width: 65%;
    height: 5px;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 5px;
}

.container .drop .content form .inputBox input {
    border: none;
    outline: none;
    background: transparent;
    width: 100%;
    font-size: 1em;
    padding: 10px 15px;
}

.container .drop .content form .inputBox input[type="submit"] {
    color: #fff;
    text-transform: uppercase;
    font-size: 1em;
    cursor: pointer;
    letter-spacing: 0.1em;
    font-weight: 500;
}

.container .drop .content form .inputBox:last-child {
    width: 120px;
    background: #3399ff;
    box-shadow: inset 2px 5px 10px rgba(0, 0, 0, 0.1),
        15px 15px 10px rgba(0, 0, 0, 0.05), 15px 10px 15px rgba(0, 0, 0, 0.025);
    transition: 0.5s;
}

.container .drop .content form .inputBox:last-child:hover {
    width: 150px;
}

.btns {
    position: absolute;
    right: -120px;
    bottom: 0;
    width: 120px;
    height: 120px;
    background: #00a6bc;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    text-decoration: none;
    color: #fff;
    line-height: 1.2em;
    letter-spacing: 0.1em;
    font-size: 0.8em;
    transition: 0.25s;
    text-align: center;
    box-shadow: inset 10px 10px 10px rgba(0, 166, 188, 0.05),
        15px 25px 10px rgba(0, 166, 188, 0.1), 15px 20px 20px rgba(0, 166, 188, 0.1),
        inset -10px -10px 15px rgba(0, 166, 188, 0.5);
    border-radius: 50%;
}

.btns::before {
    content: "";
    position: absolute;
    top: 15px;
    left: 30px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #fff;
    opacity: 0.45;
}

.btns.signup {
    bottom: 150px;
    right: -120px;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: #00a6bc;
    box-shadow: inset 10px 10px 10px rgba(0, 166, 188, 0.05),
        15px 25px 10px rgba(0, 166, 188, 0.1), 15px 20px 20px rgba(0, 166, 188, 0.1),
        inset -10px -10px 15px rgba(0, 166, 188, 0.5);
}

.btns.signup::before {
    left: 20px;
    width: 15px;
    height: 15px;
}

.btns:hover {
    border-radius: 10%;
}
</style>