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
	host:'localhost',
	user:'pyj',
	password:'123456',
	database:'signinsystem'
});
// 处理post请求的请求体模块
var bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
//开始连接
connect.connect();

//活动相关的操作
//----------------------------------------------------------------//
//----------------------------------------------------------------//
	//新增活动信息
	app.post("/addAct",function(req,res){
		//解决跨域问题
		res.append("Access-Control-Allow-Origin","*");
		//连接后执行相应功能
//		console.log('新增活动类别')
		connect.query(`INSERT INTO activity(act_name, act_address, begin_time, stop_time, act_type, act_num, act_sponsor, academy, major, grade, credit, volunteer, act_text) VALUES ('${req.body.name}','${req.body.address}','${req.body.begin_time}','${req.body.stop_time}',${req.body.genre},${req.body.num},'${req.body.sponsor}',${req.body.aca},${req.body.major},${req.body.grade},'${req.body.credit}','${req.body.volunteer}','${req.body.cont}')`, function(error, results, fields) {
			if(error) throw error;
			res.send(JSON.stringify(results));
		});
	})
	//修改活动信息
	app.post("/changeAct",function(req,res){
		//解决跨域问题
		res.append("Access-Control-Allow-Origin","*");
		//连接后执行相应功能
//		console.log(req.body)
		connect.query(`UPDATE activity SET act_name='${req.body.name}',act_address='${req.body.address}',begin_time='${req.body.begin_time}',stop_time='${req.body.stop_time}',act_type=${req.body.genre},act_num=${req.body.num},act_sponsor='${req.body.sponsor}',academy=${req.body.aca},major=${req.body.major},grade=${req.body.grade},credit=${req.body.credit},volunteer=${req.body.volunteer},act_text='${req.body.cont}' WHERE act_id = ${req.body.id}`, function(error, results, fields) {
			if(error) throw error;
			res.send(JSON.stringify(results));
		});
	})
	//删除活动信息
	app.post("/delAct",function(req,res){
		//解决跨域问题
		res.append("Access-Control-Allow-Origin","*");
		//连接后执行相应功能
//		console.log(req.body)
		connect.query(`UPDATE activity SET act_state = 0 WHERE act_id = ${req.body.id}`, function(error, results, fields) {
			if(error) throw error;
			res.send(JSON.stringify(results));
		});
	})
	//删除活动信息
	app.post("/deleteAct",function(req,res){
		//解决跨域问题
		res.append("Access-Control-Allow-Origin","*");
		//连接后执行相应功能
//		console.log(req.body)
		connect.query(`DELETE FROM activity WHERE act_id = ${req.body.id}`, function(error, results, fields) {
			if(error) throw error;
			res.send(JSON.stringify(results));
		});
	})
	//查询活动条数
	app.post("/getActTotal",function(req,res){
		//解决跨域问题
		res.append("Access-Control-Allow-Origin","*");
		//连接后执行相应功能
//		console.log('获取报名表条数')
		connect.query(`SELECT COUNT(*) total from activity WHERE act_state = 1`, function(error, results, fields) {
			if(error) throw error;
	//		console.log(results)
			res.send(JSON.stringify(results));
		});
	})
	
	//查询可否删除
	app.post("/actIsDel",function(req,res){
		//解决跨域问题
		res.append("Access-Control-Allow-Origin","*");
		//连接后执行相应功能
		connect.query(`SELECT message.mes_id FROM message,activity,enroll WHERE activity.act_id = message.act_id AND enroll.mes_id = message.mes_id AND activity.act_id = ${req.body.id}`, function(error, results, fields) {
			if(error) throw error;
	//		console.log(results)
			res.send(JSON.stringify(results));
		});
	})
	//获取所有的活动简略信息
	app.post("/getAct",function(req,res){
		//解决跨域问题
		res.append("Access-Control-Allow-Origin","*");
		//连接后执行相应功能
//		console.log('获取所有活动信息')
		connect.query(`SELECT activity.*,genre.gen_name FROM activity,genre WHERE act_state = 1 AND activity.act_type = genre.gen_id ORDER BY begin_time DESC LIMIT ${req.body.start},9`, function(error, results, fields) {
			if(error) throw error;
	//		console.log(results)
			res.send(JSON.stringify(results));
		});
	})
	//根据id查询活动名称
	app.post("/getActById",function(req,res){
		//解决跨域问题
		res.append("Access-Control-Allow-Origin","*");
		//连接后执行相应功能
		connect.query(`SELECT activity.*,genre.gen_name FROM activity,genre WHERE activity.act_type = genre.gen_id AND act_id = ${req.body.id}`, function(error, results, fields) {
			if(error) throw error;
	//		console.log(results)
			res.send(JSON.stringify(results));
		});
	})
	//根据id查询活动名称
	app.post("/getActName",function(req,res){
		//解决跨域问题
		res.append("Access-Control-Allow-Origin","*");
		//连接后执行相应功能
		connect.query(`SELECT act_name,begin_time FROM activity WHERE act_id = ${req.body.id}`, function(error, results, fields) {
			if(error) throw error;
			res.send(JSON.stringify(results));
		});
	})
	//获取无对应的活动要求表的活动名称和id
	app.post("/getActNoMess",function(req,res){
		//解决跨域问题
		res.append("Access-Control-Allow-Origin","*");
		//连接后执行相应功能
		connect.query(`SELECT act_id,act_name,begin_time FROM activity WHERE act_state = 1 AND act_id NOT IN ( SELECT act_id FROM message)`, function(error, results, fields) {
			if(error) throw error;
	//		console.log(results)
			res.send(JSON.stringify(results));
		});
	})
	//根据活动的名称，类别或举行地址查询活动信息
	app.post("/getActByOther",function(req,res){
		//解决跨域问题
		res.append("Access-Control-Allow-Origin","*");
		//连接后执行相应功能
		connect.query(`SELECT activity.*,genre.gen_name FROM activity,genre WHERE activity.act_type = genre.gen_id AND activity.act_name like '%${req.body.name}%' AND genre.gen_name LIKE '%${req.body.genre}%' AND activity.act_address LIKE '%${req.body.address}%' LIMIT ${req.body.start},9`, function(error, results, fields) {
			if(error) throw error;
			res.send(JSON.stringify(results));
		});
	})
	//根据活动的名称，类别或举行地址查询活动信息
	app.post("/getActByOtherTotal",function(req,res){
		//解决跨域问题
		res.append("Access-Control-Allow-Origin","*");
		//连接后执行相应功能
		connect.query(`SELECT COUNT(activity.act_id) total FROM activity,genre WHERE activity.act_type = genre.gen_id AND activity.act_name like '%${req.body.name}%' AND genre.gen_name LIKE '%${req.body.genre}%' AND activity.act_address LIKE '%${req.body.address}%'`, function(error, results, fields) {
			if(error) throw error;
			res.send(JSON.stringify(results));
		});
	})
