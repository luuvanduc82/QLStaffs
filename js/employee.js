//tạo constructor
function Staff(
    account,
    username,
    email,
    password,
    date,
    salary,
    position,
    hourWork
) {
    this.account = account;
    this.username = username;
    this.email = email;
    this.password = password;
    this.date = date;
    this.salary = salary;
    this.position = position;
    this.hourWork = hourWork;
}

Staff.prototype.calcSalary = function() {
    if (this.position == 'Sếp') {
        return (this.salary * 3).toLocaleString();
    } else if (this.position == 'Trưởng phòng') {
        return (this.salary * 2).toLocaleString();
    } else if (this.position == 'Nhân viên') {
        return (this.salary).toLocaleString();
    }
}
Staff.prototype.calcXeploai = function() {
    let hour = this.hourWork;
    if (hour >= 192) {
        return "Xuất sắc";
    } else if (hour >= 176) {
        return "Giỏi"
    } else if (hour >= 160) {
        return "Khá"
    } else {
        return "Trung bình"
    }
}