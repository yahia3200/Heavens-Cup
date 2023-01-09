docker run --name some-postgres -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 -v postgres-data:/var/lib/postgresql/data -d postgres

docker build --tag osamamagdy/wc22_backend:latest .

docker push osamamagdy/wc22_backend

docker pull osamamagdy/wc22_backend

# From container to host
docker cp <containerId>:/dump.sql ~/web-project/WC22/psql/dump.sql 

# From host to container
docker cp ~/web-project/WC22/psql/dump.sql <containerId>:/tmp/dump.sql

scp -i ~/Desktop/server_key.pem dump.sql azureuser@20.107.29.44:~/wc22/psql/dump.sql

ssh -i ~/Desktop/server_key.pem azureuser@20.107.29.44

pg_dump -v -U postgres --format=custom --exclude-table-data='pages' --file ./dump.sql wc22

pg_restore -U postgres -d wc22 -n public --format=custom  ./dump.sql