//----------------------------------------------------------------//


//活动类型操作 genre
//----------------------------------------------------------------//
//----------------------------------------------------------------//
	//新增一种活动类型
	app.post("/addGenre",function(req,res){
		//解决跨域问题
		res.append("Access-Control-Allow-Origin","*");
		//连接后执行相应功能
//		console.log('新增活动类别')
		connect.query(`INSERT INTO genre(gen_name, gen_state) VALUES ('${req.body.name}',1)`, function(error, results, fields) {
			if(error) throw error;
			res.send(JSON.stringify(results));
		});
	})
	//修改活动类型名称
	app.post("/changeGenre",function(req,res){
		//解决跨域问题
		res.append("Access-Control-Allow-Origin","*");
		//连接后执行相应功能
//		console.log('重命名类别')
		connect.query(`UPDATE genre SET gen_name='${req.body.name}',gen_state = ${req.body.state} WHERE gen_id =${req.body.id} `, function(error, results, fields) {
			if(error) throw error;
			res.send(JSON.stringify(results));
		});
	})
	//获取活动类型
	app.post("/getGenre",function(req,res){
		//解决跨域问题
		res.append("Access-Control-Allow-Origin","*");
		//连接后执行相应功能
//		console.log('获取所有活动类别信息')
		connect.query(`SELECT * FROM genre WHERE gen_state = 1  LIMIT ${req.body.start},9`, function(error, results, fields) {
			if(error) throw error;
			res.send(JSON.stringify(results));
		});
	})
	//获取活动类型数量
	app.post("/getGenreTotal",function(req,res){
		//解决跨域问题
		res.append("Access-Control-Allow-Origin","*");
		//连接后执行相应功能
//		console.log('获取活动类型数量')
		connect.query(`SELECT COUNT(*) total from genre WHERE gen_state = 1`, function(error, results, fields) {
			if(error) throw error;
	//		console.log(results)
			res.send(JSON.stringify(results));
		});
	})
	//一次获得所有活动信息
	app.post("/getGenreOnce",function(req,res){
		//解决跨域问题
		res.append("Access-Control-Allow-Origin","*");
		//连接后执行相应功能
//		console.log('获取所有活动类别信息')
		connect.query(`SELECT * FROM genre WHERE gen_state = 1`, function(error, results, fields) {
			if(error) throw error;
			res.send(JSON.stringify(results));
		});
	})
