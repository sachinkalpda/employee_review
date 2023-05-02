# employee_review

In this application Registered Employees can review other employees. An Employee can give review, feedback and ratings to others.


Features : 

1. Employee can review each others and provide feedback and give them star ratings based on their experience.
2. There are two types of users. Normal Users and Admin
3. User can access only their dashboard after login where they can review assigned users.
4. Admin can assign a number of users to a particular user or employee.
5. Admin can also review the other users and delete the review of any other users.
6. Admin can also add, update and delete the users and their reviews.
7. Admin can view rating of all users based on reviews provided by other users
8. Admin can promote any user to Admin.
9. No user has access to admin dashboard.
10. New user can also register from register page.




Steps to Setup to Local :

1. First download the code zip from repo.
2. Extract the zip.
3. Your System should has installed node and mongo db.
4. Open terminal and go to the directory where project is located.
5. Run the command "npm install".
6. After that Run command "npm start".
7. Register a new user.


Note :-  In this application any new user registered has by default role is 'user'. Their will be no admin in fresh application.
So to make it admin you have to manually change thier role to 'admin' from Database. After making a admin you can promote any user to admin from admin panel.

Above Step is only for fresh application.
