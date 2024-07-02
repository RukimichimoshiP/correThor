CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE admin(
	id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  token VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE corrector(
	id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE correction(
	id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  correctorId UUID NOT NULL,
  class VARCHAR(100) NOT NULL,
  module VARCHAR(100) NOT NULL,
  meeting VARCHAR(100) NOT NULL,
  student VARCHAR(255) NOT NULL,
  CONSTRAINT fk_corrector FOREIGN KEY (correctorId) REFERENCES corrector(id)
);