$(document).ready(function(){
    

    function renderOption(employees){
        let assignEmployee = $('#assign_employee');
        assignEmployee.html('');
        if(employees.length == 0){
            assignEmployee.html('<option>No Users To assign</option>');
        }
        for(let employee of employees){
            assignEmployee.append(`<option value="${employee._id}">${employee.name}</option>`);
        }
    }

    function renderAssigned(employees){
        let assigned = $('#assigned');
        assigned.html('');
        employees.forEach(function(employee,index){
            assigned.append(`<tr>
            <th scope="row">${index+1}</th>
            <td>${employee.name}</td>
            <td>
              <a href="/admin/employee/assign/remove" data-id="${employee._id}" class="delete-assigned"><i class="fa-regular fa-trash-can text-danger"></i></a>
            </td>
          </tr>`);

        })
            
        
    }

    $('#employee').on('change',function(){
        let employeeId = $('#employee').val();
        console.log(employeeId);

        $.ajax({
            type: 'post',
            url : '/admin/employee/assign/all',
            data :  {
                employeeId : employeeId,
            },
        }).done(function(data){
            renderOption(data.unassigned);
            renderAssigned(data.assigned.assigned);
            new Noty({
                theme: 'relax',
                text: data.message,
                type: 'success',
                layout: 'topRight',
                timeout: 1500
            }).show();
        })
        .fail(function(err){
            console.log("error in completing request");
        });
    });

    $('#assign').on('click',function(e){
        e.preventDefault();
        let employeeId = $('#employee').val();
        let assignable = $('#assign_employee').val();

        $.ajax({
            type: 'post',
            url : '/admin/employee/assign/new',
            data :  {
                employeeId : employeeId,
                assignable : assignable
            },
        }).done(function(data){
            let assigned = $('#assigned');
            assigned.append(`<tr>
                <th scope="row">1</th>
                <td>${data.assigned.name}</td>
                <td>
                <a href="/admin/employee/assign/remove" data-id="${data.assigned._id}" class="delete-assigned"><i class="fa-regular fa-trash-can text-danger"></i></a>
                </td>
            </tr>`);
            
            new Noty({
                theme: 'relax',
                text: data.message,
                type: 'success',
                layout: 'topRight',
                timeout: 1500
            }).show();
        })
        .fail(function(err){
            console.log("error in completing request");
        });
        
    });


    $(document).on('click','.delete-assigned',function(e){
        e.preventDefault();
        let assigned = $(this).data('id');
        let employeeId = $('#employee').val();
        let link = $(this);
        $.ajax({
            type: 'post',
            url : '/admin/employee/assign/remove',
            data :  {
                employeeId : employeeId,
                assigned : assigned
            },
        }).done(function(data){
            if(data.status == true){
                link.parent().parent().remove();
            }
            new Noty({
                theme: 'relax',
                text: data.message,
                type: 'success',
                layout: 'topRight',
                timeout: 1500
            }).show();
        })
        .fail(function(err){
            console.log("error in completing request");
        });

        
    });

});