//----------------------------------------------------------------//

//报名相关的操作
//----------------------------------------------------------------//
//----------------------------------------------------------------//
	//新增报名表信息
	app.post("/addMess",function(req,res){
		//解决跨域问题
		res.append("Access-Control-Allow-Origin","*");
		//连接后执行相应功能
//		console.log(req.body)
		connect.query(`INSERT INTO message(act_id, mes_begin, mes_stop, is_sign) VALUES (${req.body.id},'${req.body.btime}','${req.body.stime}',${req.body.sign})`, function(error, results, fields) {
			if(error) throw error;
			res.send(JSON.stringify(results));
		});
	})
	//修改报名表信息 
	app.post("/updateMess",function(req,res){
		//解决跨域问题
		res.append("Access-Control-Allow-Origin","*");
		//连接后执行相应功能
//		console.log('获取报名表条数')
		connect.query(`UPDATE message SET mes_begin='${req.body.btime}',mes_stop='${req.body.stime}',is_sign=${req.body.sign} WHERE mes_id = ${req.body.id}`, function(error, results, fields) {
			if(error) throw error;
			res.send(JSON.stringify(results));
		});
	})
	//删除报名表信息
	
	//查询报名表条数
	app.post("/getMesTotal",function(req,res){
		//解决跨域问题
		res.append("Access-Control-Allow-Origin","*");
		//连接后执行相应功能
//		console.log('获取报名表条数')
		connect.query(`SELECT COUNT(*) total from message`, function(error, results, fields) {
			if(error) throw error;
	//		console.log(results)
			res.send(JSON.stringify(results));
		});
	})
	
	//查询所有的报名简介
	app.post("/getMes",function(req,res){
		//解决跨域问题
		res.append("Access-Control-Allow-Origin","*");
		//连接后执行相应功能
//		console.log('获取所有报名表信息')
		connect.query(`SELECT COUNT(enroll.mes_id) len,message.*,activity.act_name,activity.act_num FROM enroll,message,activity WHERE enroll.mes_id = message.mes_id AND activity.act_id = message.act_id GROUP BY enroll.mes_id LIMIT ${req.body.start},9`, function(error, results, fields) {
			if(error) throw error;
	//		console.log(results)
			res.send(JSON.stringify(results));
		});
	})
	//根据id查询所有的报名简介
	app.post("/getMesById",function(req,res){
		//解决跨域问题
		res.append("Access-Control-Allow-Origin","*");
		//连接后执行相应功能
//		console.log('获取所有报名表信息')
		connect.query(`SELECT COUNT(enroll.mes_id) len,message.*,activity.act_name,activity.act_num FROM enroll,message,activity WHERE enroll.mes_id = message.mes_id AND activity.act_id = message.act_id AND message.mes_id = ${req.body.id} `, function(error, results, fields) {
			if(error) throw error;
	//		console.log(results)
			res.send(JSON.stringify(results));
		});
	})
	//根据name查询所有的报名简介
	app.post("/getMesByName",function(req,res){
		//解决跨域问题
		res.append("Access-Control-Allow-Origin","*");
		//连接后执行相应功能
//		console.log('获取所有报名表信息')
		connect.query(`SELECT COUNT(enroll.mes_id) len,message.*,activity.act_name,activity.act_num FROM enroll,message,activity WHERE enroll.mes_id = message.mes_id AND activity.act_id = message.act_id AND activity.act_name LIKE '%${req.body.name}%' GROUP BY enroll.mes_id LIMIT ${req.body.start},9`, function(error, results, fields) {
			if(error) throw error;
	//		console.log(results)
			res.send(JSON.stringify(results));
		});
	})
	//根据name查询所有的报名信息管理条数
	app.post("/getMesByNameTotal",function(req,res){
		//解决跨域问题
		res.append("Access-Control-Allow-Origin","*");
		//连接后执行相应功能
//		console.log('获取所有报名表信息')
		connect.query(`SELECT COUNT(message.mes_id) total FROM message,activity WHERE activity.act_name LIKE '%${req.body.name}%' AND message.act_id = activity.act_id`, function(error, results, fields) {
			if(error) throw error;
	//		console.log(results)
			res.send(JSON.stringify(results));
		});
	})
	//通过id查询对应活动的报名人详情 
	app.post("/detailEnrollById",function(req,res){
		//解决跨域问题
		res.append("Access-Control-Allow-Origin","*");
		//连接后执行相应功能
//		console.log('获取所有报名表信息')
		connect.query(`SELECT enroll.enr_id, enroll.stu_id,student.stu_name,academy.aca_name,major.major_name  FROM enroll,student,academy,major WHERE academy.aca_id = student.academy AND major.major_id = student.major AND enroll.mes_id = ${req.body.id} AND enroll.stu_id = student.stu_id LIMIT ${req.body.start},9`, function(error, results, fields) {
			if(error) throw error;
	//		console.log(results)
			res.send(JSON.stringify(results));
		});
	})
	//通过id查询对应活动的报名人详情 
	app.post("/detailEnrollByIdTotal",function(req,res){
		//解决跨域问题
		res.append("Access-Control-Allow-Origin","*");
		//连接后执行相应功能
//		console.log('获取所有报名表信息')
		connect.query(`SELECT COUNT(stu_id) total FROM enroll WHERE enroll.mes_id = ${req.body.id}`, function(error, results, fields) {
			if(error) throw error;
	//		console.log(results)
			res.send(JSON.stringify(results));
		});
	})
	//通过id显示内容
	app.post("/getMessById",function(req,res){
		//解决跨域问题
		res.append("Access-Control-Allow-Origin","*");
		//连接后执行相应功能
//		console.log('获取报名表条数')
		connect.query(`SELECT message.act_id, message.mes_begin, message.mes_stop,activity.act_name FROM message,activity WHERE message.mes_id = ${req.body.id} AND message.act_id = activity.act_id`, function(error, results, fields) {
			if(error) throw error;
	//		console.log(results)
			res.send(JSON.stringify(results));
		});
	})
	
