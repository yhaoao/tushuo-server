var qiniu=require('qiniu');
var domain="yhaoao.qiniudn.com";

qiniu.conf.ACCESS_KEY = 'ON7aeHTBckn-wboFrWhtpzITkzvjqUbveBQb3qhg';
qiniu.conf.SECRET_KEY = 'Ph8PSr0_e22A918pEXqq45Y5gzabu1Sqtl44YRJ4';

function uptoken(bucketname) {
	var putPolicy = new qiniu.rs.PutPolicy(bucketname);
	putPolicy.returnBody = 'key=$(etag)';

	return putPolicy.token();
}

function downloadUrl(domain, key) {
  var baseUrl = qiniu.rs.makeBaseUrl(domain, key);
  var policy = new qiniu.rs.GetPolicy();
  return policy.makeRequest(baseUrl);
}

exports.getToken=function(req,res){
	res.json({
		token:uptoken('yhaoao')
	});
}

exports.bucketUrl="http://yhaoao.qiniudn.com/";