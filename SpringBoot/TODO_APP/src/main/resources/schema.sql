 create table todolist if not exists (
        id integer not null,
        created_at timestamp default CURRENT_TIMESTAMP,
        status varchar,
        task varchar,
        updated_at timestamp default CURRENT_TIMESTAMP,
        primary key (id)
    )