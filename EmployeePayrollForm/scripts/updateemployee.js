$(document).ready(function () {
    let employeeId = localStorage.getItem('employeedata');
    console.log(employeeId);

    $.ajax({
        url: 'http://localhost:3000/employees/' + employeeId,
        type: 'GET',
        dataType: 'json',

        success: function (data) {
            $('#fName').val(data.name);
            $('input[name="Profile"][value="' + data.profileUrl + '"]').prop('checked', true);
            $('input[name="gender"][value="' + data.gender + '"]').prop('checked', true);
            $('input[name="dept"]').each(function () {
                $(this).prop('checked', data.department.includes($(this).val()));
            });
            $('#salary').val(data.salary);
            var startDate = new Date(data.startDate)   
            $('#day').val(startDate.getDate());
            $('#month').val(startDate.getMonth());
            $('#year').val(startDate.getFullYear());
            $('#notes').val(data.notes);
            console.log(data);
        }
    });
});



const canceledit = () => {
    window.location.href = "/templates/dashboard.html"
}

const updateEmployeeDetails = (id) => {

    const fullName = $('#fName').val();
    console.log(fullName);

    const profileImage = $('input[type="radio"]:checked').val();
    console.log(profileImage);

    const gender = $('input[name="gender"]:checked').val();
    console.log(gender);

    var department = "";
    $('input[type="checkbox"]:checked').each(function () {
        department += $(this).val() + " ";
    });
    department = department.substring(0, department.length - 1);
    console.log(department);

    const salary = $('#salary').val();
    console.log(salary);

    const day = $('#day').val();
    const month = $('#month').val();
    const year = $('#year').val();
    console.log(day + '-' + month + '-' + year);

    const notes = $('#notes').val();
    console.log(notes);

    let reqData = {
        "name": fullName,
        "profileUrl": profileImage,
        "gender": gender,
        "department": department,
        "salary": salary,
        "startDate": day + ' ' + month + ' ' + year,
        "notes": notes,
    }

    $.ajax({
        url: 'http://localhost:3000/employees/' + localStorage.getItem('employeedata'),
        type: 'PUT',
        dataType: 'json',
        data: reqData,
        success: function (data, textStatus, xhr) {
            console.log(data);
            window.location.href = "/templates/dashboard.html";
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log('Operation failed');
        }
    })
}

