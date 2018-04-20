DROP SCHEMA public CASCADE;
CREATE SCHEMA public;

CREATE TABLE test (
  test_id     serial        PRIMARY KEY,
  test_name   text          NOT NULL
);
CREATE INDEX test_id ON test (test_id);