//----------------------------------------------------------------//

//签到相关的操作
//----------------------------------------------------------------//
//----------------------------------------------------------------//
	//获取所有签到情况
	app.post("/getSign",function(req,res){
		//解决跨域问题
		res.append("Access-Control-Allow-Origin","*");
		//连接后执行相应功能
//		console.log('获取签到概况')
		connect.query(`SELECT message.mes_id,SUM(enroll.sign_state) num,COUNT(enroll.mes_id) len,activity.act_name FROM enroll,message,activity WHERE enroll.mes_id = message.mes_id AND activity.act_id = message.act_id GROUP BY enroll.mes_id LIMIT ${req.body.start},9`, function(error, results, fields) {
			if(error) throw error;
	//		console.log(results)
			res.send(JSON.stringify(results));
		});
	})
	//根据id显示签到简略
	app.post("/getSignId",function(req,res){
		//解决跨域问题
		res.append("Access-Control-Allow-Origin","*");
		//连接后执行相应功能
//		console.log('获取签到概况')
		connect.query(`SELECT message.mes_id,SUM(enroll.sign_state) num,COUNT(enroll.mes_id) len,activity.act_name FROM enroll,message,activity WHERE enroll.mes_id = message.mes_id AND activity.act_id = message.act_id AND message.mes_id = ${req.body.id} GROUP BY enroll.mes_id `, function(error, results, fields) {
			if(error) throw error;
	//		console.log(results)
			res.send(JSON.stringify(results));
		});
	})
	//根据活动名称获取所有签到情况
	app.post("/getSignByName",function(req,res){
		//解决跨域问题
		res.append("Access-Control-Allow-Origin","*");
		//连接后执行相应功能
//		console.log('获取签到概况')
		connect.query(`SELECT message.mes_id,SUM(enroll.sign_state) num,COUNT(enroll.mes_id) len,activity.act_name FROM enroll,message,activity WHERE enroll.mes_id = message.mes_id AND activity.act_name LIKE '%${req.body.name}%' AND activity.act_id = message.act_id GROUP BY enroll.mes_id LIMIT ${req.body.start},9`, function(error, results, fields) {
			if(error) throw error;
	//		console.log(results)
			res.send(JSON.stringify(results));
		});
	})
	//根据id显示所有签到情况
	app.post("/getSignById",function(req,res){
		//解决跨域问题
		res.append("Access-Control-Allow-Origin","*");
		//连接后执行相应功能
//		console.log('获取签到详情')
		connect.query(`SELECT student.stu_id,student.stu_name,grade.gra_name,student.classes,academy.aca_name,major.major_name,enroll.sign_state FROM student,academy,major,enroll,grade WHERE enroll.mes_id = ${req.body.id} AND student.stu_id = enroll.stu_id AND student.academy = academy.aca_id AND grade.gra_id = student.grade AND student.major = major.major_id LIMIT  ${req.body.start},9`, function(error, results, fields) {
			if(error) throw error;
	//		console.log(results)
			res.send(JSON.stringify(results));
		});
	})
	//根据id及签到情况显示详情
	app.post("/getSignByIdState",function(req,res){
		//解决跨域问题
		res.append("Access-Control-Allow-Origin","*");
		//连接后执行相应功能
		connect.query(`SELECT student.stu_id,student.stu_name,grade.gra_name,student.classes,academy.aca_name,major.major_name,enroll.sign_state FROM student,academy,major,enroll,grade WHERE enroll.mes_id = ${req.body.id} AND student.stu_id = enroll.stu_id AND student.academy = academy.aca_id AND student.major = major.major_id AND grade.gra_id = student.grade AND enroll.sign_state = ${req.body.state} LIMIT  ${req.body.start},9`, function(error, results, fields) {
			if(error) throw error;
	//		console.log(results)
			res.send(JSON.stringify(results));
		});
	})
	//根据id查询数量
	app.post("/getSignByIdTotal",function(req,res){
		//解决跨域问题
		res.append("Access-Control-Allow-Origin","*");
		//连接后执行相应功能
		connect.query(`SELECT COUNT(mes_id) total from enroll WHERE enroll.mes_id = ${req.body.id}`, function(error, results, fields) {
			if(error) throw error;
			res.send(JSON.stringify(results));
		});
	})
	//根据id查询数量
	app.post("/getSignByStateTotal",function(req,res){
		//解决跨域问题
		res.append("Access-Control-Allow-Origin","*");
		//连接后执行相应功能
		connect.query(`SELECT COUNT(mes_id) total from enroll WHERE enroll.mes_id = ${req.body.id} AND enroll.sign_state = ${req.body.state}`, function(error, results, fields) {
			if(error) throw error;
			res.send(JSON.stringify(results));
		});
	})
	//根据id显示所有签到情况
	app.post("/getSignByIdAll",function(req,res){
		//解决跨域问题
		res.append("Access-Control-Allow-Origin","*");
		//连接后执行相应功能
//		console.log('获取签到详情')
		connect.query(`SELECT student.stu_id,student.stu_name,grade.gra_name,student.classes,academy.aca_name,major.major_name,enroll.sign_state FROM student,academy,major,enroll,grade WHERE enroll.mes_id = ${req.body.id} AND student.stu_id = enroll.stu_id AND student.academy = academy.aca_id AND grade.gra_id = student.grade AND student.major = major.major_id `, function(error, results, fields) {
			if(error) throw error;
	//		console.log(results)
			res.send(JSON.stringify(results));
		});
	})
	//根据id显示所有签到情况
	app.post("/getSignByStateAll",function(req,res){
		//解决跨域问题
		res.append("Access-Control-Allow-Origin","*");
		//连接后执行相应功能
//		console.log('获取签到详情')
		connect.query(`SELECT student.stu_id,student.stu_name,grade.gra_name,student.classes,academy.aca_name,major.major_name,enroll.sign_state FROM student,academy,major,enroll,grade WHERE enroll.mes_id = ${req.body.id} AND student.stu_id = enroll.stu_id AND student.academy = academy.aca_id AND grade.gra_id = student.grade AND student.major = major.major_id AND enroll.sign_state = ${req.body.state}`, function(error, results, fields) {
			if(error) throw error;
	//		console.log(results)
			res.send(JSON.stringify(results));
		});
	})
	//根据id显示所有签到情况
	app.post("/getSignByIdSome",function(req,res){
		//解决跨域问题
		res.append("Access-Control-Allow-Origin","*");
		//连接后执行相应功能
//		console.log('获取签到详情')
		connect.query(`SELECT student.stu_id,student.stu_name,grade.gra_name,student.classes,academy.aca_name,major.major_name,enroll.sign_state FROM student,academy,major,enroll,grade WHERE enroll.mes_id = ${req.body.id} AND student.stu_id = enroll.stu_id AND student.academy = academy.aca_id AND grade.gra_id = student.grade AND student.major = major.major_id LIMIT ${req.body.begin},${req.body.end}`, function(error, results, fields) {
			if(error) throw error;
	//		console.log(results)
			res.send(JSON.stringify(results));
		});
	})
	//根据id显示所有签到情况
	app.post("/getSignByStateSome",function(req,res){
		//解决跨域问题
		res.append("Access-Control-Allow-Origin","*");
		//连接后执行相应功能
//		console.log('获取签到详情')
		connect.query(`SELECT student.stu_id,student.stu_name,grade.gra_name,student.classes,academy.aca_name,major.major_name,enroll.sign_state FROM student,academy,major,enroll,grade WHERE enroll.mes_id = ${req.body.id} AND student.stu_id = enroll.stu_id AND student.academy = academy.aca_id AND grade.gra_id = student.grade AND student.major = major.major_id AND enroll.sign_state = ${req.body.state} LIMIT ${req.body.begin},${req.body.end}`, function(error, results, fields) {
			if(error) throw error;
	//		console.log(results)
			res.send(JSON.stringify(results));
		});
	})
