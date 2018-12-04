# sign_pc
报名签到系统服务端
#### 后端——管理员端
* 活动管理
	1. 增：新增活动信息
		+ 新增活动类别
		+ 新增活动
	2. 查：查询活动信息（table）显示列表
		+ 显示活动类别
		+ 显示活动详情
	3. 导：导出活动信息
* 报名管理
	1. 增：新增报名信息
	2. 查：查询活动信息（table）显示列表
	3. 导：导出活动信息
* 签到管理
	1. 查：查询签到信息（table）显示列表
		+ 查询签到详情
	2. 导：导出签到信息
* 院系管理
	1. 增：新增信息
		+ 新增学院
		+ 新增专业
	2. 查：查询信息
		+ 查询学院信息
		+ 查询专业信息
	3. 删：删除存在状态
		+ 删除学院：所属专业无一存在
		+ 删除专业：该专业状态变为0
	4. 改：修改信息
		+ 修改学院名称
		+ 修改专业名称
* 账号管理
	1. 增：新增活动信息
	2. 查：查询活动信息（table）显示列表
	
- - - 
### 数据字典
#### 学生信息表 student
|列名|类型|长度|描述|
|-|-|-|-|
|stu_id|int|10|学号，主键|
|stu_name|varchar|32|学生姓名|
|stu_pass|varchar|32|登录密码|
|stu_sex|int|2|性别，男：0，女：1，默认为男|
|stu_birth|varchar|32|生日|
|id_card|char|18|身份证号码|
|academy|int|11|所属学院|
|major|int|11|所属专业|
|grade|int|4|所属年级|
|phone|char|11|手机号，可为空|
|stu_img|varchar|100|用户头像，可为空|
|stu_emil|varchar|32|用户邮箱，可为空|
|stu_credit|float|5|学生学分：默认0|
|stu_volunteer|float|5|学生义工：默认0|
|classes|int|2|班级|
|stu_state|int|1|学生状态，1：在读；0：离校|

#### 活动信息表 activity
|列名|类型|长度|描述|
|-|-|-|-|
|act_id|int|11|活动编号，主键，从430000起自增|
|act_name|varchar|32|活动名称|
|act_address|varchar|100|活动举办地址|
|begin_time|varchar|32|活动开始时间|
|act_type|int|4|活动类别，对应活动类别表gen_id|
|act_num|int|5|活动需求人数|
|act_sponsor|varchar|100|活动主办方或主讲人|
|academy|int|11|学院限制|
|major|int|11|专业限制|
|grade|int|4|年级限制|
|credit|float|5|学分奖励|
|volunteer|float|5|义工奖励|
|qrcode|varchar|500|活动二维码|
|act_text|text|-|活动详情|

#### 活动类别表 genre
|列名|类型|长度|描述|
|-|-|-|-|
|gen_id|int|4|活动类型编号，主键，从3001起自增|
|gen_name|varchar|50|活动类型名称|
|gen_state|int|1|活动类型存在状态，1：存在，0：不存在|

#### 报名信息汇总表 message
|列名|类型|长度|描述|
|-|-|-|-|
|mes_id|int|11|信息汇总编号，主键，从3000起自增|
|act_id|int|11|对应活动编号|
|mes_begin|varchar|32|报名开始时间|
|mes_stop|varchar|32|报名截止时间|

#### 报名签到详情表 enroll
|列名|类型|长度|描述|
|-|-|-|-|
|enr_id|int|11|详情编号，主键|
|stu_id|int|11|已报名学生学号|
|sign_state|int|1|签到状态，1：存在；0：已取消该专业|
|mes_id|int|11|对应报名信息表编号|


#### 学院信息表 academy
|列名|类型|长度|描述|
|-|-|-|-|
|aca_id|int|11|学院编号，主键，从10000起自增|
|aca_name|varchar|32|学院名称|
|aca_state|int|1|学院存在状态 1：存在；0：已取消|


#### 专业信息表 sign_up
|列名|类型|长度|描述|
|-|-|-|-|
|up_id|varchar|10|专业编号，主键，从1001起自增|
|up_type|varchar|15|专业名称
|status|varchar|20|所属学院|
|stu_id|varchar|11|存在状态，1：存在；0：已取消该专业|

#### 管理员信息表 manager
|列名|类型|长度|描述|
|-|-|-|-|
|man_id|int|11|管理员ID，主键,从201300起自增|
|man_name|varchar|32|管理员用户名，可为空|
|man_pass|varchar|16|管理员密码|
|man_img|varchar|500|头像|
|man_type|int|1|管理员身份，1：发布者；0：超级管理员|
#### 注意
新增活动：正则验证