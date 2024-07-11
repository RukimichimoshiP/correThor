-- Habilitar a extensão uuid-ossp se ainda não estiver habilitada
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Função para gerar um token aleatório
CREATE OR REPLACE FUNCTION generate_random_token() RETURNS TEXT AS $$
DECLARE
  token TEXT := '';
  characters TEXT := 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  i INTEGER;
  pos INTEGER;
BEGIN
  FOR i IN 1..32 LOOP
    pos := floor(random() * length(characters) + 1)::INTEGER;
    token := token || substring(characters FROM pos FOR 1);
  END LOOP;
  RETURN token;
END;
$$ LANGUAGE plpgsql;

-- Criação das tabelas
CREATE TABLE admin (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  token VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE corrector (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE correction (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  correctorId UUID NOT NULL,
  class VARCHAR(100) NOT NULL,
  module VARCHAR(100) NOT NULL,
  meeting VARCHAR(100) NOT NULL,
  student VARCHAR(255) NOT NULL,
  CONSTRAINT fk_corrector FOREIGN KEY (correctorId) REFERENCES corrector(id)
);

-- Função de gatilho para definir o token
CREATE OR REPLACE FUNCTION set_admin_token() RETURNS TRIGGER AS $$
BEGIN
    NEW.token := generate_random_token();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Gatilho para chamar a função antes de inserir na tabela admin
CREATE TRIGGER before_insert_admin
BEFORE INSERT ON admin
FOR EACH ROW
EXECUTE FUNCTION set_admin_token();
