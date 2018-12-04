var express = require("express");
var app = express();
var server = require('http').createServer(app);
var mysql = require("mysql");
app.use(express.static('../public'));
//创建数据库连接
//var connect = mysql.createConnection({
//	host:'rm-wz926t7cx37l367f1do.mysql.rds.aliyuncs.com',
//	user:'pyj',
//	password:'aliyunPYJ0207',
//	database:'signinsystem'
//});
var connect = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'test',
	port: '3306'
	// user:'pyj',
	// password:'123456',
	// database:'signinsystem'
});
// 处理post请求的请求体模块
var bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
	extended: false
}));
// parse application/json
app.use(bodyParser.json());
//开始连接
connect.connect();

//活动相关的操作
//----------------------------------------------------------------//
//----------------------------------------------------------------//
//获取所有存在的活动信息
app.post("/getActAll", function (req, res) {
	//解决跨域问题
	res.append("Access-Control-Allow-Origin", "*");
	//连接后执行相应功能
	connect.query(`SELECT * FROM activity WHERE act_state = 1`, function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify(results));
	});
})
//根据活动类别获取所有存在的活动信息
app.post("/getActByGenre", function (req, res) {
	//解决跨域问题
	res.append("Access-Control-Allow-Origin", "*");
	//连接后执行相应功能
	connect.query(`SELECT * FROM activity WHERE act_state = 1 AND act_type = ${req.body.genre}`, function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify(results));
	});
})
//根据id获取所有活动信息
app.post("/getActById", function (req, res) {
	//解决跨域问题
	res.append("Access-Control-Allow-Origin", "*");
	//连接后执行相应功能
	connect.query(`SELECT activity.*,genre.gen_name FROM activity,genre WHERE activity.act_state = 1 AND activity.act_type = genre.gen_id AND activity.act_id =  ${req.body.id}`, function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify(results));
	});
})
//获取3个带图片活动
app.post("/getActWithPic", function (req, res) {
	//解决跨域问题
	res.append("Access-Control-Allow-Origin", "*");
	//连接后执行相应功能
	connect.query(`SELECT act_img,act_id FROM activity WHERE act_state = 1 AND act_img != ''  LIMIT 0,3`, function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify(results));
	});
})
//----------------------------------------------------------------//


//活动类型操作 genre
//----------------------------------------------------------------//
//----------------------------------------------------------------//
//获取活动类别
app.post("/getGenre", function (req, res) {
	//解决跨域问题
	res.append("Access-Control-Allow-Origin", "*");
	//连接后执行相应功能
	connect.query(`SELECT * FROM genre WHERE gen_state = 1`, function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify(results));
	});
})
//----------------------------------------------------------------//

//报名相关的操作
//----------------------------------------------------------------//
//----------------------------------------------------------------//
//根据学号查询已报名活动
app.post("/getEnrollById", function (req, res) {
	//解决跨域问题
	res.append("Access-Control-Allow-Origin", "*");
	//连接后执行相应功能
	connect.query(`SELECT activity.act_name,activity.act_id,enroll.sign_state FROM enroll,message,activity WHERE enroll.mes_id = message.mes_id AND message.act_id = activity.act_id AND enroll.stu_id = ${req.body.id}`, function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify(results));
	});
})
//显示所有可进行报名活动
app.post("/getEnroll", function (req, res) {
	//解决跨域问题
	res.append("Access-Control-Allow-Origin", "*");
	//连接后执行相应功能
	connect.query(`SELECT message.mes_id,activity.act_id,activity.act_name,activity.act_text,message.mes_begin FROM activity,message WHERE activity.act_id = message.act_id`, function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify(results));
	});
})
//----------------------------------------------------------------//

