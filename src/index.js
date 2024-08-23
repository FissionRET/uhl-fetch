const axios = require('axios');
const qs = require('qs');
const { wrapper } = require('axios-cookiejar-support');
const tough = require('tough-cookie');
const cheerio = require('cheerio');
const fs = require('fs');

const cookieJar = new tough.CookieJar();
const client = wrapper(axios.create({
    jar: cookieJar,
    withCredentials: true
}))

const url = 'http://daotao.daihochalong.edu.vn/Login.aspx';
const formData = {
    __VIEWSTATE: '', // TODO: Get Viewstate value from hidden input with id
    __VIEWSTATEGENERATOR: '', // TODO: Get Viewstate generator value from hidden input with id
    __EVENTVALIDATION: '', // TODO: Get Event validation value from hidden input with id
    txtusername: '',
    txtpassword: '',
    btnDangNhap: 'Đăng nhập'
}

client.post(url, qs.stringify(formData))
.then(response => {
    console.log('Login state: successful');

    return client.get('http://daotao.daihochalong.edu.vn/wfrmLichHocSinhVienTinChi.aspx');
})
.then(response => {
    const $ = cheerio.load(response.data);

    console.log(`Received dashboard data for user ${$('#nav1_lblHo_ten').text()} with UID ${$('#nav1_lblMa_sv').text()}`);

    
    const tableLichHoc = $('table.GridViewStyle').parent().html();
    fs.writeFileSync('table.html', tableLichHoc);
})
.catch(err => {
    console.error('Error: ', err);
})