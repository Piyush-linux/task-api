
# Create Account
```sh
http POST :3000/auth/register \
name=Yash \
email=yash@test.com \
password=123456


http POST :3000/auth/register \
name=Yash \
email=yash@test.com \
password=123456 -b
{
    "error": "duplicate key value violates unique constraint \"users_email_key\"",
    "success": false
}
```

```sh
http POST :3000/auth/login \
email=yash@test.com \
password=123456 -b
{
    "message": "Login successful",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTc3MjY0NjIwMn0.3eYtZIG8hc8odaI6WQ8J3W9_wglKVkSjH1_DVyYBv5w"
}
```

# Task
```sh
#--- GET
http GET :3000/tasks -b \
Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTc3MjY0NjIwMn0.3eYtZIG8hc8odaI6WQ8J3W9_wglKVkSjH1_DVyYBv5w"

[]

#--- POST 
http POST :3000/tasks -b \
Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTc3MjY0NjIwMn0.3eYtZIG8hc8odaI6WQ8J3W9_wglKVkSjH1_DVyYBv5w" \
title="Finish Node assignment" \
description="Build task API" \
status="pending"
{
    "created_at": "2026-03-04T17:46:36.413Z",
    "description": "Build task API",
    "due_date": null,
    "id": 1,
    "status": "pending",
    "title": "Finish Node assignment",
    "updated_at": "2026-03-04T17:46:36.413Z",
    "user_id": 1
}

#--- GET 
http GET :3000/tasks -b \
Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTc3MjY0NjIwMn0.3eYtZIG8hc8odaI6WQ8J3W9_wglKVkSjH1_DVyYBv5w"

[
    {
        "created_at": "2026-03-04T17:46:36.413Z",
        "description": "Build task API",
        "due_date": null,
        "id": 1,
        "status": "pending",
        "title": "Finish Node assignment",
        "updated_at": "2026-03-04T17:46:36.413Z",
        "user_id": 1
    }
]

#--- GET single
http GET :3000/tasks/1 -b \
Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTc3MjY0NjIwMn0.3eYtZIG8hc8odaI6WQ8J3W9_wglKVkSjH1_DVyYBv5w"

{
    "created_at": "2026-03-04T17:46:36.413Z",
    "description": "Build task API",
    "due_date": null,
    "id": 1,
    "status": "pending",
    "title": "Finish Node assignment",
    "updated_at": "2026-03-04T17:46:36.413Z",
    "user_id": 1
}

#--- PUT
http PUT :3000/tasks/1 -b \
Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTc3MjY0NjIwMn0.3eYtZIG8hc8odaI6WQ8J3W9_wglKVkSjH1_DVyYBv5w" \
title="Finish assignment" \
status="completed"
{
    "created_at": "2026-03-04T17:46:36.413Z",
    "description": null,
    "due_date": null,
    "id": 1,
    "status": "completed",
    "title": "Finish assignment",
    "updated_at": "2026-03-04T17:49:53.881Z",
    "user_id": 1
}

```



```sql
task_manager=# GRANT ALL PRIVILEGES ON TABLE users TO taskuser;
GRANT ALL PRIVILEGES ON TABLE tasks TO taskuser;
GRANT
GRANT
task_manager=# GRANT ALL PRIVILEGES ON SEQUENCE users_id_seq TO taskuser;
GRANT
task_manager=# CREATE INDEX idx_tasks_user_id ON tasks(user_id);

CREATE INDEX idx_tasks_status ON tasks(status);

CREATE INDEX idx_tasks_user_status ON tasks(user_id, status);
CREATE INDEX
CREATE INDEX
CREATE INDEX
task_manager=# psql -U postgres^C
task_manager=# GRANT ALL PRIVILEGES ON SEQUENCE tasks_id_seq TO taskuser;
GRANT
task_manager=#
```