//----------------------------------------------------------------//

//学生相关操作
//----------------------------------------------------------------//
//----------------------------------------------------------------//
	//添加学生 
	app.post("/addStu",function(req,res){
	//解决跨域问题
		res.append("Access-Control-Allow-Origin","*");
		//连接后执行相应功能
		connect.query(`INSERT INTO student(stu_name, stu_pass, stu_sex, stu_birth, id_card, academy, major, grade, stu_credit, stu_volunteer, classes, stu_state) VALUES ('${req.body.name}','${req.body.pass}',${req.body.sex},'${req.body.birth}',${req.body.id},${req.body.academy},${req.body.major},${req.body.grade},0,0,${req.body.classes},1)`, function(error, results, fields) {
			if(error) throw error;
			res.send(JSON.stringify(results));
		});
	})
	//查询学生信息
	app.post("/getStu",function(req,res){
	//解决跨域问题
		res.append("Access-Control-Allow-Origin","*");
		//连接后执行相应功能
		connect.query(`SELECT stu_name, stu_sex, stu_birth, id_card, academy.aca_name, major.major_name,academy.aca_id,major.major_id,grade.gra_id, grade.gra_name, stu_credit, stu_volunteer, classes FROM student,academy,major,grade WHERE student.academy = academy.aca_id AND student.major = major.major_id AND student.grade = grade.gra_id AND stu_id =  ${req.body.id}`, function(error, results, fields) {
			if(error) throw error;
			res.send(JSON.stringify(results));
		});
	})
	//删除学生 
	app.post("/delStu",function(req,res){
	//解决跨域问题
		res.append("Access-Control-Allow-Origin","*");
		//连接后执行相应功能
		connect.query(`UPDATE student SET stu_state = 0 WHERE stu_id = ${req.body.id}`, function(error, results, fields) {
			if(error) throw error;
			res.send(JSON.stringify(results));
		});
	})
	//修改学生信息 
	app.post("/changeStu",function(req,res){
	//解决跨域问题
		res.append("Access-Control-Allow-Origin","*");
		//连接后执行相应功能
//		console.log(req.body)
		connect.query(`UPDATE student SET academy=${req.body.academy},major = ${req.body.major},stu_credit = '${req.body.credit}',stu_volunteer= '${req.body.volunteer}',classes = ${req.body.classes} WHERE stu_id = ${req.body.id}`, function(error, results, fields) {
			if(error) throw error;
			res.send(JSON.stringify(results));
		});
	})

