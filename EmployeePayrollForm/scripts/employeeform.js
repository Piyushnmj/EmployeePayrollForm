const addEmployeeDetails = () => {

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
    department = department.substring(0, department.length -1);
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
        url: 'http://localhost:3000/employees',
        type: 'POST',
        dataType: 'json',
        data: reqData,
        success: function (data, textStatus, xhr) {
            console.log(data);
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log('Operation failed');
        }
    })

    window.location.href="/templates/dashboard.html";
}