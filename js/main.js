const dom = document.querySelector.bind(document);
const doms = document.querySelectorAll.bind(document);

let staffs = [];

let isSubmit = false;
init();

function init() {
    staffs = JSON.parse(localStorage.getItem("staffs")) || [];
    staffs = staffs.map((value) => {
        return new Staff(
            value.account,
            value.username,
            value.email,
            value.password,
            value.date,
            value.salary,
            value.position,
            value.hourWork
        );
    })
    display(staffs);
}
dom('#btnThem').onclick =
    function btnAdd() {
        dom('#btnThemNV').disabled = false;
        dom('#btnCapNhat').disabled = true;
    }
    // hàm add nhân viên
function addStaff() {
    isSubmit = true;
    let staff = validate();
    if (!staff) {
        return;
    }
    staffs.push(staff);

    localStorage.setItem('staffs', JSON.stringify(staffs));
    display(staffs);
    reset();

}
// hàm xóa nhân viên
function remove(staffId) {
    // let index = staffs.findIndex((value) => {
    //     return value.account === Number(staffId);
    // });
    // if (index !== -1) {
    //     staffs.splice(index, 1);
    // }
    staffs = staffs.filter((value) => {
        return value.account !== Number(staffId);
    });
    localStorage.setItem('staffs', JSON.stringify(staffs));
    display(staffs);

}

// hàm chọn nv
function select(id) {
    let staff = staffs.find((value) => {
        return value.account === Number(id);
    });
    dom('#tknv').value = staff.account;
    dom('#name').value = staff.username;
    dom('#email').value = staff.email;
    dom('#password').value = staff.password;
    dom('#datepicker').value = staff.date;
    dom('#luongCB').value = staff.salary;
    dom('#chucvu').value = staff.position;
    dom('#gioLam').value = staff.hourWork;
    dom('#btnThemNV').disabled = true;
    dom('#btnCapNhat').disabled = false;
}
// hàm tìm kiếm 
function findStaff() {
    let search = dom('#searchName').value;
    search = search.trim().toLowerCase();
    let newStaffs = staffs.filter((value) => {
        let xeploai = value.calcXeploai().trim().toLowerCase();
        return xeploai.includes(search);
    });
    display(newStaffs);
}

// hàm update
function update() {
    isSubmit = true;
    let staff = validate();
    if (!staff) {
        return;
    }
    let index = staffs.findIndex((value) => {
        return value.account === staff.account;
    });
    staffs[index] = staff;
    localStorage.setItem('staffs', JSON.stringify(staffs));
    display(staffs);
    reset();

}
// hàm reset
function reset() {
    dom('#tknv').value = "";
    dom('#name').value = "";
    dom('#email').value = "";
    dom('#password').value = "";
    dom('#datepicker').value = "";
    dom('#luongCB').value = "";
    dom('#chucvu').value = "";
    dom('#gioLam').value = "";

    dom('#tbTKNV').innerHTML = "";
    dom('#tbTen').innerHTML = "";
    dom('#tbEmail').innerHTML = "";
    dom('#tbMatKhau').innerHTML = "";
    dom('#tbNgay').innerHTML = "";
    dom('#tbLuongCB').innerHTML = "";
    dom('#tbChucVu').innerHTML = "";
    dom('#tbGiolam').innerHTML = "";
    dom('#btnThemNV').disabled = false;
}

// hàm display nhân viên
function display(staff) {
    let html = staff.reduce((result, value) => {
        return (result + `
        <tr>
            <td>${value.account}</td>
            <td>${value.username}</td>
            <td>${value.email}</td>
            <td>${value.date}</>
            <td>${value.position}</td>
            <td>${value.calcSalary()}</td>
            <td>${value.calcXeploai()}</td>
            <td>
            <button data-toggle="modal" data-target="#myModal" onclick="select('${value.account}')" class="btn btn-warning">Chỉnh sửa</button>
            <button onclick="remove('${value.account}')" class="btn btn-danger">Xóa</button></td>
        </tr>
        `);
    }, '');
    dom('#tableDanhSach').innerHTML = html;
}
// hàm kiểm tra rỗng hay không
function isEmpty(value) {
    if (!value.trim()) {
        return false;
    }
    return true;
}
// hàm kiểm tra tài khoản tối đa 4 hoặc 6 ký tự
function isAcount(value) {
    let regexAcount = /^\d{4,6}$/;
    return regexAcount.test(value);
}
// hàm user là chuỗi và k để trống
function isUserName(value) {
    let regexUser = /^\S+$/;
    return regexUser.test(value);
}