//----------------------------------------------------------------//

//学院相关操作
//----------------------------------------------------------------//
//----------------------------------------------------------------//
	//获取学院的所有信息并分页显示
	app.post("/getAca",function(req,res){
		res.append("Access-Control-Allow-Origin","*");
		connect.query(`SELECT * FROM academy WHERE aca_state = 1 LIMIT ${req.body.start},9`, function(error, results, fields) {
			if(error) throw error;
			res.send(JSON.stringify(results));
		});
	})
	
	//获取所有信息且不分页
	app.post("/getAcaOnce",function(req,res){
		//解决跨域问题
		res.append("Access-Control-Allow-Origin","*");
		//连接后执行相应功能
//		console.log('获取所有学院信息')
		connect.query(`SELECT * FROM academy WHERE aca_state = 1`, function(error, results, fields) {
			if(error) throw error;
			res.send(JSON.stringify(results));
		});
	})
	
	//获取学院的长度（仍存在的）
	app.post("/getAcaTotal",function(req,res){
		//解决跨域问题
		res.append("Access-Control-Allow-Origin","*");
		//连接后执行相应功能
//		console.log('获取报名表条数')
		connect.query(`SELECT COUNT(*) total from academy WHERE aca_state = 1`, function(error, results, fields) {
			if(error) throw error;
	//		console.log(results)
			res.send(JSON.stringify(results));
		});
	})
	
	//新增学院信息
	app.post("/addAca",function(req,res){
	//解决跨域问题
		res.append("Access-Control-Allow-Origin","*");
		//连接后执行相应功能
//		console.log('新增学院')
		connect.query(`INSERT INTO academy(aca_name, aca_state) VALUES ('${req.body.name}',1)`, function(error, results, fields) {
			if(error) throw error;
			res.send(JSON.stringify(results));
		});
	})
	
	//修改学院名称
	app.post("/changeAca",function(req,res){
		//解决跨域问题
		res.append("Access-Control-Allow-Origin","*");
		//连接后执行相应功能
//		console.log('重命名学院')
		connect.query(`UPDATE academy SET aca_name='${req.body.name}',aca_state = ${req.body.state} WHERE aca_id =${req.body.id} `, function(error, results, fields) {
			if(error) throw error;
			res.send(JSON.stringify(results));
		});
	})
	
	//是否删除学院查询
	app.post("/isDeleteAca",function(req,res){
		//解决跨域问题
		res.append("Access-Control-Allow-Origin","*");
		//连接后执行相应功能
//		console.log('获取该学院域下存在的专业')
		connect.query(`SELECT COUNT(*) total from academy,major WHERE aca_id = ${req.body.id} AND major.major_type = academy.aca_id AND major.major_state = 1`, function(error, results, fields) {
			if(error) throw error;
			res.send(JSON.stringify(results));
		});
	})

