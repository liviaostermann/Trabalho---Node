Código de criação do Banco no Workbench: 
create user 'usrNode'@'%' identified with 
mysql_native_password by '@root';
grant all on trabalhonode.* to 'usrNode'@'%';

REQUISIÇÕES:

GET:
localhost:3000/atletas/
localhost:3000/metas/

por ID:
localhost:3000/atletas/1
localhost:3000/metas/1

por subconjunto:
localhost:3000/atletas/nome/livia
localhost:3000/metas/titulo/nacional

POST:
localhost:3000/atletas
{
	"nome":"Ana",
	"idade":23
	
}

localhost:3000/metas

"titulo": "META FINAL",
		"descricao": "pipipipiupiup",
		"atletumId": 2

PUT:

localhost:3000/atletas/X
{
	"nome":"Ana2",
	"idade":23
	
}

DELETE
localhost:3000/atletas/X
localhost:3000/metas/*x*