function isEmail(value) {
    let regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return regexEmail.test(value);
}
// hàm password
function isPassword(value) {
    let regexPassword = /^(?=.*\d)(?=.*[A-Z])(?=.*\W)[\da-zA-Z\W]{6,10}$/;
    return regexPassword.test(value);
}

function addStyle(value) {
    dom(value).style.display = "block";
}
// hàm validate
function validate() {
    let account = dom('#tknv').value;
    let username = dom('#name').value;
    let email = dom('#email').value;
    let password = dom('#password').value;
    let date = dom('#datepicker').value;
    let salary = dom('#luongCB').value;
    let position = dom('#chucvu').value;
    let hourWork = dom('#gioLam').value;
    let isValid = true;
    //account
    if (!isEmpty(account)) {
        isValid = false;
        dom('#tbTKNV').innerHTML = "Tài khoản không được để trống";
        addStyle('#tbTKNV');
    } else if (!isAcount(account)) {
        isValid = false;
        dom('#tbTKNV').innerHTML = "Tài khoản tối đa 4 hoặc 6 ký tự số";
        addStyle('#tbTKNV');
    }
    //username
    if (!isEmpty(username)) {
        isValid = false;
        dom('#tbTen').innerHTML = "Tên không được để trống";
        addStyle('#tbTen');
    } else if (!isUserName(username)) {
        isValid = false;
        dom('#tbTen').innerHTML = "Tên là chuỗi";
        addStyle('#tbTen');
    }
    //email
    if (!isEmpty(email)) {
        isValid = false;
        dom('#tbEmail').innerHTML = "Email không được để trống";
        addStyle('#tbEmail');
    } else if (!isEmail(email)) {
        isValid = false;
        dom('#tbEmail').innerHTML = "Email chưa đúng định dạng";
        addStyle('#tbEmail');
    }
    //password
    if (!isEmpty(password)) {
        isValid = false;
        dom('#tbMatKhau').innerHTML = "Mật khẩu không được để trống";
        addStyle('#tbMatKhau');
    } else if (!isPassword(password)) {
        isValid = false;
        dom('#tbMatKhau').innerHTML = "Mật khẩu 6-10 ký tự (1 số, 1 in hoa, 1 ký tự đặc biệt)";
        addStyle('#tbMatKhau');
    }
    //date
    if (!isEmpty(date)) {
        isValid = false;
        dom('#tbNgay').innerHTML = "Ngày không được để trống";
        addStyle('#tbNgay');
    }
    //salary
    if (!isEmpty(salary)) {
        isValid = false;
        dom('#tbLuongCB').innerHTML = "Lương không được để trống";
        addStyle('#tbLuongCB');
    } else if (salary < 1000000 || salary > 20000000) {
        isValid = false;
        dom('#tbLuongCB').innerHTML = "Lương phải trên 1 triệu và dưới 20 triệu";
        addStyle('#tbLuongCB');
    }
    //chức vụ
    if (!isEmpty(position)) {
        isValid = false;
        dom('#tbChucVu').innerHTML = "Chức vụ không được để trống";
        addStyle('#tbChucVu');
    }
    // giờ làm
    if (!isEmpty(hourWork)) {
        isValid = false;
        dom('#tbGiolam').innerHTML = "Giờ làm không được để trống";
        addStyle('#tbGiolam');
    } else if (hourWork < 80 || hourWork > 200) {
        isValid = false;
        dom('#tbGiolam').innerHTML = "Giờ làm không được nhỏ hơn 80 hoặc lớn hơn 200";
        addStyle('#tbGiolam');
    }

    if (isValid) {
        let staff = new Staff(+account,
            username,
            email,
            password, date, +salary,
            position, +hourWork,
        );
        return staff;
    }
    return undefined;
}

function oninputSpan(idInput, idSpan) {
    dom(idInput).oninput = (e) => {
        if (!isSubmit) return;
        let idSpans = dom(idSpan);
        if (isEmpty(e.target.value)) {
            idSpans.innerHTML = "";
        } else {
            idSpans.innerHTML = "Không được để trống";
        }
    }
}
oninputSpan('#tknv', '#tbTKNV');
oninputSpan('#name', '#tbTen');
oninputSpan('#email', '#tbEmail');
oninputSpan('#password', '#tbMatKhau');
oninputSpan('#datepicker', '#tbNgay');
oninputSpan('#luongCB', '#tbLuongCB');
oninputSpan('#chucvu', '#tbChucVu');
oninputSpan('#gioLam', '#tbGiolam');