//----------------------------------------------------------------//

//专业相关操作
//----------------------------------------------------------------//
//----------------------------------------------------------------//
	//获取所有的专业信息
	app.post("/getMajor",function(req,res){
		//解决跨域问题
		res.append("Access-Control-Allow-Origin","*");
		//连接后执行相应功能
//		console.log('获取所有专业信息')
		connect.query(`SELECT academy.aca_name,major.major_id,major.major_name,major.major_state,academy.aca_id FROM major,academy WHERE academy.aca_id = major.major_type AND major_state = 1 LIMIT ${req.body.start},9`, function(error, results, fields) {
			if(error) throw error;
	//		console.log(results)
			res.send(JSON.stringify(results));
		});
	})
	//获取专业数量
	app.post("/getMajorTotal",function(req,res){
		//解决跨域问题
		res.append("Access-Control-Allow-Origin","*");
		//连接后执行相应功能
//		console.log('获取报名表条数')
		connect.query(`SELECT COUNT(*) total from major WHERE major_state = 1`, function(error, results, fields) {
			if(error) throw error;
	//		console.log(results)
			res.send(JSON.stringify(results));
		});
	})
	//修改专业信息：修改名称和废除专业
	app.post("/changeMajor",function(req,res){
		//解决跨域问题
		res.append("Access-Control-Allow-Origin","*");
		//连接后执行相应功能
		connect.query(`UPDATE major SET major_name = '${req.body.name}',major_type = ${req.body.aca_id},major_state = ${req.body.state} WHERE major_id = ${req.body.id}`, function(error, results, fields) {
			if(error) throw error;
			res.send(JSON.stringify(results));
		});
	})
	
	//添加专业
	app.post("/addMajor",function(req,res){
		//解决跨域问题
		res.append("Access-Control-Allow-Origin","*");
		//连接后执行相应功能
//		console.log('新增活动类别')
		connect.query(`INSERT INTO major(major_name,major_state,major_type) VALUES ('${req.body.name}',1,${req.body.id})`, function(error, results, fields) {
			if(error) throw error;
			res.send(JSON.stringify(results));
		});
	})
	//通过学院id查询对应专业
	app.post("/getMajorById",function(req,res){
		//解决跨域问题
		res.append("Access-Control-Allow-Origin","*");
		//连接后执行相应功能
//		console.log(res.body)
		connect.query(`SELECT * FROM major WHERE major_state = 1 AND major_type =  ${req.body.id}`, function(error, results, fields) {
			if(error) throw error;
	//		console.log(results)
			res.send(JSON.stringify(results));
		});
	})
