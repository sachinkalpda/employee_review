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
        $('.not-found').html('');
        assigned.html('');
        if(employees.length == 0){
            $('.not-found').html('No Data Found!');
        }
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


    function renderReview(reviews){
        let reviewList = $('.review-list');
        reviewList.html('')
        if(reviews.length == 0){
            reviewList.html('No Review Found!');
        }
        reviews.forEach(function(review,index){
            reviewList.append(`<div class="review-detail">
            <h6>Reviewed By &nbsp;</h6><span>${review.reviewer.name}</span>
            <p>${review.review}</p>
            <a href="/admin/reviews/view/${review._id}">View Detailed Info</a>
        </div>`);
        });
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


    // ajax request to get review by stars

    $('.getReview').on('click',function(e){
        e.preventDefault();
        let employeeId = $(this).data('employee');

        let stars = $(this).data('stars');

        $('review-list').html('Please Wait...')
        $.ajax({
            type: 'post',
            url : '/admin/users/review/get',
            data :  {
                employee : employeeId,
                stars : stars
            },
        }).done(function(data){
            console.log(data.reviews);
            renderReview(data.reviews);
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