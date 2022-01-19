$(function() {
    // 点击注册 登录文本框设置隐藏 显示效果
    $('#link_login').on('click',function(){
      $('.login-box').show()
      // 注册页面 注册完 登录页面获取用户名值
      $('.login-box [name=username]').val($('.reg-box [name=username').val())
      $('.reg-box').hide()
    })
    $('#link_reg').on('click',function(){
      $('.login-box').hide()
      $('.reg-box').show()
    })
    
    // 做表单验证 为文本框-密码 在应用表单里lay-verify
    let form = layui.form
    form.verify({
      username: function(value, item){ //value：表单的值、item：表单的DOM对象
        if(!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)){
          return '用户名不能有特殊字符';
        }
        if(/(^\_)|(\__)|(\_+$)/.test(value)){
          return '用户名首尾不能出现下划线\'_\'';
        }
        if(/^\d+\d+\d$/.test(value)){
          return '用户名不能全为数字';
        }
      },
      pwd: [
        /^[\S]{6,12}$/
        ,'密码必须6到12位，且不能出现空格'
      ] ,
      repwd:function(value){
        // 通过形参拿到的是确认密码框中的内容
       // 还需要拿到密码框中的内容
      // 然后进行一次等于的判断
    // 如果判断失败,则return一个提示消息即可
      if( $('.reg-box [name=password]').val()!==value){
          return'两次密码不一致'
      }}
    })
    let layer = layui.layer
    // 监听注册表单提交事件
  $('#form_reg').on('submit',function(e){
      e.preventDefault()
      let  data={
        username:$('#form_reg [name=username]').val(),
        password:$('#form_reg [name=password]').val()
      };
     $.post('/api/reguser',data,function(res){
      if (res.status !== 0) {
              return layer.msg(res.message)
            }
            layer.msg('注册成功，请登录！')
            $('#link_login').click() 
     })
  })
    // 监听登录表单提交事件
    $('#form_login').on('submit',function(e){
      e.preventDefault()
    
      $.ajax({
        url:'/api/login',
        method:'POST',
        data:$(this).serialize(), //快速表单里的数据
        success:function(res){
            if (res.status !== 0) {
            return layer.msg(res.message)
          }
          layer.msg(res.message)
          // 将登录成功得到的 token 字符串，保存到 localStorage 中
          localStorage.setItem('token',res.token)
          // tiao跳转页面
          location.href= '/index.html'
        }

      })
  })

})