//签到相关的操作
//----------------------------------------------------------------//
//获取报名管理编号及报名人数
app.post("/checkIsInsert", function (req, res) {
	//解决跨域问题
	res.append("Access-Control-Allow-Origin", "*");
	//连接后执行相应功能
	connect.query(`SELECT COUNT(stu_id) c,mes_id FROM enroll WHERE enroll.mes_id = (SELECT message.mes_id FROM message WHERE message.act_id = ${req.body.id})`, function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify(results));
	});
})
//获取报名管理编号及报名人数
app.post("/insertEnroll", function (req, res) {
	//解决跨域问题
	res.append("Access-Control-Allow-Origin", "*");
	//连接后执行相应功能
	connect.query(`INSERT INTO enroll(mes_id, stu_id, sign_state) VALUES (${req.body.mes_id}, ${req.body.id},0)`, function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify(results));
	});
})
//检测是否已经报名
app.post("/isSign", function (req, res) {
	//解决跨域问题
	res.append("Access-Control-Allow-Origin", "*");
	//连接后执行相应功能
	connect.query(`SELECT enr_id FROM enroll WHERE mes_id = ${req.body.mes_id} AND stu_id =  ${req.body.id}`, function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify(results));
	});
})
//----------------------------------------------------------------//



//----------------------------------------------------------------//

//学生相关操作
//----------------------------------------------------------------//
//----------------------------------------------------------------//
//获取用户信息
app.post("/getStuById", function (req, res) {
	//解决跨域问题
	res.append("Access-Control-Allow-Origin", "*");
	//连接后执行相应功能
	connect.query(`SELECT student.*,academy.aca_name,major.major_name,grade.gra_name FROM student,academy,major,grade WHERE academy.aca_id = student.academy AND major.major_id = student.major AND student.grade = grade.gra_id AND (student.stu_id = ${req.body.id} or student.phone = ${req.body.id})`, function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify(results));
	});
})
//检测该手机号是否已被注册
app.post("/checkPhone", function (req, res) {
	//解决跨域问题
	res.append("Access-Control-Allow-Origin", "*");
	//连接后执行相应功能
	connect.query(`SELECT stu_id FROM student WHERE phone =  ${req.body.num}`, function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify(results));
	});
})
//修改密码
app.post("/changePsw", function (req, res) {
	//解决跨域问题
	res.append("Access-Control-Allow-Origin", "*");
	//连接后执行相应功能
	connect.query(`UPDATE student SET stu_pass =  '${req.body.psw}' WHERE stu_id =  ${req.body.id}`, function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify(results));
	});
})
//修改手机号
app.post("/changePhone", function (req, res) {
	//解决跨域问题
	res.append("Access-Control-Allow-Origin", "*");
	//连接后执行相应功能
	connect.query(`UPDATE student SET phone =  '${req.body.phone}' WHERE stu_id =  ${req.body.id}`, function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify(results));
	});
})
//----------------------------------------------------------------//

//学院相关操作
//----------------------------------------------------------------//
//----------------------------------------------------------------//


//----------------------------------------------------------------//

//专业相关操作
//----------------------------------------------------------------//
//----------------------------------------------------------------//

//----------------------------------------------------------------//


//年级相关的操作
//----------------------------------------------------------------//
//----------------------------------------------------------------//

//----------------------------------------------------------------//


//账户相关操作
//----------------------------------------------------------------//
//----------------------------------------------------------------//
//登录
app.post("/login", function (req, res) {
	//解决跨域问题
	res.append("Access-Control-Allow-Origin", "*");
	//连接后执行相应功能
	connect.query(`SELECT stu_state,stu_id FROM student WHERE (stu_id = ${req.body.id} OR phone = ${req.body.id}) AND stu_pass = '${req.body.psw}'`, function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify(results));
	});
})
//注册
app.post("/regist", function (req, res) {
	//解决跨域问题
	res.append("Access-Control-Allow-Origin", "*");
	//连接后执行相应功能
	connect.query(`UPDATE student SET phone = ${req.body.num} WHERE stu_id = ${req.body.id} AND stu_pass = '${req.body.psw}'`, function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify(results));
	});
})
//----------------------------------------------------------------//
//监听端口
server.listen(3001);
console.log("开启服务器3001")