//----------------------------------------------------------------//


//年级相关的操作
//----------------------------------------------------------------//
//----------------------------------------------------------------//
	//获取所有年级信息
	app.post("/getGrade",function(req,res){
		//解决跨域问题
		res.append("Access-Control-Allow-Origin","*");
		//连接后执行相应功能
		connect.query(`SELECT * FROM grade WHERE gra_state = 1`, function(error, results, fields) {
			if(error) throw error;
	//		console.log(results)
			res.send(JSON.stringify(results));
		});
	})
//----------------------------------------------------------------//


//账户相关操作
//----------------------------------------------------------------//
//----------------------------------------------------------------//
	//新增发布者
	app.post("/addMan",function(req,res){
		res.append("Access-Control-Allow-Origin","*");
		connect.query(`INSERT INTO manager(man_name, man_pass, man_type, man_sex) VALUES ('${req.body.name}','123456',1,${req.body.sex})`, function(error, results, fields) {
			if(error) throw error;
			res.send(JSON.stringify(results));
		});
	})
	//删除管理员
	app.post("/delMan",function(req,res){
		res.append("Access-Control-Allow-Origin","*");
		connect.query(`DELETE FROM manager WHERE man_id = ${req.body.id}`, function(error, results, fields) {
			if(error) throw error;
			res.send(JSON.stringify(results));
		});
	})
	//获取所有发布者信息并分页显示
	app.post("/getManPage",function(req,res){
		res.append("Access-Control-Allow-Origin","*");
		connect.query(`SELECT * FROM manager WHERE man_type = 1 LIMIT ${req.body.start},9`, function(error, results, fields) {
			if(error) throw error;
			res.send(JSON.stringify(results));
		});
	})

	//获取发布者人数长度（仍存在的）
	app.post("/getManTotal",function(req,res){
		//解决跨域问题
		res.append("Access-Control-Allow-Origin","*");
		//连接后执行相应功能
//		console.log('获取报名表条数')
		connect.query(`SELECT COUNT(*) total from manager WHERE man_type = 1`, function(error, results, fields) {
			if(error) throw error;
	//		console.log(results)
			res.send(JSON.stringify(results));
		});
	})
	//获取所有发布者信息
	app.post("/getMan",function(req,res){
		//解决跨域问题
		res.append("Access-Control-Allow-Origin","*");
		//连接后执行相应功能
//		console.log('获取所有发布者信息')
		connect.query(`SELECT * FROM manager`, function(error, results, fields) {
			if(error) throw error;
	//		console.log(results)
			res.send(JSON.stringify(results));
		});
	})
	//获取个人信息
	app.post("/getManById",function(req,res){
		//解决跨域问题
		res.append("Access-Control-Allow-Origin","*");
		//连接后执行相应功能
		connect.query(`SELECT * FROM manager WHERE man_id = ${req.body.id}`, function(error, results, fields) {
			if(error) throw error;
	//		console.log(results)
			res.send(JSON.stringify(results));
		});
	})
	//修改密码
	app.post("/changePass",function(req,res){
		//解决跨域问题
		res.append("Access-Control-Allow-Origin","*");
		//连接后执行相应功能
//		console.log(req.body)
		connect.query(`UPDATE manager SET man_pass = ${req.body.news} WHERE man_id = ${req.body.id} AND man_pass = ${req.body.olds}`, function(error, results, fields) {
			if(error) throw error;
	//		console.log(results)
			res.send(JSON.stringify(results));
		});
	})
	//登录
	app.post("/login",function(req,res){
		//解决跨域问题
		res.append("Access-Control-Allow-Origin","*");
		//连接后执行相应功能
		console.log('获取所有发布者信息')
		connect.query(`SELECT man_type FROM manager WHERE man_id = ${req.body.name} AND man_pass = '${req.body.pass}'`, function(error, results, fields) {
			if(error) throw error;
	//		console.log(results)
			res.send(JSON.stringify(results));
		});
	})
//----------------------------------------------------------------//
//监听端口
server.listen(3000);
console.log("开启服务器3000")
