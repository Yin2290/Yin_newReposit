$(function(){
    $('.zc').on('click',function(){
        $('.box_dl').hide();
        $('.box_zc').show();
    })
    $('.dl').on('click',function(){
        $('.box_dl').show();
        $('.box_zc').hide();
    })
    //自定义密码校验规则
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        pwd:[
            /^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格'
        ],
        repwd:function(value){
            var pwd = $('.box_zc [name=password]').val();
            if(pwd !== value){
                return '输入的密码不一致，请重新输入'
            }
        }
    })
    //注册
    $('#form_reg').on('submit',function(e){
        var date = {username:$('#form_reg [name=username]').val(),password:$('#form_reg [name=password]').val()}
        e.preventDefault();
        $.post('/api/reguser',date,function(res){
        if(res.status !== 0){
                return layer.msg(res.message);
            }
            layer.msg('注册成功');
            //自动点击跳转登录界面
            $('.dl').click();
        })
    })
    //登录
    $('#form_res').on('submit',function(e){
        e.preventDefault();
        $.ajax({
            method:"POST",
            url: "/api/login",
            data:$(this).serialize(),
            success: function (res) {
                if(res.status !== 0){
                    return layer.msg(res.message);
                }
                layer.msg(res.message)
                console.log(res.token);
                //将获取到的token字符串储存到本地储存中
                localStorage.setItem('token',res.token)
                //跳转到后台主页
                location.href = '/index.html';
            }
        });
    })
})