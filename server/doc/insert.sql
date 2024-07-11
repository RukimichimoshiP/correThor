-- ADMIN
INSERT INTO admin (name) VALUES ('Victor'), ('Kenji');

-- CORRECTOR
INSERT INTO corrector (id, name) VALUES ('2e55351f-dfdf-4e83-af92-0c18590ff1fe', 'Marcos'), ('3f241204-d0af-46a7-8e82-3706268b3bf2', 'Samir'), ('4ab934e3-5ff8-4f6f-a833-3b757e79d2fa', 'Elton');

-- CORRECTIONS
INSERT INTO correction (id, correctorId, class, module, meeting, student) VALUES
  (uuid_generate_v4(), '2e55351f-dfdf-4e83-af92-0c18590ff1fe', 'Math', 'Algebra', 'Week 1', 'Student A'),
  (uuid_generate_v4(), '2e55351f-dfdf-4e83-af92-0c18590ff1fe', 'Math', 'Calculus', 'Week 2', 'Student B'),
  (uuid_generate_v4(), '3f241204-d0af-46a7-8e82-3706268b3bf2', 'Science', 'Physics', 'Week 1', 'Student C'),
  (uuid_generate_v4(), '3f241204-d0af-46a7-8e82-3706268b3bf2', 'Science', 'Chemistry', 'Week 2', 'Student D'),
  (uuid_generate_v4(), '4ab934e3-5ff8-4f6f-a833-3b757e79d2fa', 'English', 'Grammar', 'Week 1', 'Student E'),
  (uuid_generate_v4(), '4ab934e3-5ff8-4f6f-a833-3b757e79d2fa', 'English', 'Literature', 'Week 2', 'Student F');
